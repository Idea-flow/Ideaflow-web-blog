import { defineSitemapEventHandler } from '#imports'
import type { SitemapUrlInput } from '#sitemap/types'
const config = useRuntimeConfig();
// server/api/__sitemap__/urls.ts
export default defineSitemapEventHandler(async() => {

    // 或直接使用 $fetch（推荐）
    const data = await $fetch ( 'https://blogserver.ideaflow.top/app-api/blog/sitemap/getArticleSitemap' ,
        { headers : { 'tenant-id' : '169' , } } ) ;

    // const data = await $fetch ( config.public.blogBaseURL+'/app-api/blog/sitemap/getArticleSitemap' ,
    //     { headers : { 'tenant-id' : config.public.tenantId , } } ) ;

// console.log("sitemap urls loaded:"+ JSON.stringify( data ) );
// console.log("sitemap urls config.public.blogBaseURL:"+config.public.blogBaseURL );

return  data.data;
    // return [
    //     {
    //         loc: '/about-us1',
    //         lastmod:'2025-03-05',
    //         // will end up in the pages sitemap
    //         _sitemap: 'pages',
    //         images:[{loc:"https://bu.dusays.com/2023/11/10/654e2d50015a9.jpg"}],
    //     },  {
    //         loc: '/about-us24',
    //         // will end up in the pages sitemap
    //         _sitemap: 'pages',
    //     },
    // ] satisfies SitemapUrlInput[]
})