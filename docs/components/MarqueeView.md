# 跑马灯效果

<div>
    <MarqueeView />
</div>

- 1. 伪元素生成图形

```css
div {
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: -50%;
    top: -50%;
    width: 200%;
    height: 200%;
    background-repeat: no-repeat;
    background-size: 50% 50%, 50% 50%;
    background-position: 0 0, 100% 0, 100% 100%, 0 100%;
    background-image: linear-gradient(#399953, #399953), linear-gradient(
        #fbb300,
        #fbb300
      ), linear-gradient(#d53e33, #d53e33), linear-gradient(#377af5, #377af5);
  }
}
```

- 2. 旋转

```css
div {
  animation: rotate 4s linear infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(1turn);
  }
}
```

- 3.利用伪元素遮住中间

- [参考](https://github.com/jhinzhou/MindEcho-UI/blob/master/src/CssStyle/MarqueeView.vue)
