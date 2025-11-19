<template>
  <nav class="left-0 right-0 transition-all duration-300 z-40"
       :class="{
         'fixed top-0': isOverlayPage,
         'relative': !isOverlayPage,
         'translate-y-0': isVisible,
         '-translate-y-full': !isVisible && isOverlayPage,
         ' bg-white/70 dark:bg-black/70 shadow-lg': !isOverlayPage || (isOverlayPage && (isScrolledPastHero || isHovered)),
         'bg-white/70 dark:bg-black/70': isOverlayPage && !isScrolledPastHero && !isHovered
       }"
       @mouseenter="isHovered = true"
       @mouseleave="isHovered = false">
    <div class="w-full px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- 左侧 Logo 和导航链接 -->
        <div class="flex items-center space-x-8">
          <NuxtLink to="/" class="flex items-center transform hover:scale-105 transition-transform duration-200">
            <img src="/favicon.ico" alt="网站Logo" class="w-8 h-8 rounded-full object-cover shadow-lg dark:shadow-gray-700 ring-1 ring-white/50 dark:ring-gray-800/50">
            <h1 class="ml-3 text-xl  text-gray-800 dark:text-white tracking-tight">IdeaFlow</h1>
          </NuxtLink>
          <!-- 桌面端导航链接 -->
          <div class="hidden sm:flex sm:items-center">
            <NuxtLink to="/" class="inline-flex items-center px-3 py-2 text-base  text-gray-600 dark:text-gray-200 hover:text-gray-800 dark:hover:text-white hover:scale-105 transition-all duration-200 relative after:absolute after:bottom-0 after:left-1/2 after:right-1/2 after:h-0.5 after:bg-gradient-to-r after:from-transparent after:via-primary after:to-transparent hover:after:left-0 hover:after:right-0 after:transition-all after:duration-300">
              首页
<!--              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="2em" height="2em" viewBox="0 0 64 64">-->
<!--                <path fill="#faefde" d="M55 33L31 13 7 33 7 57 55 57z"></path><path fill="#efd8be" d="M31,13L7,33v1.7c0,1.1,0.9,2,2,2c0.5,0,0.9-0.2,1.3-0.5l20.1-16.7c0.4-0.3,0.9-0.3,1.3,0l20.1,16.7 c0.8,0.7,2.1,0.6,2.8-0.3c0.3-0.4,0.5-0.8,0.5-1.3V33L31,13z"></path><path fill="#f9dd8f" d="M7 47H55V57H7z"></path><path fill="#cda1a7" d="M31.6,13.5l25.7,21.1c0.4,0.3,1.1,0.3,1.4-0.1c0.1-0.2,0.2-0.4,0.2-0.6V31c0-0.6-0.3-1.2-0.7-1.5L32.3,8 c-0.7-0.6-1.8-0.6-2.5,0l-26,21.4C3.3,29.8,3,30.3,3,31v2.9c0,0.6,0.5,1,1,1c0.2,0,0.4-0.1,0.6-0.2l25.7-21.1 C30.7,13.2,31.3,13.2,31.6,13.5z"></path><path fill="#8d6c9f" d="M16 50c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1 .6 0 1-.4 1-1v-2C17 50.4 16.6 50 16 50zM11 50c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1s1-.4 1-1v-2C12 50.4 11.6 50 11 50zM46 50c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1s1-.4 1-1v-2C47 50.4 46.6 50 46 50zM51 50c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1s1-.4 1-1v-2C52 50.4 51.6 50 51 50z"></path><path fill="#bbdef9" d="M31 20A4 4 0 1 0 31 28A4 4 0 1 0 31 20Z"></path><path fill="#8d6c9f" d="M31,19c-2.8,0-5,2.2-5,5s2.2,5,5,5s5-2.2,5-5S33.8,19,31,19z M31,27.2c-1.8,0-3.2-1.4-3.2-3.2s1.4-3.2,3.2-3.2 c1.8,0,3.2,1.4,3.2,3.2v0C34.2,25.8,32.8,27.2,31,27.2z"></path><path fill="#ed7899" d="M25 37H37V57H25z"></path><path fill="#8d6c9f" d="M33,45c-0.6,0-1,0.4-1,1v2c0,0.6,0.4,1,1,1s1-0.4,1-1v-2C34,45.4,33.6,45,33,45z"></path><path fill="#8d6c9f" d="M56.7,35.4c0.9,0.7,2.1,0.6,2.8-0.3c0.3-0.4,0.5-0.8,0.5-1.3V31c0-0.9-0.4-1.8-1.1-2.3l-26-21.4 c-1.1-0.9-2.7-0.9-3.8,0L18,16.4v-3.3c0-0.6-0.4-1-1-1s-1,0.4-1,1v5l-2,1.6V9.1c0-0.6-0.4-1-1-1s-1,0.4-1,1v12c0,0.1,0,0.1,0,0.2 l-8.9,7.4C2.4,29.2,2,30.1,2,31v2.9c0,0.8,0.4,1.5,1.2,1.8c0.7,0.3,1.5,0.2,2.1-0.3L6,34.8V56H3c-0.6,0-1,0.4-1,1s0.4,1,1,1h56 c0.6,0,1-0.4,1-1s-0.4-1-1-1h-3V34.8L56.7,35.4z M22,56h-2H8v-8h16v8H22z M26,56V38h10v18H26z M54,56H42h-2h-2v-8h16V56z M54,38v8 H38v-8c0-1.1-0.9-2-2-2H26c-1.1,0-2,0.9-2,2v8H8v-8v-4.8l23-18.9l23,18.9V38z M32.3,12.8c-0.7-0.6-1.8-0.6-2.5,0L4,33.9V31 c0-0.3,0.1-0.6,0.4-0.8l26-21.4c0.4-0.3,0.9-0.3,1.3,0l26,21.4c0.2,0.2,0.4,0.5,0.4,0.8v2.9L32.3,12.8z"></path><path fill="#8d6c9f" d="M21 50c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1s1-.4 1-1v-2C22 50.4 21.6 50 21 50zM41 50c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1s1-.4 1-1v-2C42 50.4 41.6 50 41 50z"></path>-->
<!--              </svg>-->
            </NuxtLink>
            <NuxtLink to="/archive" class="inline-flex items-center px-3 py-2 text-base  text-gray-600 dark:text-gray-200 hover:text-gray-800 dark:hover:text-white hover:scale-105 transition-all duration-200 relative after:absolute after:bottom-0 after:left-1/2 after:right-1/2 after:h-0.5 after:bg-gradient-to-r after:from-transparent after:via-primary after:to-transparent hover:after:left-0 hover:after:right-0 after:transition-all after:duration-300">
              素笺存忆

