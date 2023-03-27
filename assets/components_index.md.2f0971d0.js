import{_ as l,c as p,x as s,C as o,a as n,N as e,o as t,D as c}from"./chunks/framework.6a47aca6.js";const b=JSON.parse('{"title":"毛玻璃渐变","description":"","frontmatter":{},"headers":[],"relativePath":"components/index.md"}'),i={name:"components/index.md"},r=s("h1",{id:"毛玻璃渐变",tabindex:"-1"},[n("毛玻璃渐变 "),s("a",{class:"header-anchor",href:"#毛玻璃渐变","aria-label":'Permalink to "毛玻璃渐变"'},"​")],-1),C=e(`<div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;div class=&quot;g-bg&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div class=&quot;g-polygon g-polygon-1&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div class=&quot;g-polygon g-polygon-2&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div class=&quot;g-polygon g-polygon-3&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">.g-polygon {</span></span>
<span class="line"><span style="color:#A6ACCD;">    position: absolute;</span></span>
<span class="line"><span style="color:#A6ACCD;">    opacity: .5;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">.g-polygon-1 {</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 定位代码，容器高宽随意</span></span>
<span class="line"><span style="color:#A6ACCD;">    background: #ffee55;</span></span>
<span class="line"><span style="color:#A6ACCD;">    clip-path: polygon(0 10%, 30% 0, 100% 40%, 70% 100%, 20% 90%);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">.g-polygon-2 {</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 定位代码，容器高宽随意</span></span>
<span class="line"><span style="color:#A6ACCD;">    background: #E950D1;</span></span>
<span class="line"><span style="color:#A6ACCD;">    clip-path: polygon(10% 0, 100% 70%, 100% 100%, 20% 90%);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">.g-polygon-3 {</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 定位代码，容器高宽随意</span></span>
<span class="line"><span style="color:#A6ACCD;">    background: rgba(87, 80, 233);</span></span>
<span class="line"><span style="color:#A6ACCD;">    clip-path: polygon(80% 0, 100% 70%, 100% 100%, 20% 90%);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>2.使用 backdrop-filter 实现高斯蒙版</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">.g-bg::before {</span></span>
<span class="line"><span style="color:#A6ACCD;">        content: &quot;&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">        position: fixed;</span></span>
<span class="line"><span style="color:#A6ACCD;">        top: 0; left: 0; bottom: 0; right: 0;</span></span>
<span class="line"><span style="color:#A6ACCD;">        backdrop-filter: blur(150px);</span></span>
<span class="line"><span style="color:#A6ACCD;">        z-index: 1;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div>`,3);function A(y,g,d,D,_,u){const a=c("StyleView");return t(),p("div",null,[r,s("div",null,[o(a)]),n(" 1.首先我们用三个div标签使用 clip-path 实现三个多边形 "),C])}const m=l(i,[["render",A]]);export{b as __pageData,m as default};
