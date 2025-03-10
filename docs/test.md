# 什么是 BFC？

- BFC（Block Formatting Context，块级格式化上下文）
- BFC 的作用
  避免外边距重叠、阻止浮动元素重叠（清除浮动）、防止被浮动元素覆盖、容器高度塌陷问题
- 如何创建 BFC

  ```css
  1. display: flow-root;
  2. float: left; 或 float: right;
  3. overflow: hidden;
  4. position: absolute; 或 position: fixed;
  5. display: inline-block; display: flex; display: grid;
  ```

- BFC 的使用场景
  1. 防止外边距重叠

  ```css
  .parent {
    overflow: hidden; /* 触发 BFC*/
  }
  .child {
    margin-top: 20px;
  }
  ```

  2. 清除浮动

  ```css
  .clearfix::after {
    content: "";
    display: block;
    clear: both;
  }
  ```

  3. 防止浮动元素覆盖文本

  ```css
  .text-container {
    overflow: hidden;
  }
  ```

# 函数柯理化，应用场景

- 柯里化（Currying） 是指将一个 接受多个参数的函数 转换成 一系列 只接受一个参数的函数的技术
- 场景：代码复用、拆分计算、函数式编程、组合多个函数
  1. 代码复用

  ```js
  function multiply(a) {
    return function (b) {
      return a * b;
    };
  }
  const double = multiply(2);
  const triple = multiply(3);
  console.log(double(5)); // 10
  console.log(triple(5)); // 15
  ```

  2. 拆分计算

  ```js
  const log = (level) => (message) => `[${level}] ${message}`;
  const info = log("INFO");
  const warn = log("WARN");
  const error = log("ERROR");
  console.log(info("This is an info message")); // [INFO] This is an info message
  console.log(warn("This is a warning message")); // [WARN] This is a warning message
  console.log(error("Something went wrong!")); // [ERROR] Something went wrong!
  // 预设日志级别，避免重复传递 level
  ```

  3. 函数式编程：减少不必要的参数传递; 延迟执行，可以逐步传递参数，更灵活控制函数执行

  ```js
  const match = (reg) => (str) => str.match(reg);
  const findNumbers = match(/\d+/g);
  console.log(findNumbers("My phone is 123-456-7890")); // ["123", "456", "7890"]
  ```

  4. 组合多个函数

  ```js
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  const appendExclamation = (str) => str + "!";
  const compose = (f, g) => (x) => f(g(x));
  const excite = compose(capitalize, appendExclamation);
  console.log(excite("hello")); // "Hello!"
  ```

# 手写防抖

- 防抖（Debounce） 是一种优化技术，它可以 限制高频触发的函数，让函数在 最后一次触发后一段时间才执行
- 场景：搜索框输入（防止每次输入都触发请求）、窗口调整（防止频繁计算布局）、表单验证（用户停止输入后再校验）、按钮点击（防止用户多次点击）
- 基础版本: 搜索框、输入框

  ```js
  function debounce(fn, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer); // 清除上一次的定时器
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    };
  }
  function search(value) {
    console.log("搜索关键词:", value);
  }
  const debouncedSearch = debounce(search, 500);
  // 模拟用户输入
  debouncedSearch("he");
  debouncedSearch("hel");
  debouncedSearch("hell");
  debouncedSearch("hello"); // 只有 "hello" 这次触发搜索
  ```

- 立即执行：按钮点击、表单提交

  ```js
  function debounce(fn, delay, immediate = false) {
    let timer;
    return function (...args) {
      const callNow = immediate && !timer;
      clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        if (!immediate) fn.apply(this, args);
      }, delay);
      if (callNow) fn.apply(this, args);
    };
  }
  const log = debounce(() => console.log("点击了按钮"), 1000, true);
  document.getElementById("btn").addEventListener("click", log);
  // immediate = true：第一次点击立即执行，以后点击 1 秒内不再执行。
  ```

- 支持取消：切换页面时，取消未执行的请求、用户离开当前操作时，取消输入防抖

  ```js
  function debounce(fn, delay, immediate = false) {
    let timer;

    function debounced(...args) {
      const callNow = immediate && !timer;
      clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        if (!immediate) fn.apply(this, args);
      }, delay);
      if (callNow) fn.apply(this, args);
    }

    // **取消防抖**
    debounced.cancel = () => {
      clearTimeout(timer);
      timer = null;
    };

    return debounced;
  }
  const saveData = debounce(() => console.log("数据保存"), 1000);
  saveData();
  saveData();
  saveData.cancel(); // 取消了防抖，不会执行
  ```

# 手写节流

- 节流（Throttle） 是一种优化技术，它可以限制高频触发的函数，让函数在固定时间间隔内最多执行一次。
- 基础版：鼠标移动、页面滚动

  ```js
  function throttle(fn, delay) {
    let lastTime = 0;
    return function (...args) {
      const now = Date.now();
      if (now - lastTime >= delay) {
        lastTime = now;
        fn.apply(this, args);
      }
    };
  }
  function onScroll() {
    console.log("页面滚动了", Date.now());
  }
  const throttledScroll = throttle(onScroll, 1000);
  window.addEventListener("scroll", throttledScroll);
  // 效果：滚动时，每隔 1 秒 触发一次 onScroll，不会每次滚动都执行。
  ```

- 进阶版: （定时器版本）保证最后一次执行： 输入框、搜索框

  ```js
  function throttle(fn, delay) {
    let timer = null;
    return function (...args) {
      if (!timer) {
        timer = setTimeout(() => {
          fn.apply(this, args);
          timer = null;
        }, delay);
      }
    };
  }
  // 区别： 时间到了才执行，更适合 用户输入 场景（比 Date.now() 方式更稳定）。
  ```

- 高级版带 leading、trailing：按钮防连点，暂时不做了解

# css 之 display 的 inline、block、inline-block