<!--              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="2em" height="2em" viewBox="0 0 64 64">-->
<!--                <path fill="#ed7899" d="M45.41,55.83l-12.82-9.4a1,1,0,0,0-1.18,0l-12.82,9.4A1,1,0,0,1,17,55V8a1,1,0,0,1,1-1H46a1,1,0,0,1,1,1V55A1,1,0,0,1,45.41,55.83Z"></path><path fill="#e0678f" d="M45.41,48.83,33.77,40.3a3,3,0,0,0-3.55,0L18.59,48.83A1,1,0,0,1,17,48v7a1,1,0,0,0,1.59.81l12.82-9.4a1,1,0,0,1,1.18,0l12.82,9.4A1,1,0,0,0,47,55V48A1,1,0,0,1,45.41,48.83Z"></path><path fill="#f283a5" d="M46,7H18a1,1,0,0,0-1,1v5a1,1,0,0,1,1-1H46a1,1,0,0,1,1,1V8A1,1,0,0,0,46,7Z"></path><path fill="#8d6c9f" d="M45,6H19a3,3,0,0,0-3,3V55a2,2,0,0,0,3.18,1.61l12.22-9a1,1,0,0,1,1.18,0l12.23,9A2,2,0,0,0,48,55V9A3,3,0,0,0,45,6Zm1,49-12.23-9a3,3,0,0,0-3.55,0L18,55V9a1,1,0,0,1,1-1H45a1,1,0,0,1,1,1Z"></path><path fill="#8d6c9f" d="M37 10a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0V11A1 1 0 0 0 37 10zM42 10a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0V11A1 1 0 0 0 42 10zM22 10a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0V11A1 1 0 0 0 22 10zM27 10a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0V11A1 1 0 0 0 27 10zM32 10a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0V11A1 1 0 0 0 32 10z"></path>-->
<!--              </svg>-->

            </NuxtLink>
            <NuxtLink to="/hotSearch" class="inline-flex items-center px-3 py-2 text-base  text-gray-600 dark:text-gray-200 hover:text-gray-800 dark:hover:text-white hover:scale-105 transition-all duration-200 relative after:absolute after:bottom-0 after:left-1/2 after:right-1/2 after:h-0.5 after:bg-gradient-to-r after:from-transparent after:via-primary after:to-transparent hover:after:left-0 hover:after:right-0 after:transition-all after:duration-300">
              热搜
