# 日期

```js
console.log(new Date('2024-03-06'))
// Wed Mar 06 2024 08:00:00 GMT+0800 (中国标准时间)
console.log(new Date('2024/3/6'))
// Wed Mar 06 2024 00:00:00 GMT+0800 (中国标准时间)
```

- 发现什么问题没？不同的时间格式在 js 中转化为时间戳相差 8 个小时！
- 最近在计算两个日期距离多少天的时候，总是出现差一天的情况，于是总结一下吧！

## 分析

```js
// 我们先来看一下这两个时间的时间戳
let date1 = Date.parse(new Date('2024-03-06'))
// date1 打印结果为 1709683200000
let date2 = Date.parse(new Date('2024/3/6'))
// date2 打印结果为 1709654400000

// 他们的时间戳是不一致的，所以计算两个时间戳肯定会出现偏差
let diff1 = parseInt((date2 - date1)/(1000 * 60 * 60 * 24))  // -0

let date3 = Date.parse(new Date('2024/3/7'))
let diff2 = parseInt((date3- date1)/(1000 * 60 * 60 * 24))   // 0

let date4 = Date.parse(new Date('2024/3/8'))
let diff3 = parseInt((date4- date1)/(1000 * 60 * 60 * 24))   // 1
// 我们发现 diff1 diff2 diff3 的值分别为 -0 0 1 这和我们的认知是相违背的

// 如果我们把 date1 的格式换成 2024/3/6 会是什么情况呢
let date0 = Date.parse(new Date('2024/3/6'))
let diff4 = parseInt((date2 - date0)/(1000 * 60 * 60 * 24))  // 0
let diff5 = parseInt((date3 - date0)/(1000 * 60 * 60 * 24))  // 1
let diff6 = parseInt((date4 - date0)/(1000 * 60 * 60 * 24))  // 2
// 我们发现，这次的 diff 值是我们想要的了
```

- 根据上述分析，得出如下结论：
- 只要我们将两个日期换成相同的格式，应该能算出我们期望的结果。
- 或者，我们拿到日期后，将时分秒 `setHours(0)` `setMinutes(0)` `setSeconds(0)` `setMilliseconds(0)` 为相同的结果，应该也能得到我们想要的结果。
- 如果拿到的日期是从后端返回的，数据库时区是否一致的问题都需要考虑，能后端计算时差尽量后端计算。
- 特征场景：`计算过期时间` 、`计算与当前时间还差几天`

## 日期格式化

```js
// 在不使用第三方库的情况下
const formatDate = val =>{
    const date = new Date(val)
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hour = ('0' + date.getHours()).slice(-2);
    const minute = ('0' + date.getMinutes()).slice(-2);
    const second = ('0' + date.getSeconds()).slice(-2);
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

// 使用内置方法格式化 结果为 '2024/03/07 10:25:45' 这种格式
const formatTime = val =>{
    const date = new Date();
    const formattedDate = 
     date.toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
    return formattedDate;
}

// 自定义格式化 customFormat('yyyy-MM-dd HH:mm:ss', date) ,可以随意组合想要的结果
const customFormat = (fmt, val) =>{
    const date = new Date(val)
    let ret
    const opt = {
      'y+': date.getFullYear().toString(),    // 年
      'M+': (date.getMonth() + 1).toString(), // 月
      'd+': date.getDate().toString(),        // 日
      'H+': date.getHours().toString(),       // 时
      'm+': date.getMinutes().toString(),     // 分
      's+': date.getSeconds().toString()      // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    }
    for (const k in opt) {
      ret = new RegExp('(' + k + ')').exec(fmt)
      if (ret) {
        fmt = fmt.replace(
          ret[1],
          ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, '0')
        )
      }
    }
    return fmt
}

```

## 获取当前月最后一天

```js
// 拿到下个月第一天然后减去一天
const getCurrentLastDay = () =>{
    // 获取当前日期
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    // 获取下个月的第一天
    const nextMonth = new Date(year, month + 1, 1);
    // 获取当前月的最后一天
    const lastDay = new Date(nextMonth.getTime() - 86400000);
    
    return lastDay.getDate();      // 得到 31 类似结果，如果想要全部显示去掉 getDate()
}
// 设置当前日期为 0, 也可计算出当前月最后一天
const getCurrentLastDay = () =>{
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;        // 月份从 0 开始计算，需要加 1
    const lastDay = new Date(year, month, 0); // 日期设置为 0，即可获取当前月的最后一天  或者直接用 setDate(0) 然后 toLocaleDateString()
    return lastDay.getDate();
}
```

- 或者将日期改为自定义传入日期，可以计算传入日期的当月最后一天

## 获取当前日期是星期几

```js
const getCurrentWeek = () =>{
    const days = ['日', '一', '二', '三', '四', '五', '六'];
    const date = new Date();
    const week = '星期' + days[date.getDay()];
    return week;
}

```
