import { defineConfig } from 'vitepress'
import { demoBlockPlugin } from 'vitepress-theme-demoblock'

export default defineConfig({
  title: 'MindEcho',
  description: 'Just playing around.',
  base: '/MindEcho/',
  head: [
    [
      'link',
      { rel: 'icon', type: 'image/svg+xml', href: '/MindEcho-UI/logo2.svg' }
    ]
  ],
  themeConfig: {
    logo: '/logo2.png',
    siteTitle: 'MindEcho',
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/jhinzhou/MindEcho'
      }
    ],
    nav: [
      { text: '首页', link: '/' },
      { text: '快速开始', link: '/guide/index', activeMatch: '/guide/' }
    ],
    sidebar: [
      {
        text: '前端',
        items: [
          {
            text: '⚡️ 错误',
            items: [
              { text: '12.8错误', link: '/components/Error' },
            ]
          },
          {
            text: '⚡️ JS 杂记',
            items: [
              { text: 'Callback回调', link: '/components/js/CallbackView' },
              { text: 'Date日期', link: '/components/js/TimeView' },
              { text: 'Re-重导出', link: '/components/js/Re-exportView' },
              { text: 'Gltf-3D模型', link: '/components/js/Gltf-3D' },
            ]
          },
          {
            text: '⚡️ CSS 杂记',
            items: [
              { text: 'Css变量', link: '/components/css/VariableView' }
            ]
          },
          {
            text: '⚡️ CSS 动画',
            items: [
              { text: '毛玻璃渐变', link: '/components/FrostedGlassView' },
              { text: '跑马灯效果', link: '/components/MarqueeView' },
              { text: '镜面-反射', link: '/components/MinuteSurfaceView' },
              { text: '电池-充电', link: '/components/BatteryView' },
              { text: '阴影-浮雕', link: '/components/ShadowView' },
              { text: '日环食效果', link: '/components/EclipseView' },
              { text: '粒子-动画', link: '/components/PerlinNoiseView' }
            ]
          },
          {
            text: '⚡️ TypeScript',
            items: [
              { text: '0.Start', link: '/components/typeScript/0.Start' },
              { text: '1.开篇', link: '/components/typeScript/1.开篇：用正确的方式学习 TypeScript' },
              { text: '2.开发环境', link: '/components/typeScript/2.工欲善其事：打造最舒适的 TypeScript 开发环境' },
              { text: '3.原始和对象类型', link: '/components/typeScript/3.进入类型的世界：理解原始类型与对象类型' },
              { text: '4.字面量和枚举', link: '/components/typeScript/4.掌握字面量类型与枚举，让你的类型再精确一些' },
              { text: '5.函数与Class', link: '/components/typeScript/5.函数与 Class 中的类型：详解函数重载与面向对象' },
              { text: '6.内置类型', link: '/components/typeScript/6.探秘内置类型：any、unknown、never 与类型断言' },
              { text: '7.类型工具(上)', link: '/components/typeScript/7.类型编程好帮手：TypeScript 类型工具（上）' },
              { text: '8.类型工具(下)', link: '/components/typeScript/8.类型编程好帮手：TypeScript 类型工具（下）' },
              { text: '9.无处不在的泛型', link: '/components/typeScript/9.类型编程基石：TypeScript 中无处不在的泛型' },
              { text: '10.结构化类型系统', link: '/components/typeScript/10.结构化类型系统：类型兼容性判断的幕后' },
              { text: '11.类型系统层级', link: '/components/typeScript/11.类型系统层级：从 Top Type 到 Bottom Type' },
              { text: '12.类型里的逻辑运算', link: '/components/typeScript/12.类型里的逻辑运算：条件类型与 infer' },
              { text: '13.内置工具类型基础', link: '/components/typeScript/13.内置工具类型基础：别再妖魔化工具类型了！' },
              { text: '14.反方向类型推导', link: '/components/typeScript/14.反方向类型推导：用好上下文相关类型' },
              { text: '15.数类型', link: '/components/typeScript/15.数类型：协变与逆变的比较' },
              { text: '16.类型变成与类型体操', link: '/components/typeScript/16.了解类型编程与类型体操的意义，找到平衡点' },
              { text: '17.内置工具类型进阶', link: '/components/typeScript/17.内置工具类型进阶：类型编程进阶' },
              { text: '18.基础类型新成员', link: '/components/typeScript/18.基础类型新成员：模板字符串类型入门' },
              { text: '19.类型变成新范式', link: '/components/typeScript/19.类型编程新范式：模板字符串工具类型进阶' },
              { text: '20.工程层面的类型能力', link: '/components/typeScript/20.工程层面的类型能力：类型声明、类型指令与命名空间' },
              { text: '21.内置类型与泛型坑位', link: '/components/typeScript/21.在 React 中愉快地使用 TypeScript：内置类型与泛型坑位' },
              { text: '22.配置与规则集', link: '/components/typeScript/22.让 ESLint 来约束你的 TypeScript 代码：配置与规则集介绍' },
              { text: '23.全链路ts工具库', link: '/components/typeScript/23.全链路 TypeScript 工具库，找到适合你的工具' },
              { text: '24.TS与ECMAScript', link: '/components/typeScript/24.说说 TypeScript 和 ECMAScript 之间那些事儿' },
              { text: '25.装饰器与反射元数据', link: '/components/typeScript/25.装饰器与反射元数据：了解装饰器基本原理与应用' },
              { text: '26.控制反转与依赖注入', link: '/components/typeScript/26.控制反转与依赖注入：基于装饰器的依赖注入实现' },
              { text: '27.TSConfig全解(上)', link: '/components/typeScript/27.TSConfig 全解（上）：构建相关配置' },
              { text: '28.TSConfig全解(下)', link: '/components/typeScript/28.TSConfig 全解（下）：检查相关、工程相关配置' },
              { text: '29.prisma+nestjs:知识储备', link: '/components/typeScript/29.基于 Prisma + NestJs 的 Node API ：前置知识储备' },
              { text: '30.prisma+nestjs:开发部署', link: '/components/typeScript/30.基于 Prisma + NestJs 的 Node API ：项目开发与基于 Heroku 部署' },
              { text: '31.TypeScript AST', link: '/components/typeScript/31.玩转 TypeScript AST：AST Checker 与 CodeMod' },
              { text: '32.End', link: '/components/typeScript/32.感谢相伴：是结束，也是开始' },
              { text: '33.面试中的ts', link: '/components/typeScript/33.漫谈篇：面试中的 TypeScript' },
            ]
          },
          {
            text: '⚡️ SVG',
            items: []
          },
          // {
          //   text: '📃 文档库搭建过程',
          //   items: [
          //     { text: '01 组件环境', link: '/steps/01-env' },
          //     { text: '02 组件开发', link: '/steps/02-dev' },
          //     { text: '03 组件构建', link: '/steps/03-pkg' },
          //     { text: '04 组件样式', link: '/steps/04-css' },
          //     { text: '05 组件文档', link: '/steps/05-doc' },
          //     { text: '06 组件测试', link: '/steps/06-tst' },
          //     { text: '07 组件规范', link: '/steps/07-spe' },
          //     { text: '08 组件发布', link: '/steps/08-dep' }
          //   ]
          // },
          { text: '💬 Note', link: '/note' },
          { text: '💬 关于', link: '/about' },
          { text: '📃 知识', link:'/test'}
        ]
      }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present Zhoujin'
    }
  },
  markdown: {
    config(md) {
      md.use(demoBlockPlugin, {
        cssPreprocessor: 'sass'
      })
    },
    lineNumbers: true
  }
})