| 属性           | block                      | inline-block                | inline                     |
|--------------|--------------------------|--------------------------|--------------------------|
| 是否换行？   | ✅ 换行（独占一整行）       | ❌ 不换行（像 inline 一样排列） | ❌ 不换行（默认水平排列） |
| 能否设置宽高？ | ✅ 可以                    | ✅ 可以                    | ❌ 不行（宽高由内容决定） |
| 默认宽度     | 100%（占满整行）          | 由内容决定                  | 由内容决定                  |
| 适用场景     | `div`、`p`、`section`     | `button`、`nav`、`img`    | `span`、`a`、`strong`、`em` |


# TCP、TCP/IP 、UDP 和 HTTP 关系，三次握手，四次挥手

| TCP/IP 四层模型 | OSI 七层模型         | 示例协议                |
|----------------|--------------------|-----------------------|
| 应用层        | 应用层              | HTTP、HTTPS、FTP、SMTP |
| 传输层        | 传输层              | TCP、UDP              |
| 网络层        | 网络层              | IP、ICMP、ARP         |
| 链路层        | 数据链路层、物理层  | 以太网、Wi-Fi、光纤    |

TCP/IP 是网络通信的协议，包含 TCP 和 IP。
TCP 处于 传输层，负责可靠传输，通过 三次握手、四次挥手 保证数据的完整性。基于 TCP：http/s、ftp、smtp、pop3/imap、ssh、telnet、数据库连接、smb（windows 文件共享）
HTTP 处于 应用层，基于 TCP 传输数据（如网页、API 请求）。
UDP（User Datagram Protocol，用户数据报协议） 是一种无连接的、不可靠的传输层协议，与 TCP 相对。速度快，无流控、适用于实时通信、直播、游戏】语音通话。基于 UDP：dns（大包用 tcp）、dhcp、VoIP、SNMP（有时用 tcp）、TFTP（轻量级 ftp）、NTP

直播低延迟： RTP（udp）、RTSP（TCP/UDP）、WebRTC
点播在线视频：HLS、DASH,都是 http
视频通话/游戏直播：WebRTC（udp）

- 三次握手：建立连接
  Client ---> Server [SYN] 请求建立连接
  Client <--- Server [SYN-ACK] 同意连接
  Client ---> Server [ACK] 确认连接成功
- 四次握手：断开连接
  Client ---> Server [FIN] 请求关闭连接
  Client <--- Server [ACK] 确认关闭请求
  Client <--- Server [FIN] 服务器也要关闭
  Client ---> Server [ACK] 确认断开

- http 安全性
| 协议                  | 端口 | 安全性    | 数据加密    | 适用场景                  |
|----------------------|------|---------|-----------|-------------------------|
| HTTP               | 80   | ❌ 不安全 | ❌ 明文传输 | 普通网页（非敏感数据）     |
| HTTPS（HTTP + SSL/TLS） | 443  | ✅ 安全   | ✅ 加密传输 | 银行、支付、社交网络       |


明文传输 → 容易被监听（比如 Wi-Fi 劫持、MITM 中间人攻击）。
无身份验证 → 容易遭遇伪造网站（钓鱼攻击）。
数据篡改 → 可能被篡改（运营商插入广告）。

版本 发布时间 关键特性 缺点
HTTP/1.0 1996 短连接（每个请求重新建立连接） 效率低，多次握手
HTTP/1.1 1999 长连接（Keep-Alive）、管道化 队头阻塞
HTTP/2.0 2015 多路复用、二进制传输、头部压缩 TCP 仍有阻塞
HTTP/3.0 2022 基于 QUIC（UDP）、低延迟 部署复杂

# js 实现栈

- 使用基本数组方法，缺点：数组扩容会带来性能损耗

  ```js
  class Stack {
    constructor() {
      this.items = [];
    }

    push(element) {
      this.items.push(element);
    }

    pop() {
      if (this.isEmpty()) return "Stack is empty";
      return this.items.pop();
    }

    peek() {
      if (this.isEmpty()) return "Stack is empty";
      return this.items[this.items.length - 1];
    }

    isEmpty() {
      return this.items.length === 0;
    }

    size() {
      return this.items.length;
    }
  }

  // 使用示例
  const stack = new Stack();
  stack.push(10);
  stack.push(20);
  console.log(stack.pop()); // 20
  console.log(stack.peek()); // 10
  ```

- 使用链表 Linked List:无需扩容，适合大量数据操作。缺点：需要额外存储指针，占用更多内存

  ```js
  class Node {
    constructor(value) {
      this.value = value;
      this.next = null;
    }
  }

  class Stack {
    constructor() {
      this.top = null;
      this.count = 0;
    }

    push(value) {
      const newNode = new Node(value);
      newNode.next = this.top;
      this.top = newNode;
      this.count++;
    }

    pop() {
      if (this.isEmpty()) return "Stack is empty";
      const value = this.top.value;
      this.top = this.top.next;
      this.count--;
      return value;
    }

    peek() {
      if (this.isEmpty()) return "Stack is empty";
      return this.top.value;
    }

    isEmpty() {
      return this.top === null;
    }

    size() {
      return this.count;
    }
  }

  // 使用示例
  const stack = new Stack();
  stack.push(10);
  stack.push(20);
  console.log(stack.pop()); // 20
  console.log(stack.peek()); // 10
  ```

# js 中的哈希表，object 是最基础的哈希表（键值对），推荐使用 map

```js
const hashMap = new Map();

// 插入
hashMap.set("name", "Bob");
hashMap.set(1, "One"); // 数字作为键
hashMap.set({ id: 123 }, "Object Key"); // 对象作为键

// 访问
console.log(hashMap.get("name")); // Bob
console.log(hashMap.get(1)); // One

// 判断是否存在
console.log(hashMap.has(1)); // true

// 删除
hashMap.delete(1);
console.log(hashMap.has(1)); // false
```

- 手写哈希表

