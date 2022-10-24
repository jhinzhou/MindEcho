---
title: 组件打包
---

1. 新建`/src/entry.ts`文件

```ts
import Button from "./button/index";
import SFCButton from "./SFCButton/index.vue";
import JSXButton from "./JSXButton/index";
import { App } from "vue";

export { Button, SFCButton, JSXButton };

export default {
  install(app: App) {
    app.component(Button.name, Button);
    app.component(SFCButton.name, SFCButton);
    app.component(JSXButton.name, JSXButton);
  },
};
```

2. 修改`/vite.config.ts`文件，添加打包配置

```ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import jsx from "@vitejs/plugin-vue-jsx";

const rollupOptions = {
  external: ["vue", "vue-router"],
  output: {
    globals: {
      vue: "Vue",
    },
  },
};

export default defineConfig({
  plugins: [vue(), jsx()],
  build: {
    rollupOptions,
    minify: false,
    lib: {
      entry: "./src/entry.ts",
      name: "ViteUI",
      fileName: "vite-ui",
      formats: ["es", "umd", "iife"],
    },
  },
});
```

3. 修改`/package.json`文件，添加打包脚本

```json
{
  "scripts": {
    "build": "vite build"
  }
}
```

4. 执行打包命令，会生成`/dist`文件夹

```
pnpm build
```

5. 创建`/demo/esm/index.html`文件，重启访问`http://localhost:5173/demo/esm/index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite UI Demo</title>
  </head>
  <body>
    <h1>Full Import</h1>
    <div id="app"></div>
    <script type="module">
      import { createApp } from "vue/dist/vue.esm-bundler.js";
      import ViteUI from "../../dist/vite-ui.mjs";

      const rootComponent = {
        template: `<VButton /> <SFCButton /> <JSXButton />`,
      };
      createApp(rootComponent).use(ViteUI).mount("#app");
    </script>
  </body>
</html>
```

6. 创建`/demo/esm/button.html`文件，重启访问`http://localhost:5173/demo/esm/button.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite UI Button Demo</title>
  </head>
  <body>
    <h1>Single Import</h1>
    <div id="app"></div>
    <script type="module">
      import { createApp } from "vue/dist/vue.esm-bundler.js";
      import { SFCButton, JSXButton, Button } from "../../dist/vite-ui.mjs";

      createApp({
        template: `<VButton/> <JSXButton/> <SFCButton/>`,
      })
        .component(SFCButton.name, SFCButton)
        .component(JSXButton.name, JSXButton)
        .component(Button.name, Button)
        .mount("#app");
    </script>
  </body>
</html>
```