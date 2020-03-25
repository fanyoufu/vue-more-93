<template>
    <div>
        <h1>
            page1.vue的内容 -- {{title}}
        </h1>
        <div>
            <nuxt-link to="/">回主页</nuxt-link>
        </div>
        <ul>
			<li v-for="(item,idx) in list" :key="idx" >
				{{item.author}}
			</li>
		</ul>
    </div>
</template>

<script>
    // 引入axios包
    import axios from "axios"
    export default {
        name: '',
        async asyncData(){
            console.log("asyncData",Date.now())
            // console.log("asyncData",this)
            // return {
            //     serData:"服务器ssr"
            // }
            // res 是被axios包装过的对象，它的有效数据保存res.data中
            let res = await axios({
                method:"get",
                // url:'http://ttapi.research.itcast.cn/app/v1_1/articles?channel_id=0&timestamp=1585106564897&with_top=1'
                url:'http://www.liulongbin.top:3006/api/getbooks'
            })

            console.log(res.data.data)
            // 这里获取到的数据，会和data()中的数据合并。
            // 在template中可以正常使用
            return {
                list: res.data.data
            }
        },
        mounted(){
            console.log('mounted',Date.now())
        },
        beforeCreate(){
            console.log('beforeCreate',Date.now())
        },
        created(){
            console.log("created",Date.now())
            // // 发ajax请求
            // axios({
            //     method:"get",
            //     url:'http://www.liulongbin.top:3006/api/getbooks'
            // }).then(res=>{
            //     // console.log(res.data.data)
            //     this.list = res.data.data

            // })

        },
        data() {
            return {
                title:"ssr",
                // list:[]
            }
        }
    }
</script>

<style lang="" scoped>
    
</style>