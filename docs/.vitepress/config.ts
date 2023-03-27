import { defineConfig } from 'vitepress'
import { demoBlockPlugin } from 'vitepress-theme-demoblock'

export default defineConfig({
  title: 'MindEcho-UI',
  description: 'Just playing around.',
  base: '/MindEcho-UI/',
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo2.svg' }]],
  themeConfig: {
    logo: '/logo2.png',
    siteTitle: 'MindEcho-UI',
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/jhinzhou/MindEcho-UI'
      }
    ],
    nav: [
      { text: '首页', link: '/' },
      { text: '快速开始', link: '/guide/index', activeMatch: '/guide/' }
    ],
    sidebar: [
      {
        text: 'CSS',
        items: [
          {
            text: '📦 css 效果库',
            items: [
              { text: '毛玻璃效果', link: '/components/index' },
              { text: '镜面效果', link: '/components/one' },
            ]
          },
          {
            text: '📃 文档库搭建过程',
            items: [
              { text: '01 组件环境', link: '/steps/01-env' },
              { text: '02 组件开发', link: '/steps/02-dev' },
              { text: '03 组件构建', link: '/steps/03-pkg' },
              { text: '04 组件样式', link: '/steps/04-css' },
              { text: '05 组件文档', link: '/steps/05-doc' },
              { text: '06 组件测试', link: '/steps/06-tst' },
              { text: '07 组件规范', link: '/steps/07-spe' },
              { text: '08 组件发布', link: '/steps/08-dep' }
            ]
          },
          { text: '💎 关于', link: '/about' }
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
    }
  }
})
