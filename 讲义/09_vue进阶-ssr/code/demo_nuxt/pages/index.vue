<template>
    <div>
        <h1>{{title}}</h1>
        <div>
            <nuxt-link to="/page1">page1</nuxt-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Index',
        data() {
            return {
                title:'我的第一个nuxt.js网页'
            }
        }
    }
</script>
