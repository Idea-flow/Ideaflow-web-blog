/**
 * 这个路由负责手动生成站点 robots.txt。
 * 用于替代 SEO 模块的 robots 生成功能，统一声明爬虫访问策略与 sitemap 地址。
 */
export default defineEventHandler((event) => {
  const requestUrl = getRequestURL(event)
  const siteUrl = requestUrl.origin.replace(/\/$/, '')

  /**
   * robots 文本内容由站点根地址和禁止抓取目录组成。
   */
  const robotsContent = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /study',
    'Disallow: /study/',
    '',
    `Host: ${siteUrl}`,
    `Sitemap: ${siteUrl}/sitemap.xml`
  ].join('\n')

  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return robotsContent
})
