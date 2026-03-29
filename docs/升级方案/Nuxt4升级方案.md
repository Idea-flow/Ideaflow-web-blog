# Ideaflow Web Blog Nuxt 4 升级方案

## 1. 目标与结论

本方案的目标不是只把 `nuxt` 版本号从 3 升到 4，而是把当前项目整理为更符合 Nuxt 4 官方推荐的目录结构与开发方式，重点完成以下事项：

1. 升级到 Nuxt 4 最新稳定版。
2. 将当前根目录式应用结构迁移为 Nuxt 4 推荐的 `app/` 结构。
3. 清理不符合 Nuxt 4 推荐方式的布局、路由命名、环境变量访问方式。
4. 保证现有博客、IM、工具页、学习页等功能在迁移后可逐步回归验证。

结合官方文档与当前项目扫描结果，我建议采用“先升级 Nuxt 主版本、再迁 `app/` 目录、再清理路径与路由、最后全面验证”的方式推进，避免一次性大改导致线上功能回归成本过高。

## 2. 当前项目现状盘点

### 2.1 当前版本与依赖现状

- `package.json` 中当前 `nuxt` 声明版本：`^3.15.4`
- 本地实际安装版本：`3.15.4`
- 锁文件：`package-lock.json`
- 当前主要 Nuxt 模块：
  - `@nuxt/icon@1.11.0`
  - `@nuxthub/core` 已移除
  - `@nuxtjs/color-mode@3.5.2`
  - 已移除 `@nuxtjs/seo`
  - `@nuxtjs/tailwindcss@6.13.1`
  - `@pinia/nuxt@0.10.1`

### 2.2 当前目录结构特征

升级前，项目是典型的 Nuxt 3 根目录结构；当前已完成 `app/` 目录迁移，核心应用代码已进入 `app/`：

- `app.vue`
- `error.vue`
- `pages/`
- `layouts/`
- `components/`
- `middleware/`
- `plugins/`
- `assets/`
- `stores/`
- `utils/`
- `types/`
- `server/`
- `public/`

项目规模已经不小：

- 页面文件约 `102` 个
- 组件文件约 `97` 个
- 自定义布局 `6` 个
- 业务请求封装在 `remote/`

### 2.3 已发现的 Nuxt 4 升级重点

结合代码扫描，当前项目有这些最需要关注的点：

1. **缺少 `app/` 目录结构**
   - 当前 `pages/`、`layouts/`、`components/` 等仍在根目录。
   - Nuxt 4 官方目录结构更推荐以 `app/` 作为应用源码主目录。

2. **`app.vue` 中按路径手动切布局**
   - 当前根文件 [app.vue](/Users/wangpenglong/projects/nuxt/Ideaflow-web-blog/app/app.vue) 使用 `route.path.includes(...)` 动态判断布局。
   - 从纯规范角度看，Nuxt 4 更推荐使用 `definePageMeta({ layout })`、`setPageLayout()`、或路由分组来组织。
   - 但结合本项目页面数量较多、同类页面分布广、布局切换规则本身比较稳定的现状，统一保留在 `app/app.vue` 中集中维护，实际更省改动、也更不容易漏页。

3. **动态路由参数命名过于通用**
   - 当前存在：
     - `app/pages/article/[articleId].vue`
     - `app/pages/category/[categoryId].vue`
     - `app/pages/tags/[tagId].vue`
   - Nuxt 4 推荐使用更具语义化的参数名，例如 `[articleId].vue`、`[categoryId].vue`、`[tagId].vue`。

