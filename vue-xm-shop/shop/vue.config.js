module.exports={
	publicPath:'./',  //根目录的路径 ,打包的时候一定会用到的
	lintOnSave: true,
	devServer: {
		host:'127.0.0.1',
		port:8080,
		https:false,
		open:true,
		proxy: {//跨域
			'/api': {
				target: 'http://127.0.0.1:8009',  // target host    网络服务器  http://yinruifang.cn
				ws: true,  // proxy websockets
				changeOrigin: true,  // needed for virtual hosted sites
				pathRewrite: {
					'^/api': '/index'  // rewrite path
				}
			},
		}, 
	}
}