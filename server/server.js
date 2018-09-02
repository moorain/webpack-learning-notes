const express = require('express')
const ReactSSR = require('react-dom/server')
const fs = require('fs')
const path = require('path')

const isDev = process.env.NODE_ENV === 'development' 

const app = express();

//使用服务端渲染
if(!isDev){
    const serverEntry = require ('../dist/server-entry').default
    const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'),'utf-8')
    app.use('/public',express.static(path.join(__dirname,'../dist')))
    app.get('*',function(re1,res){
        const appstring =  ReactSSR.renderToString(serverEntry);
        res.send( template.replace('<!-- app -->' , appstring))
    })
}else{
    const devStatic = require ('./util/dev-static')
    devStatic(app)
}

app.listen(3333,function(){
    console.log('server is running on 3333 ....')
})