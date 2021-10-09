<!--  -->
<template>
  <el-container class="alyout">
    <el-header class="header">
      <!-- 左 -->
      <div class="logo">
        <a href="javascript:;">
          <i class="iconfont">&#xe600;</i>
        </a>
        <h5>网易云音乐</h5>
      </div>
      <!-- 中 -->
      <div class="search">
        <div>
          <a href="javascript:;" class="btn-left" @click="prev"
            ><i class="iconfont">&#xe605;</i></a
          >
          <a href="javascript:;" class="btn-right" @click="next"
            ><i class="iconfont">&#xe605;</i></a
          >
        </div>
        <div class="search-box">
          <span><i class="iconfont">&#xe603;</i></span>
          <input
            type="text"
            v-model="search"
            @keyup.enter="getsong"
            placeholder="搜索一下"
          />
        </div>
      </div>
      <!-- 右 -->
      <div class="user-tools">
        <div class="login" @click="onlogin">
          <img
            :src="
              $store.state.userinfo.userimg
                ? $store.state.userinfo.userimg
                : 'http://p1.music.126.net/HhI0VsjBoTXBLk2qKownCQ==/19235955928401123.jpg?param=180y180'
            "
          />
          <span>{{
            $store.state.userinfo.username
              ? $store.state.userinfo.username
              : "游客登录"
          }}</span>
        </div>
        <div class="tools">
          <span @click="home"><i class="iconfont">&#xe632;</i></span>
          <span class="theme">
            <div class="theme-type">
              <span @click="themered"></span>
              <span @click="themebule"></span>
              <span @click="themenight"></span>
            </div>
            <i class="iconfont">&#xe797;</i>
          </span>
          <span @click="exitFullscreen"><i class="iconfont">&#xe7d8;</i></span>
          <span @click="fullScreen"><i class="iconfont">&#xe608;</i></span>
        </div>
      </div>
    </el-header>
    <el-container class="content">
      <el-aside width="260px" class="aside">
        <asidelft />
      </el-aside>
      <el-container>
        <el-main class="main">
          <!-- 路由视口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <el-drawer
      :modal-append-to-body="false"
      :show-close="false"
      :close-on-press-escape="true"
      custom-class="drawerWrap"
      :modal="false"
      :wrapperClosable="false"
      title="歌曲列表"
      :visible.sync="this.$store.state.drawer"
      :with-header="true"
    >
      <div class="songlist">
        <p class="songcount">
          总共{{ this.$store.state.nowplaylist.length }}首音乐
        </p>
        <div class="song-wrap" v-if="this.$store.state.nowplaylist.length">
          <div class="song">
            <span class="cont-width title">音乐标题</span>
            <span class="cont-width title">歌手</span>
            <span class="duration title">时长</span>
          </div>
          <div
            class="song"
            v-for="(item, index) in this.$store.state.nowplaylist"
            :key="item.id"
            @click="playmusic(index)"
          >
            <span
              class="cont-width"
              :class="$store.state.mark === index ? 'active' : ''"
              >{{ item.name }}</span
            >
            <span class="cont-width">{{ item.artists[0].name }}</span>
            <span class="duration">{{ item.duration | formattime }}</span>
          </div>
        </div>
        <div class="mask" v-show="!this.$store.state.nowplaylist.length">
          <p>尚未添加任何歌曲</p>
        </div>
      </div>
    </el-drawer>
  </el-container>
</template>

<script>
import asidelft from "./aside";
import { datechange, changeplay, userlogin } from "@/utils";

