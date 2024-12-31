import{_ as i,c as a,a5 as n,o as e}from"./chunks/framework.DLfFkZZM.js";const o=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"components/typeScript/2.工欲善其事：打造最舒适的 TypeScript 开发环境.md","filePath":"components/typeScript/2.工欲善其事：打造最舒适的 TypeScript 开发环境.md"}'),p={name:"components/typeScript/2.工欲善其事：打造最舒适的 TypeScript 开发环境.md"};function t(l,s,r,h,k,d){return e(),a("div",null,s[0]||(s[0]=[n(`<p>在正式开始小册的学习前，我们还有一件事要做，那就是搭建 TypeScript 的开发环境。一个舒适、便捷且顺手的开发环境，不仅能大大提高学习效率，也会对我们日常的开发工作有很大帮助。</p><p>这一节我们就来介绍 VS Code 下的 TypeScript 环境搭建：插件以及配置项。对于 TS 文件的执行，我们会介绍 ts-node、ts-node-dev 等工具，帮助你快速验证 TS 代码的执行结果。而如果你只想快速开始学习，我们也会介绍 TypeScript 官方提供的 TypeScript Playground，利用它你可以快速开始编写及分享 TS 代码。最后，我们还会介绍如何通过 TS 声明的方式来检查类型兼容性。</p><p>话不多说，我们快点开始吧~</p><blockquote><p>本节代码见：<a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Flinbudu599%2FTypeScript-Tiny-Book%2Ftree%2Fmain%2Fpackages%2F00-starter" target="_blank" rel="noreferrer">Starter</a></p></blockquote><h2 id="vs-code-配置与插件" tabindex="-1">VS Code 配置与插件 <a class="header-anchor" href="#vs-code-配置与插件" aria-label="Permalink to &quot;VS Code 配置与插件&quot;">​</a></h2><p>VS Code 本身就是由 TypeScript 编写的，因此它对 TypeScript 有着非常全面的支持，包括类型检查、补全等功能，我们需要的两个 TS 插件都来自于社区，这两个插件分别提供了<strong>类型的自动导入</strong>，和<strong>快速移动 TypeScript 文件</strong>的能力。</p><p>首先是 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Dpmneo.tsimporter" target="_blank" rel="noreferrer">TypeScript Importer</a> 。这一插件会收集你项目内所有的类型定义，在你敲出<code>:</code>时提供这些类型来进行补全。如果你选择了一个，它还会自动帮你把这个类型导入进来。效果如图所示：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e1d8491139134f64a8463cae3efe2e0a~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp" alt="img"></p><p>这一功能在日常开发中真得非常非常好用，尤其是当项目里有数百个声明分散在各个文件中时。</p><p><a href="https://link.juejin.cn/?target=https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Dstringham.move-ts" target="_blank" rel="noreferrer">Move TS</a>，这一插件在重构以及像我们这样写 demo 的场景下很有帮助。它可以让你通过编辑文件的路径，直接修改项目的目录结构。比如从<code>home/project/learn-interface.ts</code> 修改成 <code>home/project/interface-notes/interface-extend.ts</code>，这个插件会自动帮你把文件目录更改到对应的样子，并且更新其他文件中对这一文件的导入语句。</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/709297374052475aac0899feeb6f3db7~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?" alt="usage.gif"></p><p>当然，对于 VS Code 内置的 TypeScript 支持，我们也可以通过一些配置项获得更好的开发体验。首先，你需要通过 Ctrl(Command) + Shift + P 打开命令面板，找到「打开工作区设置」这一项。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a9f29717e89747858ffd9bdf9a23a6a4~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp" alt="open setting"></p><p>然后，在打开的设置中输入 typescript，筛选出所有 TypeScript 有关的配置，点击左侧的&quot;TypeScript&quot;，这里才是官方内置的配置。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b52df396bc824134a1baed397c11d328~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp" alt="img"></p><p>我们需要做的就是开启一些代码提示功能（hints），我们知道 TS 能够在很多地方进行类型地自动推导，但你往往要把鼠标悬浮在代码上才能看到推导得到的类型，其实我们可以通过配置将这些推导类型显示出来：</p><p>在前面配置搜索处，搜索 &#39;typescript Inlay Hints&#39;，展示的配置就都是提示相关的了，推荐开启的有这么几个：</p><ul><li>Function Like Return Types，显示推导得到的函数返回值类型；</li><li>Parameter Names，显示函数入参的名称；</li><li>Parameter Types，显示函数入参的类型；</li><li>Variable Types，显示变量的类型。</li></ul><p>以上选项开启后的效果如下：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/09e04fa5fc3848f091c1f8239e5e8ca7~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp" alt="eg"></p><p>当然，并不是所有人都习惯这样的显示方式，你可以根据自己的需要进行调整。除了这些提示的配置以外，VS Code 还支持了百余项 TS 配置，你可以看看是否有你需要的配置。</p><h3 id="其他插件" tabindex="-1">其他插件 <a class="header-anchor" href="#其他插件" aria-label="Permalink to &quot;其他插件&quot;">​</a></h3><p>除了 TS 强相关的插件与配置，还有一些额外的、能提升你学习效率的插件，你可以依据自己的喜好进行添加，以下的插件列表将会不定期进行更新。</p><ul><li><p><a href="https://link.juejin.cn/?target=https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3DPhilHindle.errorlens" target="_blank" rel="noreferrer">ErrorLens</a>，这一插件能够把你的 VS Code 底部问题栏的错误下直接显示到代码文件中的对应位置，比如这样：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b16f1d32b46c45778beeafc3b8efdefe~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp" alt="img"></p></li></ul><h2 id="playground-懒人福音" tabindex="-1">Playground：懒人福音 <a class="header-anchor" href="#playground-懒人福音" aria-label="Permalink to &quot;Playground：懒人福音&quot;">​</a></h2><p>如果你只是想拥有一个简单的环境，能写 TypeScript，能检查错误，能快速地调整 tsconfig，那官方提供的 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fwww.typescriptlang.org%2Fzh%2Fplay" target="_blank" rel="noreferrer">Playground</a> 一定能满足你的需求。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/639fab7a1fc9437580d541f3d9819160~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp" alt="img"></p><p>你可以在这里编写 TS 代码，快速查看编译后的 JS 代码与声明文件，还可以通过 Shift + Enter 来执行 TS 文件。可以说，如果不需要 VS Code 更强大的提示能力与一些特殊插件、主题等，Demo 学习使用 Playground 真的够够的了。</p><p>Playground 最强大的能力其实在于，支持非常简单的配置切换，如 TS 版本（左上角 ），以及通过可视化的方式配置 tsconfig （左上角的配置）等，非常适合在这里研究 tsconfig 各项配置的作用。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c402069d1bc541398e4c6d24571d453b~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp" alt="img"></p><h2 id="ts-文件的快速执行-ts-node-与-ts-node-dev" tabindex="-1">TS 文件的快速执行：ts-node 与 ts-node-dev <a class="header-anchor" href="#ts-文件的快速执行-ts-node-与-ts-node-dev" aria-label="Permalink to &quot;TS 文件的快速执行：ts-node 与 ts-node-dev&quot;">​</a></h2><p>当然，如果你主要是想执行 TypeScript 文件，就像 <code>node index.js</code> 这样快速地验证代码逻辑，这个时候你就需要 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FTypeStrong%2Fts-node" target="_blank" rel="noreferrer">ts-node</a> 以及 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fwclr%2Fts-node-dev" target="_blank" rel="noreferrer">ts-node-dev</a> 这一类工具了。它们能直接执行 ts 文件，并且支持监听文件重新执行。同时，它们也支持跳过类型检查这一步骤来获得更快的执行体验。</p><p>对于 ts-node，你可以将其安装到项目本地或直接全局安装，我个人更推荐安装到全局然后配置 alias 快速启动，像 <code>tsn index.ts</code> 这样。执行以下命令将 ts-node 与 typescript 安装到全局：</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> i</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ts-node</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> typescript</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -g</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>然后，在项目中执行以下命令创建 TypeScript 的项目配置文件： tsconfig.json。</p><div class="language-typescript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">npx typescript </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">init</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 如果全局安装了 TypeScript，可以这么做</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tsc </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">init</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>接着，创建一个 TS 文件：</p><div class="language-typescript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Hello TypeScript&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>再使用 ts-node 执行：</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ts-node</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> index.ts</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>如果一切正常，此时你的终端能够正确地输出字符。ts-node 可以通过两种方式进行配置，在 tsconfig 中新增 <code>&#39;ts-node&#39;</code> 字段，或在执行 ts-node 时作为命令行的参数，这里我们主要介绍通过命令行进行常用配置的方式。</p><ul><li><code>-P,--project</code>：指定你的 tsconfig 文件位置。默认情况下 ts-node 会查找项目下的 tsconfig.json 文件，如果你的配置文件是 <code>tsconfig.script.json</code>、<code>tsconfig.base.json</code> 这种，就需要使用这一参数来进行配置了。</li><li><code>-T, --transpileOnly</code>：禁用掉执行过程中的类型检查过程，这能让你的文件执行速度更快，且不会被类型报错卡住。这一选项的实质是使用了 TypeScript Compiler API 中的 transpileModule 方法，我们会在后面的章节详细讲解。</li><li><code>--swc</code>：在 transpileOnly 的基础上，还会使用 swc 来进行文件的编译，进一步提升执行速度。</li><li><code>--emit</code>：如果你不仅是想要执行，还想顺便查看下产物，可以使用这一选项来把编译产物输出到 <code>.ts-node</code> 文件夹下（需要同时与 <code>--compilerHost</code> 选项一同使用）。</li></ul><p>除了直接使用 ts-node 以外，你也可以通过 node + require hook 的形式来执行 TS 文件：</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">node</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -r</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ts-node/register</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> index.ts</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>但此时，如果想要传递参数给 ts-node ，你就需要使用环境变量了，比如要传递之前的 transpileOnly 选项：</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">TS_NODE_TRANSPILE_ONLY</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">true</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> node</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -r</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ts-node/register</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> index.ts</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>关于选项对应的环境变量，请参考 ts-node 的官方文档了解更多。</p><p>ts-node 本身并不支持自动地监听文件变更然后重新执行，而这一能力又是某些项目场景下的刚需，如 NodeJs API 的开发。因此，我们需要 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fwclr%2Fts-node-dev" target="_blank" rel="noreferrer">ts-node-dev</a> 库来实现这一能力。ts-node-dev 基于 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Ffgnass%2Fnode-dev" target="_blank" rel="noreferrer">node-dev</a>（你可以理解一个类似 nodemon 的库，提供监听文件重新执行的能力） 与 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FTypeStrong%2Fts-node" target="_blank" rel="noreferrer">ts-node</a> 实现，并在重启文件进程时共享同一个 TS 编译进程，避免了每次重启时需要重新实例化编译进程等操作。</p><p>首先，我们还是在全局安装：</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> i</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ts-node-dev</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -g</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>ts-node-dev 在全局提供了 <code>tsnd</code> 这一简写，你可以运行 <code>tsnd</code> 来检查安装情况。最常见的使用命令是这样的：</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ts-node-dev</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --respawn</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --transpile-only</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> app.ts</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>respawn 选项启用了监听重启的能力，而 transpileOnly 提供了更快的编译速度。你可以查看官方仓库来了解更多选项，但在大部分场景中以上这个命令已经足够了。</p><h2 id="更方便的类型兼容性检查" tabindex="-1">更方便的类型兼容性检查 <a class="header-anchor" href="#更方便的类型兼容性检查" aria-label="Permalink to &quot;更方便的类型兼容性检查&quot;">​</a></h2><p>某些时候，我们在进行类型比较时，需要使用一个具有具体类型的变量与一个类型进行赋值操作，比如下面这个例子中：</p><div class="language-typescript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">interface</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Foo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  name</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  age</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">interface</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Bar</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  name</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  job</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> foo</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Foo</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;林不渡&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  age: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">18</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> bar</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Bar</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;林不渡&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  job: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;fe&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">foo </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> bar;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>在“只是想要进行类型比较”的前提下，其实并没有必要真的去声明两个变量，即涉及了值空间的操作。我们完全可以只在类型空间中（你可以理解为<strong>用于存放 TypeScript 类型信息的内存空间</strong>）比较这些类型，只需要使用 declare 关键字：</p><div class="language-typescript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">interface</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Foo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  name</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  age</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">interface</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Bar</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  name</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  job</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">declare</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> foo</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Foo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">declare</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> bar</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Bar</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">foo </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> bar;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>你可以理解为在开始时的例子，我们使用一个值空间存放这个变量具体的属性，一个类型空间存放这个变量的类型。而通过 declare 关键字，我们声明了一个仅在类型空间存在的变量，它在运行时完全不存在，这样就避免了略显繁琐的属性声明。</p><p>对于类型兼容的检查，除了两两声明然后进行赋值以外，我们还可以通过工具类型的形式，如 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Ftsd" target="_blank" rel="noreferrer">tsd</a> 这个 npm 包提供的一系列工具类型，能帮助你进行声明式的类型检查：：</p><div class="language-typescript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { expectType } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;tsd&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">expectType</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;linbudu&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// √</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">expectType</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">599</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// ×</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><blockquote><p>这一部分的内容并不是初学需要掌握的，但你可以选择提前用起来，不必急着去理解具体的实现原理。</p></blockquote><p>它的结构大致是这样：<code>expectType&lt;你预期的类型&gt;(表达式或变量等)</code>，除了 <code>expectType</code>（检查预期类型与表达式或变量的类型是否一致），tsd 还提供了 <code>expectNotType</code>（检查预期类型与表达式或变量的类型是否不同）、<code>expectAssignable</code>（检查表达式或变量的类型是否能赋值给预期类型）等工具类型，其中涉及工具类型与泛型的知识，我们会在后面的课程中一一讲解。</p><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>在这一节中，我们主要了解了 TypeScript 开发环境的搭建，包括了 VS Code 的配置、插件，使用 Playground 作为一个简易又强大的临时编辑器，以及如何使用 ts-node 与 ts-node-dev 来快速执行你的 ts 文件。在最后，我们稍微提前了一些对后面学习大有裨益的知识，即通过类型声明（declare）与 tsd 来进行更方便的类型兼容性检查。</p><p>这些知识不仅仅只在这本小册的学习过程中起到作用，它们在未来实际项目开发中也是你的得力助手。本着磨刀不误砍柴工的原则，请务必搭建出你最舒适的 TypeScript 开发环境后，再开始这本小册的学习。</p><h2 id="扩展阅读" tabindex="-1">扩展阅读 <a class="header-anchor" href="#扩展阅读" aria-label="Permalink to &quot;扩展阅读&quot;">​</a></h2><h3 id="require-extension" tabindex="-1">require extension <a class="header-anchor" href="#require-extension" aria-label="Permalink to &quot;require extension&quot;">​</a></h3><p>我们知道，node 中最早使用的是 CommonJs 与 require 来进行模块的导入，除了 <code>.js</code> 文件的导入以外，node 中还支持以扩展的形式来提供自定义扩展名的模块加载机制，这也是 ts-node、<a href="https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2F%40adonisjs%2Frequire-ts" target="_blank" rel="noreferrer">require-ts</a> （允许你去 require 一个 TS 文件）这些工具库的工作原理，它们的核心逻辑其实都是通过 <code>require.extension</code>，注册了 <code>.ts</code> 文件的处理逻辑：</p><div class="language-typescript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">require.extenstions[</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;.ts&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">module</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">filename</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> content</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> fs.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">readFileSync</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(filename, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;utf8&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  module</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_compile</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(content, filename)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>在 require-ts 中，使用了 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fpirates" target="_blank" rel="noreferrer">pirates</a> 这个库来简化注册逻辑：</p><div class="language-typescript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> compiler</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Compiler</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">addHook</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">code</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">filename</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> compiler.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">compile</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(filename, code)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  { exts: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;.ts&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;.tsx&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">], </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">matcher</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>NodeJs 中的 require 逻辑执行大概是这样的：</p><ul><li>Resolution，基于入参拼接出 require 文件的绝对路径，当路径中不包含后缀名时，会按照 node 的模块解析策略来进行处理，如 <code>require(&#39;./utils&#39;)</code> 会解析到 <code>PATH/TO/project/utils.js</code>，而 <code>require(&#39;project-utils&#39;)</code> 会解析到 <code>PATH/TO/project/node_modules/project-utils/src/index.js</code>，以及内置模块等。需要注意的是在浏览器中，require <strong>需要带上完整的后缀名</strong>（浏览器并不能查找服务器的文件），但一般 bundler 会帮你处理好。</li><li>基于绝对路径，去 <code>require.cache</code> 这个全局变量中，查找此文件是否已经已缓存，并在存在时直接使用缓存的文件内容（即这个文件的导出信息等）。</li><li>Loading，基于绝对路径实例化一个 Module 类实例，基于路径后缀名调用内置的处理函数。比如 js、json 文件都是通过 <code>fs.readFileSync</code> 读取文件内容。</li><li>Wrapping，对于 js 文件，将文件内容字符串外层包裹一个函数，执行这个函数。对于 Json 文件，将内容包裹挂载到 <code>module.exports</code> 下。</li><li>Evaluating，执行这个文件内容。</li><li>Caching，对于未曾缓存的文件，将其执行结果缓存起来。</li></ul><p>在上述过程中进行操作拦截，就可以实现很多有用的功能。比如对 <code>.ts</code> 文件去注册自定义的处理函数，将其编译为可以直接执行的 js 代码（<code>ts-node/register</code>），对 <code>.js</code> 代码进行预处理（babel-register），在代码执行时进行覆盖率统计（istanbul）。以及，对 <code>require.cache</code> 进行缓存清除来实现 node 服务的热更新（decache），但这里涉及到 require cache 的缓存策略，与本小册的主题没有太大关联，就不做展开啦。</p>`,75)]))}const g=i(p,[["render",t]]);export{o as __pageData,g as default};
