<!--  -->
<template>
<div class="mains">
    <carousel />
    <wrap />
    <songs />
    <mvs />
</div>
</template>

<script>

import carousel from './carousel';
import wrap from './wrap';
import songs from './songs';
import mvs from './mvs';

export default {

components:{
    carousel,
    wrap,
    songs,
    mvs
},

data() {
return {

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
<style scoped>
/* @import url(); 引入css类 */


</style>