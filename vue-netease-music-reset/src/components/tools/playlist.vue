<!--  -->
<template>
    <div class="list-wrap" >
        <div class="img-wrap" v-for="item in msg" :key="item.id" @click="tolistinfo(item.id)">
            <img :src="item.picUrl" alt="图片">
            <div class="desc-wrap">
                <span>{{item.copywriter}}</span>
            </div>
            <div class="icon-wrap">
                <i class="iconfont">&#xe611;</i>
            </div>
            <p>{{item.name}}</p>
        </div>
    </div>
</template>

<script>
export default {
props:['msg'],
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
    tolistinfo(id){
        this.$router.push(`/songlist/${id}`)
    }
},
}
</script>
<style lang='scss' scoped>
/* @import url(); 引入css类 */
.list-wrap{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    flex-direction: row;
   
    .img-wrap{
        width: 190px;
        margin-bottom: 30px;
        position: relative;
        overflow: hidden;
        img{
            width: 100%;
            border-radius: 5px;

        }
        .desc-wrap{
            background-color: rgba($color: #0c0c0c, $alpha: .5);
            color: rgb(238, 229, 229);
            width: 100%;
            font-size: 13px;
            letter-spacing: 1.1px;
            padding: 10px 0;
            text-align: center;
            position: absolute;
            top: -40px;
            transition: all .3s ease;
        }
        .icon-wrap{
            width: 30px;
            height: 30px;
            bottom: 40px;
            right: 10px;
            opacity: 0;
            .iconfont{
                color: #C62F2F;
                font-size: 18px;
                line-height: 30px;
            }
        }
        p{
            overflow: hidden;
            color: var(--text-color);
            white-space: nowrap;
            text-overflow:ellipsis;
            font-size: 13px;
            letter-spacing: 1.1px;
            padding: 5px 0;
        }
    }
    .img-wrap:hover{
        .desc-wrap{
            top: 0;
        }
        .icon-wrap{
            opacity: 1;
        }
    }
}
</style>