export default {
  components: {
    asidelft,
  },

  data() {
    return {
      search: "",
    };
  },
  filters: {
    formattime(date) {
      return datechange(date);
    },
  },
  methods: {
    onlogin() {
      if (JSON.stringify(this.$store.state.userinfo) == "{}") {
        this.getuserinfo();
      } else {
        this.userout();
      }
    },
    getuserinfo() {
      this.$msgbox({
        title: "登录",
        showInput: true,
        inputType: "Number",
        message:
          '<p>1、请 点我<a href="http://music.163.com">(http://music.163.com)</a>打开网易云音乐官网</p><p>2、点击页面右上角的“登录”</p><p>3、点击您的头像，进入我的主页</p><p>4、复制浏览器地址栏 /user/home?id= 后面的数字（网易云 UID）</p>',
        dangerouslyUseHTMLString: true,
        customClass: "loginClass",
        confirmButtonText: "点击登录",
        inputPlaceholder: "请输入您的 uid",
      })
        .then((value) => {
          let userid = value.value;
          if (userid != "" && userid != null) {
            localStorage.setItem("userid", userid);
            userlogin(userid);
          }
        })
        .catch(() => {});
    },
    userout() {
      this.$msgbox({
        title: "提示",
        customClass: "loginClass",
        message: "<p>确定要注销登录吗？</p>",
        dangerouslyUseHTMLString: true,
        confirmButtonText: "退出登录",
      }).then(() => {
        this.$store.commit("uodatauserinfo", {});
      });
    },
    getsong() {
      if (this.search != "") this.$router.push(`/search/${this.search}`);
    },
    playmusic(index) {
      changeplay(index);
    },
    fullScreen() {
      const browser = document.documentElement;
      if (browser.requestFullscreen) {
        browser.requestFullscreen();
      } else if (browser.mozRequestFullScreen) {
        browser.mozRequestFullScreen();
      } else if (browser.webkitRequestFullscreen) {
        browser.webkitRequestFullscreen();
      } else if (browser.msRequestFullscreen) {
        browser.msRequestFullscreen();
      }
    },
    exitFullscreen() {
      if (
        document.fullScreen ||
        document.mozFullScreen ||
        document.webkitIsFullScreen
      ) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      }
    },
    home() {
      this.$router.push("/");
    },
    prev() {
      window.history.length > 2 ? this.$router.go(-1) : this.$router.push("/");
    },
    next() {
      history.forward();
    },
    themered() {
      this.root.style.setProperty("--theme-color", "#C62F2F");
      this.root.style.setProperty("--main-color", "#ffffff");

      this.root.style.setProperty("--title-color", "#333333");
      this.root.style.setProperty("--text-color", "#4a4a4a");
      this.root.style.setProperty("--Light-text-color", "#BEBEBE");
      this.root.style.setProperty("--bg-aside-color", "#ededed");
    },
    themenight() {
      this.root.style.setProperty("--theme-color", "#252525");
      this.root.style.setProperty("--main-color", "#252525");

      this.root.style.setProperty("--title-color", "#d0bfbf");
      this.root.style.setProperty("--text-color", "#b1b1b1");
      this.root.style.setProperty("--bg-aside-color", "#202020");
      this.root.style.setProperty("--Light-text-color", "#727272");
    },
    themebule() {
      this.root.style.setProperty("--theme-color", "rgb(22, 103, 253)");
      this.root.style.setProperty("--main-color", "#ffffff");
      this.root.style.setProperty("--title-color", "#333333");
      this.root.style.setProperty("--text-color", "#4a4a4a");
      this.root.style.setProperty("--bg-aside-color", "#ededed");
      this.root.style.setProperty("--Light-text-color", "#BEBEBE");
    },
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.root = document.querySelector(":root");
  },
  //生命周期 - 挂载完成（访问DOM元素）
  // mounted() {},
};
</script>
<style  lang="scss" >
/* @import url(); 引入css类 */
.alyout {
  height: calc(100% - 60px);
  .header {
    background: var(--theme-color);
    display: flex;
    justify-content: space-between;
    line-height: 60px;
    color: rgb(255, 255, 255);

    .logo {
      width: 200px;
      // color: rgb(254, 254, 255)
      h5 {
        font-weight: 380;
        letter-spacing: 1.5px;
        display: inline-block;
      }
      a {
        text-decoration: none;
        display: inline-block;
        width: 26px;
        height: 26px;
        background-color: white;
        border-radius: 50%;
        text-align: center;
        line-height: 27px;
        margin: 0 8px;
        .iconfont {
          font-family: "iconfont";
          font-style: normal;
          color: #c62f2f;
          display: block;
          font-size: 17px;
        }
      }
    }
    .search {
      flex: 1;
      :first-child {
        display: inline-block;
        margin-right: 20px;
        .btn-left .iconfont {
          display: inline-block;
          transform: rotate(180deg);
          border-right: none;
        }
        a {
          display: inline-block;
          height: 26px;
          width: 26px;
          text-decoration: none;
          border: 1px solid rgba(124, 81, 81, 0.4);
          line-height: 25px;
          text-align: center;
          padding: 0 5px;
          margin: 0;

          .iconfont {
            font-family: "iconfont";
            display: inline-block;
            height: 25px;
            width: 25px;
            font-size: 16px;
            color: white;
            font-style: normal;
            margin: 0;
          }
        }
      }

      .search-box {
        display: inline-block;
        width: calc(40% - 30px);
        position: relative;

        span {
          position: absolute;
          margin: 0;
          left: 8px;
          line-height: 63px;
          .iconfont {
            width: 16px;
            margin: 0;
            height: 16px;
            font-size: 15px;
            color: rgba($color: #eec0c0, $alpha: 0.8);
          }
        }

        input {
          width: 100%;
          min-width: 280px;
          background-color: rgba($color: #725858, $alpha: 0.3);
          padding: 7px 8px;
          border: none;
          border-radius: 20px;
          color: wheat;
          box-sizing: content-box;
          padding-left: 30px;
          letter-spacing: 2px;
        }
      }

      ::-webkit-input-placeholder {
        color: rgb(180, 169, 169);
        letter-spacing: 2px;
      }
    }
    .user-tools {
      width: 300px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      color: rgba(243, 220, 220, 0.8);
      .login {
        height: 100%;
        img {
          width: 28px;
          border-radius: 50%;
          vertical-align: middle;
          margin: 0 8px;
        }
        span {
          font-size: 13px;
          font-weight: 300px;
          letter-spacing: 1.2px;
          transition: all 0.3s ease;
        }
        span:hover {
          color: white;
        }
      }
      .tools {
        flex-grow: 1;
        display: flex;
        justify-content: flex-end;
        align-items: center;

        span {
          height: 40px;
          width: 40px;
          text-align: center;
          line-height: 40px;
          .iconfont {
            font-family: "iconfont";
            display: inline-block;
            font-style: normal;
            transition: all 0.3s ease;
          }
        }
        .theme {
          position: relative;
          .theme-type {
            position: absolute;
            left: 50%;
            top: calc(100% + 3px);
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            background: white;
            border-radius: 3px;
            z-index: 999;
            padding: 10px;
            transform: translateX(-50%);
            box-shadow: 0 2px 6px rgb(204, 198, 198);
            transition: all 0.3s linear;
            opacity: 0;
            span {
              display: block;
              width: 12px;
              height: 12px;
              border-radius: 50%;
              background: #333;
              margin: 10px;
            }
            span:hover {
              transform: scale(1.2, 1.2);
            }
            span:nth-of-type(1) {
              background: #c62f2f;
            }
            span:nth-of-type(2) {
              background: rgba(90, 83, 99, 0.692);
            }
            span:nth-of-type(2) {
              background: rgb(15, 143, 248);
            }
          }
          .theme-type::after {
            content: "";
            position: absolute;
            display: block;
            width: 0;
            height: 0;
            left: calc(50% - 8px);
            background: #333;
            border: 8px solid var(--theme-color);
            border-bottom-color: white;
            top: -16px;
          }
        }
        .theme:hover .theme-type {
          opacity: 1;
        }
      }
      .tools span:hover .iconfont {
        color: white;
      }
    }
  }
  .content {
    height: calc(100% - 60px);
    border-bottom: 2px solid rgba($color: #b9b4b4, $alpha: 0.3);
    .aside {
      overflow-y: scroll;
      background-color: var(--bg-aside-color);
    }
    .aside::-webkit-scrollbar {
      width: 0 !important;
    }
    .aside {
      overflow: -moz-scrollbars-none;
    }
    .main {
      background-color: var(--main-color);
      padding: 20px 120px;
      overflow-y: scroll;
      max-width: 1300px;
      min-width: 1300px;
      margin: 0 auto;
    }
    .main::-webkit-scrollbar {
      width: 0 !important;
    }
    .main {
      overflow: -moz-scrollbars-none;
    }
  }
  .el-drawer {
    padding: 0 20px;
    background: var(--main-color);
    .el-drawer__header {
      margin-bottom: 10px;
      text-align: center;
      font-size: 16px;
      color: var(--title-color);
    }
    .el-drawer__body {
      overflow-y: scroll;
      .songlist {
        height: 100%;
        .songcount {
          font-size: 13px;
          color: var(--text-color);
          padding: 10px 0;
          border-bottom: 1px solid rgba(226, 217, 217, 0.3);
        }
        .song-wrap {
          padding: 10px 0;
          padding-bottom: 60px;
          .song {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            color: var(--text-color);
            padding: 8px 0;
            // text-align: center;
            span {
              font-size: 13px;
            }
            .cont-width {
              flex-grow: 1;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              max-width: 170px;
            }
            .duration {
              display: block;
              width: 15%;
            }
            .active {
              color: #c62f2f;
            }
          }
        }
        .mask {
          height: calc(100% - 37px);
          display: table;
          margin: 0 auto;
          p {
            vertical-align: middle;
            display: table-cell;
            text-align: center;
            font-size: 14px;
            color: var(--text-color);
          }
        }
      }
    }
    .el-drawer__body::-webkit-scrollbar {
      width: 0 !important;
    }
    .el-drawer__body {
      overflow: -moz-scrollbars-none;
    }
  }
}
</style>
