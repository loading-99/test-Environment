import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";

import mains from '@/components/mains';
import newmusic from '@/components/newmusic';
import newmv from '@/components/newmv';
import playlist from '@/components/playlist';
import { userlogin } from '@/utils';

const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err);
};

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "home",
        component: mains,
    },
    {
        path: "/newmusic",
        name: "newmusic",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: newmusic,
    },
    {
        path: "/newmv",
        name: "newmv",
        component: newmv,
    },
    {
        path: "/mv/:id",
        name: "mv",
        component: () =>
            import ('@/components/tools/mvcontent'),
    },
    {
        path: "/playlist",
        name: "playlist",
        component: playlist,

    },
    {
        path: "/songlist/:id",
        name: "songlist",
        component: () =>
            import ('@/components/playlist/songlist')

    },
    {
        path: "/search/:songname",
        name: "search",
        component: () =>
            import ('@/components/tools/search'),
        // 默认子路由，重定向跳转
        redirect: '/search/:songname/song',
        children: [{
                path: 'song',
                component: () =>
                    import ('@/components/search/song'),
            },
            {
                path: 'songlist',
                component: () =>
                    import ('@/components/search/songlist'),
            },
            {
                path: 'mvs',
                component: () =>
                    import ('@/components/search/mvs'),
            },
        ]
    },

];




const router = new VueRouter({
    routes,
});
router.beforeEach((to, from, next) => {
    if (localStorage.getItem('userid' || to || from)) {
        let userid = localStorage.getItem('userid')
        userlogin(userid)
    }
    next();
})

export default router;