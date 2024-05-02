# Css变量

- 能用 css 做的事情就不要用 js

## 变量声明

```css
// 在普通css中
:root {
  --color: red;
}
.custom{
  color: var(--color);
}

// sass中
$color: red;
.custom{
  color: $color;
}

// less中
@Color: red;
.custom{
  color: @Color;
}

```

## 写法

- 数字加单位

```css
.btn{
  --myHeight: 100px;
}
.btn:hover{
  height: var(--myHeight);
}
```

- 利用 `calc` 函数

```css
.btn{
  --myHeight: 100;
}
.btn:hover{
  height: calc(var(--myHeight) * 1px);
}
```

## 插件等
