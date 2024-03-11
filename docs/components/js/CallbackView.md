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

## 回调1(顺序执行)

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
- 把函数当作参数转到另外一个函数中，当需要使用这个函数的时候，再回调运行这个函数
```js
const a = (callback) =>{
    setTimeout(() =>{
        console.log('a执行完了!才能执行b！')
        // 这里其实还要在执行前最好判断一下它是不是一个函数  typeof callback === 'function'
        callback && callback()
    },1000)
    
}
const b = () =>{
    console.log('开始执行b')
}
a(b)
// 打印顺序 a执行完了!才能执行b！ 开始执行b  
```

## 回调2
```js
// 假如连接一台设备，调用连接方法，在不同的状态它会返回给调用者一条消息
// 调用者能实时知道它的连接状态，这样就可以根据返回的不同状态走不同的处理方法
const connect = (callback) =>{
    //假设有识别程序，识别到设备，并调用下面的回调
    callback(1,'已识别到设备')
    // 未识别到设备
    callback(0,'未识别到设备')
    // 正在连接设备
    callback(2,'正在连接设备')
    // 设备连接成功
    callback(3,'设备连接成功')
    // 设备连接失败
    callback(0,'设备连接失败')
}

const apply =  () =>{
    connect((type, msg)=>{
        if(type === 0){
            console.log('失败：'+ msg)
        }
        else{
            console.log('当前步骤' + type + ':' + msg)
        }
    })
}
```