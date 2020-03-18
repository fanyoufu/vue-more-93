

## RealWorld 基本介绍

* 在线示例：
  * https://demo.realworld.io/
* 接口文档：
  * https://github.com/gothinkster/realworld/tree/master/api
* Postman 接口：
  * https://raw.githubusercontent.com/gothinkster/realworld/master/api/Conduit.postman_collection.json
* 页面模板：
  * https://github.com/gothinkster/realworld-starter-kit/blob/master/FRONTEND_INSTRUCTIONS.md

- 所需资源
  - https://github.com/gothinkster/realworld-starter-kit

- 需求说明

* [ ] 首页
  * [ ] 展示文章列表
    * [ ] Your Feed
    * [ ] Global Feed
  * [ ] 展示标签列表
  * [ ] 文章列表分页
* [ ] 用户登录
* [ ] 用户注册
* [ ] 设置
* [ ] 发布文章
* [ ] 文章详情
  * [ ] 基本数据展示
    * [ ] 日期
    * [ ] markdown
  * [ ] 关注
  * [ ] 喜欢
  * [ ] 封装作者组件
  * [ ] 评论
    * [ ] 加载评论列表
    * [ ] 发布评论
* [ ] 编辑文章

## 创建项目

使用脚手架工具

第一步：全局安装脚手架工具

```bash
npm i -g create-nuxt-app
```

第二步：创建项目

![image-20200222155738997](asset/image-20200222155738997.png)

![image-20200222155835394](asset/image-20200222155835394.png)

![image-20200222155806452](asset/image-20200222155806452.png)

![image-20200222155752129](asset/image-20200222155752129.png)

![image-20200222155818064](asset/image-20200222155818064.png)

![image-20200222155759654](asset/image-20200222155759654.png)



![image-20200222155901031](asset/image-20200222155901031.png)



## 目录结构

components:组件。其下的组件没有

layouts:布局。

middleware: 中间件目录

pages：页面。其下的.vue中才有asyncData钩子

plugins:插件。

static:静态资源

store: vuex 

nuxt.config.js

api: 补充一个接口定义文件夹

utils:补充一个工具文件夹

## 自定义页面

<img src="asset/image-20200222163854520.png" alt="image-20200222163854520" style="zoom:50%;" />

### 在根目录中添加app.html

<img src="asset/image-20200222161915732.png" alt="image-20200222161915732" style="zoom:50%;" />

现在可以重启服务，检查一下主页中的内容。

下面把一些外部资源引进来。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Conduit</title>
    <!-- Import Ionicon icons & Google Fonts our Bootstrap theme relies on -->
    <link href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" rel="stylesheet" type="text/css">
    <link href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic" rel="stylesheet" type="text/css">
    <!-- Import the custom Bootstrap 4 theme from our hosted CDN -->
    <link rel="stylesheet" href="//demo.productionready.io/main.css">
  </head>
<body>
  {{APP}}
</body>
</html>

```

具体的代码在[这里](https://github.com/gothinkster/realworld-starter-kit/blob/master/FRONTEND_INSTRUCTIONS.md#header)

### 修改layouts/default.vue

layouts是布局的意思，其下的default.vue是整个页面的默认布局文件。由于这个项目中，项目的结构基本相同，所以，我们直接来修改这个default.vue的内容，以达到一劳永逸的效果。

```html
<template>
  <div>
    <nav class="navbar navbar-light">
      <div class="container">
        <a class="navbar-brand" href="index.html">conduit</a>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <a class="nav-link active" href="">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="">
              <i class="ion-compose"></i>&nbsp;New Post
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="">
              <i class="ion-gear-a"></i>&nbsp;Settings
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="">Sign up</a>
          </li>
        </ul>
      </div>
    </nav>
    <nuxt/>
    <footer>
      <div class="container">
        <a href="/" class="logo-font">conduit</a>
        <span class="attribution">
          An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
        </span>
      </div>
    </footer>
  </div>
