# 使用Vue全家桶开发，融合Mac与Win风格于一体的网易云音乐🎵在线程序

关于音乐播放器也不是第一次写了，在之前就写过两个关于播放器的项目了，嗯mmmm...与其说是项目，不如说是体量稍大一点的demo

> 1. [BIGWhitePlayer 网页端本地音乐播放器](https://inkgn.gitee.io/bigwhite-music/)
>> 这个播放器使用的是老旧的 **jQuery** 进行开发，虽然过程中频繁操作DOM，开发过程比较繁琐，但是作为我个人第一个学习前端以来真正意义上的独立“项目”，这整个过程是十分快乐的，而且实际体验也还不错？说件让人哭笑不得的事😂，我还在某个源码传播平台看到了我这个作品。当然这并不是说我编程技术有多好，但至少说明我这个程序可玩性还不错？至少他们是这么认为的😳

> 2. [悦听 网页端在线音乐播放器](http://inkgn.gitee.io/vue_music/)
>> 这个程序是我今年年初练习 **Vue** 写的，整体下了花了大半天时间吧，有两方面原因，第一就是不需要浪费一些精力在操作**DOM**上面，我们可以只专心处理逻辑层面的问题，第二这个程序确实要比上面的程序要实现的东西少，仅仅是几个 **API** 接口拿到数据渲染到页面，再做一些点击事件就OK了

那么这次开发到底有什么不一样的呢？首先整个技术栈已经不在一个高度了，本次开发用到了 Vue2.0，Vue-cil，Sass，Vue-router，Vuex，axios，Element UI，Vue-lazyload 这些框架以及组件库，其次就是这次的开发体量确实不同以往，整个内容十分完整，是个真正意义上的完整项目。

### 页面及功能介绍


- 首页推荐
- 发现音乐
- 歌单推荐
- 最新音乐
- 最新MV
- 音乐搜索
- 歌单详情
- MV详情
- 歌单及MV评论
- 播放列表
- 播放及模式切换功能
- 主题换肤功能
- ID登录功能

### UI界面
界面配色及设计主要借鉴了GitHub上面一位大佬开发的[Vue全家桶高仿Mac🎵网易云音乐](https://github.com/sl1673495/vue-netease-music)。但是有些地方的设计总让我觉得很别扭，所以我就把Windows平台的网易云设计也融入了进来，终于做出了现在这个😁四不像的样子，开个玩笑，我觉得还挺好看，现在一起欣赏下吧！

![图片](https://gzh-1253246719.cos.ap-chengdu.myqcloud.com/vue_pro/1.png)

![图片](https://gzh-1253246719.cos.ap-chengdu.myqcloud.com/vue_pro/2.png)

![图片](https://gzh-1253246719.cos.ap-chengdu.myqcloud.com/vue_pro/4.png)

![图片](https://gzh-1253246719.cos.ap-chengdu.myqcloud.com/vue_pro/3.png)

![图片](https://gzh-1253246719.cos.ap-chengdu.myqcloud.com/vue_pro/5.png)


### 部署安装
```
npm install
```

### 运行项目
```
npm run serve
```

### 打包上线
```
npm run build
```

