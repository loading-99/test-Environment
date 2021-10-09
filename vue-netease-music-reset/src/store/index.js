import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        musicURL: null,
        mark: '',
        imge: '',
        songname: '',
        auther: '',
        drawer: false,
        suspended: false,
        // 公共缓存列表
        cachelist: [],
        // 当前播放列表
        nowplaylist: [],
        // 最新音乐缓存
        newsongs: [],
        // 音乐速递缓存
        topsongs: [],
        // 用户登录信息
        userinfo: {},
        searchinfo: {
            songcount: 0
        }
    },
    mutations: {
        changemark(state, data) {
            if (!isNaN(data)) {
                state.mark = Number(data)
            } else if (data == 'prev' && state.mark > 0) {
                state.mark -= 1
            } else if (data == 'next' && state.mark < state.nowplaylist.length - 1) {
                state.mark += 1
            } else {
                console.log('参数错误')
            }
        },
        updatamusic(state, data) {
            state.musicURL = data.url
            state.imge = data.imge
            state.songname = data.name
            state.auther = data.auther
            state.suspended = true
        },
        play(state, off) {
            state.suspended = off
        },
        updatacache(state, data) {
            state.cachelist = data
        },
        newsongupdata(state, data) {
            state.newsongs = data
        },
        updatanowlist(state, data) {
            state.nowplaylist = data
        },
        updatatopsongs(state, data) {
            state.topsongs = data
        },
        searchinfochange(state, data) {
            state.searchinfo.songcount = data
        },
        opendrawer(state) {
            state.drawer = !state.drawer
            console.log(state.drawer)
        },
        uodatauserinfo(state, data) {
            state.userinfo = data
        },
    },
    actions: {},
    modules: {},
});