# 毛玻璃渐变

<div>
  <FrostedGlassView></FrostedGlassView>
</div>
1.首先我们用三个 `div` 标签使用 `clip-path` 实现三个多边形

```js
<div class="g-bg">
    <div class="g-polygon g-polygon-1"></div>
    <div class="g-polygon g-polygon-2"></div>
    <div class="g-polygon g-polygon-3"></div>
</div>
.g-polygon {
    position: absolute;
    opacity: .5;
}
.g-polygon-1 {
    // 定位代码，容器高宽随意
    background: #ffee55;
    clip-path: polygon(0 10%, 30% 0, 100% 40%, 70% 100%, 20% 90%);
}

.g-polygon-2 {
    // 定位代码，容器高宽随意
    background: #E950D1;
    clip-path: polygon(10% 0, 100% 70%, 100% 100%, 20% 90%);
}

.g-polygon-3 {
    // 定位代码，容器高宽随意
    background: rgba(87, 80, 233);
    clip-path: polygon(80% 0, 100% 70%, 100% 100%, 20% 90%);
}
```

2.使用 `backdrop-filter` 实现高斯蒙版

```css
.g-bg::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  backdrop-filter: blur(150px);
  z-index: 1;
}
```

- [参考](https://github.com/jhinzhou/MindEcho-UI/blob/master/src/CssStyle/FrostedGlassView.vue)