<!--              <img  width="30px" height="30px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAALAElEQVR4nO1b6W8bxxVnUsCF+6VwUfRL0A/51KBJ0aB/QJAGaBEUCNoPddN+7Ben5i4pyrJFWYnFWLbjFtylfOQwKe4MTYquRR+y5KO15biWkdqO4ziS5fuQD/kIfMnWbUnWFL+ZXS5J7UpLmUcTZ4AHksPZmffezDvmvbcu13etfC0QSM0BuJ61plY2/kiRaEKV6DgA31cvTM5zPQst5I69rMj0oipTpspkUgBl6At6tJ+7vs1NkekfVIn2g2DiJaPX/BEGIB5tjDNBIo9CHvKW65vUmIs9F5TJG4oUWxD0aH8MeqOv5Mo1xigyCSj6bm+v0Mbu1ETY/ZowB3xvqYhO8FMh0SeKTGrxTOYcamVqboObvqrI5G2spXpiv84dU/LGXOw5VaJbxHHOACHbF1SZtKoyVRWJtotjTiY7FjVOGoTnQseiRl0s+Nh/qTJdwz8l0gPGTFlHJvGyMkCRydtAZK1MJnb5NNbsI2MbPNpIyALZdR461r2k0ZLwTMCY9TIZz30ec2LuZp82hrWwJu8vp8goEjkAJA4vzibsTk2YXa6OsBOLG9mhqij7vKqRfe03j/xMgLF4Bs9iDsx1J2cM1hSnjewqC/FBOf4ijmVI1iZu+50RVkgAk0IymVAAC8lPS84AVSL12IEWnzZeauINaKmIClGTyNKSEh8IBJ5XZXoVi592INeAM0si7HrOSUl4CWuqIFl916sj7KzDOU8viXAxUGR6uaQWQZHIb7DwBi8ZdYIoCMf4eA6xhoLL7Nvo1Xhfb7UznbHBQx5jfNAde600Nt8de02VSRcWPbgoaonUtWoQnWnnw2yNRxB7e9lG9mh5gvXXN6UZgO/ow3/4jbGZSq+nOsIu2TAEOOgmsQsbg9NZcMLVd2IvwDkxXVjKNC8Zu2Oj/CJewtZ7KOutCbO+ZYQT11wliDvzXoL1r0hySC7ayJKVsfTvU+8l+BiMxTN9yyi74W9k6zxiPqu1gIPmMc2mIpFrikyWQ0k/NeEhD3kLZgaa1ljgEw8ZAdftiAds84lj3LbYJO5KXRM76I+zvnrx2wru1ydZe3WcjzX6di4WjNvi02zXAy7AyRAHw+mCmYavkrd+YNzDI03GZA0yHW+piI5D6VghcDfj+4PaRnajLsHWeigLe00GzBaw85irty7O57ZaM1cx7vBFJ2AiM5jRnBcTgjJ5w/Dw4HBM58TcqwmzqJfgcsNu1Wqsf4XYvZ5AE7sWMHdytnCprokD/12fZDdrNRbzEhbxUlsmAIAzcDc8RtwdHDNAlYmMh+ByOtHEcS8ResEXY/emOeJPCxARzSd2leZYFDsADfwUuLWFjhmgyNpfuDLyaWNOFrldG2XEF+MLXc6Q30IDTpXqoXytW7XWFigXNuu3TNxUHTOgwU1f5QpP1kZmWgByiaN5b3lTUYnPVKY4CRC1TJ1g7ydoI/zS5I697FwEKlNzuZ8v0Se5l5BsiAibXmSi7QBrAwdb6wBnS6KTsGJrPWu/75gBaIpEroBzcELsFoCNLxfxBgAHO/xwi9TjExdc+TZVInvwMK6jlgssDXMPrtwMAA7AxQpH4K57ia15M0CRSQMePpTj7g53fsmGT37J+t6nlgiNnD3JRs50WfY/7uuxhdxnRi6cZCPnu52dgjrKhs90suFznVm4AnfdFwjmRTwTMTyEpNjRqmwGGAgPtn1qiYzxv12/LQNOd2aNH/36Au8fWL9tZias2cLHjt4+n4XrkSrjBNB9eTlCikxqjTBWrhNkIAwEB5TmvBng9GiPdJ0QjN681+xfleSnYqTzRNbYoea9fOzwiS+yzbM/nA6vISjriHjVTd/kvr9EJ7ss7uWZuzZ86EjRGDC875BY48Bn6b7Bxtb0PANrtppjO/4r+nbtn4LvqSURHk/UI9LzZ9h5+pIq04dc9quso7dpBtwXMPDR9qIwYDC+W4jGKVM0hnb/Jz3P0JZ287Sc6+J9Dxu3TRNt5oGTAYTtLYlfvTA5T4SyEbeP2oa50jJ76LAQhe7OojAA4sXnv3OJ9a/cpIvFV+bpO3JUjP1gE3t87zLve7DC+soMwAVJvy5fURaEfzx19yWaMDI2mUkLOwYAQUNRDSb2PJUStLIaXBFePaMrwu2c0NG7F00ddP2sOCkRIRYYO51HCJqIR3tsmU8IBFJzeDJDJpNIVU03USaBQ23iSI72nGb9qzbNngE5FiAt28e+EMc9tZcNRtvE+JvnBegWYqj1U3EiPj82o1sM2kCjItOxrOxVYJYMANEgniO580BBRSCTwcMHP2ND/+4QzDp2jI0YjNnezoaPHhPfWw/MngGzEYG0skrsyTKLhWTAYGNbWkRGTwn5H2rZz4Z27E/v+ugVISaD4dYZRYB6yZhtSm31wuQ8I+bnRAla2WyYxUIyoP+Df3IFx2X/7iVx7D/azkE4PkIHYcyjlclpGWAoQeQZLZVgrhm0S2JaEcIR0s1iQRkA5p7vNhXfrQumgrylE48Tcr6bPQxstCW+o0p3iSXaP+O1OOQmv+eZWDhCFhchO0Iyd7+gDNDNLSf0+HGz//hx0yR2HLa9FSLZyp0gXO+dJlIVmQRmcoWn2O1gM/fFC82AodQ+0/lpNe8fUHrp/tRey+AIXOF1pitc68orKizTfdNdhqwCIbAEszGD0/kCAx8Keefy/3GL2f9xi7nWuq2Wu29chnCxyzs0rso0aHkd7j7BAUmLKQiv2iSuwxZ2HQTOxhfg8n7qK/G/7hFyWLmJ9+G/vjrr429ch3G1z4t4NEWibd+YgIiN2TYCIopMd7vybYpuEv//Q2LUQUiM9ORFfED3DJ0FRePlDYounc75CfOrMCxAeEH4B44ZEPRGX3EcFl8a4SFqJERKERbHGvfyCIt/oofFVVn7pWMGqDKdn09i5Oa7hGeFip0YuVQnssc8MfKus6xVc4WoQVQl+uc8GEDcTlNjyMwiN2gghgRJsRiAnTcYjXScEwbsqtQtgUSloiRHb/gjvKABuTqkq5AlArIX6xJmUvMp4EqgiV1NJ1mb+GlDIhZMR2J2puToOo9IjgYl+nq+UeFmp+nxW36zjA1y2VuXYGs8Mfah1zp0ng+EK2J6ejyRV3q8ISs9TmOzqhEIuWN/0osMePWmURc0U4HEVp8QCRQ3pHeyrom1++N6Xs8aHtQneRFF7/sFKZCYQHFHQQopg3L8RZSdoPwkXSLjIeN2TAh7KS9sQHkL7HRmiczpjBKZpsqNvEzG+H12WW6JDOFzYK7pSmRI+p4vqs55WP+d2AuuQrdAIPC8qBCbvkiq1y+iL6UukkIBV0nK5YK8UozXCz0ue5mcl4yKmuHYb12laowrSeEqOy2URPFjbqEkiiSnFEr6xdj8CiXJjdT81PdcpWyKnj7bUalNOEG2GGCGuegqV6mbKmoHubkpV7E0zLOu+F4qOQPQYGaclMsjqJIPkzAWzzgpl1ckcsRVrhZCISVCZ3hhojKafmEC8URDwRmALK3TFyaMMFYWSHQSc2+u0Max1lrdw1Ml7a+ucjZVJnELZJ/w8HPmay/6W2JIVNoRj0i06XSRDlWiIVWmO3XbnvbszLJY2lZy5WdZQC3R1/EiE8pSeYVZZWpu7hhFpjXGez/IO9i+NCUCGP/IJQxFTqpEfoGbKtaC2StKYXQxm+omvzPyDkhUZrw2x11YRSLDqFF0fZtbQ0X0Z4pEzxkikX5LTCLXQhL5letZaH9fEP6hKhGKJKVIytJU8G/xn7ietRYIpObkXcD4XXMVtP0PhASdsKZIT/4AAAAASUVORK5CYII=" alt="new">-->

            </NuxtLink>
