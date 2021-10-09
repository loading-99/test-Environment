<!--  -->
<template>
<div class="new-music">
    <div class="tabs">
        <ul>
            <li v-for="(item,index) in songlist" :class="[item.type==type?'active':'']" :key="index" @click="changeclass(item.type)">{{item.classfunction}}</li>
        </ul>
    </div>
    <music :msg="$store.state.topsongs"/>
</div>
</template>

<script>

import music from '../tools/music'
import {topsongs,createSong} from '@/utils'

export default {
components:{
    music,
},
data() {
return {
    type:0
}
},
watch:{
    type(){
        this.getdata();
    }
},
//生命周期 - 创建完成（访问当前this实例）
created() {
    this.songlist = [
        {classfunction:"全部",type:0},
        {classfunction:"欧美",type:96},
        {classfunction:"华语",type:7},
        {classfunction:"日本",type:8},
        {classfunction:"韩国",type:16}
    ]

    if((this.$store.state.topsongs).length <= 0 ){
        this.getdata()
    }

},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {

},
methods:{
    async getdata(){
        const {data} = await topsongs(this.type)
        let listsongs = data
        // .map js接口数据映射
        let songsdata = listsongs.map(songs=>{
            const {id, name,artists,duration,mvid,album: { picUrl, name: albumName,subType}} = songs
            return createSong({id,name,artists,duration,albumName,img:picUrl,mvId:mvid,subType})
        })
        this.$store.commit('updatatopsongs',songsdata)
        this.$store.commit('updatacache',songsdata)
    },
    changeclass(val){
        this.type = val;
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
        .active{
            color: #C62F2F;
        }
    }
}

</style>