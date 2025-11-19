import {useAppStore} from "~/stores/app";
import {computed} from "vue";

export default defineNuxtPlugin((nuxtApp) => {

    let isDev = process.env.NODE_ENV === "development";

    const appStore = useAppStore()

    const userInfo = computed(() => appStore.userInfo)

    // console.log("userInfo", userInfo)
    // console.log("userInfo.value", userInfo.value)
    let isAdmin = computed(() => userInfo.value && userInfo.value.id === 9)
    // console.log("isAdmin", isAdmin.value)
    // 非生产环境不执行
    if (isDev || isAdmin.value){
        console.warn("admin用户block-console.client 插件被禁用。");
        return;
    }else{
        // 1. 禁用快捷键（F12/Ctrl+Shift+I 等）
        document.addEventListener('keydown', (e) => {
            if (
                e.key === 'F12' ||
                (e.ctrlKey && e.shiftKey && e.key === 'I') ||
                (e.ctrlKey && e.shiftKey && e.key === 'J') ||
                (e.ctrlKey && e.key === 'U')
            ) {
                e.preventDefault();
                // detectConsole();
            }
        });

        // 2. 禁用右键菜单中的"检查"选项
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            // detectConsole();
        });


        // 4. 检测到控制台时跳转
        function detectConsole() {
            alert('检测到开发者工具已打开，请关闭使用');
            window.location.href = 'https://www.bing.com'; // 替换为目标网站
        }

        // 5. 页面加载时立即检测控制台是否已打开
        function isDevtoolsOpen() {
            // 专门针对桌面端的检测
            if (window.innerWidth > 768) { // 非移动设备
                const threshold = 160;
                return (
                    window.outerWidth - window.innerWidth > threshold ||
                    window.outerHeight - window.innerHeight > threshold
                );
            }

            // 移动设备不使用窗口尺寸判断
            return false;
        }

        if (isDevtoolsOpen()) {
            detectConsole();
        }else  {
            detectDebug()
        }
        function detectDebug() {
            const date = Date.now();
            debugger;
            // 你的手不可能快于0.1秒
            if (Date.now() - date > 100) {
                detectConsole()
            }
        }


    }

});