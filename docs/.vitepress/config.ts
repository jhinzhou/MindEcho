import { defineConfig } from 'vitepress'
import { demoBlockPlugin } from 'vitepress-theme-demoblock'
const guideSidebar = [
    {
        items: [
            {
                text: '快速开始', link: '/guide/'
            }
        ]
    }
]


export default defineConfig({
    title: 'MindEcho-UI',
    themeConfig: {
        logo: '/logo.png',
        siteTitle: 'MindEcho-UI',
        socialLinks: [
            {
                icon: 'github', link: 'https://github.com/jhinzhou/MindEcho-UI'
            }
        ],
        nav: [
            { text: '文档', items: guideSidebar },
            { text: "组件", link: "/components/Button/index", activeMatch: "/components/Button/" },
        ]
    },
    markdown: {
        config(md) {
            md.use(demoBlockPlugin)
        },
    }
})
