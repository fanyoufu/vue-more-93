

## 第1题

### 题目

下面代码会输出什么？

```javascript
var obj = {a:1};
Object.defineProperty(obj,"a",{
    get(){
        return this.a
    }
})
console.log(obj.a)
```

友情请示： 如果在浏览器中运行上面的代码，可能会导致浏览器卡死。慎重。

### 答案

会陷入死循环。因为是上面的Object.definedProperty()给obj对象的a属性添加一个拦截器get()，当访问obj.a时，会执行get()中的代码，而在get()中又再次访问obj.a（this.a也就是obj.a），所以这里会形成死循环。



## 第2题

### 题目

Object.defineProperty()是否能在ie8中使用？

### 答案

不能。在[这里](https://www.caniuse.com/#feat=mdn-javascript_builtins_object_defineproperty)可以查



## 第3题

### 题目

属性描述符一共有几个？

### 答案

6个。分别是configurable,enumable, value,writable,get,set; 



## 第4题

### 题目

如何让一个对象属性处于只读状态。例如：

```javascript
var obj = {a:1}
// 你的代码。
obj.a = 20;
console.log(obj.a) // ==> 1
```



### 答案

```javascript
var obj = {a:1}
// 你的代码
Object.defineProperty(obj,'a',{
    writable:false
})
obj.a = 20;
console.log(obj.a) // ==> 1
```

## 第5题

### 题目

get,set能和value一起使用吗？

### 答案

不能。

## 第6题

### 题目

如何理解get,set是拦截器？

### 答案

当给一个属性定义了get,set之后，就说明它不能直接用来保存具体的数据了，数据只能保存在另一个变量中。此时我们就说这个属性是那个变量的拦截器。

如下的代码中：

```javascript
var obj = {}
var _a = 1
Object.defineProperty(obj,"a",{
    set(val){ _a = val},
    get(){ return _a;}
})
```

obj.a就是_a的拦截器，获取和设置\_a的两个操作都必须要经过obj.a的set,get函数。

## 第6题

### 题目

Object.defineProperty与vue框架有什么关系？

### 答案

vue.js 2.X版本中使用它来实现数据响应式效果。

## 第6题

### 题目

如何使用proxy来实现一个允许下标为负的数组。

### 答案

```javascript
var arr = [1,2,3];
var proxyArr = new Proxy(arr,{
  get: (target,prop)=>{
    let index = Number(prop);
    if(index < 0){
      prop = target.length + index;
    }
    return target[prop];
  }
})

console.info(arr[-1]);   // undefined

console.info(proxyArr[-1]); // 3
```

## 第9题

### 题目

如何用proxy来实现访问不存在的属性名时给出更加优雅的提示。

```javascript
const con = {
 COMPANYNAME:"jd",
}
// 你的代码
//let proxyConst = ...;//

console.log(proxyConst.abc); // 提示abc属性不存在。
```



### 答案

```javascript
const con = {
 COMPANYNAME:"jd",
}

let proxyConst = new Proxy(con, {
  get: function (target, key, receiver) {
    if(key in target)
    return target[key];
    else{
      throw new Error("error:常量名"+key+"不存在！")
    }
  }

});
```

## 第10题

### 题目

如下代码会输出什么？

```javascript
var obj = {
    a : 1
}
Object.defineProperty(obj,"b",{
    value: 2
})
obj.a = 100;
obj.b = 100;
console.log(obj.a, obj.b) // a,b的值分别是什么？
```

### 答案

obj.a是100，obj.b是2。因为writable属性默认为false，所以obj.b是不能修改了，或者说改了也无效。

## 第10题

### 题目

Object.defineProperty和Proxy的相同和不同？

### 答案

Object.defineProperty是es5中给出的，用来精细设置对象的属性的工具：例如可以通过writeable,enumable,configurable,set,get来设置只读属性，或者对某个属性进行拦截。 在vue2.x中就是使用它实现的数据响应式效果。

Proxy是es6提出新对象。它用来在一个已有对象的基础上设置代理对象。这个代理对象的作用是对原对象上的所有操作进行拦截，也可以充当拦截器的功能。

不同的之处在于，proxy的代理功能更加强大：

它可以很方便地拦截所有的属性操作；

除了get,set之外还有其它的代理功能。



在vue3中将会使用它来实现数据响应式效果。

