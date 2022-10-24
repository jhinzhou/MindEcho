---
title: 组件文档
---

1. 安装`Vitepress`

```
pnpm i vitepress -D
```

2. 新建`/docs/vite.config.ts`文件

```ts
import { defineConfig } from "vite";
import jsx from "@vitejs/plugin-vue-jsx";
import css from "../config/unocss";

export default defineConfig({
  plugins: [jsx(), css()],
  server: {
    port: 5000,
  },
});
```

3. 新建`/docs/index.md`文件

```md
# Vite UI
```

4. 修改`/package.json`文件，添加启动脚本

```json
{
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:serve": "vitepress serve docs"
  }
}
```

5. 运行启动命令，访问`localhost:5000`

```
pnpm docs:dev
```

6. 新建`/docs/.vitepress/config.ts`文件，添加配置，重启访问

```ts
import { defineConfig } from "vitepress";

const config = defineConfig({
  themeConfig: {
    sidebar: [
      {
        text: "组件",
        items: [
          { text: "快速开始", link: "/" },
          {
            text: "通用",
            items: [{ text: "Button 按钮", link: "/components/button/" }],
          },
          { text: "导航", link: "/nav" },
          { text: "反馈", link: "/feedback" },
          { text: "数据录入", link: "/input" },
          { text: "数据展示", link: "/output" },
          { text: "布局", link: "/layout" },
        ],
      },
    ],
  },
});

export default config;
```

7. 新建`/docs/.vitepress/theme/index.ts`文件，添加组件

```ts
import { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import ViteUI from "../../../src/entry";
import 'uno.css'

const themeConfig: Theme = {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(ViteUI);
  },
};

export default themeConfig;
```

8. 修改`/docs/index.md`文件，使用导入的组件，重启访问

```md
# Vite UI

<div style="margin-bottom:20px;">
  <JSXButton color="blue">主要按钮</JSXButton>
  <JSXButton color="green">绿色按钮</JSXButton>
  <JSXButton color="gray">灰色按钮</JSXButton>
  <JSXButton color="yellow">黄色按钮</JSXButton>
  <JSXButton color="red">红色按钮</JSXButton>
</div>
```
9. 安装`vitepress-theme-demoblock`，用于组件示例
```
pnpm i vitepress-theme-demoblock@1.0.0-alpha.10 -D
```
10. 修改`/docs/.vitepress/config.ts`文件，使用该插件
```ts
import { defineConfig } from "vitepress";
import { demoBlockPlugin } from "vitepress-theme-demoblock";

const config = defineConfig({
  themeConfig: {
    sidebar: [
      {
        text: "组件",
        items: [
          { text: "快速开始", link: "/" },
          {
            text: "通用",
            items: [{ text: "Button 按钮", link: "/components/button/" }],
          },
          { text: "导航", link: "/nav" },
          { text: "反馈", link: "/feedback" },
          { text: "数据录入", link: "/input" },
          { text: "数据展示", link: "/output" },
          { text: "布局", link: "/layout" },
        ],
      },
    ],
  },
  markdown: {
    config: (md) => {
      md.use(demoBlockPlugin);
    },
  },
});

export default config;
```
11. 修改`/docs/.vitepress/theme/index.ts`文件，注册组件
```ts
import { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import ViteUI from "../../../src/entry";
import "vitepress-theme-demoblock/theme/styles/index.css";
import Demo from "vitepress-theme-demoblock/components/Demo.vue";
import DemoBlock from "vitepress-theme-demoblock/components/DemoBlock.vue";

const themeConfig: Theme = {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(ViteUI);
    app.component('Demo', Demo);
    app.component('DemoBlock', DemoBlock);
  },
};

export default themeConfig;
```
12. 修改`/docs/index.md`文件，添加组件示例，重启访问
```md
:::demo 使用`size`、`color`、`pain`、`round`属性来定义 Button 的样式。
#```vue
<template>
 <div style="display: flex; gap: 16px; margin-bottom:20px;">
  <JSXButton color="blue">主要按钮</JSXButton>
  <JSXButton color="green">绿色按钮</JSXButton>
  <JSXButton color="gray">灰色按钮</JSXButton>
  <JSXButton color="yellow">黄色按钮</JSXButton>
  <JSXButton color="red">红色按钮</JSXButton>
 </div>
#```
:::
```