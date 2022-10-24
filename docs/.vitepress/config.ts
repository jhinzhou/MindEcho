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
                icon: 'github', link: 'https://github.com/jhinzhou/MindEcho-UI'
            }
        ],
        nav: [
            { text: '首页', link: '/' },
            { text: '指南', link: "/guide/index", activeMatch: "/guide/" },
            { text: "组件", link: "/guide/a", activeMatch: "/guide/" },
        ]
    },
    markdown: {
        config(md) {
            md.use(demoBlockPlugin, {
                cssPreprocessor: "sass",
            })
        },
    }
})
