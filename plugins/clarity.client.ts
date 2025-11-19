
export default defineNuxtPlugin((nuxtApp) => {

    let isDev = process.env.NODE_ENV === "development";

    // 非生产环境不执行
    if (false){
        console.warn("Clarity 插件在开发环境中被禁用。");
        return;
    }else{
        // console.info("Clarity分析调用--");
        // Clarity 初始化代码（保持原始格式）
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "s2chddqdz2");
    }


});