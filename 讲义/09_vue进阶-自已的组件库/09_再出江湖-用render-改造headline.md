

## 目标

- 在组件中添加headline组件（类似于h1,h2..这种标签效果）



##  内容

- 允许用户传入级别
- 允许设置icon
- 允许设置大小
- 允许设置子标题



## 组件代码

headline.vue代码如下

```javascript
<script>
export default {
    name:"MyHeadline",
    props:{
        level:{
            type:Number,
            default:2
        },
        icon:{
            type:String,
            default:'',
            required:false
        },
        size:{
            type:String,
            default:"medium",
            required:false,
            validator:(val)=>{
                return ['huge','large','medium','small','tiny'].includes(val)
            }
        }
    },
    render(h){
        console.log(this.level)
        const classSize = this.size
        const classArr = ['ui header'];

        classArr.push(classSize)
        // classArr.push('divider')

        const children = []
        if(this.icon) {
            children.push(this.buildIcon())
        }
        children.push(this.buildContent())
        return h('h'+this.level,{
            class:classArr.join(' ')
        },children)
    },
    methods:{
        buildIcon(){
            const h = this.$createElement;
            
            return h('i',{
                class:"icon "+this.icon
            })
        },
        buildContent(){
            const h = this.$createElement;
            let children = [this.$slots.default]
            if(this.$slots.sub) {
                const sub = h("div",{
                    class:"sub header",
                },
                    this.$slots.sub
                )
                children.push(sub)
            }
            return h('div',{
                class:"content"
            },
            children
            )
        }
    }
}
</script>
```

