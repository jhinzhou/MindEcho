---
title: 代码规范
---

1. 安装以下依赖，我也不太清楚干啥用的(虽然有别的方法，暂时先这样)
```
pnpm i eslint -D
# ESLint 专门解析 TypeScript 的解析器
pnpm i @typescript-eslint/parser -D
# 内置各种解析 TypeScript rules 插件
pnpm i @typescript-eslint/eslint-plugin -D

pnpm i eslint-formatter-pretty -D
pnpm i eslint-plugin-json -D
pnpm i eslint-plugin-prettier -D
pnpm i eslint-plugin-vue -D
pnpm i @vue/eslint-config-prettier -D
pnpm i babel-eslint -D
pnpm i prettier -D
```
2. 新建`/.eslintrc.cjs`文件，添加配置
```js
module.exports =   {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
    jest: true
  },
  globals: {
    ga: true,
    chrome: true,
    __DEV__: true
  },
  // 解析 .vue 文件
  parser: 'vue-eslint-parser',
  extends: [
    'plugin:json/recommended',
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/prettier'
  ],
  plugins: ['@typescript-eslint'],
  parserOptions: {
    parser: '@typescript-eslint/parser' // 解析 .ts 文件
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prettier/prettier': 'error'
  }
}
```
3. 新建`/.eslintignore`文件，添加忽略文件
```
*.sh
node_modules
lib
coverage
*.md
*.scss
*.woff
*.ttf
src/index.ts
dist
```
4. 修改`/package.json`文件，添加检查和格式化脚本
```json
{
  "scripts": {
    "lint": "eslint --fix --ext .ts,.vue src",
    "format": "prettier --write \"src/**/*.ts\" \"src/**/*.vue\"",
  },
}
```
5. 运行检查命令，查看检查结果
```
pnpm lint
```
6. 安装`husky`，用于定义`Git Hooks`
```
pnpm i husky -D
```
7. 通过以下命令，添加脚本到`/package.json`文件中
```
npm set-script prepare "husky install"
```
8. 添加Git声明周期钩子
```
mkdir .husky && npx husky add .husky/pre-commit "pnpm run lint"
```
9. 测试是否有效
```
git commit -m "feat: commint for lint test"
```
10. 执行命令，添加测试钩子
```
npx husky add .husky/pre-push "pnpm test:run"
```
11. 修改`/package.json`文件
```json
{
  "scripts": {
    "test:run": "vitest run",
  }
}
```
12. 安装以下依赖，用于检测提交信息
```
# 安装commitlint
pnpm i -d @commitlint/config-conventional@"17.0.2" @commitlint/cli@"17.0.2"

# Configure commitlint to use conventional config
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
```
13. 执行命令，添加测试钩子
```
npx husky add .husky/commit-msg "npx --no -- commitlint --edit \"$1\""
```