<!--            <NuxtLink :to="mobile ? '/im/h5' : '/im/web'" class="inline-flex items-center px-3 py-2 text-base  text-gray-600 dark:text-gray-200 hover:text-gray-800 dark:hover:text-white hover:scale-105 transition-all duration-200 relative after:absolute after:bottom-0 after:left-1/2 after:right-1/2 after:h-0.5 after:bg-gradient-to-r after:from-transparent after:via-primary after:to-transparent hover:after:left-0 hover:after:right-0 after:transition-all after:duration-300">-->
<!--              聊天室-->
<!--            </NuxtLink>-->
            <NuxtLink to="/im" class="inline-flex items-center px-3 py-2 text-base  text-gray-600 dark:text-gray-200 hover:text-gray-800 dark:hover:text-white hover:scale-105 transition-all duration-200 relative after:absolute after:bottom-0 after:left-1/2 after:right-1/2 after:h-0.5 after:bg-gradient-to-r after:from-transparent after:via-primary after:to-transparent hover:after:left-0 hover:after:right-0 after:transition-all after:duration-300">
              聊天室
<!--              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE90lEQVR4nNWXSUwbZxTHXXVR2xzbSqnaqlEvlSpVlVr11qrHHntqeqnUU4kCGOyZMd6IHQhLmcWAbUwh8azGy9jY0JiwmEBIQxKC0igLi0NAWURCSYmJWVIb8KvGDgTwEEhLIvVJf2lkzaff9/7vve8bKxT/hzD/xLxOHWDfs6iEdwmU3/PcQITS+QlRSJfiOnaIVDMJCmOXyGI+QRq5BKXhkiTGLuIG/g8qn87Hc5m9/xlIKZ3fEAhzuaqIeVhyzLNsPxOG+vEuqL8Z2SBHtBPsfWGodvpT6Y3o+Uh1IbPv2TNE+T2kmvFX6dmH+hYRkAshwAZboGasE+wTXVAdCAKFcUDpebCUNUFNrRds4RZwDHekN2YLhYAq4hKEljOBAl7aEZTMaXibUDE3Supci8hAMA3dLHQgBMj5EGBnglAUaQZDSIQKuxsoLQ/2/raMC8MdYCHcK6SW7xS/F19+urVq8Q1cxUQPsZ6EHHAn0gy2AP6rD6ztrVA/EQGL1ZMidVzg6RarmaOlte75fwtdg/c0QwXvA8fNLnBMRAA38YtkPv2DLNRy0PkRjjBz6Dl5a9EzwW0lWb9+neHSb1ByNQzaSAAINTvdkNPwana2KpYyOT1LchkY/D6o0nPbCtdzUNTdLOtCebkwa8mlv8sC4yg7ro3IL9oNHXJ7AVcxdHbGhcxCulvlanY6CIZWMUv6cGDHYG2bH3CUGcweowL20VaL9Mf9UEa4slRa4wZki81ulq49ADjGDsnVOCY1yPOy2hAQoVojrDQa3XVms/jaEzDKdRuCmVPqeai83gvn2waggz2ZajB6rjXkNLyZGadcdn95BT+7Zm9bACpLhF2BoueCUKMTYG7qDsCjWegTf4fGYs+pNFiaMULF3tYd96dfLvb6QNeeedZ27LyJ5HSk0QfHmROQjE3Aytw9SC3EQKgKLZN59LeZBst1fkWgbBzrC25orNXMpRMJ63+2PtC3+qGuuAnmp8bS4GRsApbjd2Fs4DLU61yZrKWgCukDuJaNF/VmZlpzuhlWnyvLBNC1ZVzYiYwhP9gMLrg7cnUNmnyshT/HwIbwsY2HSYHzR1LNxo1eX2r9bBtFX+Zm2gaInQ1CRb0XHCYPTF3PhiZjE5B4MA7VBWwia7yqC499jCPM+YpSIb7TDKUSHXF6oVbvgg5XFyxOP7F3s/4aHwIbyk/LXBsKBZF77MMqHbfW6bqwmCq1NS2YGE/K6PFBsccHJsYDlXVeqDE3gU3vgm5fN8RujWwJTD5Wf2tvsk7DN8qCpUO9vML1cLWxcISNU/mMxqJkjlgQbt5XK0KvKwQX2zpheuzKtrBVzd4ZlbKd+0XZ+L4sGEcYX7Hbu6IPiinpyiSUzv3rjtgv6jTC3PjZCMRGe2B2rA/mJy9BYmZreyXFJ6Nw1OSJW9Xcz7JQWx73Fqmkl6q07DyupkcsefTnWY7k019bUW72bPOJlZnhnswGoqfg7/tRWeho/4WUQyvEbQiPyUIzzcXsIwtZkjhIf7nlS5IrucxeO8a32jXCwkk+vDzU0wnT0Yswd+96utZT0Wtp6OTwFbCquQdUvvMzxW4GeZD+wFLAqh1aoceOCbesKD9jxfhJq4qbOdd6ail2e0Sq633Fi4papfMdG8rfaGfaF+yY8IjKoz99YXDpL49NzR22Ifx0TQGNvzDwakgf92az+ZX1P/4DANfHS8BXhxEAAAAASUVORK5CYII=" alt="messaging-">-->

            </NuxtLink>
