const axios = require('axios')
const webpack = require('webpack')
const path = require('path')
const MemoryFs = require('memory-fs')
const proxy = require('http-proxy-middleware')
const ReactDomServer = require('react-dom/server')
const serverConfig = require('../../build/webpack.config.server')

const getTemplate = ()=>{
    //用HTTP请求的方式去webpackdevserver服务里获取Template，用axios
    return new Promise((resolve,reject)=>{
        axios.get('http://localhost:8888/public/index.html')//获取到打包后的template文件
        .then(res=>{
            resolve(res.data)
        })
        .catch(reject)
    })
}


const Module = module.constructor


const mfs = new MemoryFs

const serverCompiler = webpack(serverConfig)
// serverCompiler监听entry下依赖文件是否有变化
// stats  webpack 打包过程中输出的信息

serverCompiler.outputFileSystem = mfs//webpack提供的api，通过mfs读写

let serverBundle
serverCompiler.watch({}, (err, stats) => {
    if(err) throw err;
    stats = stats.toJson()
    stats.errors.forEach(err => {
        console.log(err)
    });
    stats.warnings.forEach(err => {
        console.log(err)
    });

    const bundlePath = path.join(
        serverConfig.output.path,
        serverConfig.output.filename
    )
    const bundle = mfs.readFileSync(bundlePath,'utf-8')
    // 读取出来的内容时string 并不是js,==>使用module构造函数
    const m = new Module()
    m._compile(bundle,'server-entry.js')
    serverBundle = m.exports.default
})


module.exports = function(app){
    app.use('/public', proxy({
        target:'http://localhost:8888'
    }))

    app.get('*',function(req,res){
        getTemplate().then(template=>{
            const content = ReactDomServer.renderToString(serverBundle)
            res.send(template.replace("<!-- app -->", content))
        })
    })

}