<!--  -->
<template>
<div>
<card :msg="toplaydata" />
<div class="tabs">
        <ul>
            <li v-for="(item,index) in tabs" :key="item" @click="listchange(index)" :class="[index==activeTabIndex?'active':'']">{{item}}</li>
        </ul>
</div>
<div class="list-wrap" >
        <div class="img-wrap" v-for="(item,index) in listplay" :key="index" @click="tolistinfo(item.id)">
            <img :src="item.coverImgUrl" alt="图片">
            <div class="desc-wrap">
                <span>播放量：{{((item.playCount)/10000).toFixed(2)}}万次</span>
            </div>
            <div class="icon-wrap">
                <i class="iconfont">&#xe611;</i>
            </div>
            <p>{{item.name}}</p>
        </div>
</div>
<Pagination  @pagedata="pagechange" :msg="[pagenumber,page]"/>
</div>
</template>

<script>
import card from "./card";
import Pagination from '../tools/Pagination'
import { requst } from "@/utils/requst"

const PAGE_SIZE = 50

export default {
//生命周期 - 创建完成（访问当前this实例）
async created() {
    this.PAGE_SIZE = PAGE_SIZE
    this.tabs = [
      "全部",
      "欧美",
      "华语",
      "流行",
      "说唱",
      "摇滚",
      "民谣",
      "电子",
      "轻音乐",
      "影视原声",
      "ACG",
      "怀旧",
      "治愈",
      "旅行"
    ]
    this.initData()
},
data() {
return {
    toplaydata:null,
    activeTabIndex:0,
    page:0,
    listplay:null,
    pagenumber:0,

}
},
watch:{
    page(){
        if(this.page != 0) this.getlists()
    }
},
components:{
    card,
    Pagination

},

//生命周期 - 挂载完成（访问DOM元素）
mounted() {

},
methods:{
    initData(){
        this.getTopPlaylists()
        this.getlists()
    },
    getTopPlaylists(){
        requst.get('/top/playlist/highquality',{params:{
            limit: 1,
            cat:this.tabs[this.activeTabIndex]
            }}).then(res =>{
            this.toplaydata = res.playlists;
        })
    },
    getlists(){
        requst.get('/top/playlist',{params:{
            limit:PAGE_SIZE,
            offset:this.page,
            cat:this.tabs[this.activeTabIndex]
            }}).then(res=>{
            this.pagenumber = (Math.ceil((res.total)/50))*10;
            this.listplay = res.playlists;

        })
    },
    listchange(index){
        this.activeTabIndex = index;
        this.page = 0;
        this.initData();
    },
    pagechange(data){
        if(data != 0) this.page = (data-1)*PAGE_SIZE;
        
    },
    tolistinfo(id){
        this.$router.push(`/songlist/${id}`)
    }
}
}
</script>
<style lang='scss' scoped>
/* @import url(); 引入css类 */
.tabs{
    padding: 10px;
    ul{
        list-style: none;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        li{
            font-size: 13px;
            color: var(--text-color);
            padding: 10px 15px;
        }
    }
    .active{
        color: #C62F2F;
    }
}
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
            white-space: nowrap;
            text-overflow:ellipsis;
            font-size: 13px;
            letter-spacing: 1.1px;
            padding: 5px 0;
            color: var(--text-color);
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