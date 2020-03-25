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
// renderer.renderToString(app, (err, html) => {
//   if (err) {
//       throw err
//   }
//   console.log(html)
//   // => <div data-server-rendered="true">Hello World</div>
// })

// 方法二：promise
// 在 2.5.0+，如果没有传入回调函数，则会返回 Promise：
renderer.renderToString(app).then(html => {
  console.log(html)
}).catch(err => {
  console.error(err)
})