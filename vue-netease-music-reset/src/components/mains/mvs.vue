<!--  -->
<template>
<div class="new-mvs">
    <div class="title-wrap">
        <span>推荐MV</span>
    </div>
    <div class="box-wrap">
        <div class="mv-wrap" v-for="item in mvdata" :key="item.id" @click="tomvsinfo(item.id)">
            <div class="img-wrap">
                <img :src="item.picUrl" alt="图片">
                <div class="play-num"><i class="iconfont">&#xe611;</i>{{item.playCount}}</div>
                <div class="icon-wrap"><i class="iconfont">&#xe611;</i></div>
            </div>
            <p class="name">{{item.name}}</p>
            <p class="author">{{item.artistName}}</p>
        </div>
    </div>
</div>
</template>

<script>
import { requst } from "@/utils/requst"

export default {

data() {
return {
    mvdata:null,

}
},
//生命周期 - 创建完成（访问当前this实例）
created() {
    this.newmv();

},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {

},
methods:{
    newmv(){
        requst.get('/personalized/mv').then(res =>{
             this.mvdata = res.result;
        })
    },
    tomvsinfo(id){
        this.$router.push(`/mv/${id}`);
    }
}
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.title-wrap{
    color: var(--title-color);
}
.box-wrap{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 20px 0;
    
    .mv-wrap{
        width: calc(25% - 20px);
        margin-bottom: 15px;
        .img-wrap{
            position: relative;
            img{
                width: 100%;
                height: 132px;
                border-radius: 4px;
            }
            .play-num{
                position: absolute;
                top: 5px;
                right: 5px;
                color: rgb(209, 198, 198);
                font-size: 12px;
                .iconfont{
                    font-size: 13px;
                }
            }
            .icon-wrap{
                width: 50px;
                height: 50px;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                opacity: 0;
                .iconfont{
                    line-height: 50px;
                    font-size: 25px;
                    color: #C62F2F;
                }
            }
        }
        p{
            font-size: 13.66px;
            letter-spacing: 1px;
        }
        .name{
            color: var(--title-color);
            margin-top: 5px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;

        }
        .author{
            color: var(--Light-text-color);
            margin-top: 5px;

        }
    }
    .mv-wrap:hover{
        .icon-wrap{
            opacity: 1;
        }
    }
}
</style>