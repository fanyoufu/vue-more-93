# ES6之Proxy

vue3.x将会用Proxy来代替Object.defineProperty。

## 是什么

Proxy是一个构造器。通过`new Proxy(原对象,{代理列表})`的方式去创建对象,创建的这个对象我们称之为代理对象。

即：

> 代理对象 = new Proxy(原对象,{代理列表})

之所以要额外产生这么一个代理对象，好处在于可以保持原对象不变，在代理对象中添加新的功能，或者是改造某些功能。

## 使用格式

```javascript
var obj={};
var proxyObj = new Proxy(obj, {
  对obj的操作1: 函数1，
  对obj的操作2: 函数2，
  ...
})
```



## 入门示例

### Proxy的基本示范

```javascript
var obj = {name:'obj',age:34}

console.info(obj.name)

var proxyObj = new Proxy(obj,{
  get:function(target,prop,receiver){
      console.info(target,prop,receiver);
      return 'no'
  }
})

console.info(proxyObj.name)
console.info(proxyObj.abc)
```

解释如下：

- proxy对象是在obj对象的基础之上创建的一个新对象。
- get函数中的三个参数：target,prop,receiver。 target就是原对象obj,prop是当前的属性名；receiver是代理对象。你可以在get方法中做任意的自定义的处理。

- proxyObj.name是要去获取proxy对象的name属性。`.操作符会自动去调用get()方法`。

- 在new Proxy的第二个参数中，明确设置了get的方法：当访问proxyObj的任意属性时，输出target,key,receiver的值，并统一返回no。所以proxyObj.name和proxyObj.abc都会得到no。

写到这里你会觉得原对象与代理对象之间有什么关系呢？为什么叫`代理`呢？

### 理解代理的作用

代理对象可以理解为明星的经纪人。

```
外界 <----> 原对象；
外界 <----> 代理对象 <------> 原对象；
```



还以上面的代码为例，改进一下需求：如果有人问obj的名字，就直接告诉对方； 如果有人问obj的年龄，就返回小5岁的年龄。

```javascript
var obj = {name:'obj',age:34}

console.info(obj.age)     // 34

var proxyObj = new Proxy(obj,{
  get:function(target,key,receiver){
    console.info(target === obj);     //true
    console.info(receiver === proxyObj);  //true
    if('age' === key){
      return target[key] - 5;
    }
    else{
      return target[key]
    }
  }
})

console.info(proxyObj.age) 
// 34-5=29
```



## 代理对象与原对象的关系

```javascript
var arr = [2,1]
var proxyArr = new Proxy(arr,{} )
proxyArr.push(3);
console.info(arr) // [2,1,3]
console.info(arr === proxyArr) // false
arr.sort();
console.info(proxyArr[0]) // 1
```

以上代码中，这个代理对象并没有做任何的特殊操作。理解为明星的经理人消极怠工：原封不动地转告外界的信息给明星本身。所以在proxyArr上做到操作会直接影响到arr上。

同理，在arr上的操作，也会影响proxyArr。

但是要注意：proxyArr与arr是两个不同的对象：arr !== proxyArr。

你可能会想一想：为什么proxyArr能够直接使用push这个方法呢？原因是：

```javascript
proxyArr.__proto__ === arr.__proto__ === Array.prototype
```

前一个等式成立的原因是由new Proxy的基因决定的：原对象被代理了嘛。

## 代理列表

在new Proxy的第二个参数中，可以设置的代理属性如下：

```javascript
var proxyObj = new Proxy(obj, {
  get: function(tagert,key,receiver){},
  set: function(tagert,key,value){},
  has: function(tagert,key){},
  deleteProperty: function(tagert,key){},
  ownKeys: function(tagert){},
  getOwnPropertyDescriptor: function(tagert,key){},
  defineProperty: function(tagert,key,desc){},
  preventExtensions: function(tagert){},
  getPrototypeOf: function(tagert){},
  isExtensible: function(tagert){},
  setPrototypeof: function(tagert,proto){},
  apply: function(tagert,obj,args){},
  construct: function(tagert,args){},
})
```



## get() 代理的应用

### 访问不存在的属性名时给出更加优雅的提示

在我们写js代码的过程中，最容易遇到的是错误是：访问一个对象不存在的属性。而这个时候js代码是不报错的，它只会返回一个undefined.



需求：访问对象的属性时，如果这个属性不存在，则报出一个错误提示

```javascript
var obj = {
    a:1,b:2
}
// 给obj添加一个代理对象，如果访问的属性不存在，则直接报错

let obj1 = new Proxy(obj,{
    get:function(target,prop){
        // 如果prop在target存在，则返回值
        // 否则就，报错
        console.log( target,prop )
        // 判断prop在target中是否找到
        if( prop in target){
            return target[prop]
        }else {
            console.log('你访问的'+prop+'不存在')
        }

    }
})

// console.log(obj.c)
console.log(obj1.c)
```



### 允许数组下标是负值

在js中，数组的有效下标是从0开始的。

```
var arr = [1,2,3];

console.info(arr[0]) // 1

console.info(arr[-1]) // undefined

console.info(arr[100]) // undefined
```

值得注意的是，`下标越界或者是负值的情况下，得到的结果是undefined，而不是报错`。

#### 需求

如果我们希望数组可以取负值下表，且规则如下：

-n表示倒数第n个元素。例如：arr[-1]表示数组arr中的倒数第一个元素。

可以使用Proxy解决如下：

```javascript
var arr =[1,2,3,4];
// 如果我们希望数组可以取负值下表，且规则如下：

// -n表示倒数第n个元素。
// 例如：arr[-1]表示数组arr中的倒数第一个元素。
// -1: 倒数第一个元素, 下标：arr.length + (-1)
// -2：倒数第二个元素, 下标：arr.length + (-2)

var arr1 = new Proxy(arr,{
    get:function(target,prop){
        // target原对象 arr。
        // prop:当前访问的下标。 
        // console.log(target,prop)
        // 把 "-1" ---> -1
        let idx = Number(prop)
        if(idx < 0) {
            idx = target.length + idx
        } 
        return target[idx]
        // todo: 如果数组越界，给出提示

    }
})

console.log(arr1[-1])
```

