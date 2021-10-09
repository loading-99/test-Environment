<!--  -->
<template>
<div class="mv">
    <div class="video-box">
        <p>MV详情</p>
        <div class="video">
            <video controls="controls" :poster="mvinfo.cover" :src="this.url"></video>
        </div>
        <div class="author-box">
            <img :src="this.authorimg+'?param=120y120'" alt="img">
            <span>{{mvinfo.artistName}}</span>
        </div>
        <div class="title">
            <p>{{mvinfo.name}}</p>
            <span>发布：{{mvinfo.publishTime}}</span>
            <span>播放：{{mvinfo.playCount}}次</span>
        </div>
        <div class="comments">
            <div class="hotcomments" v-if="hotcomments">
                <p>精彩评论</p>
                <comment :msg="hotcomments"/>
            </div>
            <div class="comments">
                <p>最新评论 ({{total}})</p>
                <comment :msg="comments"/>
                <Pagination @pagedata="changepage" :msg="[Math.ceil(total/20)*10,page]"/>
            </div>
        </div>
    </div>
    <div class="right">
        <p class="title">相关推荐</p>
        <div class="simi-mv" v-for="item in related" :key="item.id" @click="getmv(item.id)">
            <div class="img-box">
                <img :src="item.cover+'?param=500y260'" alt="img">
                <div class="play-wrap">
                    <i class="iconfont">&#xe611;</i>
                </div>
                <div class="icon-count-wrap">
                    <i class="iconfont">&#xe611;</i>{{item.playCount}}
                </div>
                <div class="duration-wrap">{{ changedate(item.duration) }}</div>
            </div>
            <div class="content">
                <p class="name">{{item.name}}</p>
                <span>by {{item.artistName}}</span>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {getinfo,getvideo,getrelated,datechange,getartists,getmvcomments} from '@/utils'
import comment from '@/components/tools/comment'
import Pagination from '@/components/tools/Pagination'
export default {
components:{
    comment,
    Pagination
},
data() {
return {
    mvinfo:'',
    url:'',
    related:'',
    authorimg:'',
    page:0,
    offset:0,
    total:0,
    comments:'',
    hotcomments:''
}
},
beforeRouteUpdate(to,from,next){
    if(from.params.id != to.params.id){
        next()
        this.getsonginfo()
    }
    
},
//生命周期 - 创建完成（访问当前this实例）
created() {
    this.getsonginfo()
},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {

},
methods: {
    async getsonginfo(){
        const data = await getinfo(this.$route.params.id)
        const video = await getvideo(this.$route.params.id)
        const related = await getrelated(this.$route.params.id)
        const artists = await getartists(data.data.artistId)
        this.getcomments()
        this.mvinfo = data.data
        this.url = video.data.url
        this.related = related.mvs
        this.authorimg = artists.artist.picUrl
    },
    changedate(time){
        return datechange(time)
    },
    getmv(id){
        this.$router.push(`/mv/${id}`)
    },
    async getcomments(){
        const comments = await getmvcomments({params:{id:this.$route.params.id,pageSize:20,offset:this.offset}})
        this.hotcomments = comments.hotComments
        this.comments = comments.comments
        this.total = comments.total
    },
    changepage(page){
        this.page = page
        this.offset = page*20
        this.getcomments()
    }   
    
},
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.mv{
    display: flex;
    flex-direction: row;
    .video-box{
        width: 650px;
        p{
            font-weight: bold;
            margin-bottom: 20px;
            color: var(--title-color);

        }
        .video{
            width: 100%;
            border-radius: 4px;
            overflow: hidden;
            video{
                width: 100%;
                height: 360px;
                border-radius: 4px;
            }
        }
        .author-box{
            padding: 15px 0;
            display: flex;
            color: var(--title-color);
            align-items: center;
            img{
                width: 70px;
                border-radius: 50%;
            }
            span{
                margin-left: 15px;
                font-weight: bold;
            }
        }
        .title{
            margin: 10px 0;
            p{
                font-size: 25px;
            }
            span{
                color: rgb(165, 158, 158);
                font-size: 14px;
                margin-right: 10px;
            }
        }
        .comments{
            .hotcomments,.comments{
                margin: 50px 0;
                p{
                    margin: 20px 0;
                }
            }
        }

    }
    .right{
        width: calc(100% - 650px);
        .title{
            color: var(--title-color);
            padding-left: 15px;
        }
        p{
            font-weight: bold;
            margin-bottom: 20px;
        }
        .simi-mv{
            width: 100%;
            margin-left: 15px;
            margin-bottom: 10px;
            display: flex;
            flex-direction: row;
            .img-box:hover .play-wrap{
                opacity: 1;
            }
            .img-box{
                width: 140px;
                position: relative;
                margin-right: 10px;
                img{
                    width: 100%;
                    border-radius: 4px;

                }
                .play-wrap{
                    position: absolute;
                    width: 40px;
                    height: 40px;
                    top: 50%;
                    left: 60px;
                    transform: translate(0,-60%);
                    background: rgba(253, 252, 252, 0.6);
                    border-radius: 50%;
                    text-align: center;
                    display: table;
                    opacity: 0;
                    transition: all .3s linear;
                    .iconfont{
                        vertical-align: middle;
                        font-size: 25px;
                        color: #C62F2F;
                        display: table-cell;
                    }
                }
                
                .icon-count-wrap{
                    position: absolute;
                    top: 0;
                    right: 5px;
                    color: rgb(243, 239, 239);
                    font-size: 12px;

                }
                .duration-wrap{
                    position: absolute;
                    bottom: 15px;
                    right: 4px;
                    color: rgb(243, 239, 239);
                    font-size: 12px;

                }
            }
            .content{
                height: 87px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                border: none;
                .name{
                    margin: 0;
                    font-weight: 200;
                    font-size: 14px;
                    color: var(--title-color);
                    letter-spacing: 1.1px;
                }
                span{
                    color: var(--Light-text-color);
                    font-size: 13px;
                }
            }

        }
    }
}
</style>