```js
class HashTable {
  constructor(size = 10) {
    this.buckets = new Array(size).fill(null).map(() => []);
    this.size = size;
  }

  // 哈希函数（简单求模）
  _hash(key) {
    let hash = 0;
    const keyStr = key.toString();
    for (let i = 0; i < keyStr.length; i++) {
      hash += keyStr.charCodeAt(i);
    }
    return hash % this.size;
  }

  // 插入 key-value
  set(key, value) {
    const index = this._hash(key);
    const bucket = this.buckets[index];

    for (const pair of bucket) {
      if (pair[0] === key) {
        pair[1] = value; // 更新已有的 key
        return;
      }
    }

    bucket.push([key, value]); // 解决哈希冲突（链地址法）
  }

  // 获取值
  get(key) {
    const index = this._hash(key);
    const bucket = this.buckets[index];

    for (const pair of bucket) {
      if (pair[0] === key) {
        return pair[1];
      }
    }
    return undefined;
  }

  // 删除 key
  delete(key) {
    const index = this._hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  // 判断是否存在 key
  has(key) {
    return this.get(key) !== undefined;
  }
}

// 使用示例
const myHashTable = new HashTable();
myHashTable.set("name", "Charlie");
myHashTable.set("age", 30);

console.log(myHashTable.get("name")); // Charlie
console.log(myHashTable.has("age")); // true

myHashTable.delete("age");
console.log(myHashTable.has("age")); // false
```

# 如何删除一个 dom 节点

- remove() // IE 不支持

```js
const element = document.getElementById("myElement");
element.remove(); // 直接删除该元素
```

- parentNode.removeChild()

```js
const element = document.getElementById("myElement");
element.parentNode.removeChild(element);
```

- 使用 replaceChild()代替为空元素，避免重绘

```js
const element = document.getElementById("myElement");
element.parentNode.replaceChild(document.createTextNode(""), element);
```

- 使用 innerHTML 清空父节点,可能影响性能

```js
const parent = document.getElementById("parentElement");
parent.innerHTML = ""; // 清空所有子元素
```

# 浏览器的渲染页面机制

当我们在浏览器中输入 URL 并按下 回车，浏览器会经历多个阶段来渲染网页。主要流程如下：

解析 HTML → 构建 DOM 树
解析 CSS → 构建 CSSOM 树
合并 DOM 和 CSSOM → 生成渲染树（Render Tree）
布局（Layout） → 计算元素大小和位置
绘制（Painting） → 绘制像素到屏幕上
合成（Compositing） → 处理复杂的 UI 组件

# 安全、性能优化、浏览器兼容

# 常见 web 攻击，xss（具体怎么过滤，有哪些常见需要过滤的制服），csrf，dos，sql 注入，点击劫持，如何攻击以及如何预防

## 1. XSS（跨站脚本攻击）
### 攻击方式：
XSS 允许攻击者在受害者的浏览器中执行恶意脚本，通常是通过输入框、URL 参数或存储的恶意代码实现的。常见 XSS 分为：
- **反射型 XSS**：恶意脚本通过 URL 传输并立即执行。
- **存储型 XSS**：恶意脚本被存储在数据库或服务器端，用户访问时被执行。
- **DOM XSS**：攻击者篡改 DOM，导致恶意脚本执行。



### 预防措施：
1. **输入过滤**：禁止 `<script>`、`onerror`、`onload` 等标签或属性。
2. **输出编码**：
   - HTML 输出时使用 `HTML Entities` 编码，如 `&lt;script&gt;` 代替 `<script>`
   - JavaScript 中 `JSON.stringify()` 或 `encodeURIComponent()`
   - CSS 过滤 `expression()`
3. **CSP（内容安全策略）**：
   - 通过 `Content-Security-Policy` 限制脚本来源，如 `default-src 'self'`
4. **HttpOnly Cookie**：
   - 防止 `document.cookie` 被 JavaScript 访问，防止 Cookie 窃取。
---

## 什么是 CSP？
**CSP（Content Security Policy，内容安全策略）** 是一种 Web 安全策略，用于减少 XSS（跨站脚本攻击）和其他代码注入攻击的风险。CSP 通过限制网页可以加载的资源（脚本、样式、图片等），防止恶意代码执行。


| 攻击类型   | 主要危害           | 防御措施                                  |
|-----------|------------------|-----------------------------------------|
| XSS       | 注入恶意 JS       | CSP、HTML 转义、避免 `innerHTML`         |
| CSRF      | 伪造请求         | CSRF Token（服务器生成随机Token，嵌入表单或请求头，验证请求时校验Token有效性）、SameSite Cookie             |
| SQL 注入  | 窃取/篡改数据库   | 预编译 SQL，输入校验                     |
| DoS/DDoS  | 服务器崩溃       | CDN、限流                                |
| 点击劫持  | 诱骗点击         | X-Frame-Options, CSP                     |
| DNS 劫持  | 伪造网站         | HTTPS, 安全 DNS                          |


# 影响深刻的项目、或者困难、自己的优势、缺点

# vue 生命周期、双向绑定原理、proxy， 数据劫持、vue2 和 vue3 的区别

- vue2 Object.defineProperty + 数据劫持

```js
function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    get() {
      console.log("获取值:", val);
      return val;
    },
    set(newVal) {
      console.log("更新值:", newVal);
      val = newVal;
    },
  });
}

let data = {};
defineReactive(data, "message", "Hello Vue");
data.message = "New Message"; // 触发 setter
console.log(data.message); // 触发 getter
```

- vue3 Proxy 响应式

```js
const handler = {
  get(target, key) {
    console.log(`获取 ${key}:`, target[key]);
    return target[key];
  },
  set(target, key, value) {
    console.log(`修改 ${key}: ${value}`);
    target[key] = value;
    return true;
  },
};

const data = new Proxy({ message: "Hello Vue3" }, handler);
data.message = "New Vue3"; // 触发 set
console.log(data.message); // 触发 get
```

# 跨域和解决方案、同源策略以及其作用

域（Cross-Origin）指的是浏览器阻止网页向不同源（不同协议、域名、端口）的服务器请求数据。

📌 同源判断标准（Same-Origin Policy, SOP） 只有当 协议、域名、端口 都相同，浏览器才允许请求。

