<!--  -->
import { log } from 'util';
<template>
  <div class="aside-box">
    <el-col>
      <el-menu :default-active="active" class="el-menu-vertical-demo listmenu">
        <el-menu-item index="home" @click="switchmenu('/')">
          <i class="iconfont">&#xe607;</i>
          <span slot="title">发现音乐</span>
        </el-menu-item>
        <el-menu-item index="playlist" @click="switchmenu('/playlist')">
          <i class="iconfont">&#xe60f;</i>
          <span slot="title">推荐歌单</span>
        </el-menu-item>
        <el-menu-item index="newmusic" @click="switchmenu('/newmusic')">
          <i class="iconfont">&#xe9d5;</i>
          <span slot="title">最新音乐</span>
        </el-menu-item>
        <el-menu-item index="newmv" @click="switchmenu('/newmv')">
          <i class="iconfont">&#xe618;</i>
          <span slot="title">最新MV</span>
        </el-menu-item>
        <div v-if="JSON.stringify($store.state.userinfo) !== '{}'">
          <p class="title-user">创建的歌单</p>
          <el-menu-item
            v-for="item in $store.state.userinfo.userlist"
            :index="item.id.toString()"
            :key="item.id"
            @click="touserlist(item.id)"
          >
            <i class="iconfont">&#xe60f;</i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </div>
        <div v-if="JSON.stringify($store.state.userinfo) !== '{}'">
          <p class="title-user">收藏的歌单</p>
          <el-menu-item
            v-for="item in $store.state.userinfo.starlist"
            :index="item.id.toString()"
            :key="item.id"
            @click="touserlist(item.id)"
          >
            <i class="iconfont">&#xe60f;</i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </div>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: "none",
    };
  },
  mounted() {
    this.actives();
  },

  methods: {
    switchmenu: function (index) {
      this.$router.push(index);
    },

    actives: function () {
      this.active = this.$route.name;
    },
    touserlist(id) {
      this.$router.push(`/songlist/${id}`);
    },
  },
};
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */

.listmenu {
  background-color: transparent;
  border: none;
  .is-active {
    color: #c62f2f;
    background-color: rgba($color: #b4abab, $alpha: 0.2);
    span {
      color: #c62f2f;
    }
  }
  li {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 14px;
  }
  li:hover {
    background-color: rgba($color: #dacfcf, $alpha: 0.2);
  }
  i {
    display: inline-block;
    font-size: 16px;
    padding: 0 5px;
  }
  span {
    letter-spacing: 1.2px;
    color: var(--text-color);
  }
  .title-user {
    color: var(--text-color);
    font-size: 12px;
    padding-left: 20px;
    margin-top: 10px;
  }
}
</style>