<!--            <NuxtLink to="/study/pinia" class="inline-flex items-center px-3 py-2 text-base  text-gray-600 dark:text-gray-200 hover:text-gray-800 dark:hover:text-white hover:scale-105 transition-all duration-200 relative after:absolute after:bottom-0 after:left-1/2 after:right-1/2 after:h-0.5 after:bg-gradient-to-r after:from-transparent after:via-primary after:to-transparent hover:after:left-0 hover:after:right-0 after:transition-all after:duration-300">-->
<!--              /study/pinia-->
<!--            </NuxtLink>-->
            <NuxtLink to="/tools" class="inline-flex items-center px-3 py-2 text-base  text-gray-600 dark:text-gray-200 hover:text-gray-800 dark:hover:text-white hover:scale-105 transition-all duration-200 relative after:absolute after:bottom-0 after:left-1/2 after:right-1/2 after:h-0.5 after:bg-gradient-to-r after:from-transparent after:via-primary after:to-transparent hover:after:left-0 hover:after:right-0 after:transition-all after:duration-300">
              工具
<!--              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="2em" height="2em" viewBox="0 0 64 64">-->
<!--                <path fill="#f9dd8f" d="M3 31H61V55H3z"></path><path fill="#efc88e" d="M3 51H61V55H3zM3 31H61V35H3z"></path><path fill="#ed7899" d="M9.83,14.17,4.17,19.83A4,4,0,0,0,3,22.66V29a2,2,0,0,0,2,2H59a2,2,0,0,0,2-2V22.66a4,4,0,0,0-1.17-2.83l-5.66-5.66A4,4,0,0,0,51.34,13H12.66A4,4,0,0,0,9.83,14.17Z"></path><path fill="#f283a5" d="M58,18l-3.83-3.83A4,4,0,0,0,51.34,13H12.66a4,4,0,0,0-2.83,1.17L6,18Z"></path><path fill="#c2cde7" d="M43 29H51V35H43zM13 29H21V35H13z"></path><path fill="#8d6c9f" d="M60.54,19.12l-2.83-2.83h0l-2.83-2.83A5,5,0,0,0,51.34,12H42V10.83a3,3,0,0,0-.88-2.12L39.29,6.88A3,3,0,0,0,37.17,6H26.83a3,3,0,0,0-2.12.88L22.88,8.71A3,3,0,0,0,22,10.83V12H12.66a5,5,0,0,0-3.54,1.46L6.29,16.29h0L3.46,19.12A5,5,0,0,0,2,22.66V53a3,3,0,0,0,3,3H59a3,3,0,0,0,3-3V22.66A5,5,0,0,0,60.54,19.12ZM24,10.83a1,1,0,0,1,.29-.71l1.83-1.83A1,1,0,0,1,26.83,8H37.17a1,1,0,0,1,.71.29l1.83,1.83a1,1,0,0,1,.29.71V12H24ZM4.88,20.54l1.19-1.19A1,1,0,0,0,8,19V17.41l2.54-2.54A3,3,0,0,1,12.66,14H51.34a3,3,0,0,1,2.12.88L56,17.41V19a1,1,0,0,0,1.93.34l1.19,1.19A3,3,0,0,1,60,22.66V30H52a2,2,0,0,0-2-2H44a2,2,0,0,0-2,2H22a2,2,0,0,0-2-2H14a2,2,0,0,0-2,2H4V22.66A3,3,0,0,1,4.88,20.54ZM50,34H44V30h6ZM20,34H14V30h6ZM60,53a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V32h8v2a2,2,0,0,0,2,2h6a2,2,0,0,0,2-2V32H42v2a2,2,0,0,0,2,2h6a2,2,0,0,0,2-2V32h8Z"></path><path fill="#8d6c9f" d="M17 20a1 1 0 0 0 1-1V17a1 1 0 0 0-2 0v2A1 1 0 0 0 17 20zM12 20a1 1 0 0 0 1-1V17a1 1 0 0 0-2 0v2A1 1 0 0 0 12 20zM32 20a1 1 0 0 0 1-1V17a1 1 0 0 0-2 0v2A1 1 0 0 0 32 20zM22 20a1 1 0 0 0 1-1V17a1 1 0 0 0-2 0v2A1 1 0 0 0 22 20zM27 20a1 1 0 0 0 1-1V17a1 1 0 0 0-2 0v2A1 1 0 0 0 27 20zM37 20a1 1 0 0 0 1-1V17a1 1 0 0 0-2 0v2A1 1 0 0 0 37 20zM52 20a1 1 0 0 0 1-1V17a1 1 0 0 0-2 0v2A1 1 0 0 0 52 20zM42 20a1 1 0 0 0 1-1V17a1 1 0 0 0-2 0v2A1 1 0 0 0 42 20zM47 20a1 1 0 0 0 1-1V17a1 1 0 0 0-2 0v2A1 1 0 0 0 47 20zM49 50H7a1 1 0 0 0 0 2H49a1 1 0 0 0 0-2zM52 51a1 1 0 0 0 1 1h4a1 1 0 0 0 0-2H53A1 1 0 0 0 52 51z"></path>-->
<!--              </svg>-->
            </NuxtLink>

            <BaseDropdown  class="inline-flex items-center px-3 py-2 text-base  text-gray-600 dark:text-gray-200 hover:text-gray-800 dark:hover:text-white hover:scale-105 transition-all duration-200 relative after:absolute after:bottom-0 after:left-1/2 after:right-1/2 after:h-0.5 after:bg-gradient-to-r after:from-transparent after:via-primary after:to-transparent hover:after:left-0 hover:after:right-0 after:transition-all after:duration-300">
              百宝箱
