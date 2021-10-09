export function pad(num, n = 2) {
    let len = num.toString().length
    while (len < n) {
        num = '0' + num
        len++
    }
    return num
}
export function sorting(index) {
    let num = (index + 1).toString()
    if (num.length < 2) {
        num = '0' + num
    }
    return num
}

export function datechange(interval) {
    interval = interval | 0
    const minute = pad((interval / 1000 / 60) | 0)
    const second = pad(parseInt(interval / 1000 % 60))
    return `${minute}:${second}`
}

export function createSong(song) {
    const { id, name, img, artists, duration, albumId, albumName, mvId, subType, ...rest } = song

    return {
        id,
        name,
        img,
        artists,
        duration,
        albumName,
        // url: genSongPlayUrl(song.id),
        // artistsText: genArtistisText(artists),
        durationSecond: duration,
        // 专辑 如果需要额外请求封面的话必须加上
        albumId,
        // mv的id 如果有的话 会在songTable组件中加上mv链接。
        mvId,
        subType,
        ...rest
    }
}

export function formatdate(time) {
    var date = new Date(parseInt(time));
    var year = date.getFullYear();
    var mon = date.getMonth() + 1;
    var day = date.getDate();
    return year + '-' + mon + '-' + day;

}