---
title: 组件测试
---
1. 安装以下3个依赖
```
pnpm i vitest happy-dom @vue/test-utils -D
```
2. 修改`/vite.config.ts`文件，添加测试配置
```ts
/// <reference types="vitest" />

export default defineConfig({
  // ...
  test: {
    globals: true,
    environment: 'happy-dom',
    transformMode: {
      web: [/.[tj]sx$/]
    }
  }
});
```
3. 新建`/src/JSXButton/__tests__/JSXButton.spec.ts`文件，添加测试用例
```ts
import { describe, expect, test } from "vitest";
import JSXButton from "..";
import { shallowMount } from '@vue/test-utils';

describe('Button', () => {
  test('mount @vue/test-utils', () => {
    const wrapper = shallowMount(JSXButton, {
      slots: {
        default: 'Button'
      }
    })
    expect(wrapper.text()).toBe('Button')
  })
})
```
4. 修改`package.json`文件，添加测试脚本
```json
{
  "scripts": {
    "test": "vitest"
  }
}
```
5. 运行测试命令，查看测试结果
```
pnpm test
```