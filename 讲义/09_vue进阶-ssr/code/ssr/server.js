

var express = require("express")
var app = express();
app.use(express.static("public"))
const {content,title} = require('./db/db.json')
app.get("/index_ssr.html",(req,res)=>{
	var htmlStr = `
	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="utf-8" />
			<title></title>
		</head>
		<body>
			
			<h2>${title}</h2>
			<div>${content}</div>
			
		</body>
	</html>
	`
	res.send(htmlStr)
})
app.get("/get",(req,res)=>{
	res.json({
		content,
		title
	})
})

app.listen(8080,()=>{
	console.log("服务器已经启动在8080");
	console.log("你可以访问http://localhost:8080/index_ssr.html");
	console.log("你可以访问http://localhost:8080/index_csr.html");
})