| 方案        | 适用场景       | 优点                          | 缺点                      |
|------------|--------------|-----------------------------|---------------------------|
| CORS（推荐） | 前后端分离项目 | 服务器端控制，适用于所有请求，最安全 | 需要后端配置              |
| JSONP       | 只需 GET 请求  | 兼容老项目                  | 存在 XSS 风险              |
| Nginx 代理  | 生产环境       | 需要服务器支持，隐藏后端地址  | 需要额外的服务器配置        |
| 前端代理    | 开发环境       | 仅开发可用                   | 生产环境无效                |


✅ 前端开发时 👉 使用 vite.config.js 或 vue.config.js 代理,proxy:{'/api':'target'}
✅ 后端支持时 👉 优先使用 CORS
✅ 生产环境 👉 使用 Nginx 代理
❌ 不要使用 JSONP，除非是老项目

# 前端优化方案有哪些
前端优化方案可以从多个方面进行，包括性能优化、代码优化、用户体验优化等。以下是常见的前端优化方案：

1. 性能优化
减少 HTTP 请求：使用 合并 CSS/JS、CSS Sprites、图标字体 代替多个图片请求。
使用 HTTP/2 或 HTTP/3：提升多路复用，提高资源加载效率。
静态资源缓存：使用 Cache-Control、ETag、Service Worker 提高缓存命中率。
CDN 加速：将静态资源存放到 CDN，减少跨地域访问延迟。
按需加载（Lazy Load）：图片、视频、组件等采用懒加载，减少首屏加载压力。
代码分割（Code Splitting）：使用 Webpack 的 import() 动态引入，避免一次性加载全部 JS 文件。
SSR（服务端渲染） / 静态站点生成（SSG）：如 Next.js、Nuxt.js，提升首屏渲染速度。
减少大体积库：如使用 dayjs 替代 moment.js，减少 JS 体积。
2. 代码优化
减少冗余代码：使用 ESLint/Prettier 进行代码规范化，删除无用代码。
Tree Shaking：去除未使用的代码（适用于 ES Module）。
减少 DOM 操作：尽量使用**虚拟 DOM（React/Vue）**优化渲染，避免频繁的 DOM 变更。
使用 Web Worker：将耗时计算任务放入 Worker，避免阻塞主线程。
图片优化：使用 WebP、AVIF 格式，SVG 代替位图，减少图片体积。
Gzip/Brotli 压缩：开启服务器端压缩，提高传输速度。
3. 用户体验优化
骨架屏 & 预加载：减少用户等待时间，提高加载体验。
优化首屏渲染：减少渲染阻塞资源（如 CSS、JS），避免白屏问题。
减少 CLS（累积布局偏移）：避免元素跳动影响用户体验，如 img 设置宽高、使用 字体回退策略。
PWA（渐进式 Web 应用）：支持 离线访问，提高访问速度。
优化 FCP（首次内容绘制） 和 LCP（最大内容绘制）：减少关键资源阻塞时间，提高加载速度。
4. 网络优化
DNS 预解析：使用 <link rel="dns-prefetch" href="https://example.com">。
预加载关键资源：使用 <link rel="preload"> 提前加载字体、图片、JS 等资源。
减少跨域请求：使用 CORS、Nginx 代理等优化跨域数据访问。
5. 安全优化
CSP（内容安全策略）：防止 XSS 攻击。
避免 CSRF：使用 SameSite Cookie、Token 验证。
HTTPS 强制：防止中间人攻击，提高数据传输安全性。

# call、apply、bind 如何手动实现
- 手写call
```js
Function.prototype.myCall = function (context, ...args) {
  // 如果 context 为空，则默认指向全局对象（浏览器环境下是 window，Node.js 中是 globalThis）
  context = context || globalThis;
  // 生成唯一 key，避免覆盖原有属性
  const fnKey = Symbol();
  // 将当前函数赋值给 context 对象上的 fnKey 属性
  context[fnKey] = this;
  // 执行函数并传入参数
  const result = context[fnKey](...args);
  // 删除临时属性
  delete context[fnKey];
  // 返回执行结果
  return result;
};
// 测试 call
function greet(age) {
  console.log(`Hello, my name is ${this.name} and I am ${age} years old.`);
}
const person = { name: "Alice" };
greet.myCall(person, 25); // Hello, my name is Alice and I am 25 years old.
```
- 手写apply
```js
Function.prototype.myApply = function (context, args) {
  context = context || globalThis;
  const fnKey = Symbol();
  context[fnKey] = this;
  // 确保 args 是数组或类数组
  const result = args ? context[fnKey](...args) : context[fnKey]();
  delete context[fnKey];
  return result;
};
// 测试 apply
greet.myApply(person, [30]); // Hello, my name is Alice and I am 30 years old.
```
-手写bind
```js
Function.prototype.myBind = function (context, ...args) {
  const fn = this; // 保留原函数

  return function (...innerArgs) {
    return fn.myCall(context, ...args, ...innerArgs);
  };
};
// 测试 bind
const boundGreet = greet.myBind(person);
boundGreet(35); // Hello, my name is Alice and I am 35 years old.
```
| 方法   | 是否立即执行 | 参数传递方式  | 主要作用                 |
|--------|------------|--------------|--------------------------|
| call   | 是         | 逗号分隔参数  | 改变 `this` 并执行函数   |
| apply  | 是         | 传入数组参数  | 改变 `this` 并执行函数   |
| bind   | 否         | 逗号分隔参数  | 返回绑定 `this` 的新函数 |


# 重绘和回流
| 操作  | 影响范围      | 触发因素                  | 优化建议                         |
|------|-------------|------------------------|-------------------------------|
| 回流  | 影响整个布局  | 改变尺寸、位置、盒模型等  | 减少 DOM 操作，避免频繁修改布局 |
| 重绘  | 只影响外观渲染 | 改变颜色、背景、不影响布局的属性 | 减少不必要的视觉变化           |