</template>
```

它的整体效果是：

<img src="asset/image-20200222164513851.png" alt="image-20200222164513851" style="zoom:50%;" />

具体的代码在[这里](https://github.com/gothinkster/realworld-starter-kit/blob/master/FRONTEND_INSTRUCTIONS.md#header)可直接复制。

### 修改pages/index.vue

```html
<template>
  <div>
    <div class="home-page">
      <div class="banner">
        <div class="container">
          <h1 class="logo-font">
            conduit
          </h1>

          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div class="container page">
        <div class="row">
          <div class="col-md-9">
            <div class="feed-toggle">
              <ul class="nav nav-pills outline-active">
                <li class="nav-item">
                  <a class="nav-link disabled" href>Your Feed</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link active" href>Global Feed</a>
                </li>
              </ul>
            </div>

            <div class="article-preview">
              <div class="article-meta">
                <a href="profile.html">
                  <img src="http://i.imgur.com/Qr71crq.jpg" />
                </a>
                <div class="info">
                  <a href class="author">Eric Simons</a>
                  <span class="date">January 20th</span>
                </div>
                <button class="btn btn-outline-primary btn-sm pull-xs-right">
                  <i class="ion-heart"></i> 29
                </button>
              </div>
              <a href class="preview-link">
                <h1>How to build webapps that scale</h1>
                <p>This is the description for the post.</p>
                <span>Read more...</span>
              </a>
            </div>

            <div class="article-preview">
              <div class="article-meta">
                <a href="profile.html">
                  <img src="http://i.imgur.com/N4VcUeJ.jpg" />
                </a>
                <div class="info">
                  <a href class="author">Albert Pai</a>
                  <span class="date">January 20th</span>
                </div>
                <button class="btn btn-outline-primary btn-sm pull-xs-right">
                  <i class="ion-heart"></i> 32
                </button>
              </div>
              <a href class="preview-link">
                <h1>The song you won't ever stop singing. No matter how hard you try.</h1>
                <p>This is the description for the post.</p>
                <span>Read more...</span>
              </a>
            </div>
          </div>

          <div class="col-md-3">
            <div class="sidebar">
              <p>Popular Tags</p>

              <div class="tag-list">
                <a href class="tag-pill tag-default">programming</a>
                <a href class="tag-pill tag-default">javascript</a>
                <a href class="tag-pill tag-default">emberjs</a>
                <a href class="tag-pill tag-default">angularjs</a>
                <a href class="tag-pill tag-default">react</a>
                <a href class="tag-pill tag-default">mean</a>
                <a href class="tag-pill tag-default">node</a>
                <a href class="tag-pill tag-default">rails</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
```

具体源代码在[这里](https://github.com/gothinkster/realworld-starter-kit/blob/master/FRONTEND_INSTRUCTIONS.md#header)



此时，再来看主页的运行效果如下：

![image-20200222163010580](asset/image-20200222163010580.png)

## 快速完成其它页面的布局

### 登陆/注册

在pages下新建login.vue，其内容如下：

```html
<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
            Sign up
          </h1>
          <p class="text-xs-center">
            <a href="">Have an account?</a>
          </p>

          <ul class="error-messages">
            <li>That email is already taken</li>
          </ul>

          <form>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" type="text" placeholder="Your Name">
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" type="text" placeholder="Email">
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" type="password" placeholder="Password">
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {

    }
  }
}
</script>
```

以上代码在[这里](https://github.com/gothinkster/realworld-starter-kit/blob/master/FRONTEND_INSTRUCTIONS.md#loginregister)复制

### 个人中心

在pages下新建profile.vue，其内容如下：

```html
<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img src="http://i.imgur.com/Qr71crq.jpg" class="user-img">
            <h4>Eric Simons</h4>
            <p>
              Cofounder @GoThinkster, lived in Aol's HQ for a few months, kinda looks like Peeta from the Hunger Games
            </p>
            <button class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-plus-round" />
              &nbsp;
              Follow Eric Simons
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link active" href="">My Articles</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="">Favorited Articles</a>
              </li>
            </ul>
          </div>

          <div class="article-preview">
            <div class="article-meta">
              <a href=""><img src="http://i.imgur.com/Qr71crq.jpg"></a>
              <div class="info">
                <a href="" class="author">Eric Simons</a>
                <span class="date">January 20th</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart" /> 29
              </button>
            </div>
            <a href="" class="preview-link">
              <h1>How to build webapps that scale</h1>
              <p>This is the description for the post.</p>
              <span>Read more...</span>
            </a>
          </div>

          <div class="article-preview">
            <div class="article-meta">
              <a href=""><img src="http://i.imgur.com/N4VcUeJ.jpg"></a>
              <div class="info">
                <a href="" class="author">Albert Pai</a>
                <span class="date">January 20th</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart" /> 32
              </button>
            </div>
            <a href="" class="preview-link">
              <h1>The song you won't ever stop singing. No matter how hard you try.</h1>
              <p>This is the description for the post.</p>
              <span>Read more...</span>
              <ul class="tag-list">
                <li class="tag-default tag-pill tag-outline">Music</li>
                <li class="tag-default tag-pill tag-outline">Song</li>
              </ul>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
