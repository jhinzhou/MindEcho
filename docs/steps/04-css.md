---
title: 组件样式
---

1. 安装`unocss`(样式库)和`@iconify-json/ic`(图标库)

```
pnpm i unocss @iconify-json/ic -D
```

2. 修改`/vite.config.ts`文件，添加到 Vite 插件中

```ts
import css from "unocss/vite";
import { presetUno, presetAttributify, presetIcons } from "unocss";

export default defineConfig({
  plugins: [
    css({ presets: [presetUno(), presetAttributify(), presetIcons()] }),
  ],
});
```

3. 修改`/src/JSXButton/index.tsx`文件，添加样式类

```tsx
import { defineComponent } from "vue";
import "uno.css";

export default defineComponent({
  name: "JSXButton",
  setup(props, { slots }) {
    return () => (
      <button
        class={`
          py-2
          px-4
          font-semibold
          text-white
          bg-green-500
          hover:bg-green-700
          border-none
          rounded
          font-semibold
          cursor-pointer
        `}
      >
        {slots.default ? slots.default() : ""}
      </button>
    );
  },
});
```

4. 修改`/src/index.ts`文件，引入修改后的组件，重启访问

```ts
import { createApp } from "vue/dist/vue.esm-browser";
import ViteUI from "./entry";

createApp({ template: `<JSXButton>普通按钮</JSXButton>` })
  .use(ViteUI)
  .mount("#app");
```

5. 修改`/src/JSXButton/index.tsx`文件，添加组件颜色属性

```tsx
import { defineComponent, PropType } from "vue";
import "uno.css";

export type IColor =
  | "black"
  | "gray"
  | "red"
  | "yellow"
  | "green"
  | "blue"
  | "indigo"
  | "purple"
  | "pink";

export const JSXButtonProps = {
  color: {
    type: String as PropType<IColor>,
    default: "blue",
  },
};

export default defineComponent({
  name: "JSXButton",
  props: JSXButtonProps,
  setup(props, { slots }) {
    return () => (
      <button
        class={`
      py-2
      px-4
      font-semibold
      text-white
      bg-${props.color}-500
      hover:bg-${props.color}-700
      border-none
      rounded
      font-semibold
      cursor-pointer
    `}
      >
        {slots.default ? slots.default() : ""}
      </button>
    );
  },
});
```

6. 此时颜色不生效，新建`/config/unocss.ts`文件

```ts
import { presetUno, presetAttributify, presetIcons } from "unocss";
import Unocss from "unocss/vite";

const colors = [
  "white",
  "black",
  "gray",
  "red",
  "yellow",
  "green",
  "blue",
  "indigo",
  "purple",
  "pink",
];

const safelist = [
  ...colors.map((v) => `bg-${v}-500`),
  ...colors.map((v) => `hover:bg-${v}-700`),
];

export default () => {
  return Unocss({
    safelist,
    presets: [presetUno(), presetAttributify(), presetIcons()],
  });
};
```

7. 修改`/vite.config.ts`文件，更新插件的引入方式，重启访问

```ts
import css from "./config/unocss";

export default defineConfig({
  plugins: [css()],
});
```

8. 修改`/config/unocss.ts`文件，添加安全的图标列表

```ts
const icones = [
  "search",
  "edit",
  "check",
  "message",
  "star-off",
  "delete",
  "add",
  "share",
];

const safelist = [
  // ...
  ...icones.map((v) => `i-ic-baseline-${v}`),
];
```

9. 修改`/src/JSXButton/index.tsx`文件，添加图标属性

```tsx
export type IIcon =
  | "search"
  | "edit"
  | "check"
  | "message"
  | "star-off"
  | "delete"
  | "add"
  | "share";

export const JSXButtonProps = {
  //...
  icon: {
    type: String as PropType<IIcon>,
  },
};

export default defineComponent({
  name: "JSXButton",
  props: JSXButtonProps,
  setup(props, { slots }) {
    return () => (
      <button class={/* .. */}>
        {props.icon && <i class={`i-ic-baseline-${props.icon} p-3`}></i>}
        {slots.default ? slots.default() : ""}
      </button>
    );
  },
});
```

10. 编辑`/src/index.ts`文件，导入修改后的组件

```ts
import { createApp } from "vue/dist/vue.esm-browser";
import ViteUI from "./entry";

createApp({
  template: `
    <div style="display: flex; gap: 16px; margin-top: 24px;">
      <JSXButton icon="search" >搜索图标</JSXButton>
      <JSXButton icon="edit" >编辑图标</JSXButton>
      <JSXButton icon="check" >检查图标</JSXButton>
      <JSXButton icon="message" >消息图标</JSXButton>
      <JSXButton icon="delete" >删除图标</JSXButton>
    </div>
  `,
})
  .use(ViteUI)
  .mount("#app");
```

11. 此时打包会出错，修改`/vite.config.ts`文件，单独导出 css

```ts
export default defineConfig({
  build: {
    // ...
    cssCodeSplit: true,
  },
});
```

12. 运行打包命令，`/dist`目录下会生成`assets/entry.xxx.css`

```
pnpm build
```

13. 修改`/demo/esm/index.html`文件，导入样式和修改组件调用方式

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite UI Demo</title>
    <link rel="stylesheet" href="../../dist/assets/entry.c7412cfc.css" />
  </head>
  <body>
    <h1>Full Import</h1>
    <div id="app"></div>
    <script type="module">
      import { createApp } from "vue/dist/vue.esm-bundler.js";
      import ViteUI from "../../dist/vite-ui.mjs";

      const rootComponent = {
        template: `<VButton /> <SFCButton /> <JSXButton type="red" icon="search">测试按钮</JSXButton>`,
      };
      createApp(rootComponent).use(ViteUI).mount("#app");
    </script>
  </body>
</html>
```