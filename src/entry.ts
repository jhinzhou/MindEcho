import { App } from 'vue'
import MyButton from './Button/Button'
import FrostedGlassView from './CssStyle/FrostedGlassView.vue'

// 导出单独组件
export { MyButton, FrostedGlassView }

// 编写一个插件，实现一个install方法

export default {
  install(app: App): void {
    app.component(MyButton.name, MyButton)
    app.component('FrostedGlassView', FrostedGlassView)
  }
}