```

以上代码在[这里](https://github.com/gothinkster/realworld-starter-kit/blob/master/FRONTEND_INSTRUCTIONS.md#profile)复制

### 设置

在pages下新建profile.vue，其内容如下：

```html
<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
            Your Settings
          </h1>

          <form>
            <fieldset>
              <fieldset class="form-group">
                <input class="form-control" type="text" placeholder="URL of profile picture">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" placeholder="Your Name">
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control form-control-lg" rows="8" placeholder="Short bio about you" />
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" placeholder="Email">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="password" placeholder="Password">
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
```

以上代码在[这里](https://github.com/gothinkster/realworld-starter-kit/blob/master/FRONTEND_INSTRUCTIONS.md#profile)复制

### 编辑新建文章

在pages下新建editor.vue，其内容如下：

```html
<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input type="text" class="form-control form-control-lg" placeholder="Article Title">
              </fieldset>
              <fieldset class="form-group">
                <input type="text" class="form-control" placeholder="What's this article about?">
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control" rows="8" placeholder="Write your article (in markdown)" />
              </fieldset>
              <fieldset class="form-group">
                <input type="text" class="form-control" placeholder="Enter tags"><div class="tag-list" />
              </fieldset>
              <button class="btn btn-lg pull-xs-right btn-primary" type="button">
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

```

以上代码在[这里](https://github.com/gothinkster/realworld-starter-kit/blob/master/FRONTEND_INSTRUCTIONS.md#createedit-article)复制

### 文章页

在pages下新建editor.vue，其内容如下：

```html
<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>How to build webapps that scale</h1>

        <div class="article-meta">
          <a href=""><img src="http://i.imgur.com/Qr71crq.jpg"></a>
          <div class="info">
            <a href="" class="author">Eric Simons</a>
            <span class="date">January 20th</span>
          </div>
          <button class="btn btn-sm btn-outline-secondary">
            <i class="ion-plus-round" />
            &nbsp;
            Follow Eric Simons <span class="counter">(10)</span>
          </button>
        &nbsp;&nbsp;
          <button class="btn btn-sm btn-outline-primary">
            <i class="ion-heart" />
            &nbsp;
            Favorite Post <span class="counter">(29)</span>
          </button>
        </div>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12">
          <p>
            Web development technologies have evolved at an incredible clip over the past few years.
          </p>
          <h2 id="introducing-ionic">
            Introducing RealWorld.
          </h2>
          <p>It's a great solution for learning how other frameworks work.</p>
        </div>
      </div>

      <hr>

      <div class="article-actions">
        <div class="article-meta">
          <a href="profile.html"><img src="http://i.imgur.com/Qr71crq.jpg"></a>
          <div class="info">
            <a href="" class="author">Eric Simons</a>
            <span class="date">January 20th</span>
          </div>

          <button class="btn btn-sm btn-outline-secondary">
            <i class="ion-plus-round" />
            &nbsp;
            Follow Eric Simons <span class="counter">(10)</span>
          </button>
        &nbsp;
          <button class="btn btn-sm btn-outline-primary">
            <i class="ion-heart" />
            &nbsp;
            Favorite Post <span class="counter">(29)</span>
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <form class="card comment-form">
            <div class="card-block">
              <textarea class="form-control" placeholder="Write a comment..." rows="3" />
            </div>
            <div class="card-footer">
              <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img">
              <button class="btn btn-sm btn-primary">
                Post Comment
              </button>
            </div>
          </form>

          <div class="card">
            <div class="card-block">
              <p class="card-text">
                With supporting text below as a natural lead-in to additional content.
              </p>
            </div>
            <div class="card-footer">
              <a href="" class="comment-author">
                <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img">
              </a>
            &nbsp;
              <a href="" class="comment-author">Jacob Schmidt</a>
              <span class="date-posted">Dec 29th</span>
            </div>
          </div>

          <div class="card">
            <div class="card-block">
              <p class="card-text">
                With supporting text below as a natural lead-in to additional content.
              </p>
            </div>
            <div class="card-footer">
              <a href="" class="comment-author">
                <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img">
              </a>
            &nbsp;
              <a href="" class="comment-author">Jacob Schmidt</a>
              <span class="date-posted">Dec 29th</span>
              <span class="mod-options">
                <i class="ion-edit" />
                <i class="ion-trash-a" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {

    }
  }
}
</script>
```

以上代码在[这里](https://github.com/gothinkster/realworld-starter-kit/blob/master/FRONTEND_INSTRUCTIONS.md#article)复制



## 主页-获取文章列表

功能目标：

- 发请求，获取文章列表，并显示

技能点：

- [nuxt中的axios](https://axios.nuxtjs.org/usage)



接口说明：

- 项目的[基地址](https://github.com/gothinkster/realworld/tree/master/spec#frontend-specs) ：`https://conduit.productionready.io/api`
- 获取[文章列表](https://github.com/gothinkster/realworld/tree/master/api#list-articles)：`/articles`

### 接口功能封装

在utils下新建request.js用来对axios进行封装；

`utils/request.js`

```javascript
import axios from 'axios'
const request = axios.create({
  baseURL: 'https://conduit.productionready.io'
})

// request.interceptors.request.use((config) => {
//   // Do something before request is sent
//   const { user } = store.state
//   if (user) {
//     config.headers.Authorization = `Token ${user.token}`
//   }
//   return config
// }, (error) => {
//   // Do something with request error
//   return Promise.reject(error)
// })

export default request
```



在api下新建article.js用来对文章操作业务进行封装；

`api/aritcle.js`

```javascript
import request from '@/utils/request'
export const getArticles = (params = {}) => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}

export const addArticle = (data) => {
  return request({
    method: 'POST',
    url: '/api/articles',
    data
  })
}

export const getArticle = (slug) => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`
  })
}

