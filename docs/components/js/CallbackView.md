# callback

- 回调其实有很多作用，比如提高代码复用率

## 提高复用率

- 我们先举个简单的例子

```js
const work = (callback) =>{
    console.log('起床')
    console.log('穿衣服')
    console.log('刷牙洗脸')
    console.log('吃早饭')
    callback && callback() // 有回调就调，没有就不执行
    console.log('开始工作')
}
const byBike = () =>{
    console.log('今天骑车去上班！')
}
const byBus = () =>{
    console.log('今天坐巴士上班！')
}
work(byBike)    
// 小明的方式
// 起床 穿衣服 刷牙洗脸 吃早饭 今天骑车去上班！ 开始工作
```

- 拿刚刚这个不严谨的案例（有人可能不刷牙🤪，不吃饭）
- 我们把通用的代码放在一起，不一样的地方就用回调函数，这样就能提高代码复用率

## 异步回调(顺序执行)

```js
const a = () =>{
    setTimeout(() =>{
        console.log('a执行完了!才能执行b！')
    },1000)
    
}
const b = () =>{
    console.log('开始执行b')
}
a()
b()
// 假如a执行很久，打印顺序 开始执行b  a执行完了!才能执行b！
// 这和我们预期是不一致的
```
- 在前端场景中，经常需要在某个方法执行完了再调用另外一个方法，那么我们就可以用如下方法
```js
const a = (callback) =>{
    setTimeout(() =>{
        console.log('a执行完了!才能执行b！')
        callback()
    },1000)
    
}
const b = () =>{
    console.log('开始执行b')
}
a(b)
// 打印顺序 a执行完了!才能执行b！ 开始执行b  
```

## 正在编写