<!--              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAENElEQVR4nO2Wy28bVRTGLbFBILFBsGbLFoT4B5BYsWDBmh0Cao/T+NG8aseu2zzmbTuZ2HPPmbyaF3VaiaYNeTQijdqkEqCKskJIrSoQUiHlUVIapHzojh03wa8qwK4j/TQzvud8n8+Ze+9MIPD0CAQC6ofjLxvH+DVNGX393yA17BC91LKpuWNjL1phb91WvN+cKP/8XyC1LIWX7dDECw2N7TBfnU3S7kZWYCPXmHVb4NIAYcVoHie5mhOYStAjS+HLdU3Nj8ZezR3nX1oJLQ4ShiOM2dNFiC7CeA/74q3Mc230qxn2Xqkx1oPcM9NLj5oKZAWcGOPbS1nc3zSwfd1AabCIUoZaVj6VEA/1oBeprThMN7mT8UkvNeRsD2E4Svichqss2CMoxisxKcJ6VuBCpnwvz/Je/i61DYW/rDHWQrymKx60hNuYkwJaXECP0SG0DuGPq0kXqjECLV2JT5fv1YQLXWGoIW+pxnjuvblntCDv6N2V4EYMFGAlBMxeF6rWJO4AWpeAHuKH0qPuBFND4+/oQW9PzRSg9hdrSbuwIx6+uCiwOkHIdzG0tICaKZapk6NlipCaZnjs7YbLqfBB4Tkt5O3oMYYeP4zd7sFLMbYuEHDP9ZnTGV6aQUkPIx0e7KgHO+ZBjx7IlVoh74/k+96zDY3N8Gin0S0e2HkX+2R7GXaEMdnPVcN6/PWDi82SwM1FAbeHYQ+IqobZSQ/UIEXqtzky/rym8H3brJgaLqyTBE4xfv9O4M+7jU3/yfdfCeRPMCy1bG6ZLrQQb8uO1hgbIRZ6lHfNFMFMEqw2RslkrE0Sbpwvc22OMG8z5s3DXC5yNUaydZ7w6RAjH2NY3QSpqUV4Vw9yobbNCm+NtVjHE10M6jq8jpcdx99UmuVJpLap0FaNsd1Giwt9zXcgOX5uoOjvWpuTedxZsXF31ULxROuda6GPID1qjK0wXSmlGZ9p1JDSKcbsmbJxvp39im8vWyjEm+f5uWmG9KjTau8bJ+LBjTemEPMwFGH8tGH4LZZ79rWJIQxHuWmeRGpLjyO1WjKbIowlBG6czWO14PhvqlVTHL3V9hMaSy72EWaS7G/+a1br+KbG2eN824kRppICVyov+BWd/GrWc+UXvy8wQP77dcWQHwLl64XKmIyRsav+WFlD5k8lCU6UIT1qjPNRund9YghrruM/RzkhZnoJ51KEZZ1QiLIvJAWkmFwic6nytVMZkzEyVubMJhlLqvC11oQDqS096hrfms/5M1aenShhyRCPKx7cr6r8RbGii8cV91fGBisVm8LPlX/o6/lsVTPfylgyfcr1n+WTPL+686CfMJ1xq3q3Ghnn2vnH0YSL6dPFPUmxg/aGIrwj4rx9FPLt3o7U2NcbTbiQHjXG6sf0phGk+EF0hd41gvTWUajkHtI7oxTeqDF+egT+5+NvR4e+UZBRm2kAAAAASUVORK5CYII=" alt="treasure-chest">-->


