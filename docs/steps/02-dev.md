---
title: 组件开发
---

1. 安装 Vue，添加对 Vue 的支持

```
pnpm i vue -D
```

2. 新建`/src/button/index.ts`，编写一个使用`render`的组件

```ts
import { defineComponent, h } from "vue";

export default defineComponent({
  name: "VButton",
  render() {
    return h("button", null, "My Button");
  },
});
```

3. 修改`/src/index.ts`文件，创建 Vue 应用并引入组件，重启访问

```ts
import { createApp } from "vue";
import VButton from "./button/index";

createApp(VButton).mount("#app");
```

4. 安装`@vitejs/plugin-vue`，添加对`.vue`文件的支持

```
pnpm i @vitejs/plugin-vue -D
```

5. 新建`/vite.config.ts`文件，将其添加到 Vite 插件中

```ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
});
```

6. 新建`/src/SFCButton/index.vue`文件

```vue
<template>
  <button>SFC Button</button>
</template>
<script lang="ts">
export default {
  name: "SFCButton",
};
</script>
```

7. 修改`/src/index.ts`文件，引入创建的 SFC 组件

```ts
import { createApp } from "vue";
import SFCButton from "./SFCButton/index.vue";

createApp(SFCButton).mount("#app");
```

8. 此时有报错，新建`/src/shims-vue.d.ts`为`.vue`文件添加类型声明，重启访问

```ts
declare module ".vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<null, null, any>;
  export default component;
}
```

9. 安装`@vitejs/plugin-vue-jsx`，添加`.[t|j]sx`文件的支持

```
pnpm i @vitejs/plugin-vue-jsx -D
```

10. 修改`/vite.config.ts`，将其添加到 Vite 插件中

```ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import jsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
  plugins: [vue(), jsx()],
});
```

11. 新建`/src/JSXButton/index.tsx`文件

```ts
import { defineComponent } from "vue";

export default defineComponent({
  name: "JSXButton",
  render() {
    return <button>JSX Button</button>;
  },
});
```

12. 此时有报错，新建`/tsconfig.ts`文件为`.tsx`文件提供类型声明

```json
{
  "compilerOptions": {
    "declaration": true,
    "declarationDir": "./dist/types",
    "jsx": "preserve",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true
  },
  "include": ["./**/*.*", "./src/shims-vue.d.ts"],
  "exclude": ["node_modules"]
}
```

13. 修改`/src/index.ts`文件，引入 JSX 组件，重启访问

```ts
import { createApp } from "vue";
import JSXButton from "./JSXButton/index";

createApp(JSXButton).mount("#app");
```