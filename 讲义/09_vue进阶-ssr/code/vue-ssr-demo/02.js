const express = require('express')

const Vue = require('vue')

const renderer = require('vue-server-renderer').createRenderer()

const app = express();

app.get('/index.html',(req,res)=>{
    // let htmlStr = "<h1>主页</h1>"
    // res.send(htmlStr)
	const vm = new Vue({
	  template:`
        <ul>
            <li v-for="(item,idx) in list" :key="idx">
                <h3>{{item.author}}</h3>
                <div>{{item.content}}</div>
            </li>
        </ul>
      `,
	  data:{
		list:[
                {author:"李白",content:"举杯邀明月"},
                {author:"杜甫",content:"喝酒不开车"},
                {author:"杜甫",content:"喝酒不开车"}
            ]
	    }
	})
    // renderToString是由  vue-server-renderer 提供的方法
    // 功能是：把vue实例 转成 dom结构
	renderer.renderToString(vm, (err, html) => {
	  if (err) {
          throw err
      }
      // html 就是vue实例对应的 dom
	  res.send(html)
    })
    
})

app.listen(3000,()=>{
    console.log("3000端口已经启动");
})