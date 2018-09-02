//使用path 绝对路径的书写
const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

//判断是否开发状态
const isDev = process.env.NODE_ENV === 'development' //启动时输入指令，webpack使用于不同的环境


const config = {
    entry:{//1.指定页面的入口
        app:path.join(__dirname,'../client/app.js')
    },
    output:{//2.打包输出
        filename:'[name].[hash].js' ,//hash: 给文件加一个hash值 ，如果文件改动 hash值 会进行更改，网页上引用，会进行刷新。
        path:path.join(__dirname,'../dist'),
        publicPath:'/public/',//加在引用js静态资源的前面，帮助区分静态资源和请求。 或用来加cdn的域名。
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
        new HTMLPlugin({
            template:path.join(__dirname,'../client/template.html')
        })
    ]
}



//访问目录 应是 localhost:8888/filename

if(isDev ){//开发环境 -增加配置
    config.entry = {
        app:[
            'react-hot-loader/patch',
            path.join(__dirname,'../client/app.js')
        ]
    }
    config.devServer={//webpack里开发环境的常用配置 webpack.js.org
        host:'0.0.0.0',//代表可以使用任何方式进行访问，根据不同需求
        port:'8888',
        contentBase:path.join(__dirname,'dist'),
        hot:true,//启动hot module replacement
        overlay:{//编译过程中出现错误信息
            errors: true
        },
        publicPath:'/public',//和webpack一致
        historyApiFallback:{//指定index是public下的html 404 的请求 返回index.html
            index:'/public/index.html'
        }
    }
    config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config