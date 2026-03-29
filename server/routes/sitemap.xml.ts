/**
 * 这个路由负责手动生成站点 sitemap.xml。
 * 用于替代 SEO 模块的 sitemap 生成功能，输出静态页面与文章详情页的 XML 站点地图。
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const requestUrl = getRequestURL(event)
  const siteUrl = (config.public.appUrl || requestUrl.origin).replace(/\/$/, '')

  /**
   * 站点固定页面列表。
   * 这些页面更新频率较低，统一按站点当前时间输出最后更新时间。
   */
  const staticPages = [
    '/',
    '/about',
    '/archive',
    '/friendLinks',
    '/hotSearch',
    '/natureSound',
    '/nav',
    '/tools'
  ]

  /**
   * 拉取后端提供的文章 sitemap 数据。
   * 当远端接口不可用时返回空数组，避免整个 sitemap 路由失败。
   */
  const fetchArticleSitemapEntries = async () => {
    try {
      const response = await $fetch(`${config.public.blogBaseURL}/app-api/blog/sitemap/getArticleSitemap`, {
        headers: {
          'tenant-id': String(config.public.tenantId || '')
        }
      })

      return Array.isArray(response?.data) ? response.data : []
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      console.error(`生成 sitemap 获取文章数据失败: ${errorMessage}`)
      return []
    }
  }

  /**
   * 转义 XML 中的特殊字符，避免链接和标题中的保留字符破坏文档结构。
   */
  const escapeXml = (value: string) => {
    return value
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&apos;')
  }

  /**
   * 将任意 loc 转换为完整站点地址。
   * 兼容后端直接返回绝对地址或仅返回站内相对路径两种情况。
   */
  const toAbsoluteUrl = (loc: string) => {
    if (/^https?:\/\//.test(loc)) {
      return loc
    }

    return `${siteUrl}${loc.startsWith('/') ? loc : `/${loc}`}`
  }

  const nowIsoString = new Date().toISOString()
  const articleEntries = await fetchArticleSitemapEntries()

  /**
   * 组装静态页面节点。
   */
  const staticUrlEntries = staticPages.map((path) => {
    return {
      loc: `${siteUrl}${path === '/' ? '' : path}`,
      lastmod: nowIsoString
    }
  })

  /**
   * 组装文章页面节点。
   * 兼容后端返回字段 loc、url、lastmod、updatedAt、updateTime 等常见命名。
   */
  const dynamicUrlEntries = articleEntries
    .map((item: Record<string, any>) => {
      const loc = String(item.loc || item.url || '')

      if (!loc) {
        return null
      }

      return {
        loc: toAbsoluteUrl(loc),
        lastmod: String(item.lastmod || item.updatedAt || item.updateTime || item.createTime || nowIsoString)
      }
    })
    .filter(Boolean) as Array<{ loc: string; lastmod: string }>

  const allEntries = [...staticUrlEntries, ...dynamicUrlEntries]

  /**
   * 生成最终 XML 文本。
   */
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...allEntries.map((entry) => {
      return [
        '  <url>',
        `    <loc>${escapeXml(entry.loc)}</loc>`,
        `    <lastmod>${escapeXml(entry.lastmod)}</lastmod>`,
        '  </url>'
      ].join('\n')
    }),
    '</urlset>'
  ].join('\n')

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return xml
})
