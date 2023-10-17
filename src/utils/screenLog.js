/*
 * @Author: 王越
 * @date: Do not edit
 * @LastEditors: 王欣磊
 * @LastEditTime: 2021-07-12 17:01:08
 * @Description:
 * @FilePath: /vue-framework-min/src/utils/screenLog.js
 */
/* eslint-disable */
export const printANSI = () => {
  // console.clear()
  // ASCII - ANSI Shadow
  let text = `
  ╔═══════════════════════════════════════════════╗
  ║  __  __  ____    __       __       _____      ║
  ║ /\\ \\/\\ \\/\\  _\`\\ /\\ \\     /\\ \\     /\\  __\`\\    ║
  ║ \\ \\ \\_\\ \\ \\ \\L\\_\\ \\ \\    \\ \\ \\    \\ \\ \\/\\ \\   ║
  ║  \\ \\  _  \\ \\  _\\L\\ \\ \\  __\\ \\ \\  __\\ \\ \\ \\ \\  ║
  ║   \\ \\ \\ \\ \\ \\ \\L\\ \\ \\ \\L\\ \\\\ \\ \\L\\ \\\\ \\ \\_\\ \\ ║
  ║    \\ \\_\\ \\_\\ \\____/\\ \\____/ \\ \\____/ \\ \\_____\\║
  ║     \\/_/\\/_/\\/___/  \\/___/   \\/___/   \\/_____/║
  ╚═══════════════════════════════════════════════╝
\t\t\t\t\tPublished ${APP_VERSION}-${GIT_HASH} @ yudian
\t\t\t\t\tBuild date: ${BUILD_DATE}`
  console.log(`%c${text}`, 'color: #fc4d50')
}