# html5 的新特性和改进
| 特性         | 说明                                      |
|-------------|-----------------------------------------|
| 语义化标签  | `<header>`、`<section>`、`<article>` 等  |
| 表单增强    | 新的 `input` 类型，如 `email`、`date`、`range` |
| 多媒体支持  | `<audio>` 和 `<video>` 取代 Flash       |
| 本地存储    | `localStorage`、`sessionStorage` 替代 `cookie` |
| WebSockets  | 服务器-客户端双向通信                   |
| 地理位置 API | `navigator.geolocation` 获取用户位置   |
| Canvas & WebGL | 2D/3D 绘图                          |
| 文件 API    | 允许访问和读取本地文件                  |
| 移动端优化  | 视口控制、触摸事件                      |

# seo优化

| SEO 优化  | 关键点                                      |
|----------|-------------------------------------------|
| 站内优化  | 语义化 HTML、关键词优化、图片优化、内部链接、加载速度 |
| 站外优化  | 外链建设、社交媒体营销、本地 SEO         |
| 技术 SEO  | Sitemap、Canonical URL、结构化数据       |

css 盒子模型
css 的伪元素和伪类
# 画三角形
```css
// 使用border
.triangle {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 50px solid red; /* 只保留下边框，形成正三角形 */
}
// 使用clip-path
.triangle {
  width: 100px;
  height: 100px;
  background: red;
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}

```
# 闭包和应用，以及内存泄漏,闭包的底层原理
- 闭包 本质是函数 + 作用域链，应用场景包括 数据私有化、事件监听、定时器等。
| 问题             | 解决方案                                |
|----------------|-----------------------------------|
| 全局变量污染     | `use strict`，避免无声明变量       |
| 闭包未释放       | 将不需要的变量置 `null`           |
| 未清除 DOM 事件  | `removeEventListener`            |
| 定时器未清除     | `clearInterval / clearTimeout`   |
| DOM 引用未释放   | `node.innerHTML = ""` 或 `node = null` |


# 如何实现原型继承
- 经典继承
```js
function Parent() {
  this.name = "Parent";
  this.colors = ["red", "blue", "green"];
}
function Child() {}
Child.prototype = new Parent(); // 继承 Parent
const child1 = new Child();
const child2 = new Child();
child1.colors.push("yellow");
console.log(child1.colors); // ["red", "blue", "green", "yellow"]
console.log(child2.colors); // ["red", "blue", "green", "yellow"]
```
- 构造函数继承
```js
function Parent(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
function Child(name) {
  Parent.call(this, name); // 继承 Parent
}
const child1 = new Child("Child1");
const child2 = new Child("Child2");
child1.colors.push("yellow");
console.log(child1.colors); // ["red", "blue", "green", "yellow"]
console.log(child2.colors); // ["red", "blue", "green"]
```
- 原型继承
```js
const parent = {
  name: "Parent",
  colors: ["red", "blue", "green"],
  sayHello() {
    console.log("Hello from Parent");
  },
};
const child = Object.create(parent);
child.name = "Child";
child.colors.push("yellow");
console.log(child.colors); // ["red", "blue", "green", "yellow"]
console.log(parent.colors); // 也会被修改！
```
- 寄生继承
```js
function createChild(obj) {
  const clone = Object.create(obj);
  clone.sayHi = function () {
    console.log("Hi from Child");
  };
  return clone;
}
const child = createChild(parent);
child.sayHi(); // Hi from Child
```
- 寄生组合式继承
```js
function Parent(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
Parent.prototype.sayHello = function () {
  console.log("Hello from Parent");
};

function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}
Child.prototype = Object.create(Parent.prototype); // 继承方法
Child.prototype.constructor = Child; // 修正 constructor
const child1 = new Child("Child1", 18);
child1.sayHello(); // Hello from Parent
```
# 事件委托的原理和优势，事件循环、宏任务、微任务
- 事件委托是利用事件冒泡，将子元素的事件委托到父元素上，由父元素统一监听处理。
| **概念**              | **说明**                                             |
|----------------------|--------------------------------------------------|
| **事件委托**          | 通过事件冒泡，把子元素事件绑定到父元素，提高性能        |
| **事件循环（Event Loop）** | JavaScript 任务管理机制，保证异步任务执行              |
| **宏任务（MacroTask）**  | `setTimeout`、`setInterval`、`requestAnimationFrame` |
| **微任务（MicroTask）**  | `Promise.then`、`MutationObserver`、`queueMicrotask` |
| **执行顺序**          | 先执行同步代码 → 再执行微任务 → 最后执行宏任务         |

# css sprite 和网页字体图标有什么区别
| **对比项**     | **CSS Sprite（雪碧图）**                 | **网页字体图标（Icon Font）**         |
|--------------|----------------------------------|--------------------------------|
| **使用方式**  | `background-image` + `background-position` | `font-family`                  |
| **是否矢量**  | ❌ 不是矢量，使用位图（PNG、JPG、GIF）   | ✅ 矢量，使用 `SVG`            |
| **颜色修改**  | ❌ 不能修改，必须换图片                 | ✅ 可用 `color` 动态修改       |
| **大小修改**  | ❌ 受图片分辨率影响                    | ✅ `font-size` 任意调整        |
| **适用范围**  | 适用于 **复杂多色图标**                | 适用于 **单色矢量图标**        |
| **兼容性**   | ✅ 兼容所有浏览器                     | ❌ 旧版 `IE6-8` 可能不支持     |
| **加载性能**  | ✅ 只需加载一张图片                    | ❌ 需加载字体文件              |
| **维护成本**  | ❌ 计算 `background-position` 复杂      | ✅ 直接使用 `class`            |

✅ CSS Sprite 适用于：

老旧浏览器兼容性要求高（IE6+）
多色、复杂的位图图标（如 PNG、JPG）
静态图标（不需要修改颜色、大小）
✅ Icon Font 适用于：

需要动态修改颜色、大小的图标
希望支持高清屏幕（Retina 屏）
图标是矢量的，适合单色

