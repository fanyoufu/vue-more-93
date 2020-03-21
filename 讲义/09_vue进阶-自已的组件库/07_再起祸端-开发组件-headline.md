## 目标

- 在组件中添加headline组件（类似于h1,h2..这种标签效果）



## 创建基本的文件结构

- 创建组件：packages/headline/headline.vue
- 全局注册。packages/index.js.引入headline
- 测试组件
  - 在examples下添加路由
  - 在examples下添加页面

##  内容

- 允许用户传入级别(h1,h2,h3,h4,h5,h6)
- 允许设置icon
- 允许设置大小
- 允许设置子标题

## 使用方式

希望用户如下方式来使用

```
<my-headline :level="1" :icon="user" :size="mini">
	标题
<div slot="sub">
	子标题
</div>
</my-headline>
```



## 允许用户传入级别

用v-if处理这个级别是**很不漂亮的写法**！！！

```html
<template>
  <div>
    <h1 v-if="level===1" class="ui header" :class="size">
      <i v-if="icon" class="icon" :class="icon"></i>
      <div class="content">
        <slot></slot>
        <div class="sub header"><slot name="sub"></slot></div>
      </div>
    </h1>

    <h2 v-if="level===2" class="ui header" :class="size">
      <i v-if="icon" class="icon" :class="icon"></i>
      <div class="content">
        <slot></slot>
        <div class="sub header"><slot name="sub"></slot></div>
      </div>
    </h2>
  </div>

</template>

<script>
export default {
  name: 'MyHeadline',
  // 定义属性来收集用户的输入
  props: {
    level: {
      type: Number, // h1,h2,h3...
      default: 1,
      required: false
    },
    icon: {
      type: String, // 图标
      default: '', // 默认没有图标
      required: false
    },
    size: {
      type: String, // 大小
      default: 'mini', // 默认为mini
      required: false
    }
  },
  data () {
    return {

    }
  }
}
</script>

```