```





### 在主页中调用接口渲染页面

显然，对于文章列表的信息我们应该采用服务器端渲染的方式。

在pages/index.vue中修改两处：

- 添加asyncData钩子函数，并发请求，取回数据
- 修改视图，以渲染页面



#### asyncData钩子函数

```javascript
import { getArticles } from '@/api/article'
export default {
  name: 'HomeIndex',
  async asyncData ({ $axios }) {
    try {
      const { data } = await getArticles()
      return {
        articles: data.articles
      }
    } catch (err) {
      console.log(err)
      return {
        articles: []
      }
    }
  },
  data () {
    return {}
  }
}
```

上面代码修改完成之后，可以再次刷新页面，在开发者工具中启用vue调试器，观察HomeIndex组件中的数据项。

<img src="asset/image-20200222174226267.png" alt="image-20200222174226267" style="zoom: 33%;" />



接下来，就是把数据展示出来了。

#### 修改视图

文章列表所在的结构是div.ariticle-preview，我们直接对它进行循环即可。

```html
<div
     v-for="article in articles"
     :key="article.slug"
     class="article-preview"
     >
    <div class="article-meta">
        <a href="profile.html">
            <img :src="article.author.image">
        </a>
        <div class="info">
            <a href class="author">{{ article.author.username }}</a>
            <span class="date">{{ article.createAt }}</span>
        </div>
        <button class="btn btn-outline-primary btn-sm pull-xs-right">
            <i class="ion-heart" />{{ article.favoritesCount }}
        </button>
    </div>
    <a href class="preview-link">
        <h1>{{ article.title }}</h1>
        <p>{{ article.description }}</p>
        <span>Read more...</span>
    </a>
</div>
```

#### 显示效果

<img src="asset/image-20200222174540936.png" alt="image-20200222174540936" style="zoom:33%;" />

## 注册

### 接口功能封装



创建`api/user.js`文件，根据[接口](https://github.com/gothinkster/realworld/tree/master/api#registration)文档的约定,内容如下：

```javascript
import request from '@/plugins/request'

export const register = (data) => {
  return request({
    method: 'POST',
    url: '/api/users',
    data
  })
}

export const login = (data) => {
  return request({
    method: 'POST',
    url: '/api/users/login',
    data
  })
}

```



### 页面

`pages/signup.vue`

<img src="asset/image-20200222202522303.png" alt="image-20200222202522303" style="zoom:50%;" />



### 添加数据项

数据项的设置也是参考接口参数的要求来定的。

```javascript
data () {
    return {
        user: {
            username: '',
            email: '',
            password: ''
        }
    }
}
```



### 修改登陆表单视图

- 阻止表单的提交事件
  - `<form @submit.prevent>`
- 数据绑定

```html
<ul class="error-messages">
    <li v-for="(item, key) in errors" :key="key">
        {{ key }} {{ item[0] }}
    </li>
</ul>

