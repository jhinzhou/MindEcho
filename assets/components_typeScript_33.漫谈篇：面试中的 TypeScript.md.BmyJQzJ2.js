import{_ as a,c as t,a5 as r,o as i}from"./chunks/framework.DLfFkZZM.js";const y=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"components/typeScript/33.漫谈篇：面试中的 TypeScript.md","filePath":"components/typeScript/33.漫谈篇：面试中的 TypeScript.md"}'),o={name:"components/typeScript/33.漫谈篇：面试中的 TypeScript.md"};function p(n,e,l,c,h,s){return i(),t("div",null,e[0]||(e[0]=[r('<p>TypeScript 在前端领域的重要性正在不断提升，那么很自然地，面试过程中对 TypeScript 技能的考察也会逐渐上升到和 Vue / React 技能一样的地位。</p><p>那么，如果 TypeScript 在面试中出现，它又会变成什么样子？首先你可以放心的是，面试中大概率不会出现超出这本小册的知识难度，如果出现了，那可能说明这场面试比较奇妙...</p><p>在这一节中，我们会来聊聊几个可能出现的面试题，依次进行一下从及格线到优秀回答的进阶。</p><blockquote><p>本节不会包含过于基础的内容，如 TypeScript 中包含的基础类型、类型断言的语法这种。</p></blockquote><h2 id="interface-与-type-异同点" tabindex="-1">interface 与 type 异同点 <a class="header-anchor" href="#interface-与-type-异同点" aria-label="Permalink to &quot;interface 与 type 异同点&quot;">​</a></h2><p>这可能是最经典的一道 TS 面试题了，因此这里我们放在第一个知识点来讲解。</p><h3 id="及格线" tabindex="-1">及格线 <a class="header-anchor" href="#及格线" aria-label="Permalink to &quot;及格线&quot;">​</a></h3><p>不论如何，以下这些概念是你需要基本了解的，否则很容易被怀疑是否真的深入使用过 TypeScript 。</p><ul><li>在对象扩展情况下，interface 使用 extends 关键字，而 type 使用交叉类型（<code>&amp;</code>）。</li><li>同名的 interface 会自动合并，并且在合并时会要求兼容原接口的结构。</li><li>interface 与 type 都可以描述对象类型、函数类型、Class 类型，但 interface 无法像 type 那样表达元组、一组联合类型等等。</li><li>interface 无法使用映射类型等类型工具，也就意味着在类型编程场景中我们还是应该使用 type 。</li></ul><h3 id="优秀回答" tabindex="-1">优秀回答 <a class="header-anchor" href="#优秀回答" aria-label="Permalink to &quot;优秀回答&quot;">​</a></h3><p>只是回答这些概念定义显得过于枯燥，而且很容易被认为像是在背书，因此你可以穿插自己在工程中的实践， 比如小册中提过的，使用 interface 来定义对象类型，使用类型别名来处理函数签名、联合类型、工具类型等等。这同样也代表了你对这两个工具的理解：<strong>interface 就是描述对象对外暴露的接口，其不应该具有过于复杂的类型逻辑，最多局限于泛型约束与索引类型这个层面。而 type alias 就是用于将一组类型的重命名，或是对类型进行复杂编程。</strong></p><p>另外，你也可以提到在官方的 Wiki 中，特别说明了在对象扩展的情况下，使用接口继承要比交叉类型的性能更好。</p><h2 id="类型兼容性比较" tabindex="-1">类型兼容性比较 <a class="header-anchor" href="#类型兼容性比较" aria-label="Permalink to &quot;类型兼容性比较&quot;">​</a></h2><p>这一问题主要考察你是否了解 TypeScript 类型系统的基本工作原理，以及使用的深入程度。因为通常来说，只有具有一定经验的使用者才会开始了解类型兼容性的相关规则，而了解这部分规则也就意味着你至少能够独立解决相当一部分类型报错。</p><h3 id="及格线-1" tabindex="-1">及格线 <a class="header-anchor" href="#及格线-1" aria-label="Permalink to &quot;及格线&quot;">​</a></h3><p>TypeScript 使用鸭子类型，也即结构化类型系统进行类型兼容性的比较，即对于两个属性完全一致的类型，就认为它们属于同一种类型。而对于 A 类型、A + B 类型，认为后者属于前者的子类型。另外 TypeScript 类型中还存在着一部分特殊的规则，如 object、{} 以及 Top Type 等。</p><h3 id="优秀回答-1" tabindex="-1">优秀回答 <a class="header-anchor" href="#优秀回答-1" aria-label="Permalink to &quot;优秀回答&quot;">​</a></h3><p>能回答出上面这些内容已经不错了，但你可是阅读完了这本小册的同学，怎么能轻易止步。如果想进一步升华回答，还可以从以下方面进行扩展。</p><ul><li><strong>结构化类型系统到标称类型系统</strong>，你可以表达你不仅了解结构化类型系统，还了解与其可以作为对比的标称类型系统，包括存在意义与比较方式，以及如何在 TS 中实现标称类型系统。</li><li><strong>类型层级</strong>，类型兼容性的比较本质上其实也就是在类型层级中进行比较，一个类型能够兼容其子类型，就这么回事，因此，不妨扩展地讲一讲 TS 的类型层级是怎么样的。</li></ul><h2 id="any、unknown-与-never" tabindex="-1">any、unknown 与 never <a class="header-anchor" href="#any、unknown-与-never" aria-label="Permalink to &quot;any、unknown 与 never&quot;">​</a></h2><p>这一部分主要考察你对内置 Top Type、Bottom Type 的理解，属于相对少见的考察，因此通常也不会要求过高。</p><h3 id="及格线-2" tabindex="-1">及格线 <a class="header-anchor" href="#及格线-2" aria-label="Permalink to &quot;及格线&quot;">​</a></h3><p>具体内容已经在小册中详细描述，这里只做简单叙述。any 与 unknown 在 TypeScript 类型层级中属于最顶层的 Top Type，也就意味所有类型都是它俩的子类型。而 never 则相反，作为 Bottom Type 的它是所有类型的子类型。</p><h3 id="优秀回答-2" tabindex="-1">优秀回答 <a class="header-anchor" href="#优秀回答-2" aria-label="Permalink to &quot;优秀回答&quot;">​</a></h3><p>面试的重要原则之一就是 WHY，在回答一个知识点的同时，如果能把这个知识点背后的存在原因也讲述清楚，很难不让面试官暗暗点头为你折服，因此你可以考虑从以下这么几个角度出发来进行扩展。</p><ul><li><strong>为什么需要 Top Type 与 Bottom Type ？</strong> 在实际开发中，我们不可能确保对所有地方的类型都进行精确的描述，因此就需要 Top Type 来表示一个包含任意类型的类型。而在类型编程中，如果对两个不存在交集的类型强行进行交集运算，也需要一个类型表示这个不存在的类型。这就是 Top Type 与 Bottom Type 的存在意义。</li><li><strong>类型层级</strong>，Top 与 Bottom 本身就是在描述它们在类型层级中的位置，因此，如果你能给面试官讲一遍从 Bottom 向上到 Top 的类型链，我觉得起码在 TypeScript 这个技能点上你已经基本得到肯定了。</li><li><strong>条件类型</strong>，Top Type 与 Bottom Type 带来的底层规则还不止表现在类型兼容性方面，在条件类型中同样存在对它们的特殊逻辑，请回想 any 与 never 在条件类型中的表现。</li></ul><h2 id="工具类型实现" tabindex="-1">工具类型实现 <a class="header-anchor" href="#工具类型实现" aria-label="Permalink to &quot;工具类型实现&quot;">​</a></h2><p>这一部分有可能需要你进行手写，但对于完成了整本小册阅读的你来说，肯定不是难事，这一部分就不做过多叙述了。</p><h3 id="及格线-3" tabindex="-1">及格线 <a class="header-anchor" href="#及格线-3" aria-label="Permalink to &quot;及格线&quot;">​</a></h3><p>比较简单的工具类型手写可能包括 Partial（Require）、Pick（Omit）、ReturnType（ParameterType），小册中均已介绍了相关实现与原理，这里就不再赘述。</p><h3 id="优秀回答-3" tabindex="-1">优秀回答 <a class="header-anchor" href="#优秀回答-3" aria-label="Permalink to &quot;优秀回答&quot;">​</a></h3><p>在完成手写的基础上，其实你也可以主动进行扩展。</p><ul><li>我不仅能写出这些基础实现，还能写出其在实际应用场景中的增强版，比如 DeepPartial 与 MarkAsPartial，PickByType 与 PickByStrictType 等等。</li><li>我不仅了解这些工具类型的实现，还了解它们可以被归纳为访问性修饰工具类型、结构处理工具类型、集合工具类型与模式匹配工具类型等等，同时对它们实现过程中使用到的类型工具也有较为深入的了解。</li></ul><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>这一节我们专项学习了几个可能在面试中被作为高频考点的 TypeScript 知识点，至于它们为什么会高频出现，其实也是有原因的，相比其它部分知识，这些考点难度适中，又能很少地筛选掉没有实际使用经验的候选人。而如果要进一步考察技能水平，则可能会考察类型工具使用、类型的控制流分析、复杂的类型编程以及装饰器等知识，这些内容同样在小册中有所体现。</p>',35)]))}const u=a(o,[["render",p]]);export{y as __pageData,u as default};