<!--              <img width="30px" height="30px" src="data:image/png;base64,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" alt="treasure-map">-->

              <template #dropdown>
<!--                <NuxtLink to="/natureSound" class="inline-flex items-center px-3 py-2 text-base  text-gray-600 dark:text-gray-200 hover:text-gray-800 dark:hover:text-white hover:scale-105 transition-all duration-200 relative after:absolute after:bottom-0 after:left-1/2 after:right-1/2 after:h-0.5 after:bg-gradient-to-r after:from-transparent after:via-primary after:to-transparent hover:after:left-0 hover:after:right-0 after:transition-all after:duration-300">-->

<!--                </NuxtLink>-->
                <BaseDropdownItem >
                  <NuxtLink to="/natureSound" >
                    自然声音
                  </NuxtLink>
                </BaseDropdownItem>
                <BaseDropdownItem >
                  <NuxtLink to="/friendLinks" >
                    友人链接
                  </NuxtLink>
                </BaseDropdownItem>
                <BaseDropdownItem >
                  <NuxtLink to="/nav" >
                    导航
                  </NuxtLink>
                </BaseDropdownItem>
              </template>
            </BaseDropdown>


          </div>
        </div>

        <!-- 右侧按钮组 -->
        <div class="flex items-center space-x-4">
          <!-- 搜索按钮 -->
          <button @click="toggleSearchDialog" class="p-1 rounded-full text-gray-600 dark:text-gray-200 hover:text-gray-800 dark:hover:text-white hover:scale-110 transform transition-all duration-300 ease-out">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <path d="M18 18L21 21"/>
            </svg>
          </button>
          <!-- 暗黑模式切换按钮 -->
          <BaseThemeSwitch></BaseThemeSwitch>
<!--          <button @click="toggleDarkMode(isDarkMode)" class="p-1 rounded-full text-gray-600 dark:text-gray-200 hover:text-gray-800 dark:hover:text-white hover:scale-110 transform transition-all duration-300 ease-out">-->
<!--            <svg v-if="isDarkMode" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">-->
<!--              <circle cx="12" cy="12" r="5"/>-->
<!--              <path d="M12 1v2"/>-->
<!--              <path d="M12 21v2"/>-->
<!--              <path d="M4.22 4.22l1.42 1.42"/>-->
<!--              <path d="M18.36 18.36l1.42 1.42"/>-->
<!--              <path d="M1 12h2"/>-->
<!--              <path d="M21 12h2"/>-->
<!--              <path d="M5.64 18.36l-1.42 1.42"/>-->
<!--              <path d="M19.78 4.22l-1.42 1.42"/>-->
<!--            </svg>-->
<!--            <svg v-else class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">-->
<!--              <path d="M12 2a7 7 0 0 0 10 10 10 10 0 1 1-10-10z"/>-->
<!--            </svg>-->
<!--          </button>-->

          <!-- 用户登录区域 -->
          <div class="relative">
            <ClientOnly>
              <!-- 未登录状态 -->
              <NuxtLink v-if="!userInfo" to="/login" class="p-2 rounded-full text-gray-600 dark:text-gray-200 hover:text-gray-800 dark:hover:text-white hover:scale-110 transform transition-all duration-300 ease-out">
                <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
              </NuxtLink>

              <!-- 已登录状态 -->
              <div v-else class="relative group user-menu">
                <button @click="toggleUserMenu" class="flex items-center space-x-2 focus:outline-none group-hover:scale-105 transition-transform duration-300">
                  <img :src="userInfo?.avatar || 'https://oss.ideaflow.top/configImg/default-avatar.webp'" alt="用户头像" class="w-8 h-8 rounded-full object-cover ring-2 ring-white/30 dark:ring-gray-700/30 transform group-hover:ring-blue-500/50 dark:group-hover:ring-blue-400/50 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <span class="hidden md:block text-sm  text-gray-700 dark:text-gray-200 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300">{{ userInfo?.username }}</span>
                </button>

                <!-- 用户菜单 -->
                <div v-if="isUserMenuOpen"  @click="toggleUserMenu" class="absolute right-0 mt-2 w-48  bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-lg py-2 ring-1 ring-black/5 transform origin-top-right transition-all duration-200 ease-out">
                  <NuxtLink to="/profile" class="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-white/50 dark:hover:bg-white/10 flex items-center space-x-2 transition-colors duration-150">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>个人中心</span>
                  </NuxtLink>
                  <div class="h-px bg-gray-200/50 dark:bg-gray-700/50 mx-2 my-1"></div>
                  <button @click="handleLogout" class="w-full text-left px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-900/20 flex items-center space-x-2 transition-colors duration-150">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>退出登录</span>
                  </button>
                </div>
              </div>
            </ClientOnly>
          </div>

          <!-- 移动端菜单按钮 -->
          <button @click="toggleMobileMenu" class="sm:hidden p-2 rounded-full text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white backdrop-blur-lg bg-white/10 dark:bg-white/5 shadow-sm hover:shadow-md hover:scale-110 hover:bg-white/20 dark:hover:bg-white/10 transform transition-all duration-300 ease-out">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 移动端菜单抽屉 -->
    <BaseDrawer
      v-model="isMobileMenuOpen"
      title="菜单"
      placement="left"
      :width="'55%'"
    >
      <div class="pt-2 pb-3 space-y-1">
        <NuxtLink to="/" class="block px-4 py-2.5 text-base  text-gray-700 dark:text-gray-200 hover:bg-white/50 dark:hover:bg-white/10 transition-colors duration-150">
          首页
        </NuxtLink>
        <NuxtLink to="/archive" class="block px-4 py-2.5 text-base  text-gray-700 dark:text-gray-200 hover:bg-white/50 dark:hover:bg-white/10 transition-colors duration-150">
          素笺存忆
        </NuxtLink>
        <NuxtLink to="/hotSearch" class="block px-4 py-2.5 text-base  text-gray-700 dark:text-gray-200 hover:bg-white/50 dark:hover:bg-white/10 transition-colors duration-150">
          热搜
        </NuxtLink>
        <NuxtLink to="/im" class="block px-4 py-2.5 text-base  text-gray-700 dark:text-gray-200 hover:bg-white/50 dark:hover:bg-white/10 transition-colors duration-150">
          聊天室
        </NuxtLink>
        <NuxtLink to="/tools" class="block px-4 py-2.5 text-base  text-gray-700 dark:text-gray-200 hover:bg-white/50 dark:hover:bg-white/10 transition-colors duration-150">
          工具
        </NuxtLink>

        <BaseDropdown  class="inline-flex items-center px-3 py-2 text-sm  text-gray-600 dark:text-gray-200 hover:text-gray-800 dark:hover:text-white hover:scale-105 transition-all duration-200">
          百宝箱
          <template #dropdown>
            <BaseDropdownItem >
              <NuxtLink to="/natureSound" >
                自然声音
              </NuxtLink>
            </BaseDropdownItem>
            <BaseDropdownItem >
              <NuxtLink to="/friendLinks" >
                友人链接
              </NuxtLink>
            </BaseDropdownItem>
            <BaseDropdownItem >
              <NuxtLink to="/nav" >
                导航
              </NuxtLink>
            </BaseDropdownItem>
          </template>
        </BaseDropdown>

        <!-- 移动端用户菜单 -->
        <ClientOnly>
          <template v-if="userInfo">
            <NuxtLink to="/profile" class="block px-4 py-2.5 text-base  text-gray-700 dark:text-gray-200 hover:bg-white/50 dark:hover:bg-white/10 transition-colors duration-150 flex items-center space-x-2">
              <img :src="userInfo?.avatar || 'https://oss.ideaflow.top/configImg/default-avatar.webp'" alt="用户头像" class="w-6 h-6 rounded-full ring-1 ring-white/30 dark:ring-gray-700/30">
              <span>{{ userInfo?.username }}</span>
            </NuxtLink>
            <button @click="handleLogout" class="w-full text-left px-4 py-2.5 text-base  text-red-600 dark:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-900/20 transition-colors duration-150">
              退出登录
            </button>
          </template>
          <template v-else>
            <NuxtLink to="/login" class="block px-4 py-2.5 text-base  text-blue-600 dark:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors duration-150">
              登录
            </NuxtLink>
          </template>
        </ClientOnly>
      </div>
    </BaseDrawer>

    <!-- 搜索对话框 -->
    <BaseDialog v-model="isSearchDialogOpen" title="搜索文章" :show-footer="false">
      <BlogSearch />
    </BaseDialog>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {logout} from "~/remote/auth";
