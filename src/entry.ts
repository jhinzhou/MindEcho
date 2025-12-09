import { App } from "vue";
import MyButton from "./button/Button";
import FrostedGlassView from "./CssStyle/FrostedGlassView.vue";
import MinuteSurfaceView from "./CssStyle/MinuteSurfaceView.vue";
import BatteryView from "./CssStyle/BatteryView.vue";
import PerlinNoiseView from "./CssStyle/PerlinNoiseView.vue";
import ShadowView from "./CssStyle/ShadowView.vue";
import MarqueeView from "./CssStyle/MarqueeView.vue";
import EclipseView from "./CssStyle/EclipseView.vue";
import ErrorView from "./CssStyle/ErrorView.vue";
import "css-doodle";
// 导出单独组件
export {
  MyButton,
  FrostedGlassView,
  MinuteSurfaceView,
  BatteryView,
  PerlinNoiseView,
  ShadowView,
  MarqueeView,
  EclipseView,
  ErrorView,
};

// 编写一个插件，实现一个install方法

export default {
  install(app: App): void {
    app.component(MyButton.name, MyButton);
    app.component("FrostedGlassView", FrostedGlassView);
    app.component("MinuteSurfaceView", MinuteSurfaceView);
    app.component("BatteryView", BatteryView);
    app.component("PerlinNoiseView", PerlinNoiseView);
    app.component("ShadowView", ShadowView);
    app.component("MarqueeView", MarqueeView);
    app.component("EclipseView", EclipseView);
    app.component("ErrorView", ErrorView);
  },
};
