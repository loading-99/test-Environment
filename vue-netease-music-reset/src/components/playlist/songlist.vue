<!--  -->
<template>
<div class="playlist-detail">
    <div class="header">
        <div class="img-box">
            <img  :src="listinfo.img" alt="图片">
        </div>
        <div class="songinfo">
            <p class="title">{{listinfo.name}}</p>
            <div class="author">
                <img :src="listinfo.authorimg" alt="图片">
                <span>{{listinfo.author}}</span>
                <span class="deta">{{ listinfo.createTime | timeformat}} 创建</span>
            </div>
            <div class="palyer-btn" @click="playall">
                <i class="iconfont">&#xed41;</i>
                <span>播放全部</span>
            </div>
            <p class="label">标签：<span v-for="(item,index) in listinfo.tags" :key="item">{{item}}{{listinfo.tags[listinfo.tags.length-1] == listinfo.tags[index]?'':' / '}}</span></p>
            <p class="Introduction">简介：{{listinfo.description}}</p>
        </div>
    </div>
    <div class="content">
        <el-tabs v-model="activeName" >
            <!-- @tab-click="handleClick" -->
            <el-tab-pane label="歌曲列表" name="first">
                <music :msg="listinfo.songs"/>
            </el-tab-pane>
            <el-tab-pane :label="'评论('+listinfo.commentCount+')'" name="second">
                <p class="title-comments">最新评论</p>
                <comment :msg="comments"/>
                <Pagination :msg="[total,page]"  @pagedata="changepage"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</div>
</template>

<script>
import music from "@/components/tools/music"
import comment from "@/components/tools/comment"
import Pagination from "@/components/tools/Pagination"
import {getplaylistinfo,createSong,formatdate,getlistsong,getcomments,changeplay} from '@/utils'
export default {
components:{
    music,
    comment,
    Pagination
},
data() {
return {
    activeName: 'first',
    listinfo:'',
    offset:0,
    comments:null,
    total:0,
    page:0
}
},
filters:{
    timeformat(value){
        let date = formatdate(value)
        return date
    }
},
//生命周期 - 创建完成（访问当前this实例）
created() {
    this.getlistinfo()
},
beforeRouteUpdate(to,from,next){
  if(from.params.id != to.params.id){
      next();
      this.getlistinfo()
  }

  
},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {

},
methods: {
    // handleClick(tab, event) {
    //     console.log(tab, event);
    // },
    async getlistinfo(){
        const data = await getplaylistinfo({params:{id:this.$route.params.id}})
        this.getcomments()
        const {coverImgUrl:img,description,commentCount,createTime,name,trackIds,tags,creator:{nickname,avatarUrl}} = data.playlist
        let songid = ''
        let num = 0
        for(let i in trackIds){
            
            num++

            if (num>499){
                songid += trackIds[i].id
                break;
            } 
            
            if(i < trackIds.length-1){
                songid += trackIds[i].id + ','
            }else{
                songid += trackIds[i].id
            }
        }

        let songs = await getlistsong(songid)
        const playlsit = songs.songs
        songs = playlsit.map(song=>{
            let {al:{name:albumName,picUrl:img},id,ar:artists,mv:mvId,name,dt:duration} = song
            return createSong({id,albumName,img,artists,name,mvId,duration})
        })
        this.$store.commit('updatacache',songs)
        this.listinfo = createSong({img,description,commentCount,createTime,name,songs,tags,author:nickname,authorimg:avatarUrl})
    },
    async getcomments(){
        let parameter = {id:this.$route.params.id,pageSize:20,offset:this.offset}
        const comments = await getcomments({params:parameter})
        this.total = Math.ceil((comments.total)/20)*10
        this.comments = comments.comments
    },
    changepage(data){
        this.offset = (data-1)*20
        this.page = data
        this.getcomments()
    },
    playall(){
        this.$store.commit('updatanowlist',this.$store.state.cachelist)
        this.$store.commit('changemark',0)
        changeplay(0)
    }
},
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.playlist-detail{
    .header{
        display: flex;
        flex-direction: row;
        background: transparent;
        color: #333;
        margin-bottom: 20px;
        p{
            padding:0;
            font-size: 17px;
            line-height: 17px;
        }
        .img-box{
            width: 220px;
            height: 220px;
            img{
                width: 100%;
            }
        }
        .songinfo{
            width: calc(100% - 200px);
            padding-left: 15px;
            .title{
                padding-top: 5px;
                color: var(--title-color);
            }
            .author{
                margin-top: 10px;
                color: var(--text-color);
                img{
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    vertical-align: middle;
                    margin-right: 10px;

                }
                span{
                    vertical-align: middle;
                    
                }
                .deta{
                    font-size: 13px;
                    margin: 0 5px;
                    line-height: 16px;
                }
            }
            .palyer-btn{
                width: 120px;
                background: linear-gradient(90deg,#fa5143,#f44d41,#d53b32);
                line-height: 30px;
                text-align: center;
                color: white;
                margin-bottom: 15px;
                i{
                    margin-right: 5px;
                    font-size: 18px;
                    vertical-align: middle;

                }
                span{
                    letter-spacing: 1.2px;
                    vertical-align: middle;

                }
            }
            .label,.Introduction{
                font-size: 14px;
                margin-top: 10px;
                line-height: 22px;
                color: var(--text-color);
            }
            .Introduction{
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }

        }
    }
    .content{
        border: none;
        .title-comments{
        font-weight: bold;
        color:var(--title-color);
    }
    }
    
}
</style>