var htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
	//入口文件
	entry:{
		main:'./src/js/main.js'
	},
	//编译后的文件及路径
	output:{
		filename:'javascripts/[name]-bundle.js',
		//这里直接使用文件路径拼接
		path:__dirname+'/public',
		//publicPath在生成的html模版中非常有用
		publicPath:'http://localhost:3000'
	},
	module:{
		rules:[
			//css加载器
			{test:/\.css$/,loader:'style-loader!css-loader'},
			//由于bootstrap依赖jquery，这里全局引用jquery
			{ test: require.resolve("jquery"), loader: "expose-loader?$!expose-loader?jQuery" },
			//bootstrap中由于引用了外部字体文件，所以需要对应的loader来处理
			{ test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: "url-loader?limit=10000&mimetype=application/font-woff" },
			{ test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,   loader: "url-loader?limit=10000&mimetype=application/font-woff2" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file-loader" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url-loader?limit=10000&mimetype=image/svg+xml" },
            //html加载器（html－webpack－plugin默认以ejs加载页面防止报错我们需要html加载器）
			{ test:/\.html$/,loader:'html-loader'}
		]
	},
	//html页面扩展
	plugins:[
		new htmlWebpackPlugin({
			//这个是生成的html文件名，我们把它直接放在views中覆盖原有的欢迎页面
			filename:'../views/index.html',
			//这个是根据哪个页面模版来打包文件
			template:'./src/tpl/index.html',
			//chunks代表当前页面需要引入上述哪个依赖文件
			chunks:['main']
		})
		
	]
}
