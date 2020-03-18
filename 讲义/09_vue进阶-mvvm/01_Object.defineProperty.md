Object.defineProperty()

在vue2.x系列中，双向数据绑定的核心就是这个方法。

## Object.defineProperty

> `Object.defineProperty()` 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。

给对象添加属性的方式有：

- 字面量

  ```javascript
  var obj = {
      a: 1,
      b: 2 
  }
  ```

- 对象.属性名 = 值

  ```javascript
  obj.a  = 1;
  ```

- 对象["属性名"] = 值

  ```javascript
  obj["a"] = 1
  ```

- Object.defineProperty()

## 格式

Object.defineProperty()

- 格式

```
Object.defineProperty(obj, prop, descriptor)
```

- 参数
  - `obj`:要在其上定义属性的对象。
  - `prop`:要定义或修改的属性的名称。
  - `descriptor`:将被定义或修改的属性描述符。

- 返回值

  被传递给函数的对象。

## 属性描述符

```javascript
Object.defineProperty(对象, 属性名,{
    configurable:false,
    enumerable:false,
    
    writable:false,
    value:undefined,
    
    get:function(){},
    set:function(){}
    
})
```

说明

- `configurable`： 为 true 时，属性才能重新被定义（再写一次Object.defineProperty）。**默认为 false**。
- `enumerable`：为`true`时，该属性才能够出现在对象的枚举属性中，即可以使用for in循环访问。**默认为 false**。

- `value`：该属性对应的初值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。**默认为 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)**。
- `writable`：为`true`时，value属性值才能被修改。**默认为 false**，相当是只读的。

- `get`：一个给属性提供 get的方法，如果没有 getter 则为 `undefined`。当访问该属性时，该方法会被执行。**默认为 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)**。
- `set`：一个给属性提供 set 的方法，如果没有 setter 则为 `undefined`。当属性值修改时，触发执行该方法。该方法将接受唯一参数，即该属性新的参数值。**默认为 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)**。

>  如果一个描述符同时有(value或writable)和(get或set)关键字，将会产生一个异常。

<img src="asset/image-20200218152252191.png" alt="image-20200218152252191" style="zoom:80%;" />



## 学习属性描述符

### enumerable

```javascript

const obj = {
    b:1
}

Object.defineProperty(obj,"a",{
    value:1,
    enumerable:false
})

Object.defineProperty(obj,"c",{
    value:2,
    enumerable:true
})

for(var key of obj) {
    console.log(key)
}

```



### configurable

```javascript
// 定义属性
Object.defineProperty(obj,"c",{
    // 不允许再次配置这个属性
    configurable: false,
    // 这个属性能否被for in 循环遍历
    enumerable:true,
    value:100

})
```



### value和writable

定义只读的属性:

```javascript
const obj = {
    B:1
}
Object.defineProperty(obj,"A",{
    value: 1,
    writable: false
})

console.dir(obj)
console.log(obj.A)
obj.A =1001
console.log(obj.A)
```

const定义的对象，它的属性还是可以修改的。我们可以通过writable设置为false来设置只读的属性，真正实现常量的效果。

在上面的代码中，如果给对象的属性赋值，并不会修改属性的值。

### 进阶：对已有对象进行封装，以得到一个常量对象

```javascript
const obj = {
    a:1,
    b:2
}
function getConst(obj){
    var _obj = {}
    for(var key in obj){
        Object.defineProperty(_obj,key,{
            writable:false,
            value: obj[key]
        })
    }
    return _obj
}
var obj1 = getConst(obj)

console.log("设置之后的值是：",obj1)
```



### get和set

- 它们与value和writable是互斥的。
- 一旦使用它们，则这个属性就没有保存属性值的能力
- 用它们来做拦截器

#### 实现常量对象

目标：不允许修改对象的某个属性，修改了也无效。

第一步：使用get()返回值，定义只读的属性

第二步：使用set()，在设置值时报错。

```javascript
const obj = {}
Object.defineProperty(obj,"age",{
    get(){
        return 18
    },
    set(){
        console.warn("对不起，你没有权限设置age属性！")
        console.error("对不起，你没有权限设置age属性！")
        // throw new Error("对不起，你没有权限设置age属性！")
    }
})

console.dir(obj)
console.log(obj.age)
obj.age = 80
console.log("设置之后的值是：",obj.age)
```



### 把一个已有对象设置成只读的对象

- 思路：只不设置set

```javascript
const obj = {
    a:1,
    b:2
}
function getConst(obj){
    var _obj = {}
    for(var key in obj){
        Object.defineProperty(_obj,key,{
            get(){
                return obj[key]
            }
        })
    }
    console.log(key)
    return _obj
}
var obj1 = getConst(obj)

console.log("设置之后的值是：",obj1)
```



## 实现从数据到视图的变化

### 进阶示例：监听属性的变化

 ```javascript
var obj = {salary}
Object.defineProperty(obj,"salary",{
  get:function(){
    console.info("get.....")
  },
  set:function(newVal){
    console.info("set.....")
  }
})

obj.salary = 2000; // 在控制台输出
obj.salary; //在控制台输出

 ```



#### 封装函数监听全部的属性

```
function observe(obj) {
  Object.keys(obj).forEach(key=>{
    var val = obj[key]
    Object.defineProperty(obj,key,{
      set:function(newVal){
        console.info( `${obj[key]}----->${newVal}`);
      val = newVal;
     },
     get:function(){
      console.info(`get....${key}`)
      return val;
     }
    })
  })
}

var data = {salary:10000,bonus:30000}
Observe(data);

data.salary = 20000; // 更新属性值
data.bonus;
```

到此为止，对于对象的所有属性，我们都加上`监听`,这个步骤称之为`数据劫持`. 其实，上面的Object.defineProperty就是vue2实现的核心原理。（在今年要发布的vue3中将会使用ES6中的Proxy来代替Object.defineProperty。参考 [Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)）你现在对比一下，通过控制台，打印vue实例可以看到到处可见的:`set`,`get`。

vue2的核心原理就是这个api`Object.defineProperty()` ，看起来很简单是吧。

到此，基础准备工作也就告一段落了。下面涉及到 js中的构造器,原型链,等内容，坐好车，跟我走吧。

## 与vue的关联

- vue2.x中找到Object.defineProperty()
- vue不支持ie8及更低版本，因为Object.defineProperty在这些版本中不可用。

