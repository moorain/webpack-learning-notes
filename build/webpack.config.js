//使用path 绝对路径的书写
const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
module.exports = {
    entry:{//1.指定页面的入口
        app:path.join(__dirname,'../client/app.js')
    },
    output:{//2.打包输出
        filename:'[name].[hash].js' ,//hash: 给文件加一个hash值 ，如果文件改动 hash值 会进行更改，网页上引用，会进行刷新。
        path:path.join(__dirname,'../dist'),
        publicPath:'',//加在引用js静态资源的前面，帮助区分静态资源和请求。 或用来加cdn的域名。
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
    plugins:[
        new HTMLPlugin()//生成一个html页面 webpack编译时，将entry注入到html里。
    ]
}

// 