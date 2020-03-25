服务端渲染

## 页面的两种生成方式

当用户从浏览器地址栏中输入地址访问一个网页的过程中，可以采用两种不同的策略来生成这个页面。

（1）服务器端渲染**S**erver **S**ide **R**ender

- 渲染是指：**从数据到dom的过程**（从json到html结构）

- 数据到dom的过程是发生在服务器端

- 客户端浏览器在地址栏中输入网页的地址，取回来的就是html页面。

  ![image-20200324195916058](asset/image-20200324195916058.png)

（2）客户器端渲染 **C**lient **S**ide **R**ender

- 渲染是指：数据到dom的过程 （从json到html结构）

- 数据到dom的过程是发生在客户端

- 客户端浏览器在地址栏中输入网页的地址，取回来的只是html骨架，

- 再去发ajax请求，取回来数据，再显示到页面上(用vue,arttemplate,模板字符串等技术)

  ![image-20200324195957440](asset/image-20200324195957440.png)



### 小结

- ssr:服务器端渲染。数据组装(从json--->dom结果)的过程是发生在服务器上的。客户端取回来的是有数据页面。
- csr:客户端渲染：数据组装(从json--->dom结果)的过程是发生客户端（浏览器）的。主要是通过ajax取数据，再用 vue技术来渲染。

## SEO与爬虫

客户端渲染技术对SEO不友好，爬虫无法获取有效内容！。

### 什么是SEO

**S**earch **E**ngine **O**ptimization ，搜索引擎优化。我们开发的网页肯定希望被更多人的知道，而推广自已的网页的方式之一是借助搜索引擎的力量，让其它人在百度中搜索某个关键字时就能找到你的网页。

那么，百度是如何得知http://xxxx.com/abc这个页面中有关键字`javascript`的呢？

百度服务器会使用一些程序来获取网页的内容，分析内容，以提取出关键字，便 于在搜索时能找到网页。 这个过程一般称为爬虫。

![image-20200324202504901](asset/image-20200324202504901.png)

SEO的目标是更明确地告诉百度，你的网页上的内容，以便更好地被收录。

### 爬虫

我们平常上网都是在**浏览器中请求网页地址**，而爬虫代码是通过代码的方式去请求网页地址。

下面就是一个简陋的爬虫：

步骤：

1. 创建一个.js文件（假设名字是spider.js）内容如下：

```javascript
// 引入http模块
const http = require("http")

// 定义要爬虫程序 访问的 网页
let url = "http://localhost:8080/index_csr.html"

// let url = "http://localhost:8080/index_ssr.html"

// 用http模块中的get方法去请求 url 这个网页，把请求到的结果显示出来。
http.get(url, (res) => {
  let result = ""
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
	  result += chunk
  });
  res.on('end', () => {
    console.log(`爬虫得到的数据是: ${result}`);
  });
});
```