# 什么是虚拟 dom、与真实 dom 的区别
| **对比项**    | **虚拟 DOM（Virtual DOM）**     | **真实 DOM（Real DOM）**       |
|-------------|--------------------------|--------------------------|
| **本质**     | JS 对象，轻量级虚拟结构      | 浏览器中的 HTML 结构       |
| **修改速度** | 先计算最优更新路径，局部更新  | 直接修改，影响整个 DOM 树   |
| **性能**     | 高效，减少 DOM 操作        | 操作慢，每次修改都会引起重绘/回流 |
| **渲染方式** | 先 diff 对比，再批量更新    | 直接操作，效率低          |
| **适用场景** | React、Vue 等前端框架      | 传统网页、简单应用        |

登录页需要考虑哪些，如何优化渲染、减少响应时间
cookie localStorage
flex transform transition animation keyframe relative static fixed
js 价格格式输入 1999999.99 输出 1，999，999.99
await 输出一个 5 秒出发一个事件，async
# promise 手动实现.all .race
- all
```js
Promise.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    let results = [];
    let count = 0;
    let total = promises.length;
    if (total === 0) return resolve([]);
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          results[index] = value;
          count++;
          if (count === total) resolve(results);
        })
        .catch(reject); // 只要有一个失败，就直接 reject
    });
  });
};
// 测试
let p1 = Promise.resolve(1);
let p2 = Promise.resolve(2);
let p3 = new Promise((resolve) => setTimeout(() => resolve(3), 1000));
Promise.myAll([p1, p2, p3]).then(console.log).catch(console.error);
// 1 秒后输出: [1, 2, 3]
```
- race
```js
Promise.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    for (let promise of promises) {
      Promise.resolve(promise).then(resolve, reject);
    }
  });
};

// 测试
let p1 = new Promise((resolve) => setTimeout(() => resolve("快的"), 500));
let p2 = new Promise((resolve) => setTimeout(() => resolve("慢的"), 1000));

Promise.myRace([p1, p2]).then(console.log).catch(console.error);
// 500ms 后输出: "快的"
```
# foreach \ map \  reduce
- foreach
```js
Array.prototype.myForEach = function (callback, thisArg) {
  if (typeof callback !== "function") {
    throw new TypeError(`${callback} is not a function`);
  }
  for (let i = 0; i < this.length; i++) {
    if (this.hasOwnProperty(i)) {
      callback.call(thisArg, this[i], i, this);
    }
  }
};
// 测试
let arr = [1, 2, 3];
arr.myForEach((item, index, array) => {
  console.log(`索引: ${index}, 值: ${item}, 数组:`, array);
});
```
- map
```js
Array.prototype.myMap = function (callback, thisArg) {
  if (typeof callback !== "function") {
    throw new TypeError(`${callback} is not a function`);
  }
  let result = [];
  for (let i = 0; i < this.length; i++) {
    if (this.hasOwnProperty(i)) {
      result.push(callback.call(thisArg, this[i], i, this));
    }
  }
  return result;
};
// 测试
let arr = [1, 2, 3];
let newArr = arr.myMap((item, index) => item * 2 + index);
console.log(newArr); // [2, 5, 8]
```
- reduce
```js
Array.prototype.myReduce = function (callback, initialValue) {
  if (typeof callback !== "function") {
    throw new TypeError(`${callback} is not a function`);
  }
  let accumulator = initialValue !== undefined ? initialValue : this[0];
  let startIndex = initialValue !== undefined ? 0 : 1;
  for (let i = startIndex; i < this.length; i++) {
    if (this.hasOwnProperty(i)) {
      accumulator = callback(accumulator, this[i], i, this);
    }
  }
  return accumulator;
};
// 测试
let arr = [1, 2, 3, 4];
// 计算数组和
let sum = arr.myReduce((acc, curr) => acc + curr, 0);
console.log(sum); // 10
```
# 深拷贝、浅拷贝
- 浅拷贝
```js
// Object.assign()
function shallowCopy(obj) {
  return Object.assign({}, obj);
}
// 测试
let obj1 = { a: 1, b: { c: 2 } };
let copy1 = shallowCopy(obj1);
copy1.b.c = 100;
console.log(obj1.b.c); // 100（原对象被修改）
// 使用展开运算符 ...
function shallowCopy(obj) {
  return { ...obj };
}
```
- 深拷贝
```js
function deepCopy(obj, cache = new WeakMap()) {
  if (obj === null || typeof obj !== "object") return obj; // 基本类型直接返回
  if (cache.has(obj)) return cache.get(obj); // 解决循环引用
  let result = Array.isArray(obj) ? [] : {};
  cache.set(obj, result);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepCopy(obj[key], cache);
    }
  }
  return result;
}
// 测试
let obj3 = { a: 1, b: { c: 2 }, d: function () { return "hello"; } };
obj3.self = obj3; // 循环引用
let copy3 = deepCopy(obj3);
console.log(copy3); // { a: 1, b: { c: 2 }, d: [Function: d], self: [Circular] }
```

变量对象、变量对象的创建过程
# 如何实现图片懒加载
```html
<img src="image.jpg" alt="示例图片" loading="lazy">
```

# settimout 模拟实现 setinterval  - 如何真正实现 timout
```js
function mySetInterval(fn, delay) {
  let timer = null;
  function loop() {
    const start = Date.now();
    timer = setTimeout(() => {
      fn();
      const elapsed = Date.now() - start;
      loop(Math.max(0, delay - elapsed)); // 补偿误差
    }, delay);
  }
  loop();
  return {
    clear: () => clearTimeout(timer),
  };
}
// 测试
const timer = mySetInterval(() => {
  console.log("Executing:", new Date().toLocaleTimeString());
}, 1000);
setTimeout(() => {
  timer.clear();
  console.log("Timer stopped");
}, 5000);
```
# 原型链和原型链继承
- 在 JavaScript 中，每个对象都有一个特殊的隐藏属性 [[Prototype]]（即 __proto__），指向其构造函数的原型对象（prototype），这形成了一条原型链（Prototype Chain）。
当访问对象的属性或方法时：
先查找自身属性
找不到就沿着原型链向上查找
直到 Object.prototype，找不到就返回 undefined


