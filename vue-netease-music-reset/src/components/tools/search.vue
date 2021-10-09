<!--  -->
<template>
<div>
    <div class="header">
        <span>{{$route.params.songname}}  </span>
        <span> 共找到{{$store.state.searchinfo.songcount}}个结果</span>
    </div>
    <div class="typeinfo">
        <p v-for="(itme) in typeinfo" :key="itme.tab" ><router-link :to="'/search/'+ $route.params.songname +'/'+ itme.tab">{{itme.name}}</router-link></p>
    </div>
    <router-view></router-view>
</div>
</template>

<script>
export default {
data() {
return {
    typeinfo:[
        {name:'歌曲',tab:'song'},
        {name:'歌单',tab:'songlist'},
        {name:'MV',tab:'mvs'}
    ],
    active:0,
    page:0,
    type:null

}
},
methods: {
    pagechange(page){
        console.log(page)
    }
},
computed:{
    total(){
        return Math.ceil(this.$store.state.searchinfo.songcount/30)*10
    }
},
//生命周期 - 创建完成（访问当前this实例）
created() {

},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {

}
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.header{
    background: none;
    justify-content: left;
    align-items: baseline;
    color:var(--title-color);
    margin-bottom: 10px;
    span{
        margin: 0 5px 0 0;
    }
    :first-child{
        font-weight: bold;
        font-size: 25px;
    }
    :last-child{
        color: rgb(170, 162, 162);
        font-size: 13px;
        letter-spacing: 1.5px;
    }
}
.typeinfo{
    display: flex;
    justify-content: left;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba( #c9c1c1,.3);
    p a{
        margin-right: 25px;
        font-size: 16px;
        text-decoration: none;
        color: rgb(170, 159, 159);
    }
    .router-link-active{
        color: var(--title-color);
    }
}
</style>