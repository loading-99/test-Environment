<!--  -->
<template>
  <div class="player">
    <div class="progress-box">
      <div class="progress" :style="{ width: nowwidth + '%' }"></div>
    </div>
    <audio
      autoplay
      :src="players"
      @ended="onplayend"
      ref="audio"
      @timeupdate="onTimeupdate"
      @loadedmetadata="onLoadedmetadata"
    ></audio>
    <div class="song">
      <div class="img-box">
        <img :src="imgdata" alt="poto" />
      </div>
      <div class="play-info">
        <div class="play-auther">
          <p>{{ this.$store.state.songname }}</p>
          <p>{{ this.$store.state.auther }}</p>
        </div>
        <div class="play-time">
          <span v-if="this.$store.state.musicURL"
            >{{ timeformat(timedata) }} / {{ timeformat(Loaddata) }}</span
          >
        </div>
      </div>
    </div>
    <div class="control">
      <div class="back" @click="prev"><i class="iconfont">&#xe708;</i></div>
      <div class="suspended" @click="suspended">
        <i class="iconfont">{{
          this.$store.state.suspended ? "&#xe61b;" : "&#xed41;"
        }}</i>
      </div>
      <div class="next" @click="next"><i class="iconfont">&#xe708;</i></div>
    </div>
    <div class="mode">
      <div class="source" @click="author">
        <i class="iconfont">&#xe60b;</i>
      </div>
      <div class="voice">
        <div class="block">
          <el-slider
            v-model="value1"
            :step="10"
            tooltip-class="volume-tooltip"
            @change="volume"
          >
          </el-slider>
        </div>
      </div>
      <div class="playerlist" @click="opendrawer">
        <i class="iconfont">&#xe61a;</i>
      </div>
      <div class="playermodel" @click="playorder">
        <i class="iconfont" v-show="1 == order">&#xe6be;</i>
        <i class="iconfont" v-show="2 == order">&#xe609;</i>
        <i class="iconfont" v-show="3 == order">&#xe601;</i>
      </div>
    </div>
  </div>
</template>

<script>
import { changeplay } from "@/utils";
export default {
  data() {
    return {
      value1: 50,
      nowwidth: 0,
      Loaddata: 0,
      timedata: 0,
      order: 1,
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  computed: {
    players() {
      return this.$store.state.musicURL;
    },
    imgdata() {
      return this.$store.state.imge;
    },
  },
  watch: {
    timedata() {
      this.nowwidth = (this.timedata / this.Loaddata).toFixed(5) * 100;
    },
  },
  methods: {
    prev() {
      this.$store.commit("changemark", "prev");
      if (this.$store.state.imge != "") {
        changeplay(this.$store.state.mark);
      }
    },
    next() {
      this.$store.commit("changemark", "next");
      if (this.$store.state.imge != "") {
        changeplay(this.$store.state.mark);
      }
    },
    suspended() {
      if (this.$store.state.musicURL) {
        if (this.$store.state.suspended) {
          this.pause();
          this.$store.commit("play", false);
        } else {
          this.play();
          this.$store.commit("play", true);
        }
      }
    },
    play() {
      this.$refs.audio.play();
    },
    pause() {
      this.$refs.audio.pause();
    },
    onTimeupdate(res) {
      this.timedata = res.target.currentTime;
    },
    onLoadedmetadata(res) {
      this.Loaddata = res.target.duration;
      this.$refs.audio.volume = this.value1 / 100;
    },
    timeformat(time) {
      let minute = parseInt(time / 60);
      if (minute.toString().length < 2) {
        minute = "0" + minute;
      }
      let second = parseInt(time % 60);
      if (second.toString().length < 2) {
        second = "0" + second;
      }

      return `${minute}:${second}`;
    },
    volume() {
      this.$refs.audio.volume = this.value1 / 100;
    },
    opendrawer() {
      this.$store.commit("opendrawer");
    },
    onplayend() {
      if (this.order == 1) {
        this.next();
      } else if (this.order == 2) {
        let index = parseInt(
          Math.random() * (this.$store.state.nowplaylist.length + 1),
          10
        );
        this.$store.commit("changemark", index);
        changeplay(index);
      } else if (this.order == 3) {
        this.$refs.audio.play();
      }
      console.log("播放结束");
    },
    playorder() {
      this.order += 1;
      if (this.order > 3) {
        this.order = 1;
      }
    },
    author() {
      open("https://gitee.com/inkgn/vue-netease-music-reset.git");
    },
  },
};
</script>
<style lang='scss' scoped>
/* @import url(); 引入css类 */
.player {
  height: 60px;
  padding: 0;
  display: flex;
  position: relative;
  justify-content: flex-start;
  z-index: 2222;
  background: var(--main-color);
  border-top: 1px solid rgba(rgb(141, 135, 135), 0.3);
  .progress-box {
    position: absolute;
    top: -3px;
    width: 100%;
    height: 10px;
    .progress {
      left: 0;
      height: 3px;
      position: relative;
      background-color: rgb(223, 66, 66);
    }
    .progress::after {
      content: "";
      width: 12px;
      height: 12px;
      position: absolute;
      right: 0;
      top: -5px;
      opacity: 0;
      background-color: rgb(223, 66, 66);
      border-radius: 50%;
    }
  }
  .progress-box:hover .progress::after {
    opacity: 1;
  }

  .song {
    max-width: 700px;
    padding: 10px 10px 10px 30px;
    display: flex;
    flex-basis: 700px;
    .img-box {
      margin-right: 20px;
      img {
        height: 40px;
        border-radius: 5px;
        width: 40px;
      }
    }
    .play-info {
      // flex-grow: 1;
      width: calc(100% - 60px);
      .play-auther {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        color: var(--title-color);
        p {
          display: inline-block;
          white-space: nowrap;
          letter-spacing: 1px;
        }
        :nth-child(2) {
          font-size: 13px;
          line-height: 20px;
          margin-left: 10px;
          text-overflow: ellipsis;

          overflow: hidden;
        }
      }
      .play-time {
        span {
          font-size: 13px;
          color: var(--text-color);
          letter-spacing: 1px;
        }
      }
    }
  }
  .control {
    // width: 210px;
    flex-basis: 210px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    div {
      .iconfont {
        font-size: 35px;
        color: #c62f2f;
        line-height: 60px;
        display: inline-block;
      }
    }
    :nth-child(1) {
      .iconfont {
        transform: rotate(180deg);
        line-height: 70px;
      }
    }
    :nth-child(2) {
      .iconfont {
        font-size: 50px;
      }
    }
  }
  .mode {
    display: flex;
    flex-grow: 1;
    flex-direction: row-reverse;
    padding-right: 30px;
    .source {
      width: 60px;
      text-align: center;
      .iconfont {
        line-height: 60px;
        color: #c62f2f;
        font-size: 30px;
      }
    }
    .voice {
      width: 120px;
      margin: auto 20px;
    }
    .playerlist {
      width: 60px;
      text-align: center;
      .iconfont {
        line-height: 60px;
        font-size: 30px;
        position: relative;
        top: 2px;
        color: rgb(138, 133, 133);
      }
    }
    .playermodel {
      text-align: center;
      width: 60px;
      .iconfont {
        line-height: 60px;
        font-size: 25px;
        color: rgb(138, 133, 133);
      }
    }
  }
}
</style>