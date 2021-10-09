<!--  -->
<template>
<div>
    <music :msg="$store.state.cachelist" />
    <Pagination @pagedata="pagechange" :msg="[$store.state.searchinfo.songcount,page]"/>
</div>
    
</template>

<script>
import music from '@/components/tools/music'
import {getsearch,createSong} from '@/utils'
import Pagination from '@/components/tools/Pagination'

export default {
components:{
    music,
    Pagination
},
data() {
return {
    page:0,
    offset:0
}
},
//生命周期 - 创建完成（访问当前this实例）
created() {
    this.getsong()
},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {

},
methods: {
    async getsong(){
        let params = {limit:30,offset:this.offset,keywords:this.$route.params.songname}
        const {result} = await getsearch({params})
        let music = result.songs.map(song=>{
            const {artists,duration,id,mvid,name} = song
            return  createSong({artists,duration,id,mvId:mvid,name})
        })
        this.$store.commit('updatacache',music)
        this.$store.commit('searchinfochange',result.songCount)
        
    },
    pagechange(page){
        this.offset = (page-1)*30
        this.page = page
        this.getsong()
    }
},
}
</script>
<style scoped>
/* @import url(); 引入css类 */

</style>