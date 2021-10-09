<template>
<div>
    <mvs :msg="$store.state.cachelist"/>
    <Pagination @pagedata="pagechange" :msg="[$store.state.searchinfo.songcount,page]"/>
</div>
    
    
</template>

<script>
import mvs from '@/components/tools/mv'
import {getsearch,createSong} from '@/utils'
import Pagination from '@/components/tools/Pagination'

export default {
components:{
    mvs,
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
        let params = {limit:40,offset:this.offset,keywords:this.$route.params.songname,type:1004}
        const {result} = await getsearch({params})
        let mv = result.mvs.map(mvs=>{
            const {artistName,duration,cover,id,name,playCount} = mvs
            return  createSong({artistName,duration,cover,id,name,playCount})
        })
        this.$store.commit('updatacache',mv)
        this.$store.commit('searchinfochange',result.mvCount)
        
    },
    pagechange(page){
        this.offset = (page-1)*40
        this.page = page
        this.getsong()
        console.log(page)
    }
},
}
</script>
<style scoped>
/* @import url(); 引入css类 */

</style>