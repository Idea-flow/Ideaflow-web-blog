
export default defineNuxtPlugin((nuxtApp) => {

    let isDev = process.env.NODE_ENV === "development";
    const data_website_id = '487c2807-7507-4ccb-adb5-38d4f4cf43a0'
    // 非生产环境不执行
    if (false){
        console.warn("my-analysis 插件在开发环境中被禁用。");
        return;
    }else{
        // console.info("my-analysis分析调用--");
        // 添加 analysis.ideaflow.top 脚本
        const script = document.createElement('script')
        script.defer = true
        script.src = 'https://analysis.ideaflow.top/script.js'
        script.setAttribute('data-website-id', data_website_id)
        document.head.appendChild(script)
    }


});