# hasOwnProperty()
- hasOwnProperty() 是 Object.prototype 上的一个方法，用于检查对象自身是否具有某个自有属性（不会检查原型链上的属性）。

margin 重叠
img srcset 属性
左右上下居中
loader 和 plugin 有什么区别
tree shaking 和 code splitting
valueof
手动实现双向数据绑定
数组 flat 方法
# 手写 object.create
```js
function myObjectCreate(proto, propertiesObject) {
  if (typeof proto !== "object" && proto !== null) {
    throw new TypeError("Prototype must be an object or null");
  }
  function F() {} // 创建一个空的构造函数
  F.prototype = proto; // 继承 proto
  const obj = new F(); // 创建实例对象
  // 如果有第二个参数，则定义属性
  if (propertiesObject !== undefined) {
    Object.defineProperties(obj, propertiesObject);
  }
  return obj;
}
```

# 实现发布-订阅模式
```js
class EventEmitter {
  constructor() {
    this.events = {}; // 存储事件和对应的回调
  }
  // 订阅事件
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = []; // 初始化事件数组
    }
    this.events[event].push(callback);
  }
  // 取消订阅
  off(event, callback) {
    if (!this.events[event]) return;

    this.events[event] = this.events[event].filter(cb => cb !== callback);
  }
  // 触发事件
  emit(event, ...args) {
    if (!this.events[event]) return;

    this.events[event].forEach(callback => callback(...args));
  }
  // 订阅一次
  once(event, callback) {
    const onceWrapper = (...args) => {
      callback(...args);
      this.off(event, onceWrapper); // 触发后立即取消订阅
    };
    this.on(event, onceWrapper);
  }
}
```
# 手写 new 操作符
📌 1. new 关键字的执行步骤
创建一个新对象
将这个对象的 __proto__ 指向构造函数的 prototype
执行构造函数，并将 this 绑定到新对象
如果构造函数返回对象，则返回该对象，否则返回新对象
等价于：
```js
function myNew(Constructor, ...args) {
  let obj = {}; // 1️⃣ 创建新对象
  obj.__proto__ = Constructor.prototype; // 2️⃣ 继承原型
  let result = Constructor.apply(obj, args); // 3️⃣ 绑定 this 并执行构造函数
  return result instanceof Object ? result : obj; // 4️⃣ 返回对象
}
// 2. 测试 myNew()
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const p1 = myNew(Person, "Alice", 25);
console.log(p1.name); // Alice
console.log(p1.age);  // 25
console.log(p1 instanceof Person); // true

//instanceof 依赖原型链，我们可以手动实现：
function myInstanceOf(obj, Constructor) {
  let proto = Object.getPrototypeOf(obj);
  while (proto) {
    if (proto === Constructor.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}
console.log(myInstanceOf(p1, Person)); // true
```

# diff 算法
📌 3. Vue 列表 Diff（核心优化）
Vue 采用“双端 Diff”策略：

头对头（newStart vs oldStart）
尾对尾（newEnd vs oldEnd）
头对尾（newStart vs oldEnd）
尾对头（newEnd vs oldStart）
中间查找 key 复用（使用 key 加速查找）
```js
function patch(oldVNode, newVNode) {
  if (oldVNode.tag !== newVNode.tag) {
    replaceNode(oldVNode, newVNode); // 直接替换
  } else {
    updateProps(oldVNode, newVNode); // 更新 props
    updateChildren(oldVNode.children, newVNode.children); // 递归子节点
  }
}
```
# nextTick 原理
nextTick 主要用于 在 DOM 更新完成后执行回调，常用于获取最新 DOM 状态。Vue 异步更新 DOM，所以 nextTick 解决了数据变化后，获取到的 DOM 还未更新的问题。
vuex vue 响应式原理
首屏加载优化
# vue-cli 手动实现脚手架
✅ 使用 commander.js 解析命令
✅ 使用 inquirer.js 交互选择 Vue 版本
✅ 使用 download-git-repo 下载模板
✅ 优化 CLI 体验，显示进度和提示

移动端 300ms 延迟
页面重构、webpack 打包文件体积过大、如何优化 webpack 的构建性能，vite
数组转化为对象
填充合并数组 concat ...运算符 set map
两个数组的交集
去除假值
获取随机值
类、抽象类、接口
promise 语法糖
# hash 和 history 模式
| 对比项       | Hash 模式                           | History 模式                         |
|------------|---------------------------------|---------------------------------|
| **URL 形式** | `http://example.com/#/home`    | `http://example.com/home`      |
| **实现方式** | `location.hash` + `hashchange` | `history.pushState` + `popstate` |
| **兼容性**  | ✅ 兼容所有浏览器                | ❌ 需要服务器支持，不兼容 IE9   |
| **是否 SEO 友好** | ❌ 否（搜索引擎不解析 `#` 之后的内容） | ✅ 是（需要配合 SSR）       |
| **页面刷新** | ✅ 正常工作                     | ❌ 需要服务器配置，否则 404   |
| **使用场景** | 无需服务器支持的 SPA            | 需要 SEO、优化 URL 的应用      |

# for in for of
| 对比项       | `for...in`                          | `for...of`                          |
|------------|---------------------------------|--------------------------------|
| **适用范围** | **对象、数组、字符串**         | **数组、字符串、Map、Set、迭代器** |
| **遍历内容** | **对象的键名（索引或属性名）** | **数组的元素值**               |
| **是否适用于对象** | ✅ 适用于对象                   | ❌ 不能直接用于对象（需 `Object.entries()`） |
| **是否适用于数组** | ✅ 遍历索引                     | ✅ 直接遍历值                  |
| **是否遍历原型链** | ✅ 会遍历原型链                 | ❌ 不会遍历原型链              |
| **是否可用于 Map/Set** | ❌ 不可直接用于 Map/Set        | ✅ 可用于 Map/Set              |
| **适用场景** | 遍历对象属性、数组索引           | 遍历数组、字符串、迭代对象      |

