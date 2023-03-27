import { createApp } from "vue/dist/vue.esm-browser";
import MindEchoUI from "./entry";
import "unocss";
import "@iconify-json/ic";

createApp({
  template: `
    <div>
        <span>请执行 pnpm docs:dev 运行文档</span>
    </div>
    `,
})
  .use(MindEchoUI)
  .mount("#app");
