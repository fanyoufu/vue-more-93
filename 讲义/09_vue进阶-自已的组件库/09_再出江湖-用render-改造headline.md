

## 目标

- 在组件中添加headline组件（类似于h1,h2..这种标签效果）



##  内容

- 允许用户传入级别
- 允许设置icon
- 允许设置大小
- 允许设置子标题



## 组件代码

headline.vue代码如下

```javascript
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
      default: 'medium', // 默认为medium
      required: false
    }
  },
  data () {
    return {

    }
  },
  render (h) {
    //  <h2 class="ui header">
    //   <i class="settings icon"></i>
    //   <div class="content">
    //     默认插槽的内容
    //     <div class="sub header">具名插槽的内容</div>
    //   </div>
    // </h2>
    // level ,icon,size,sub
    // 判断是否有icon
    let icon = null
    let content = null
    if (this.icon) {
      // <i class="settings icon"></i>
      icon = h('i', { class: 'icon ' + this.icon })
    }

    // 生成第二个子元素content
    // 是否有具名插槽
    if (this.$slots.sub) {
      // 是有副标题的
      // 创建副标题
      const subContent = h('div', { class: 'sub header' }, [this.$slots.sub])
      // 内容包含两个部分：默认插槽 + 具名插槽
      content = h('div', { class: 'content' }, [this.$slots.default, subContent])
    } else {
      content = h('div', { class: 'content' }, [this.$slots.default])
    }

    // 图标i 要是h标签的子元素，所以要设置参数3
    return h('h' + this.level, {
      class: 'ui ' + this.size + ' header'
    },
    [icon, content])
  }
}
</script>
```

