//由于webpack是基于node进行构建的，所有webpack的配置文件中，任何合法的Node代码都是支持的
const path = require('path')
//当以命令行形式运行webpack或webpack-dev-server的时候，工具会发现，我们并没有提供要打包的文件的入口和出口文件，此时它会检查项目根目录中的配置文件并读取这个文件就拿到导出的这个配置对象，然后根据这个对象进项打包构建
//这是启用热更新的第二步
const webpack = require('webpack')
//导入在内存中生成HTML页面的插件
//只要是插件都放在plugins节点里面
//这个插件的两个作用：
//1.自动在内存中根据指定页面生成一个内存的页面
//2.自动把打包好的bundle.js追加到页面中去
const htmlWebpackPlugin = require('html-webpack-plugin')
//这个配置文件，其实就是一个JS文件，通过node中的模块操作，向外暴露了一个配置对象
module.exports = {
  //在配置文件中，需要手动指定入口和出口
  entry: path.join(__dirname, './src/main.js'), //入口，表示要使用webpack打包哪个文件
  output: {
    //输出文件相关配置
    path: path.join(__dirname, './dist'), //指定打包好的文件，输出到哪个目录中去
    /* publicPath: '/dist/', */ //访问文件的路径,这里的根路径是根据url来的，比如访问http://localhost:8088/dist/，那么就是对应/dist/
    filename: 'bundle.js' //这是指定输出文件的名称
  },
  devServer: { //这是配置dev-server命令参数的第二中形式，相对来说，这种方式麻烦一些
    //--open --port 3000 --contentBase src --hot
    open: true, //自动打开浏览器
    port: 3000, //设置浏览器端口
    /* contentBase: 'src', */ //指定托管的根目录
    hot: true //启用热更新的第一步
  },
  plugins: [ //配置插件的节点
    new webpack.HotModuleReplacementPlugin(), //new一个热更新的模块对象，这是启用热更新的第三步
    new htmlWebpackPlugin({ //创建一个在内存中生成HTL页面的插件
      template: path.join(__dirname, './src/index.html'), //指定模板页面，将来会根据指定的页面路径去生成内存中的页面
      filename: 'index.html' //指定生成的页面的名称
    })
  ],
  module: { //这个节点用于存放所有第三方模块加载器
    rules: [ //所有第三方模块的匹配规则
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }, //配置处理.css文件的第三方loader规则
      //loader调用顺序：从右向左
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }, //配置处理.less文件的第三方loader规则
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }, //配置处理.scss文件的第三方loader规则
      {
        test: /\.(jpg|png|gif|bmp|jpeg)$/,
        use: 'url-loader?limit=2655&name=[hash:8]-[name].[ext]'
      }, //配置图片路径的loader
      //limit给定的值是图片的大小，单位是byte，如果我们引用的图片大于或等于给定的limit值，则不会被转化成base64格式的字符串；如果图片小于给定的limit值，则会被转为base64的字符串
      //[name].[ext]固定写法，使得图片地址中图片名字及格式不被重命名，hash值最大为32位的，为了防止不同图片命名相同的情况
      {
        test: /\.(ttf|eot|svg|woff|woff2)$/,
        use: 'url-loader'
      }, //处理字体文件的loader
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }, //配置Babel来转换高级的ES语法
    ]

  }
}

//当我们在控制台，直接输入webpack命令执行的时候，webpack做到以下几步：
//1.首先，webpack发现，我们并没有通过命令的形式给它指定入口和出口
//2.webpack就会去项目的根目录中，查找一个叫做‘webpack.config.js’的配置文件
//3.当找到配置文件后，webpack会去解析执行这个配置文件，当解析执行完配置文件后，就得到了配置文件中导出的配置对象
//4.当webpack拿到配置对象后，就拿到了配置对象中指定的入口和出口，然后进行打包构建。


//使用webpack-dev-server这个工具来实现自动打包编译的功能
//1.运行 npm i webpack-dev-server -D把这个工具安装到项目的本地开发依赖
//2.安装完毕后，这个工具的用法和webpack命令的用法完全一样
//3.由于我们是在项目中，本地安装的webpack-dev-server，所以，无法把它当作脚本命令，在powershell终端中直接运行；（只有那些安装到全局-g的工具，才能在终端中正常运行）
//4.注意：webpack-dev-server这个工具,如果想要正常运行，要求：在本地项目中，必须安装webpack
//ctrl+c终止操作
//5.webpack-dev-server帮我们打包生成的bundle.js文件中，并没有存放到实际的物理磁盘上，而是直接托管到了电脑的内存中，所以我们在项目根目录中根本找不到这个打包好的bundle.js;
//6.我们可以认为，webpack-dev-server把打包好的文件以一种虚拟的形式托管到了咱们项目的根目录中，虽然我们看不到它但是可以认为和dist\src\node_modules平级，有一个看不见的文件叫做bundle.js