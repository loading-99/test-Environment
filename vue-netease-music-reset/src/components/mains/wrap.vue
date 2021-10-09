<!--  -->
<template>
<div class="wrap">
    <div class="title-wrap">
        <p>推荐歌单</p>
    </div>
    <playlist :msg="listdata" />
</div>
</template>

<script>

import playlist from '../tools/playlist'
import { requst } from "@/utils/requst"

export default {

components:{
    playlist,

},
data() {
return {
    listdata:null,

}
},
//生命周期 - 创建完成（访问当前this实例）
created() {
    this.getdata();

},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {

},
methods:{
    getdata(){
        requst.get('/personalized',{params:{limit:10}}).then((res)=>{
            this.listdata = res.result;
        })
    }
}
}
</script>
<style lang='scss' scoped>
/* @import url(); 引入css类 */

.wrap{
    margin: 20px 0;
    p{
        color: var(--title-color);
    }
}


</style>