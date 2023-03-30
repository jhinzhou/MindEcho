# 浮雕阴影

<div>
    <ShadowView />
</div>

- 通过阴影和点击效果实现凹凸的感觉

```css
box-shadow: 7px 7px 12px rgba(0, 0, 0, 0.4), -7px -7px 12px rgba(255, 255, 255, 0.9);
&:active {
  box-shadow: 0 0 0 rgba(0, 0, 0, 0.4), 0 0 0 rgba(255, 255, 255, 0.9),
    inset -7px -7px 12px rgba(255, 255, 255, 0.9), inset 7px 7px 12px rgba(0, 0, 0, 0.4);
}
```
