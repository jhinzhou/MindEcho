# 模块重导 Re-export

- 例如使用字节组件库 `arco-design`

```js
// 不使用重导
import Modal from '@arco-design/web-react/es/Modal'
import Checkbox from '@arco-design/web-react/es/Checkbox'
import Message from '@arco-design/web-react/es/Message'
...
// 使用重导
import { Modal, Checkbox, Message} from '@arco-design/web-react'
// 通过收拢同类型模块，譬如： components 、routes 、utils 、hooks 、stories 等的 index.js暴露出去，就可以极大程度的提高代码的可读性、维护性
```

## Re-export 的几种形式

- 直接重导出

```js
export { foo, bar } from './module';
```

- 重命名导出，包含默认导出

```js
// 通过 export 导出的
export { foo as newFoo, bar as newBar } from './module';
// 通过 export default 导出的
export { default as ModuleDefault } from './module';
```

- 重导出整个模块，不包含默认导出

```js
export * from './module';
```

- 收拢结合导入与重导出

```js
import { foo, bar } from './module';
export { foo, bar }
```

## 等等
