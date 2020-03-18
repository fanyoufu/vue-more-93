## 目标

- 向组件库中添加新的组件divider
- 效果要基本与semantic一致





## 组件代码

divider.vue

```html
<template>
    <div class="ui divider" :class="cWrapClass">
    <i v-if="icon" class="bar chart icon"></i>
        <slot></slot>
    </div>
</template>
<script>
export default {
    name:"MyDivider",
    props:{
        icon:{
            type:String,
            default:''
        }
    },
    computed:{
        cWrapClass(){
            return " horizontal header "
        }
    }
}
</script>
```

## 暴露组件

在packages/index.js中,引入组件并注册到全局组件中。

```diff
import 'semantic-ui-css/semantic.css'
import MyButton from './button/button.vue'
+import MyDivider from './divider/divider.vue'
export default {
  install (Vue) {
    Vue.component('MyButton', MyButton)
+    Vue.component('MyDivider', MyDivider)
  }
}
```



## 测试代码

在examples中的任意组件中通过如下代码可以来测试这个功能

```html
<my-divider icon="user">用户管理</my-divider>
```