4. **客户端代码中直接使用 `process.env`**
   - 例如：
     - [app.vue](/Users/wangpenglong/projects/nuxt/Ideaflow-web-blog/app/app.vue)
     - [block-console.client.ts](/Users/wangpenglong/projects/nuxt/Ideaflow-web-blog/app/plugins/block-console.client.ts)
     - [gtag.client.ts](/Users/wangpenglong/projects/nuxt/Ideaflow-web-blog/app/plugins/gtag.client.ts)
     - [my-analysis.client.ts](/Users/wangpenglong/projects/nuxt/Ideaflow-web-blog/app/plugins/my-analysis.client.ts)
     - [clarity.client.ts](/Users/wangpenglong/projects/nuxt/Ideaflow-web-blog/app/plugins/clarity.client.ts)
     - [article/[articleId].vue](/Users/wangpenglong/projects/nuxt/Ideaflow-web-blog/app/pages/article/[articleId].vue)
   - 这类问题实际上要分成两类处理：
     - 业务配置类：迁移为 `useRuntimeConfig()` / `runtimeConfig.public`
     - 环境判断类：优先改为 `import.meta.dev`

5. **迁移到 `app/` 后别名语义会变化**
   - 迁移前 `~/` 通常指向项目根目录。
   - 迁移到 `app/` 后，`~/` / `@/` 更偏向指向 `app/`。
   - 因此凡是仍然保留在项目根目录的目录，例如 `remote/`、`utils/`、`types/`、`data/`、`service-worker/`，都需要重新检查导入路径和配置路径。
   - 对这类根目录资源，建议显式使用 `~~/` 指向项目根目录，避免路径被误解析到 `app/` 下。

6. **页面导航多数仍是字符串拼接**
   - 当前代码里大量 `navigateTo('/xxx')`、``navigateTo(`/article/${id}`)``。
   - 这不是升级阻塞项，但在 Nuxt 4 中更建议逐步过渡到更清晰、可维护的路由组织方式。

7. **大量业务代码仍混在根目录**
   - `remote/`、`stores/`、`utils/`、`types/` 需要在升级时明确归属，避免迁完 `app/` 后目录仍然割裂。

## 3. Nuxt 4 目标目录结构

### 3.1 推荐目标结构

建议最终整理为如下结构：

```text
.
├─ app/
│  ├─ app.vue
│  ├─ error.vue
│  ├─ assets/
│  ├─ components/
│  ├─ composables/
│  ├─ layouts/
│  ├─ middleware/
│  ├─ pages/
│  ├─ plugins/
│  ├─ stores/
│  ├─ utils/
│  └─ app.config.ts
├─ public/
├─ server/
│  ├─ api/
│  └─ utils/
├─ shared/
│  ├─ types/
│  └─ utils/
├─ docs/
│  └─ 升级方案/
├─ nuxt.config.ts
├─ package.json
└─ tsconfig.json
```

### 3.2 当前目录到目标目录的映射建议

| 当前目录/文件 | 目标位置 | 说明 |
| --- | --- | --- |
| `app.vue` | `app/app.vue` | Nuxt 4 应用入口 |
| `error.vue` | `app/error.vue` | 错误页归入 `app/` |
| `pages/` | `app/pages/` | 路由页面目录 |
| `layouts/` | `app/layouts/` | 布局目录 |
| `components/` | `app/components/` | 组件目录 |
| `middleware/` | `app/middleware/` | 路由中间件 |
| `plugins/` | `app/plugins/` | 插件目录 |
| `assets/` | `app/assets/` | 构建资源 |
| `stores/` | `app/stores/` | 推荐与应用源码放一起 |
| `utils/` | `app/utils/` 或 `shared/utils/` | 仅前端使用放 `app`，前后端共用放 `shared` |
| `types/` | `shared/types/` | 推荐前后端共享类型集中到 `shared` |
| `remote/` | `app/services/` 或 `app/composables/api/` | 当前更像客户端请求层，不建议继续放根目录 |
| `data/` | `shared/` 或根目录保留 | 视是否前后端共用决定 |
| `server/` | `server/` | 继续保留在根目录 |
| `public/` | `public/` | 继续保留在根目录 |

### 3.3 本项目建议的目录归类原则

- **属于 Nuxt 应用运行时的代码**：放 `app/`
- **属于服务端 API/Nitro 的代码**：放 `server/`
- **前后端共用的类型与纯函数**：放 `shared/`
- **仅用于文档、脚本、配置的内容**：放根目录

