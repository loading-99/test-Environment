// const url = require('url')
// var a = url.resolve('/one/two/three', 'four')
// var b = url.resolve('http://example.com/', '/one')
// var c = url.resolve('http://example.com/one', '/a/b')
// console.log(a + "," + b + "," + c)

// const querystring = require('querystring')
// var qs = 'x=3&y=4'
// var parsed = querystring.parse(qs)
// console.log(parsed)const querystring = require('querystring')

// const querystring = require('querystring')
// var str = 'id=3&city=北京&url=https://www.baidu.com'
// var escaped = querystring.escape(str)
// console.log(escaped)
// var str = 'id%3D3%26city%3D%E5%8C%97%E4%BA%AC%26url%3Dhttps%3A%2F%2Fwww.baidu.com'
// var unescaped = querystring.unescape(str)
// console.log(unescaped)



var http = require('http')
var https = require('https')

// 1、接口 2、跨域
const server = http.createServer((request, response) => {
    var url = request.url.substr(1)

    var data = ''

    response.writeHeader(200, {
        'content-type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*'
    })

    https.get(`https://m.lagou.com/listmore.json${url}`, (res) => {

        res.on('data', (chunk) => {
            data += chunk
        })

        res.on('end', () => {
            response.end(JSON.stringify({
                ret: true,
                data
            }))
        })
    })

})

server.listen(8080, () => {
    console.log('localhost:8080')
})

