目标：

- 以button按钮为例，学习如何封装及使用组件

涉及知识点

- Vue.component()
- Vue.use()
- props传参
- emit抛出事件





## 全局组件和局部组件

### 局部组件

- 绝大多数vue项目就只有一个实例(new Vue()只运行一次)，即:`一个项目就只有一个vue实例`

- 我们前面写组件一般都是直接写在vue实例中的，也就是局部组件

- 这个组件不能在另一个项目中使用（复制粘贴代码不算哈）。

- 典型使用格式：在vue实例中

  

  ```
  {
  	data(){}
  	components:{
  		// 你的组件
  	}
  }
  ```

  



### 全局组件

- 组件在所有的vue实例中的都可以使用。
- 与具体的vue项目无关，最典型的体现是是ui框架(element-ui, ant-design, i-view, vant)
- 它采用Vue.component来创建。



## 用Vue.component创建全局组件

[Vue.component](https://cn.vuejs.org/v2/api/?#Vue-component)



> Vue.component(id,definition)
>
> - **参数**：
>
>   - `{string} id`
>   - `{Function | Object} [definition]`
>
> - **用法**：
>
>   注册或获取全局组件。注册还会自动使用给定的`id`设置组件的名称
>
>   ```
>   // 注册组件，传入一个扩展过的构造器
>   Vue.component('my-component', Vue.extend({ /* ... */ }))
>   
>   // 注册组件，传入一个选项对象 (自动调用 Vue.extend)
>   Vue.component('my-component', { /* ... */ })
>   
>   // 获取注册的组件 (始终返回构造器)
>   var MyComponent = Vue.component('my-component')
>   ```
>
> - **参考**：[组件](https://cn.vuejs.org/v2/guide/components.html)



## 示例代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>创建并使用button组件</title>
  <script src="https://cdn.bootcss.com/vue/2.6.11/vue.js"></script>
</head>
<body>
  <div id="app">
    <my-button></my-button>
    <hr>
    <com1></com1>
  </div>
  <script>
    Vue.component("MyButton",{
      template:"<div><button>全局组件：按钮</button></div>"
    })

    new Vue({
      el:"#app",
      components:{
        "com1":{
          template:"<div><button>局部组件：按钮</button></div>"
        }
      }
    })
  </script>
</body>
</html>
```

以上代码中：

- MyButton是全局注册的组件
- com1是局部组件

[https://cn.vuejs.org/v2/guide/components-registration.html#%E7%BB%84%E4%BB%B6%E5%90%8D%E5%A4%A7%E5%B0%8F%E5%86%99](https://cn.vuejs.org/v2/guide/components-registration.html#组件名大小写)



上面我们就实现了创建并使用全局组件了，这是一种比较原始的方式，在vue中，它给我们提供另一种比较优雅的方式:Vue.use

## 使用Vue.use()加载插件

Vue.use()是Vue对象上的全局方法，它用来把第三方插件挂载在vue上。注意这里的Vue是大写的V。



### [格式](https://cn.vuejs.org/v2/api/?#Vue-use)

> **Vue.use(plugin)**
>
> - **功能**：
>
>   安装 Vue.js 插件。
>
> - 参数：plugin。它表示要安装的插件
>
>   - 可以是一个对象，也可以是一个函数
>
> - **用法**：
>
>   如果plugin是一个对象，必须提供 `install` 方法。如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入。
>
>   该方法需要在调用 `new Vue()` 之前被调用。
>
>   当 install 方法被同一个插件多次调用，插件将只会被安装一次。
>
> - **参考**：[插件](https://cn.vuejs.org/v2/guide/plugins.html)





### 见世面-看看别人的用法

>  Vue-Router
>
> ```javascript
> import VueRouter from "vue-router"
> import Vue from "vue"
> import Index from "../pages/index.vue"
> import Headline from "../pages/headline.vue"
> import Tab from "../pages/tab.vue"
> import Dialog from "../pages/dialog.vue"
> Vue.use(VueRouter)
> export default new VueRouter({
>     routes: [
>         { name: 'home', path: '/', component: Index },
>         { name: 'headline', path: '/headline', component: Headline },
>         { name: 'tab', path: '/tab', component: Tab },
>         { name: 'dialog', path: '/dialog', component: Dialog }
>     ]
> });
> 
> ```
>
> 



> element-ui的使用 https://element.eleme.cn/#/zh-CN/component/quickstart#yin-ru-element
>
> ```
> import Vue from 'vue';
> import ElementUI from 'element-ui';
> import 'element-ui/lib/theme-chalk/index.css';
> import App from './App.vue';
> 
> Vue.use(ElementUI);
> 
> new Vue({
>   el: '#app',
>   render: h => h(App)
> });
> ```



> vant组件的库的使用
>
> https://youzan.github.io/vant/#/zh-CN/quickstart#fang-shi-san.-dao-ru-suo-you-zu-jian
>
> ```javascript
> import Vue from 'vue';
> import Vant from 'vant';
> import 'vant/lib/index.css';
> 
> Vue.use(Vant);
> ```
>
> 



### 用Vue.use()来改造代码

```html

<div id="app">
    <my-button></my-button>
    <hr>
</div>
<script>
    var obj = {
        install (abc) {
            abc.component("MyButton",{
                template:"<div><button>全局组件：按钮</button></div>"
            })
        }
    }
    
    // 在Vue.use(obj)中，它做了两件事：
    // 1. 执行obj.install()
    // 2. 传入Vue。具体在上面的代码中，就是把Vue传给abc.
    Vue.use(obj)

    new Vue({
        el:"#app"
    })
</script>

```



### 进一步拓展代码

```javascript
<div id="app">
    <my-button></my-button>
    <my-headline></my-headline>
    <hr>
  </div>
  <script>
    var MyButton = {
        name:"MyButton",
        template:"<div><button>全局组件：按钮</button></div>"
    }
    var MyHeadline = {
        name:"MyHeadline",
        template:"<div>全局组件:标题</div>"
    }
    var obj = {
      install (vue) {
        vue.component(MyButton.name,MyButton)
        vue.component(MyHeadline.name,MyHeadline)
      }
    }
    Vue.use(obj)

    new Vue({
      el:"#app"
    })
  </script>
```



小结:

vue开发公共组件需要用到Vue.use()和Vue.component()两个api。