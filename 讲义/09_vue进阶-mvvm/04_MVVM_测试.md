## 第1题

### 题目

MVVM是指什么？

### 答案

MVVM是一种设计模式，用来解决数据与视图之间的耦合关系。m是model，指数据，也称为模型。v是view,指视图。vm是视图模型。 通过vm把数据和视图联系在一起：当v变化时，把这个变化传导给m; 当m变化时，把变化传导给v。

## 第2题

### 题目

双向数据绑定是什么意思？

### 答案

指数据的变化引起视图的变化；视图的变化会导致数据的变化；

## 第3题

### 题目

 vue.js中，如何知道你修改了数据？

### 答案

它通过Object.defineProperty()来给数据添加拦截器：set。当你通过`对象.属性=值`这种方法来修改数据时，这个拦截器就会被触发，从而你就可以知道数据被修改了。

## 第4题

### 题目

如何理解观察者模式？

### 答案

观察者模式是定义了一种一对多的依赖关系，让多个观察者对象同时监听某一个目标对象，当这个目标对象的状态发生变化时，会通知所有观察者对象，使它们能够自动更新。

它有三个要点：

- 观察者。一般表现为一个函数。
- 被观察的目标。一般也称为事件名。
- 管理中心。要能添加观察者来观察指定目标；要能发布事件，让所有的观察者去执行代码。

## 第5题

### 题目

dom结点的类型可以通过什么字段来获取？

### 答案

nodeType属性。如果这个值是3，就表示是文本节点；这个值是1 就表示元素节点。

## 第6题

### 题目

如给定如下字符串`a的值是{{a}},b的值是{{b}}`，如果把`var obj = {a : 1, b :2}`中的值替换进去成`a的值是1,b的值是2`

### 答案

参考答案

```javascript
var obj = {a : 1, b :2}
var str = "a的值是{{a}},b的值是{{b}}"
var newStr = str.replace(/{{(.+?)}}/g,function(objstr,p1){
   
    return obj[p1]
}) ;
console.log(newStr);
```

