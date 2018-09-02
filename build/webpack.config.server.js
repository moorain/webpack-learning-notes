//使用path 绝对路径的书写
const path = require('path')
module.exports = {
    target:'node',//指定执行环境
    entry:{//1.指定页面的入口
        app:path.join(__dirname,'../client/server-entry.js')
    },
    output:{//2.打包输出
        filename:'server-entry.js' ,
        path:path.join(__dirname,'../dist'),
        publicPath:'public',//加在引用js静态资源的前面，帮助区分静态资源和请求。 或用来加cdn的域名。
        libraryTarget:'commonjs2'//使用最新的commentjs模块加载规范
    },
    //配置webpack识别jsx js 配置响应的loader
    module:{
        rules:[
            {
                test:/.jsx$/,//文件类型
                loader:'babel-loader',
            },
            {
                test:/.js$/,//文件类型
                loader:'babel-loader',
                exclude:[
                    path.join(__dirname, '../node_modules')
                ]
            }
        ]
    },
}

// 