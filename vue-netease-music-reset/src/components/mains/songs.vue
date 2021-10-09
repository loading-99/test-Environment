<!--  -->
<template>
<div class="new-songs">
    <div class="title-wrap">
        <span>最新音乐</span>
    </div>
    <div class="box-songs">
        <div class="list-songs" v-for="(item,index) in datasongs" :key="item.id">
            <span>{{indexmethod(index)}}</span>
            <div class="cont-songs" @click="play(index)">
                <div class="img-songs">
                    <img :src="item.img" alt="图片">
                    <div class="icon-wrap"><i class="iconfont">&#xe611;</i></div>
                </div>
                <div class="text-songs">
                    <p>{{item.name}}</p>
                    <span v-for="(datainfo,index) in item.artists" :key="index">{{datainfo.name}} </span>

                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {playmusic,sorting,getnewmusic,createSong} from "@/utils"
export default {
data() {
return {

}
},
//生命周期 - 创建完成（访问当前this实例）
created() {
    if((this.$store.state.newsongs).length <= 0 ){
        this.newsongs();  
    }

},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {

},
computed:{
    datasongs(){
        return this.$store.state.newsongs
    }
},
methods:{
   async newsongs(){
        const {result} = await getnewmusic()
        let newdata = result
        let updata = newdata.map(songs=>{
            const {id,name,picUrl:img,song:{artists,duration,mvid}} = songs
            // es6 结构赋值
            return createSong({id,name,img,artists,duration,mvId:mvid})

        })
        this.$store.commit('newsongupdata',updata)
    },
    play(index){
        this.$store.commit('changemark',index)
        playmusic(index)
    },
    indexmethod(index){
        return sorting(index)
    }
}
}
</script>
<style  lang='scss' scoped>
/* @import url(); 引入css类 */
.new-songs{
    margin: 20px 0;
    .title-wrap{
        color: var(--title-color);
    }
}
.box-songs{
    display: flex;
    flex-direction: column;
    height: 420px;
    justify-content: space-between;
    flex-wrap: wrap;
    .list-songs{
        width: 50%;
        height: 84px;
        display: flex;
        flex-direction: row;
        text-align: center;
        padding: 10px 0;
        span{
            display: inline-block;
            padding: 0 20px;
            height: 64px;
            line-height: 64px;
            font-size: 14px;
            color: rgb(114, 109, 109);
        }
        .cont-songs{
            flex-grow: 1;
            display: flex;
            flex-direction: row;
            .img-songs{
                width: 64px;
                height: 64px;
                position: relative;
                img{
                    width: 100%;
                }
                .icon-wrap{
                    top: 50%;
                    left: 50%;
                    height: 40%;
                    width: 40%;
                    transform: translate(-50%,-50%);
                    .iconfont{
                        font-size: 16px;
                        color: #C62F2F;
                        display: inline-block;
                        width: 16px;
                        height: 16px;
                        vertical-align: middle;
                    }
                }
            }
            .text-songs{
                flex-grow: 1;
                text-align: left;
                font-size: 14px;
                padding: 10px 0px 10px 10px;
                overflow: hidden;
                letter-spacing: .7px;
                color: var(--text-color);
                p{
                    padding: 0;
                    margin: 0;
                    line-height: 20px;
                    white-space: nowrap;
                    text-overflow: ellipsis;

                }
                span{
                    padding: 0;
                    display: inline;
                    line-height: 30px;
                }
            }
        }
    }
    .list-songs:hover{
        background-color: rgba($color: #e0d8d8, $alpha: .4);
    }
}

</style>