<template>
  <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="item in banner" :key="item.imageUrl">
      <img :src="item.imageUrl | urlchange" alt="post">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import { requst } from "@/utils/requst"

export default {
  
data() {
return {
  banner:null

}
},
filters:{
  urlchange:function(value){
    return value+'?param=1000y400';
  }
},
//生命周期 - 创建完成（访问当前this实例）
created() {
  this.bannerget()

},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {

},
methods:{
  bannerget(){
    requst.get('/banner?type=0').then((res)=>{
      this.banner = res.banners;
    })
  }
}
}
</script>
<style scoped>
/* @import url(); 引入css类 */
.el-carousel__item img {
  height: 100%;
  width: 100%;
  border-radius: 6px;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

</style>