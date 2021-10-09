<!--  -->
<template>
<!-- 123 -->
<div class="music">
  <div class="music-list">
    <el-table
      :data="msg"
      :lazy="true"
      v-loading="false"
      :cell-class-name="changecolor"
      style="width: 100%" class="customer-table" @row-click="playmusic">
      <!-- Table 点击事件触发 @row-click-->
      <el-table-column
        type="index"
        :index="indexMethod"
        align="center"
        show-overflow-tooltip
        width="80">
        <!-- indexMethod 表单索引 -->
      </el-table-column>
      <el-table-column
        prop="img"
        align="center"
        show-overflow-tooltip
        width="100">
        <template slot-scope="scope" v-if="scope.row.img">
          <img v-lazy="scope.row.img" />
          <div class="icon-wrap"><i class="iconfont">&#xe611;</i></div>
        </template>
      </el-table-column>
      <el-table-column
        prop="name,mvId,id"
        align="left"
        show-overflow-tooltip
        width="260">
        <template slot-scope="scope">
          <span>{{scope.row.name}}<i class="iconfont mvcont" v-if="scope.row.mvId" @click.stop="tomvinfo(scope.row.mvId)">&#xe618;</i></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="artists[0].name"
        align="left"
        show-overflow-tooltip
        width="238">
      </el-table-column>
      <el-table-column
        prop="name"
        align="left"
        show-overflow-tooltip
        width="238">
      </el-table-column>
      <el-table-column
        prop="duration"
        align="center"
        show-overflow-tooltip
        width="100">
        <template slot-scope="scope">
          <span>{{ datechanges(scope.row.duration) }}</span>
        </template>
      </el-table-column>
    </el-table>
    </div>
</div>
</template>

<script>
import {datechange,sorting,changeplay} from '@/utils';
export default {

props:['msg'],
data() {
return {
    
}
},
//生命周期 - 创建完成（访问当前this实例）
created() {

},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {

},
methods:{
  changecolor({row,rowIndex, columnIndex}){
    if(columnIndex == 2 && rowIndex === this.$store.state.mark && row.name == this.$store.state.songname){
      return 'active'
    }
  },
  datechanges(interval){
    return datechange(interval)
  },
  indexMethod(index){
    return sorting(index)
  },
  playmusic(row){
    this.$store.commit('updatanowlist',this.$store.state.cachelist)
    let mark = false
    for(let key in this.$store.state.nowplaylist){
      if(this.$store.state.nowplaylist[key].id == row.id){
        mark = key
        break;
      }
    }
    if(mark){
      changeplay(mark)
    }
  },
  tomvinfo(id){
    this.$router.push(`/mv/${id}`)
  }
}
}
</script>
<style lang='scss' scoped>
/* @import url(); 引入css类 */
.music{

  .el-table, .el-table__expanded-cell{
      background:var(--main-color);
  }
  .el-image{
    border-radius: 5px;
  }
  .el-table tr{
    height: 80px;
    .active{
      div{
        span{
          color: #C62F2F;
        }
      }
    }
    .mvcont{
      margin: 0 10px;
      vertical-align: bottom;
      color: #C62F2F;
    }
  }
  img{
    height: 70px;
    width: 70px;
  }
  .icon-wrap {
    top: 50%;
    left: 50%;
    height: 30px;
    width: 30px;
    transform: translate(-50%, -50%);
    text-align: center;
    display: table;
    .iconfont {
        font-size: 15px;
        color: #C62F2F;
        vertical-align: middle;
        display: table-cell;
    }
}

}


</style>