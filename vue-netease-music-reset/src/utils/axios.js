import store from "@/store"
import { requst, requstwaitoutloading } from "@/utils/requst"

function getmusic(id) {
    return requst.get(`/song/url?id=${id}`)
        // .then(res => {
        //     let url = res.data.data[0].url
        //     console.log(url)
        //     return url

    // }) 通过async await 将异步更像同步
}
export function topsongs(type) {
    return requst.get(`/top/song?type=${type}`)
}
export function getnewmusic() {
    return requst.get('/personalized/newsong')
}
export function getsearch(params) {
    return requst.get('/search', params)
}
export function getplaylistinfo(params) {
    return requst.get('/playlist/detail', params)
}
export function getlistsong(id) {
    return requst.get(`/song/detail?ids=${id}`)
}
export function getcomments(params) {
    return requstwaitoutloading.get('/comment/playlist', params)
}
export function playmusic(index) {
    store.commit('updatanowlist', store.state.newsongs)
    changeplay(index)
}
export function getinfo(id) {
    return requst.get(`/mv/detail?mvid=${id}`)
}
export function getvideo(id) {
    return requst.get(`/mv/url?id=${id}`)
}
export function getrelated(id) {
    return requstwaitoutloading.get(`/simi/mv?mvid=${id}`)
}
export function getartists(id) {
    return requstwaitoutloading.get(`/artists?id=${id}`)
}
export function getmvcomments(params) {
    return requstwaitoutloading.get('/comment/mv', params)
}

function getuserinfo(userid) {
    return requstwaitoutloading.get(`/user/detail?uid=${userid}`)
}

function getuserlist(userid) {
    return requstwaitoutloading.get(`/user/playlist?uid=${userid}&limit=1000`)
}
export async function userlogin(user) {
    let info = await getuserinfo(user)
    let list = await getuserlist(user)
    const { avatarUrl: userimg, nickname: username } = info.profile
    let userlist = list.playlist.map(songlist => {
        const { id, name, userId } = songlist
        if (userId == user) {
            return { id, name, userId }
        }
    })
    let starlist = list.playlist.map(songlist => {
        const { id, name, userId } = songlist
        if (userId != user) {
            return { id, name, userId }
        }
    })

    // 数组去除空对象
    userlist = userlist.filter(item => item)
    starlist = starlist.filter(item => item)

    list = { userlist, starlist }
    const userinfo = { userimg, username, ...list }
    store.commit('uodatauserinfo', userinfo)

}

export async function changeplay(index) {
    let url = await getmusic(store.state.nowplaylist[index].id)
    let data = {
        url: url.data[0].url,
        imge: store.state.nowplaylist[index].img,
        name: store.state.nowplaylist[index].name,
        auther: store.state.nowplaylist[index].artists[0].name + " / " + store.state.nowplaylist[index].subType

    }
    store.commit('changemark', index)
    console.log(url.data[0].url + "外1")

    store.commit('updatamusic', data)
}