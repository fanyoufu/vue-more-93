目标：

- 引入semantic.css来提供组件库的样式

- 完成按钮组件的功能





## 引入并安装 semantic

- semantic

- bootstrap

### npm i

在我们的项目中，我们只需要样式，而不需要.js代码，所以我们直接去安装semantic-ui-css。

https://www.npmjs.com/package/semantic-ui-css

```
npm i semantic-ui-css
```



### 在packages中引入css样式

index.js中，引入样式

```
import 'semantic-ui-css/semantic.css'
import MyButton from './button/button.vue'
export default {
  install (Vue) {
    Vue.component('MyButton', MyButton)
  }
}
```

### 修改button组件

补充css类"ui button"，这个类已经在semantic.css中定义了的。具体参考[这里](https://semantic-ui.com/elements/button.html#) https://semantic-ui.com/elements/button.html#

```javascript
<template>
  <div>
    <button class="ui button">我是一个按钮</button>
  </div>
</template>

<script>
export default {
  name: 'MyButton',
  data () {
    return {}
  }
}
</script>

```

### 测试效果

在examples目录下的组件中再次去感受一下按钮的效果。



## 修改button组件的功能

- 自定义内容
- 大小
- 图标
- 禁用状态
- 加载状态
- 动画按钮

## 自定义按钮内容

目标：允许用户自已设置按钮上的方案。

技能点：默认插槽。

步骤:

- 修改packages/button/button.vue中的代码。添加一个插槽即可。

![image-20200316200931550](asset/image-20200316200931550.png)

```html
<div class="ui button">
   <slot>我是默认内容</slot>
</div>
```



## 定义按钮大小

目标：预设尺寸，供用户选用。

思路：在semantic样式体系中，它通过mini,tiny,small，medium,large,big,huge,massive来控制，我们可以直接来借用。

例如：

![image-20200316201611659](asset/image-20200316201611659.png)

对应html代码

```html
<button class="mini ui button">Mini</button>
<button class="tiny ui button">Tiny</button>
<button class="small ui button">Small</button>
<button class="medium ui button">Medium</button>
<button class="large ui button">Large</button>
<button class="big ui button">Big</button>
<button class="huge ui button">Huge</button>
<button class="massive ui button">Massive</button>
```

观察上面的效果，我们提取表示尺寸的关键字，在使用组件时通过prop传入。



### 修改button组件的代码

- 补充一个prop。用来接收size。
- 根据这个size来生成一个对应的class。

```
<template>
  <div>
    <button class="ui button" :class="size">
      <slot>我是一个按钮</slot>
    </button>
  </div>
</template>

<script>
export default {
  name: 'MyButton',
  props: {
    size: {
      type: String,
      default: 'medium',
      validator (val) {
        // 只要传入 size属性，就会
        // 进入到这个函数中，
        // 如返回true,则表示生效。
        // 如返回false，则表示不允许

        // 检验思路：
        // 如果传入的size是：mini,medium,huge,massive.... 就ok
        // 否则就返回false
        console.log(val)
        // includes检查这个数组中，是否包含这个元素。
        return ['mini', 'tiny', 'small', 'medium', 'large', 'big', 'huge', 'massive'].includes(val)
      }
    }
  }
}
```

在设置prop时，有一点要注意:

- validator



### 修改测试用例

```html
<template>
  <div>
    <h1>测试按钮的功能</h1>
    <my-button>来，点赞再走!</my-button>
    <br>
    <my-button></my-button>
    <br>
    <my-button :size="size">mini大小的按钮</my-button>
    <br>
    <my-button size="huge">huge大小的按钮</my-button>
    <hr>
    <button @click="hChangeSize">改变大小</button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      size: 'mini'
    }
  },
  methods: {
    hChangeSize () {
      this.size = 'huge'
    }
  }
}
</script>

```



## 定义图标

目标：允许用户使用预设的图标。

思路：借鉴semantic.css中的图标。 

https://semantic-ui.com/elements/icon.html

<img src="asset/image-20200316205841861.png" alt="image-20200316205841861" style="zoom:50%;" />

### 修改组件内容

- 添加prop，让用户传入icon的名字
- 添加计算属性，用来设置class

```
<template>
  <div class="ui button" :class="size">
    <!-- 如果用户设置了icon属性，则显示图标 -->
    <i v-if="icon" class="icon" :class="icon"></i>
     <slot>我是默认内容</slot>
  </div>
</template>

<script>
export default {
  name: 'MyButton',
  props: {
    size: {
      type: String,
      default: 'medium',
      validator (val) {
        // 只要传入 size属性，就会
        // 进入到这个函数中，
        // 如返回true,则表示生效。
        // 如返回false，则表示不允许

        // 检验思路：
        // 如果传入的size是：mini,medium,huge,massive.... 就ok
        // 否则就返回false
        // console.log(val)
        // includes检查这个数组中，是否包含这个元素。
        return ['mini', 'tiny', 'small', 'medium', 'large', 'big', 'huge', 'massive'].includes(val)
      }
    },
    icon: {
      type: String,
      required: false
    }
  }
}
```

### 测试用例

```html
<my-button  icon="user">icon为user的按钮</my-button>
<br>
<my-button  icon="history">icon为history的按钮</my-button>
 <br>
<my-button size="massive" icon="warning circle">warning circle</my-button>

```



## 设置禁用状态

目标：允许用户去设置按钮的状态

思路：借用semantic中的disabled类

### 修改组件

由于挂载在button上的样式比较多，所以用一个统一的计算属性来管理它们。

```
<template>
  <!-- slot:插槽。 -->
  <div class="ui button" :class="cClass">
    <!-- 如果用户设置了icon属性，则显示图标 -->
    <i v-if="icon" class="icon" :class="icon"></i>
     <slot>我是默认内容</slot>
  </div>
  <!-- <div class="ui animated fade button">
    <div class="visible content">Sign-up for a Pro account</div>
    <div class="hidden content">
      $12.99 a month
    </div>
  </div> -->
</template>

<script>
export default {
  name: 'MyButton',
  props: {
    size: {
      type: String,
      default: 'medium',
      validator (val) {
        // 只要传入 size属性，就会
        // 进入到这个函数中，
        // 如返回true,则表示生效。
        // 如返回false，则表示不允许

        // 检验思路：
        // 如果传入的size是：mini,medium,huge,massive.... 就ok
        // 否则就返回false
        // console.log(val)
        // includes检查这个数组中，是否包含这个元素。
        return ['mini', 'tiny', 'small', 'medium', 'large', 'big', 'huge', 'massive'].includes(val)
      }
    },
    icon: {
      type: String,
      required: false
    },
    disabled: {
      type: Boolean,
      // 默认 不是 禁用状态
      default: false
    }
  },
  computed: {
    cClass () {
      // 收集收到的属性值，并分析一下
      // 返回class给按钮外层容器
      if (this.disabled) {
        // 用户开启禁用
        // disabled 是semantic-ui中一个特殊的class类名。
        // 这里就会有两个类名，所以加空格
        return this.size + ' ' + 'disabled'
      } else {
        return this.size
      }
    }
  }
}
</script>

```



### 测试用例

```
<my-button size="massive">哈哈哈大按钮</my-button>
<br>
<br>
<my-button disabled size="massive" icon="warning circle">warning circle</my-button>
<br>
<br>

<br>
<my-button disabled size="massive" icon="wifi">信息好的很</my-button>
<br>
```





## 设置loading状态

目标：允许用户去设置按钮的加载状态

思路：借用semantic中的loading类

### 修改组件

补充一个用于控制加载状态的prop及对应的class。



```
<template>
  <div>
    <button class="ui button" :class="cClass">
      <i v-if='icon' class="icon" :class="cIcon"></i>
      <slot>我是一个按钮</slot>
    </button>
  </div>
</template>

<script>
export default {
  name: 'MyButton',
  props: {
    size: {
      type: String,
      default: 'medium',
      validator (val) {
        // 只要传入 size属性，就会
        // 进入到这个函数中，
        // 如返回true,则表示生效。
        // 如返回false，则表示不允许

        // 检验思路：
        // 如果传入的size是：mini,medium,huge,massive.... 就ok
        // 否则就返回false
        // console.log(val)
        // includes检查这个数组中，是否包含这个元素。
        return ['mini', 'tiny', 'small', 'medium', 'large', 'big', 'huge', 'massive'].includes(val)
      }
    },
    icon: {
      type: String,
      required: false
    },
    disabled: {
      type: Boolean,
      // 默认 不是 禁用状态
      default: false
    },
    loading: {
      type: Boolean,
      // 默认 不要启用loading状态
      default: false
    }
  },
  computed: {
    cClass () {
      var classArr = [this.size]

      this.loading && classArr.push('loading')
      this.disabled && classArr.push('disabled')

      return classArr.join(' ')
    },
    // cClass () {
    //   // 1. 用数组收集类名
    //   var classArr = [this.size]
    //   // 收集收到的属性值，并分析一下
    //   // 返回class给按钮外层容器
    // if (this.loading) {
    //   // 如果是Loading状态，则要添加一个loading类
    //   classArr.push('loading')
    // }
    //   if (this.disabled) {
    //     // 用户开启禁用
    //     // disabled 是semantic-ui中一个特殊的class类名。
    //     classArr.push('disabled')
    //   }
    //   // ['mini','loading','disabled'] ==>"mini loading disabled"
    //   return classArr.join(' ')
    // }
  }
}

```



### 测试用例

```
<br>
    <my-button  icon="history" loading>icon为history的loading按钮</my-button>
```



## 设置animated动画

目标：允许用户去设置按钮的切换动画状态

思路：借用semantic中的animated类

### 确定测试用例

对照semantic中按钮的动画效果来提炼用户的使用方式，即先要给出测试用例。

```html
<my-button animated >
<div slot="hidden">$10000</div>
<div slot="visible"><i class="shop icon"></i>不要错过哈</div>
</my-button>

<my-button animated="fade" >
<div slot="hidden">$10000</div>
<div slot="visible"><i class="shop icon"></i>不要错过哈</div>
</my-button>
```



### 修改组件代码

```
export default {
  name: 'MyButton',
  props: {
    size: {
      type: String,
      default: 'medium',
      validator (val) {
        // 只要传入 size属性，就会
        // 进入到这个函数中，
        // 如返回true,则表示生效。
        // 如返回false，则表示不允许

        // 检验思路：
        // 如果传入的size是：mini,medium,huge,massive.... 就ok
        // 否则就返回false
        // console.log(val)
        // includes检查这个数组中，是否包含这个元素。
        return ['mini', 'tiny', 'small', 'medium', 'large', 'big', 'huge', 'massive'].includes(val)
      }
    },
    icon: {
      type: String,
      required: false
    },
    disabled: {
      type: Boolean,
      // 默认 不是 禁用状态
      default: false
    },
    loading: {
      type: Boolean,
      // 默认 不要启用loading状态
      default: false
    },
    animated: {
      type: String,
      default: ''
    }
  },
  computed: {
    cClass () {
      var classArr = [this.size]
      // 当前用户是否启用动画
      // 如果启用了动画，要添加两个类 : animated 动画的名字
      this.animated && classArr.push(`animated ${this.animated}`)
      this.loading && classArr.push('loading')
      this.disabled && classArr.push('disabled')

      return classArr.join(' ')
    }
  }
}
</script>
```



模板

```html
<template>
  <!-- slot:插槽。 -->
  <div class="ui button" :class="cClass">
    <template v-if='animated'>
  <!-- $slots表示收集到的所有的插槽 -->
  <!-- hidden content 是在semantic-ui约定的类 -->
  <!-- visible content 是在semantic-ui约定的类 -->
      <div v-if="$slots.hidden"  class="hidden content">
          <!-- 具名插槽 -->
          <slot name="hidden"></slot>
      </div>
      <div v-if="$slots.visible"  class="visible content">
          <!-- 具名插槽 -->
          <slot name="visible"></slot>
      </div>
    </template>
    <template v-else>
      <!-- 不带动画效果的按钮 -->
      <!-- 如果用户设置了icon属性，则显示图标 -->
      <i v-if="icon" class="icon" :class="icon"></i>
     <slot>我是默认内容</slot>
    </template>
  </div>
</template>
```

注意:

- template的用法。它不需要创建新的dom容器，还可以用来包裹其它元素。
- 用`$slots.插槽名`来获取指定插槽的内容。



## 提供click功能

如果希望在使用myButton组件时添加click功能，如下，在测试用例上添加代码

```html
 <my-button @click="hClick"></my-button>
```

```javascript
methods: {
    hClick () {
      window.alert(1)
    }
  }
```

将不会得到任何效果，因为在@click只能加在原生dom元素上，而这里是一个组件。可以使用@click.native来达到目标。



更准确的做法是在组件内部抛出click事件来。

```html
<template>
  <!-- slot:插槽。 -->
  <div class="ui button" :class="cClass" @click="hEmitClick">
   // ...
  </div>
</template>
export default {
  name: 'MyButton',
  methods: {
    hEmitClick () {
      this.$emit('click')
    }
  }
}
```

