<template>
<div>
    <playlist :msg="songlist"/>
    <Pagination @pagedata="pagechange" :msg="[$store.state.searchinfo.songcount,page]"/>
</div>
    
</template>

<script>
import playlist from '@/components/tools/playlist'
import {getsearch,createSong} from '@/utils'
import Pagination from '@/components/tools/Pagination'

export default {
components:{
    playlist,
    Pagination
},
data() {
return {
    page:0,
    offset:0,
    songlist: null
}
},
//生命周期 - 创建完成（访问当前this实例）
created() {
    this.getlsit()
},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {

},
methods: {
    async getlsit(){
        let params = {limit:30,offset:this.offset,keywords:this.$route.params.songname,type:1000}
        const {result} = await getsearch({params})
        let songlist = result.playlists.map(song=>{
            const {id,name,playCount,coverImgUrl:picUrl} = song
            let copywriter = '播放量：'+playCount
            return  createSong({id,name,copywriter,picUrl})
        })
        // playlistCount
        // this.$store.commit('updatacache',music)
        this.$store.commit('searchinfochange',result.playlistCount)
        // console.log(songlist)
        this.songlist = songlist
        
    },
    pagechange(page){
        this.offset = (page-1)*30
        this.page = page
        this.getlsit()
    }
},
}
</script>
<style scoped>
/* @import url(); 引入css类 */

</style>