<form @submit.prevent>
    <fieldset class="form-group">
        <input v-model="user.username" class="form-control form-control-lg" type="text" placeholder="Your Name">
    </fieldset>
    <fieldset class="form-group">
        <input v-model="user.email" class="form-control form-control-lg" type="text" placeholder="Email">
    </fieldset>
    <fieldset class="form-group">
        <input v-model="user.password" class="form-control form-control-lg" type="password" placeholder="Password">
    </fieldset>
    <button class="btn btn-lg btn-primary pull-xs-right" @click="submit">
        Sign up
    </button>
</form>
```



### 添加注册功能 

直接调用api/user中的接口功能即可。

```javascript
import { register } from '@/api/user'

export default {
  middleware: 'noAuthenticated',
  name: 'Signup',
  data () {
    return {
      user: {
        username: '',
        email: '',
        password: ''
      },
      errors: {}
    }
  },
  methods: {
    async submit () {
      try {
        const {data} = await register({
          user: this.user
        })
        console.log(data)

      } catch (err) {
        console.dir(err)
        if (err.response.status === 422) {
          this.errors = err.response.data.errors
        }
        window.alert('注册失败')
      }
    }
  }
}
</script>
```

使用过的用户名：

```javascript
"username":"abca131231"
"email":"fdstsfnipui@qq.com"
"password":"123fsdf5hdgsfsa"
```

成功后的返回信息如下：

```json
{"user":
 {
     "id":85631,
     "email":"fdstsfnipui@qq.com",
     "createdAt":"2020-02-22T10:06:47.311Z",
     "updatedAt":"2020-02-22T10:06:47.317Z",
     "username":"abca131231",
     "bio":null,
     "image":null,
     "token":"ecccc......"
 }
}
```

注意上面的token信息。



## 使用vuex保存用户信息

如果注册成功：

- 跳转到index.vue，并在页面上显示当前用户的信息，由于用户信息在其它页面中也会用到，所以考虑保存在vuex中；



### nuxt中的vuex

nuxt框架中已经集成 了vuex，不需要额外再去安装。它创建vuex的方式与在vue创建的方式有所不同。

它有两种创建方式：

1. 经典式。
2. 模块式。

#### 经典式

在store目录下创建index.js文件。内容如下

```javascript
import Vuex from 'vuex'

// 在nuxt中，store是一个函数。
const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      user: null
    }),
    mutations: {
      setUser (state, user) {
        state.user = user
      }
    }
  })
}
```



#### 模块式

在store目录下创建两个文件：state.js, mutations.js

`store/state.js`

```javascript
export default () => ({
  user: null
})

