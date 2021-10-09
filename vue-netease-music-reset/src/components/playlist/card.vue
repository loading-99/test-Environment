<!--  -->
<template>
<div class="card" @click="getlist(msg[0].id)">
    <div class="img-card" v-for="item in msg" :key="item.coverImgId">
        <img :src="item.coverImgUrl" alt="图片">
    </div>
    <div class="info-card" v-for="item in msg" :key="item.id">
        <div>
            <button>精品歌单</button>
        </div>
        <p class="title-card">《{{item.name}}》</p>
        <p class="cont-card">{{item.description}}</p>
    </div>
    <div class="bgimg"></div>
</div>
</template>

<script>
export default {
props:["msg"],
data() {
return {

}
},
//生命周期 - 创建完成（访问当前this实例）
created() {

},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {

},
methods: {
    getlist(id){
        this.$router.push(`/songlist/${id}`)
    }
},
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.card{
    display: flex;
    justify-content: space-between;
    padding: 15px;
    position: relative;
    overflow: hidden;
    border-radius: 6px;
    color: rgb(228, 218, 218);
    background-color: rgb(19, 16, 16);
    margin-bottom: 20px;
    .img-card{
        width: 150px;
        height: 150px;
        z-index: 888;

        img{
            height: 100%;
        }
    }
    .info-card{
        // flex-grow: 1;
        z-index: 888;
        padding: 0 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        div{
            margin-bottom: 10px;
            button{
                display: inline-block;
                width: auto;
                padding: 5px 10px;
                border-radius: 5px;
                background-color: transparent;
                color: rgb(250, 194, 10);
                border: 1px solid rgb(250, 194, 10);
            }
        }
        .title-card{
            margin-bottom: 10px;
        }
        .cont-card{
            font-size: 13px;
            // height: 80px;
            letter-spacing: 1.1px;
            color: rgb(194, 174, 174);
            line-height: 20px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 4;
            overflow: hidden;
        }
    }
    .bgimg{
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background-repeat: no-repeat;
        background-size: 100%;
        filter: blur(20px);
        opacity: .4;
    }
}


</style>