# 箭头函数为什么不能 new，程序不会给箭头函数创建 args 对象
- 箭头函数不能作为构造函数，因为它没有自己的 this，也没有 prototype，所以无法使用 new 关键字来实例化对象。
🔹 1. new 关键字的工作原理
  当使用 new 关键字调用一个函数时，会发生以下步骤：

  创建一个新对象。
  新对象的 __proto__ 指向构造函数的 prototype。
  执行构造函数，this 绑定到新对象。
  如果构造函数返回对象，则返回该对象，否则返回 this。
  但是 箭头函数没有 prototype，所以无法执行 第 2 步，导致 new 失败。
- 
箭头函数没有 prototype
无法绑定 this：
new 需要创建一个新的 this，但箭头函数的 this 继承自外层作用域，无法被改变。
- 箭头函数没有 arguments  解决方法：用 rest 参数 获取参数    (...args) => 

# 进程、线程
| **对比项**  | **进程（Process）**                  | **线程（Thread）**                 |
|------------|--------------------------------|--------------------------------|
| **定义**   | **程序的执行实例**，拥有独立的内存空间 | **进程中的执行单元**，共享进程资源 |
| **资源独立性** | ✅ 进程间资源独立，不影响其他进程   | ❌ 线程间共享内存，可能影响其他线程 |
| **通信方式** | **进程间通信（IPC）**，如管道、消息队列 | **共享内存，直接读写数据**        |
| **开销**   | **创建和切换开销大**，需分配独立资源 | **创建和切换开销小**，线程切换更快 |
| **并发性** | ✅ 可并行执行多个任务                 | ✅ 线程并发，但受 CPU 核心数限制 |
| **稳定性** | ✅ 一个进程崩溃不影响其他进程         | ❌ 线程崩溃可能影响整个进程       |
| **适用场景** | **独立运行的程序（浏览器、多进程架构）** | **计算密集型任务（多线程爬虫、游戏渲染）** |

🔹 **示例**
- **进程示例**：Chrome 浏览器的每个标签页是一个独立进程
- **线程示例**：浏览器中的 JavaScript 运行在 **单线程** 模式下


# setTimout 、promise、async/await 执行顺序
```js
# **📌 setTimeout、Promise、async/await 执行顺序**

JavaScript 任务队列分为：
- **同步任务（Synchronous）**：主线程上的代码，立即执行
- **微任务（Microtask）**：`Promise.then`、`MutationObserver`、`queueMicrotask`
- **宏任务（Macrotask）**：`setTimeout`、`setInterval`、`setImmediate`、`requestAnimationFrame`

## **🔹 执行顺序**
1. 先执行 **同步代码**
2. 执行 **微任务队列**
3. 执行 **宏任务队列**
4. **循环执行以上步骤**

---

## **🔹 示例 1**

console.log("1"); // 同步

setTimeout(() => {
  console.log("2"); // 宏任务
}, 0);

Promise.resolve().then(() => {
  console.log("3"); // 微任务
});

console.log("4"); // 同步
//最终的值
1
4
3
2

```

DOM ccssdom render tree
requestAnimationFrame、setTimeout、setImmediate
如何优化 for 循环的性能
compositiion API 和 optionAPI
# 为什么 vite 比 webpack 快
1. Vite 利用了 ES 模块（ESM）
Webpack：需要 打包所有依赖 后再启动，初始构建慢。
Vite：使用 原生 ES 模块，仅按需加载文件，启动速度快。
Vite 不需要打包整个项目，而是直接在浏览器中解析 import，只编译被访问的文件。
2. Vite 依赖预构建（Esbuild，比 Webpack 快 10~100 倍）
Vite 使用 Esbuild（用 Go 语言编写）预构建依赖，而 Webpack 使用 JavaScript 处理所有文件。
3. Vite 采用按需编译，而 Webpack 需要整体打包
| 对比项       | Webpack（慢）          | Vite（快）                   |
|-------------|----------------------|-----------------------------|
| 启动时间     | ⏳ 慢（需要整体打包）   | ⚡ 快（按需编译）            |
| 依赖构建     | 📦 Webpack 解析 & 编译 | 🚀 Esbuild 预构建（超快）    |
| 热更新（HMR）| 🔄 全量打包           | 🔥 按需模块更新              |
| 生产环境     | ✅ Tree-shaking       | ✅ Rollup 构建               |
| 适用场景     | 适合大型复杂项目       | 适合前端开发和轻量项目       |

# vue3 和 vue2

| 优化点       | Vue 2（慢）                    | Vue 3（快）                       |
|-------------|-----------------------------|--------------------------------|
| 响应式原理   | Object.defineProperty（递归劫持） | Proxy（按需劫持）               |
| 静态提升     | ❌ 重新创建所有 VNode         | ✅ 静态节点不重新创建             |
| Patch Flag | ❌ diff 整个 VNode            | ✅ 只 diff 变化部分              |
| 组件优化     | Vue.extend 组件实例大        | defineComponent 更轻量         |
| HMR（热更新）| 全量替换组件                 | 仅更新影响部分                   |
| SSR 性能     | 只能全量渲染                 | 支持流式渲染                     |
| Diff 算法    | 遍历所有子节点               | Block Tree 结构化 diff         |
🎯 Vue 3 主要优化点
Proxy 响应式更快，减少 getter/setter 开销。
静态提升 + Block Tree 结构，减少 VNode 计算。
Patch Flag 提高 diff 速度，避免全量更新。
更轻量的组件实例，减少组件初始化时间。
SSR 更快，支持流式渲染，提升首屏速度。

如何优化前端构建速度、如何做前端监控（sentry、性能埋点）

反转链表
快速排序、归并排序
LRU 缓存机制手写
树的前序、中序、后序遍历
用 js 实现一个 LazyMan
