---
title: 组件环境
---

1. 新建文件夹

```
mkdir vite-ui && cd vite-ui
```

2. 初始化项目

```
pnpm init -y(optional)
```

3. 安装 Vite

```
pnpm i vite@latest -D
```

4. 新建`/index.html`文件

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- ... -->
  </head>
  <body>
    <div id="app">Hello world</div>
  </body>
</html>
```

5. 启动 Vite，访问`localhost:5173`测试是否访问正常

```
npx vite
```

6. 新建`/src/index.ts`文件

```ts
const content: string = "Hello world from index.ts";
console.log(content);
```

7. 修改`/index.html`文件，访问浏览器控制台测试是否输出日志

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- ... -->
  </head>
  <body>
    <div id="app">Hello world</div>
    <script src="./src/index.ts" type="module"></script>
  </body>
</html>
```

8. 修改`/package.json`文件，添加启动脚本(后续可以通过`pnpm dev`使用)

```json
{
  "scripts": {
    "dev": "vite"
  }
}
```