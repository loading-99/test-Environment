import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/utils/axios";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/style/index.scss";
import VueLazyload from 'vue-lazyload';

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(VueLazyload);
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: 'http://p4.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg',
    loading: 'http://p4.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg',
    attempt: 1
})

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");