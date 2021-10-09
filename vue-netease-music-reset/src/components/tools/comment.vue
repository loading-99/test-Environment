<template>
<div class="comment-box">
    <div class="comment"  v-for="item in msg" :key="item.commentId">
        <div class="avatar">
            <img :src="item.user.avatarUrl+'?param=80y80' " alt="img">
        </div>
        <div class="content-border">
            <p class="comment-text">
                <span class="username">{{item.user.nickname}}:</span>
                <span class="text">{{item.content}}</span>
            </p>
            <div class="replied" v-if="item.beReplied.length==0?false:true">
                <p class="comment-text">
                    <span class="username">{{item.beReplied[0].user.nickname}}:</span>
                    <span class="text">{{item.beReplied[0].content}}</span>
                </p>
            </div>
            <div class="bottom">
                <span class="date">{{item.time | timechange}}</span>
                <div class="actions">
                    <i class="iconfont">&#xe821;</i>{{item.likedCount}}
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<script>
import {formatdate} from '@/utils'
export default {
props:["msg"],
data() {
return {

}
},
filters:{
    timechange(value){
        return formatdate(value)
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

.comment-box{
    
    .comment{
        display: flex;
        flex-direction: row;
        margin-top: 20px;
        border-bottom: 1px solid rgba(187, 175, 175, 0.2);
        .avatar{
            margin-right: 15px;
            img{
                width: 43px;
                height: 43px;
                border-radius: 50%;
            }
        }
        .content-border{
            flex-grow: 1;
            .comment-text{
                margin-bottom: 10px;
                span{
                    font-size: 13px;
                }
                .username{
                    color: #517eaf;
                }
                .text{
                    color: var(--text-color);
                }
            }
            .replied{
                padding: 8px 12px;
                line-height: 13px;
                vertical-align: middle;
                border-radius: 4px;
                width: 100%;
                margin-bottom: 10px;
                background: rgba(182, 175, 175, 0.4);
                p{
                    margin: 0;
                    .text{
                        line-height: 20px;
                    }
                }
            }
            .bottom{
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                font-size: 14px;
                color: rgb(168, 162, 162);
                letter-spacing: 1.1px;
                padding: 5px 0 20px 0;
                .date{
                    font-weight: lighter;
                }
                .actions{
                    .iconfont{
                        margin-right: 10px;
                    }
                }
            }
        }
    }
}
</style>