import {useAppStore} from "~/stores/app";

const route = useRoute()
const appStore = useAppStore()

const isArticleMenuOpen = ref(false)
const isMobileMenuOpen = ref(false)
const isMobileArticleMenuOpen = ref(false)
const isUserMenuOpen = ref(false)
const isVisible = ref(true)
const lastScrollY = ref(0)
const isHovered = ref(false)
const isScrolledPastHero = ref(false)
const isSearchDialogOpen = ref(false)

const isDarkMode = computed(() => appStore.getIsDark)
const userInfo = computed(() => appStore.userInfo)

const mobile = computed(() => appStore.mobile)

// 判断是否是需要导航栏覆盖的页面（首页和文章详情页）
const isOverlayPage = computed(() => {
  return route.path === '/' || route.path.startsWith('/article/') || route.path.startsWith('/store')
})

const handleScroll = () => {
  const currentScrollY = window.scrollY
  isVisible.value = currentScrollY === 0 || (currentScrollY < lastScrollY.value)
  lastScrollY.value = currentScrollY
  
  // 检查是否滚动超过头部横幅区域
  const heroHeight = 600 // 假设头部横幅高度为600px，根据实际情况调整
  isScrolledPastHero.value = currentScrollY > heroHeight
}


const toggleArticleMenu = () => {
  isArticleMenuOpen.value = !isArticleMenuOpen.value
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const toggleMobileArticleMenu = () => {
  isMobileArticleMenuOpen.value = !isMobileArticleMenuOpen.value
}

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value
}

const toggleSearchDialog = () => {
  isSearchDialogOpen.value = !isSearchDialogOpen.value
}

const handleLogout = () => {
  appStore.clearUserInfo()
  isUserMenuOpen.value = false
  logout()
  navigateTo('/login')
}

// 添加滚动监听
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement
    if (!target.closest('.user-menu')) {
      isUserMenuOpen.value = false
    }
    if (!target.closest('.article-menu')) {
      isArticleMenuOpen.value = false
    }
  })

})

// 移除滚动监听
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})


// console.log("执行--appStore.clearUserInfo()")
// appStore.clearUserInfo()
</script>

<style scoped>

</style>