```

与vuejs中使用vuex不同，这里需要使用一个箭头函数来返回state数据。

`store/mutations.js`

```javascript
export default {
  setUser (state, user) {
    state.user = user
  }
}
```





在返回值中会返回很多信息：email,username,token等等。

这里要特别处理一下：

- 在前端发ajax请求时，

给回一个token。在使用token的过程中，要注意：前端，后端都要用到token。所以我们要使用cookie来保存token信息。



安装处理cookie的依赖包

```bash
# 客户端操作cookie
npm install js-cookie --save
# 服务器端操作cookie
npm install cookieparser --save
```

### 使用vuex保存数据

```javascript
<script>
export default {
  middleware: 'noAuthenticated',
  name: '',
  data () {
    return {
      user: {
        username: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async submit () {
      try {
        const { data } = await this.$axios({
          url: 'https://conduit.productionready.io/api/users',
          method: 'POST',
          data: { user: this.user }
        })
        // 保存vuex
        this.$store.commit('setUser', data.user)
          
        this.$router.push('/')
      } catch (err) {
        window.alert('注册失败')
      }
    }
  }
}
</script>
```



### 显示用户信息

在`layout/default.vue`中显示用户信息。

这里正常使用vuex中的数据，其使用方式与vuejs中的使用无异。

```javascript
<template>
  <div>
    <nav class="navbar navbar-light">
      <div class="container">
        <a class="navbar-brand" href="index.html">conduit</a>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <nuxt-link class="nav-link" to="/">
              Home
            </nuxt-link>
            <!-- <a class="nav-link active" href="">Home</a> -->
          </li>
          <template v-if="user">
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/editor">
                <i class="ion-compose" />&nbsp;New Post
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/settings">
                <i class="ion-gear-a" />&nbsp;Settings
              </nuxt-link>
            </li>
            <li class="nav-item">
              <a class="nav-link ng-binding" :href="'#/@'+user.name">
                <img :src="user.image" class="user-pic">
                {{ user.username }}
              </a>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <nuxt-link to="/signup">
                Sign up
              </nuxt-link>
              <nuxt-link to="/login">
                Sign in
              </nuxt-link>
              <!-- <a class="nav-link" href="">Sign up</a> -->
            </li>
          </template>
        </ul>
      </div>
    </nav>
    <nuxt />
    <footer>
      <div class="container">
        <a href="/" class="logo-font">conduit</a>
        <span class="attribution">
          An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'LayoutDefault',
  computed: {
    ...mapState(['user'])
  }
}
</script>

```





## 添加文章

目标：

在editor.vue页面中，用来做添加。

要注意的是这个在调用时需要使用token 。[请求头说明](https://github.com/gothinkster/realworld/tree/master/api#authentication-header)， [接口参数说明](https://github.com/gothinkster/realworld/tree/master/api#create-article)



### 接口功能封装

Create Article

```
POST /api/articles
```

Example request body:

```
{
  "article": {
    "title": "How to train your dragon",
    "description": "Ever wonder how?",
    "body": "You have to believe",
    "tagList": ["reactjs", "angularjs", "dragons"]
  }
}
```

**Authentication required**, will return an [Article](https://github.com/gothinkster/realworld/tree/master/api#single-article)

### 数据绑定

```javascript
export default {
  middleware: 'authenticated',
  data () {
    return {
      article: {
        title: '测试标题',
        description: 'markdown的 格式，你能解析的了吗？',
        body: '##  没有问题的，你来看我的表现',
        tagListTxt: 'reactjs angularjs dragons'
      }
    }
  }
}
```

### 接口调用

注意，这个接口是需要token的，而且可想而知，在其它接口中也可能需要调用token，所以，我们要统一去设置一下token，按照之前使用axios的经验教训，我们需要去统一设置拦截器来处理。

现在来回顾一下我们的对request的使用状况：

<img src="asset/image-20200224164731970.png" alt="image-20200224164731970" style="zoom:50%;" />



在request.js中的代码如下：

```javascript
import axios from 'axios'
const request = axios.create({
  baseURL: 'https://conduit.productionready.io'
})


export default request
```

如果我们直接写拦截器的话，代码类似如下：

```javascript
request.interceptors.request.use((config) => {
  // Do something before request is sent
  const { user } = store.state
   if (user) {
     config.headers.Authorization = `Token ${user.token}`
   }
   return config
}, (error) => {
   // Do something with request error
   return Promise.reject(error)
})
```

注意，这里是拿不到store数据的，也不能通过去导入store/state.js来获取。

下面request.js写到插件中去：

#### plugins/request.js

```javascript
/**
 * 必须结合 Nuxt 的插件规则才能获取到容器登录数据，所以这里把 axios 封装为一个 Nuxt 插件
 * 插件模块必须导出默认成员：一个函数
 * 还有一点：插件必须显示的注册到 nuxt.config.js 中
 */

// import request from '@/utils/request'
import axios from 'axios'

// 为了再其他地方能使用到 axios，也把 request 给导出了
export const request = axios.create({
  baseURL: 'https://conduit.productionready.io'
})

// 该模块必须导出一个函数作为默认导出
export default ({ store = {} }) => {
  console.log(Date.now(), '设置request.js拦截器........')
  // Add a request interceptor
  request.interceptors.request.use((config) => {
    // Do something before request is sent
    console.log(Date.now(), '请求........')

    const { user } = store.state
    if (user) {
      config.headers.Authorization = `Token ${user.token}`
    }
    return config
  }, (error) => {
    // Do something with request error
    return Promise.reject(error)
  })

  // Add a response interceptor
  request.interceptors.response.use((response) => {
    // Do something with response data
    return response
  }, (error) => {
    // Do something with response error
    return Promise.reject(error)
  })
}

```



#### 调用接口

```javascript
async hAdd () {
    try {
        const { title, description, body, tagListTxt } = this.article
        const tagList = tagListTxt.split(' ')

        const { data } = await addArticle({
            article: {
                title,
                description,
                body,
                tagList
            }
        })

        this.$router.push('/article/' + data.article.slug)
    } catch (err) {
        console.log(err)
        alert('error')
    }
}
```



## 显示文章详情

基本思路：

- 每一篇文章都有一个slug属性，相当于它的id号，在读取文章详情时，需要传入这个参数就可以使用它来获取。

这里很显然要使用动态路由技术。

在`pages/article/_slug.vue`中实现具体的功能，它对应的路由就是`http://localhost:3000/article/x-f21da`。

### 封装接口

### 在页面中实现功能

- 调用接口，获取数据并渲染
  - 把markdown格式的内容转成html
- 检查文章是否是属于当前登陆用户
  - 是： 则不能点赞和关注，可以编辑，或者删除
  - 否： 则不能编辑，或者删除，可以点赞和关注

```html
<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>  {{ article.title }} </h1>

        <div class="article-meta">
          <a href=""><img :src="article.author.image"></a>
          <div class="info">
            <a href="" class="author">{{ article.author.username }}</a>
            <span class="date">{{ article.createdAt }}</span>
          </div>

          <template v-if="isAuthor">
            <button class="btn btn-outline-secondary btn-sm">
              <i class="ion-edit" /> Edit Article
            </button>

            <button class="btn btn-outline-danger btn-sm">
              <i class="ion-trash-a" /> Delete Article
            </button>
          </template>
          <template v-else>
            <button class="btn btn-sm btn-outline-secondary">
              <i class="ion-plus-round" />
              &nbsp;
              Follow Eric Simons <span class="counter">({{ article.favoritesCount }})</span>
            </button>
        &nbsp;&nbsp;
            <button class="btn btn-sm btn-outline-primary">
              <i class="ion-heart" />
              &nbsp;
              Favorite Post <span class="counter">({{ article.favoritesCount }})</span>
            </button>
          </template>
        </div>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body" />
      </div>

      <hr>

      <div class="article-actions">
        <div class="article-meta">
          <a href=""><img :src="article.author.image"></a>
          <div class="info">
            <a href="" class="author">{{ article.author.username }}</a>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <button class="btn btn-sm btn-outline-secondary">
            <i class="ion-plus-round" />
            &nbsp;
            Follow Eric Simons <span class="counter">({{ article.favoritesCount }})</span>
          </button>
        &nbsp;&nbsp;
          <button class="btn btn-sm btn-outline-primary">
            <i class="ion-heart" />
            &nbsp;
            Favorite Post <span class="counter">({{ article.favoritesCount }})</span>
          </button>
        </div>
      </div>

      <!-- 添加评论 -->
      <div v-if="user" class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <form class="card comment-form">
            <div class="card-block">
              <textarea class="form-control" placeholder="Write a comment..." rows="3" />
            </div>
            <div class="card-footer">
              <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img">
              <button class="btn btn-sm btn-primary">
                Post Comment
              </button>
            </div>
          </form>

          <div class="card">
            <div class="card-block">
              <p class="card-text">
                With supporting text below as a natural lead-in to additional content.
              </p>
            </div>
            <div class="card-footer">
              <a href="" class="comment-author">
                <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img">
              </a>
            &nbsp;
              <a href="" class="comment-author">Jacob Schmidt</a>
              <span class="date-posted">Dec 29th</span>
            </div>
          </div>

          <div class="card">
            <div class="card-block">
              <p class="card-text">
                With supporting text below as a natural lead-in to additional content.
              </p>
            </div>
            <div class="card-footer">
              <a href="" class="comment-author">
                <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img">
              </a>
            &nbsp;
              <a href="" class="comment-author">Jacob Schmidt</a>
              <span class="date-posted">Dec 29th</span>
              <span class="mod-options">
                <i class="ion-edit" />
                <i class="ion-trash-a" />
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- 没有登陆，显示登陆链接 -->
      <div v-else class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <p style="display: inherit;">
            <a @click="hLogin">Sign in</a> or <a ui-sref="app.register" href="#/register">sign up</a> to add comments on this article.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getArticle } from '@/api/article'
const MarkdownIt = require('markdown-it')
const md = new MarkdownIt()

export default {
  name: 'ArticleSlug',
  async asyncData ({ params }) {
    const { data } = await getArticle(params.slug)
    console.dir(data)
    data.article.body = md.render(data.article.body)
    return {
      article: data.article
    }
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapState(['user']),
    isAuthor () {
      if (!this.user) {
        return false
      }
      return this.article.author.username === this.user.username
    }
  },
  methods: {
    hLogin () {
      const curUrl = this.$router.currentRoute.path
      this.$router.push({
        path: '/login',
        query: {
          backUrl: curUrl
        }
      })
    }
  }
}
</script>

```



说明：

- `markdown-it`



## 路由鉴权

### 目标

有些路由是登陆用户不能访问的，有些路由是普通游客不能访问的。

### 思路

在nuxt框架集成了路由[中间件](https://nuxtjs.org/guide/routing#middleware)机制。它允许我们定义一个自定义函数运行在一个页面或一组页面渲染之前。

具体的做法是：

1. 在middlware目录下建立中间件（也就是一个js文件），文件名的名称将成为中间件名称(`middleware/auth.js`将成为 `auth` 中间件)
2. 每一个中间件都是一个函数，然后在函数内部进行业务判断，决定路由的走向。
3. 在其它页面中引入中间件。中间件的执行会先于页面渲染。

### 基本使用中间件

1.创建中间件

在middleware下建立authenticated.js文件。这个文件的内容格式是：

```javascript
export default function (context) {
  console.log(contetx)
}
```

2.使用中间件

在其它页面中，通过给vue实例添加middleware配置项来达到使用中间件的效果。

```javascript
export default {
  middleware: 'noAuthenticated',
  // 省略其它
}
```

3. 测试

- 观察中间件函数的执行时机。（它会在beforeCreated前）
- 查看中间件函数中context的内容。
  - redirect用来做路由跳转



### 中间件鉴权

1. 在 middleware目录下添加两个js文件，名字及内容分别为

 authenticated.js

```javascript
// 中间件函数会默认传入context上下文对象，这个对象中的内容非常丰富，可按需解构
// store就是vuex数据项。 redirect用来做跳转
export default function ({ store, redirect }) {
  if (!store.state.user) {
    return redirect('/login')
  }
}
```

noAuthenticated.js

```javascript
export default function ({ store, redirect }) {
  if (store.state.user) {
    return redirect('/')
  }
}
```

2. 在希望使用这些鉴权的地方加上middleware即可。具体来说要在
   - setting.vue中添加authenticated。表示它必须是登陆后才能访问的。
   - login.vue中，添加unAuthenticated,表示它必须是登陆前才能访问的，如果已经登陆，则不能再访问了。

setting.vue

```javascript
export default {
  middleware: 'authenticated',
}
```

login.vue

```javascript
export default {
  middleware: 'noAuthenticated',
}
```



## 退出功能

具体有两步：在setting.vue中

- 添加一个退出按钮。

- 添加方法，实现退出功能

在表单后面

```html
</form>
<hr>
<button class="btn btn-outline-danger" @click="logout">
    Or click here to logout.
</button>
```

退出功能

```javascript
methods: {
    logout () {
        console.log()
        Cookie.remove('user')
        this.$store.commit('setUser', null)
    }
}
```



1



## 处理刷新vuex丢失问题

如果在主页中刷新一次页面，则会出现vuex丢失的问题：由于vuex数据是保存在前端页面上的，页面刷新后数据肯定会丢失，这就涉及vuex中数据做持久化的问题。

回顾之前在vue项目中对vuex做持久的处理是这样的：

- 在初始化vuex中的state时，优先在localstorge中取。
- 获取用户信息之后，保存在localstorage中。
- 随后刷新页面，还能在初始化vuex是就直接从本地localstorage中取到。

但是，在nuxt中的，初始化vuex是在服务器端完成的。所以，在实始化vuex时，是无法获取到localstorge的。

具体举个例子：以article/xxxx这个页面为例。

在服务器端，先要执行asyncData以获取数据，然后，再来渲染页面。而在asyncData这个钩子函数中，是无法获取客户端的任何信息的。

### 添加数据容器

在后端使用token数据 

添加store/index.js

```javascript
import Vuex from 'vuex'

const cookieparser = process.server ? require('cookieparser') : undefined

// 在nuxt中，store是一个函数。
const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      user: null
    }),
    mutations: {
      setUser (state, user) {
        state.user = user
      }
    },
    actions: {
    // 是nuxtjs中额外提供的api,专门用来在服务器渲染来填充vuex数据容器的。
      nuxtServerInit ({ commit }, { req }) {
        let user = null
        if (req.headers.cookie) {
          const parsed = cookieparser.parse(req.headers.cookie)
          console.log(parsed)
          try {
            user = JSON.parse(parsed.user)
          } catch (err) {
            // No valid cookie found
          }
        }
        commit('setUser', user)
      }
    }
  })
}
export default createStore
```



## 附录

### vscode中eslint自动修正

.vscode\setting.json

```json
{
  "eslint.run": "onSave",
  "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
  }
}
```



### 关闭eslint中的console

```javascript
rules: {
    'no-console':'off',
}
```

