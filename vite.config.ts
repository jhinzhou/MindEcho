/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { presetUno, presetAttributify, presetIcons } from 'unocss'
import Unocss from './config/unocss'
const postcssPresetEnv = require('postcss-preset-env')
// https://vitejs.dev/config/
const rollupOptions = {
  external: ['vue', 'vue-router'],
  output: {
    globals: {
      vue: 'Vue'
    }
  }
}

export default defineConfig({
  // 添加哭模式配置
  build: {
    cssCodeSplit: true, // 追加
    rollupOptions,
    minify: 'terser', // boolean | 'terser' | 'esbuild'
    lib: {
      entry: './src/entry.ts',
      name: 'MindEchoUI',
      fileName: 'mindecho-ui',
      // 导出模块格式
      formats: ['es', 'umd', 'iife']
    },
    sourcemap: true // 输出单独 source文件
  },
  test: {
    global: true,
    environment: 'happy-dom',
    // 支持tsx组件
    transformMode: {
      web: [/.[tj]sx$/]
    }
  },
  server: {
    hmr: {
      overlay: false
    }
  },
  plugins: [
    // 添加UnoCSS插件
    Unocss({
      presets: [presetUno(), presetAttributify(), presetIcons()]
    }),
    // 添加JSX插件
    vueJsx({}),
    Unocss(),
    vue()
  ],
  css: {
    postcss: {
      plugins: [postcssPresetEnv()]
    }
  }
})
