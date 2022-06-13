# lxjr-component 组件库

### 快速开始

#### 1. 安装组件库

```bash
npm i lxjr-component
```

#### 2. 引用组件库

```javascript
// 全部引入
import "lxjr-component/dist/css/index.css";
import LxjrComponent from "lxjr-component";

Vue.use(LxjrComponent);

// 按需引入
import "lxjr-component/dist/css/demo.css";
import { Demo } from "lxjr-component";

Vue.use(Demo)
```


### 注意事项
1. 项目基于 `ant-design-vue`，使用 `npm i ant-design-vue@1.x` 
2. 在项目中引入 `ant-design-vue`
```javascript
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.use(Antd)
```