## 4. 这次升级最值得优先处理的结构问题

### 4.1 入口与布局

当前 [app.vue](/Users/wangpenglong/projects/nuxt/Ideaflow-web-blog/app/app.vue) 里通过路径判断布局：

- `/tools` -> `tools`
- `/im/web` -> `imweb`
- `/im/h5` -> `imh5`
- `/hotSearch` -> `hotsearch`
- `/natureSound` -> `naturesound`

这类逻辑理论上可以迁移为以下方式之一：

1. 页面内使用 `definePageMeta({ layout: 'xxx' })`
2. 某些页面通过 `setPageLayout()` 按条件切换
3. 通过路由分组组织目录，再在对应页面里声明布局

**实践后的项目建议**：

- 对于新项目或页面数量较少的项目，可以让 `app/app.vue` 只保留最薄的一层：

```vue
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

- 但对当前这个项目，不建议把所有布局都下沉到页面级 `definePageMeta`。
- 原因是本项目页面数量大、同类页面多、布局规则本身是“按路径前缀稳定映射”的，这种情况下集中维护反而更稳。
- 因此当前项目的推荐方案调整为：
  - 保留 [app.vue](/Users/wangpenglong/projects/nuxt/Ideaflow-web-blog/app/app.vue) 中的统一布局映射逻辑
  - 后续仅在少量特例页面上使用 `definePageMeta({ layout })`
  - 不把“给每个页面都补 layout”作为本项目的升级必做项

### 4.2 动态路由命名

- `app/pages/article/[articleId].vue`
- `app/pages/category/[categoryId].vue`
- `app/pages/tags/[tagId].vue`

这样做的收益：

- 路由语义更清晰
- 后续做类型化路由时更容易读
- 避免不同页面都叫 `id` 带来的维护歧义

**实践建议**：

- 这一步适合在 `app/` 目录迁移稳定、构建通过之后再做。
- 因为它会同步影响：
  - `useRoute().params`
  - `navigateTo(...)`
  - 页面内依赖参数名的逻辑
  - 文章、分类、标签页相关跳转
- 因此建议把它作为“第二阶段规范化”，而不是和 `app/` 迁移绑在同一批改动里。

### 4.3 页面组织方式

当前页面很多，且混合了正式业务页与学习测试页：

- 正式业务：`index`、`article`、`archive`、`tags`、`category`、`tools`、`im`、`login`
- 实验学习：`study/**`

建议升级后使用更清晰的组织方式：

```text
app/pages/
├─ (site)/
│  ├─ index.vue
│  ├─ about/
│  ├─ article/
│  ├─ archive/
│  ├─ tags/
│  └─ category/
├─ (tools)/
│  └─ tools/
├─ (im)/
│  └─ im/
├─ (auth)/
│  └─ login/
└─ (lab)/
   └─ study/
```

说明：

- 括号目录是 Nuxt 4 路由分组，不影响 URL。
- 这样可以在不改线上路径的前提下，提升页面目录可读性。

## 5. 推荐升级路径

## 5.1 阶段一：基线准备

目标：先把升级前状态固定下来，保证回退容易。

建议执行：

1. 新建升级分支，例如 `codex/nuxt4-upgrade-plan`
2. 记录当前可运行状态
3. 保留当前 `package-lock.json`
4. 确认 Node.js 版本至少为 `20.x`
5. 先跑一次当前项目的构建与页面冒烟，记录已知问题

建议命令：

```bash
node -v
npx nuxt info
npm run dev
npm run build
```

## 5.2 阶段二：依赖升级到 Nuxt 4

目标：先把 Nuxt 主版本升级，再处理结构与兼容问题。

建议命令：

```bash
npx nuxt upgrade --channel=v4 --dedupe
```

如果升级后锁文件与依赖树异常，再考虑：

```bash
npx nuxt upgrade --channel=v4 --dedupe --force
```

本阶段重点检查：

- `nuxt` 是否升级到 Nuxt 4 最新稳定版
- `@pinia/nuxt`、`@nuxt/icon` 等模块是否自动被带到兼容版本
- 构建是否出现模块 peer dependency 报错

**当前项目实践补充**：

- 按官方第一步先执行 `npx nuxt upgrade` 是正确顺序。
- 本项目实际升级结果为：`nuxt 3.15.4 -> 4.4.2`
- 升级后还需要继续核对模块兼容性，而不是只看 `nuxt` 本体版本。
- 已验证：
  - `@pinia/nuxt` 需要升级到兼容 Nuxt 4 的版本
  - `pinia-plugin-persistedstate` 也需要同步升级
  - `@nuxtjs/google-adsense` 在 Nuxt 4 下不兼容，因此本项目已直接删除该模块及相关广告测试代码

## 5.3 阶段三：目录结构迁移到 `app/`

这是本项目最关键的一步，建议按“先迁目录，再修引用”的顺序处理。

建议迁移顺序：

1. 创建 `app/`
2. 移动以下目录与文件：

```text
app.vue        -> app/app.vue
error.vue      -> app/error.vue
assets/        -> app/assets/
components/    -> app/components/
layouts/       -> app/layouts/
middleware/    -> app/middleware/
pages/         -> app/pages/
plugins/       -> app/plugins/
stores/        -> app/stores/
```

3. 新建：

```text
shared/types/
shared/utils/
app/services/
```

4. 规范化目标：

```text
types/   -> shared/types/
utils/   -> app/utils/ 或 shared/utils/
remote/  -> app/services/
```

### 5.3.1 迁移后需要重点修正的引用

由于 `~` / `@` 别名会更偏向 `app/` 目录，迁移后要重点检查：

- `~/components/...`
- `~/assets/...`
- `~/stores/...`
- `~/services/...`
- `~/utils/...`

其中请求层统一迁移到 `app/services/` 后，建议统一替换 import 路径，避免继续保留历史目录名。

**当前项目实践补充**：

- 本项目最初确实先通过 `~~/` 保留了根目录引用，以确保 `app/` 迁移后先恢复构建。
- 当前项目已继续做了一步“渐进式规范化”：
  - 新增 `app/services/` 作为应用层请求入口
  - 新增 `shared/types/` 作为共享类型入口
  - 新增 `shared/utils/` 作为前后端共用工具入口
- 当前推荐写法变为：
  - `~/services/...`
  - `~~/shared/types/...`
  - `~~/shared/utils/...`
- 当前项目已进一步完成类型收口：
  - 根目录 `types/` 兼容桥接层已删除
  - 共享类型统一收敛到 `shared/types/`
- 当前项目已进一步完成请求层收口：
  - 根目录 `remote/` 实现层已删除
  - 请求封装统一收敛到 `app/services/`
- 当前项目已进一步完成工具层收口：
  - 请求工具与 IM WebSocket 工具已迁入 `app/utils/`
  - 共享纯函数统一收敛到 `shared/utils/`
- 当前仍不建议新增 `~~/utils/...` 这类历史路径引用。

### 5.3.2 迁移后需要重点修正的配置

除了 import 别名之外，还要重点检查“字符串路径配置”，因为这类路径也会受到 `app/` 迁移影响。

本项目已验证需要特别关注：

- `@nuxt/icon` 自定义图标目录
  - 例如原来的 `./assets/myIcons`
  - 迁移后应改为 `./app/assets/myIcons`

- 本项目已移除 `@vite-pwa/nuxt`，因此不再保留旧的 PWA 模块配置
- 后续如需继续支持 PWA，建议改为原生 `manifest.webmanifest` 与原生 service worker 注册方案

## 5.4 阶段四：布局与页面元信息改造

目标：把全局入口里的路径判断布局拆回页面层。

建议做法：

1. 简化 `app/app.vue`
2. 对使用特殊布局的页面补充 `definePageMeta({ layout: 'xxx' })`
3. 对需要运行时切布局的场景使用 `setPageLayout()`

建议优先处理的业务区块：

- `app/pages/tools/**` -> `tools` 布局
- `app/pages/im/web/**` -> `imweb` 布局
- `app/pages/im/h5/**` -> `imh5` 布局
- `app/pages/hotSearch/**` -> `hotsearch` 布局
- `app/pages/natureSound/**` -> `naturesound` 布局

**当前项目实践结论**：

- 这一阶段在本项目中不建议“全量页面下沉 layout 声明”。
- 因为页面多、改动面大、且同类页面需要重复修改，实际维护成本偏高。
- 当前项目更推荐保留统一布局映射逻辑在 `app/app.vue` 中，用路径前缀做集中分发。
- 文档层面把 `definePageMeta({ layout })` 视为“可选优化方案”，而不是本项目的默认推荐方案。

## 5.5 阶段五：路由与命名规范化

目标：让目录结构与 Nuxt 4 路由约定更一致。

建议处理项：

1. 动态参数改名
   - `[id]` -> `[articleId]`
   - `[id]` -> `[categoryId]`
   - `[id]` -> `[tagId]`

2. 审视 `study/` 目录是否全部保留在正式应用中
   - 若只是演示页，可考虑后续拆为独立 layer、demo、或仅开发环境保留

3. 逐步减少字符串拼接路由
   - 尤其是文章详情、标签、分类等核心路径

## 5.6 阶段六：配置与运行时变量清理

目标：避免 Nuxt 4 升级后出现客户端环境变量不稳定、配置分散的问题。

建议处理：

1. 将客户端直接使用的环境变量迁移到 `runtimeConfig.public`
2. 将服务端私有变量放入 `runtimeConfig`
3. 将应用级静态配置逐步迁移到 `app/app.config.ts`

**当前项目实践补充**：

- 业务配置类已经验证适合迁入 `runtimeConfig.public`，当前项目至少包括：
  - `NUXT_BLOG_BASE_API`
  - `NUXT_BLOG_TENANT_ID`
  - `APP_URL`
- 当前项目已落地到 [nuxt.config.ts](/Users/wangpenglong/projects/nuxt/Ideaflow-web-blog/nuxt.config.ts) 的 `runtimeConfig.public`：
  - `blogBaseURL`
  - `tenantId`
  - `appUrl`
- 请求层 [request.ts](/Users/wangpenglong/projects/nuxt/Ideaflow-web-blog/app/utils/request.ts) 已改为从 `useRuntimeConfig().public` 读取 `blogBaseURL` 和 `tenantId`
- 文章页：
  - [article/[articleId].vue](/Users/wangpenglong/projects/nuxt/Ideaflow-web-blog/app/pages/article/[articleId].vue)
  - [article/bf.vue](/Users/wangpenglong/projects/nuxt/Ideaflow-web-blog/app/pages/article/bf.vue)
  已改为从 `useRuntimeConfig().public.appUrl` 读取站点地址

**环境判断类的实践结论**：

- `process.env.NODE_ENV === "development"` 这类判断，不建议塞进 `runtimeConfig`
- 在 Nuxt 4 中更合适的写法是统一改为：

```ts
const isDev = import.meta.dev
```

- 当前项目已完成这一轮替换，覆盖了：
  - `app/` 下插件与页面
  - `utils/`
  - `remote/`

当前优先清理位置：

- [nuxt.config.ts](/Users/wangpenglong/projects/nuxt/Ideaflow-web-blog/nuxt.config.ts)
- [app.vue](/Users/wangpenglong/projects/nuxt/Ideaflow-web-blog/app/app.vue)
- [article/[articleId].vue](/Users/wangpenglong/projects/nuxt/Ideaflow-web-blog/app/pages/article/[articleId].vue)
- [article/bf.vue](/Users/wangpenglong/projects/nuxt/Ideaflow-web-blog/app/pages/article/bf.vue)
- [block-console.client.ts](/Users/wangpenglong/projects/nuxt/Ideaflow-web-blog/app/plugins/block-console.client.ts)
- [gtag.client.ts](/Users/wangpenglong/projects/nuxt/Ideaflow-web-blog/app/plugins/gtag.client.ts)
- [my-analysis.client.ts](/Users/wangpenglong/projects/nuxt/Ideaflow-web-blog/app/plugins/my-analysis.client.ts)
- [clarity.client.ts](/Users/wangpenglong/projects/nuxt/Ideaflow-web-blog/app/plugins/clarity.client.ts)
- [request.ts](/Users/wangpenglong/projects/nuxt/Ideaflow-web-blog/app/utils/request.ts)

## 5.7 阶段七：验证与回归

建议按以下顺序验证：

1. `npx nuxt prepare`
2. `npx nuxi typecheck`
3. `npm run build`
4. `npm run dev`
5. 手工回归核心页面

建议最少覆盖以下页面：

- 首页 `/`
- 文章详情 `/article/:id`
- 归档 `/archive`
- 标签 `/tags/:id`
- 分类 `/category/:id`
- 登录 `/login`
- IM `/im`
- 热搜 `/hotSearch`
- 白噪音 `/natureSound`
- 工具页 `/tools`

## 6. 这次升级的高风险点

### 6.1 布局切换逻辑回归风险

因为当前布局是在全局入口按路径判断，迁移到页面级 `definePageMeta` 后，最容易出现：

- 页面布局丢失
- 某些嵌套路由未继承预期布局
- IM H5 / Web 页面样式错位

### 6.2 `remote/` 迁移后的 import 风险

当前 `remote/` 被多个页面和组件使用。改成 `app/services/` 后，如果替换不完整，容易出现：

- 构建找不到模块
- 客户端与服务端混用边界不清
- 同一项目中同时存在新旧 import 风格，后续维护成本升高

### 6.3 动态路由改名后的跳转风险

`[id]` 改为语义化参数后，需要同步修正：

- `navigateTo(...)`
- `useRoute()`
- 页面内参数读取逻辑
- 文章、标签、分类相关链接生成逻辑

### 6.4 PWA 与 SEO 相关配置风险

当前 [nuxt.config.ts](/Users/wangpenglong/projects/nuxt/Ideaflow-web-blog/nuxt.config.ts) 里集成了：

- SEO 模块链已拆除，改为项目内手写 `robots.txt` 与 `sitemap.xml`
- sitemap / robots / og image 相关配置

升级时要重点确认：

- sitemap 数据源 `/api/__sitemap__/urls` 是否仍正常

### 6.5 PWA 模块移除说明

当前项目已完成以下清理：

- 删除 `@vite-pwa/nuxt` 依赖
- 删除 `nuxt.config.ts` 中对应的 `pwa` 配置
- 删除 [app.vue](/Users/wangpenglong/projects/nuxt/Ideaflow-web-blog/app/app.vue) 中的 `NuxtPwaManifest`
- 删除旧的 Workbox service worker 文件
- 删除旧的 Workbox 学习演示页

当前项目后续已切换为原生 PWA 方案，落地点如下：

- 使用 [public/manifest.webmanifest](/Users/wangpenglong/projects/nuxt/Ideaflow-web-blog/public/manifest.webmanifest) 提供安装清单
- 使用 [public/sw.js](/Users/wangpenglong/projects/nuxt/Ideaflow-web-blog/public/sw.js) 提供原生 Service Worker 缓存能力
- 使用 [pwa.client.ts](/Users/wangpenglong/projects/nuxt/Ideaflow-web-blog/app/plugins/pwa.client.ts) 在客户端注册 Service Worker
- 在 [nuxt.config.ts](/Users/wangpenglong/projects/nuxt/Ideaflow-web-blog/nuxt.config.ts) 的 `app.head` 中统一注入 `manifest`、`theme-color`、`apple-touch-icon` 等安装所需元信息

当前原生 PWA 方案的边界如下：

- 已支持安装清单、桌面/移动端添加到主屏幕、构建静态资源缓存、图片缓存
- 暂未接管 HTML 导航请求，因此没有实现完整离线浏览
- 如后续需要离线页，可再单独补 `offline.html` 与导航请求兜底逻辑

## 6.8 当前项目已验证的升级规则

这部分是根据本项目实际升级过程补充的“落地规则”，优先级高于前文里的泛化建议。

1. 先执行 `npx nuxt upgrade`，不要在 Nuxt 3 阶段先大规模迁目录。
2. 升到 Nuxt 4 后，先处理模块兼容问题，再做结构迁移。
3. 迁移到 `app/` 后，凡是仍留在项目根目录的业务目录，统一使用 `~~/` 引用。
4. 对字符串型配置路径也要做同样检查，不能只查 `import`。
5. 对当前这种页面数量多、布局规则稳定的项目，保留 `app/app.vue` 统一布局映射比全量页面级 `definePageMeta` 更稳。
6. 动态路由语义化重命名适合作为单独一批改动，不要和 `app/` 迁移混在一起。
7. `process.env` 迁移要拆分处理：
   - 业务配置类 -> `runtimeConfig.public`
   - 环境判断类 -> `import.meta.dev`

## 7. 建议的落地顺序

为了降低风险，我建议按下面顺序真正实施：

1. 升级依赖到 Nuxt 4 最新稳定版
2. 完成 `app/` 目录迁移
3. 修正 import 路径
4. 保留并整理 `app.vue` 中按路径选布局的逻辑
5. 处理动态路由命名
6. 分两步处理 `process.env`
   - 业务配置类 -> `runtimeConfig.public`
   - 环境判断类 -> `import.meta.dev`
7. 跑类型检查、构建、功能回归
8. 最后再考虑路由分组、类型化路由、`study/` 目录清理等增强项

## 8. 我对本项目的具体建议

如果以“尽量稳”为第一目标，我建议你这次升级只做两层目标：

### 第一层：必须完成

- 升级 Nuxt 4
- 迁移到 `app/` 目录结构
- 保证现有页面和构建恢复正常
- 保留全局布局判断的集中维护方式
- 修正最关键的环境变量使用方式

### 第二层：建议顺手完成

- 动态路由参数重命名
- `remote/` 统一改为 `app/services/`
- `types/` / `utils/` 向 `shared/` 规范化
- 使用路由分组整理 `study`、`tools`、`im` 等大区块

**当前项目实践补充**：

- `app/services/` 已建立并作为应用层的首选请求入口
- `shared/types/`、`shared/utils/` 已建立并开始接管共享类型与通用工具
- 根目录旧目录目前仍保留少量兼容桥接文件，用于平滑过渡

## 9. 输出结果

本次方案已经给出明确目标结构、当前问题清单、升级阶段划分和高风险项。  
如果你下一步希望我继续执行，我建议直接进入以下实施顺序：

1. 先创建 `app/` 结构并迁移文件
2. 再升级 Nuxt 4 依赖并修复编译问题
3. 最后逐步清理布局、路由、运行时配置

## 10. 参考依据

以下信息用于校准本方案：

- Nuxt 4 官方升级指南：<https://nuxt.com/docs/4.x/getting-started/upgrade>
- Nuxt 4 官方目录结构：<https://nuxt.com/docs/4.x/guide/directory-structure>
- Nuxt 4 官方 `app.vue` 文档：<https://nuxt.com/docs/4.x/guide/directory-structure/app>
- Nuxt 4 官方 `pages` 文档：<https://nuxt.com/docs/4.x/guide/directory-structure/app/pages>
- Nuxt 4 官方 `layouts` 文档：<https://nuxt.com/docs/4.x/guide/directory-structure/layouts>
- Nuxt 官方 GitHub Releases：截至我本次核对时，最新稳定版显示为 `v4.2.2`
