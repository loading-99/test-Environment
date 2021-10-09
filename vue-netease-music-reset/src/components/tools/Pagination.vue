<!--  -->
<template>
  <div class="block">
    <el-pagination
      layout="prev, pager, next"
      :total="msg[0]"
      :current-page="pagechange"
      :background="true"
      @current-change="handleCurrentChange"
      @prev-click="prev"
      @next-click="next"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: ["msg"],
  data() {
    return {
      pagechange: 1,
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  watch: {
    pagechange() {
      this.$emit("pagedata", this.pagechange);
    },
    msg() {
      if (this.msg[1] == 0) {
        this.pagechange = 1;
      }
    },
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    handleCurrentChange(val) {
      this.pagechange = val;
    },
    prev(val) {
      this.pagechange = val;
    },
    next(val) {
      this.pagechange = val;
    },
  },
};
</script>
<style lang='scss' scoped>
/* @import url(); 引入css类 */
.block {
  display: flex;
  justify-content: flex-end;
  padding-bottom: 10px;
  .el-pager li {
    font-size: 14px !important;
  }
}
</style>