import { App } from 'vue'
import MyButton from './button/Button'
import FrostedGlassView from './CssStyle/FrostedGlassView.vue'
import MinuteSurfaceView from './CssStyle/MinuteSurfaceView.vue'

// 导出单独组件
export { MyButton, FrostedGlassView, MinuteSurfaceView }

// 编写一个插件，实现一个install方法

export default {
  install(app: App): void {
    app.component(MyButton.name, MyButton)
    app.component('FrostedGlassView', FrostedGlassView)
    app.component('MinuteSurfaceView', MinuteSurfaceView)
  }
}