2. 运行js文件

   ```
   node spider.js
   ```

   这一段代码会去请求代码中url指定的网页（可在这里下载运行[示例代码](https://github.com/fanyoufu/code/tree/master/ssr)），并打印出结果。

3. 小结

   对于采用客户端渲染的网页：爬虫程序无法获取有效的数据。（因为有效的数据是通过ajax在客户端发出来，去取回来的）

   对于采用服务器端渲染的网页：爬虫程序可以获取有效的数据。（因为获取的内容就已经包含数据）

![image-20200325110332656](asset/image-20200325110332656.png)

## 客户端渲染与服务器端渲染的区别

|            | 优点                                                       | 缺点                                                         |
| ---------- | ---------------------------------------------------------- | ------------------------------------------------------------ |
| 客户器渲染 | 适合前后端分离开发，方便维护，单页应用中几乎都是客户端渲染 | 首次加载慢，不利于 SEO                                       |
| 服务器渲染 | 响应速度快，有利于 SEO                                     | 前后端代码混合在一起，难以开发和维护，不适合进行前后端分离开发 |



我们使用vue开发的的项目都是典型的SPA（单页面应用程序），并且是标准的前后端分离的，很显然是属于客户端渲染的范畴。

* 好处：页面导航不用刷新整个页面，体验好，有利于前后端分离开发
* 缺点：不利于 SEO（因为单页面应用中都是使用客户端渲染的方式），还有首次响应慢（第1次要加载大量的公共资源）

是否有相对折中的解决方案，或者是两全其美的解决方案呢？



## 同构应用

isomorphic web apps（同构应用）：isomorphic/universal，基于react、vue框架，客户端渲染和服务器端渲染的结合，在服务器端执行一次，用于实现服务器端渲染（首屏直出），在客户端再执行一次，用于接管页面交互，核心解决SEO和首屏渲染慢的问题。

* 单页面 + 服务端渲染



## Vue的SSR介绍及示例演示

[Vue的SSR文档](https://ssr.vuejs.org/zh/) 

Vue.js 是构建客户端应用程序的框架。默认情况下，可以在浏览器中输出 Vue 组件，进行生成 DOM 和操作 DOM。然而，也可以将同一个组件渲染为**`服务器端的 HTML 字符串`**，将它们直接发送到浏览器，最后将这些静态标记"激活"为客户端上完全可交互的应用程序。

- 学习vue-server-renderer
- 在服务器端使用-server-renderer

### 创建项目

创建一个空目录，进入,并运行：

```javascript
npm init --yes
```

来做初始化。

### 安装依赖

[参考](https://ssr.vuejs.org/zh/guide/#%E5%AE%89%E8%A3%85)

```bas
npm install vue vue-server-renderer --save
```

### 示例：在node代码使用vue渲染数据

新建文件为01.js，内容如下：

```javascript
const Vue = require('vue')
// 第 1 步：创建一个 vue实例
const app = new Vue({
  template: `<div>{{title}}</div>`,
  data:{
	  title:"hello,vue ssr!"
  }
})

// 第 2 步：创建一个 renderer
const renderer = require('vue-server-renderer').createRenderer()

// 第 3 步：将 Vue 实例渲染为 HTML
// 方法一：回调函数
renderer.renderToString(app, (err, html) => {
  if (err) throw err
  console.log(html)
  // => <div data-server-rendered="true">Hello World</div>
})

// 方法二：promise
// 在 2.5.0+，如果没有传入回调函数，则会返回 Promise：
renderer.renderToString(app).then(html => {
  console.log(html)
}).catch(err => {
  console.error(err)
})
```

运行结果：

```bash
node 01.js
```

输出结果如下：

```javascript
<div data-server-rendered="true">hello,vue ssr!</div>
<div data-server-rendered="true">hello,vue ssr!</div>
```



### 示例:与服务器功能集成

目标：

请求网页`http://localhost:3000/index.html`，在服务器端使用vue-server-renderer来渲染生成html文档，并返回。

涉及npm包：

- express
- vue， vue-server-renderer

代码如下：

```javascript
// 02.js
// 这个页面中使用了express搭建后端服务器
// 收到用户的请求之后，使用vue-server-renderer来把vue实例转成html代码并返回
const express = require('express');

const app = express()

const Vue = require('vue')

const renderer = require('vue-server-renderer').createRenderer()

app.get("/index.html",(req,res)=>{
	
	let template= `
	<ul>
		<li v-for="(item,idx) in list" :key="idx">
			<h3>{{item.author}}</h3>
			<div>{{item.content}}</div>
		</li>
	</ul>
	`
	const data = {
		list:[{author:"李白",content:"举杯邀明月"},
		{author:"杜甫",content:"喝酒不开车"},
		{author:"杜甫",content:"喝酒不开车"}]
	}
	const vm = new Vue({
	  template,
	  data
	})

	renderer.renderToString(vm, (err, html) => {
	  if (err) throw err
	  res.send(html)
	})
})

app.listen(3000,()=>{
	console.log('3000');
})
```























