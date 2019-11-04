//这个 main.js 是我们项目的JS入口文件

//1.导入Jquery
//import *** from ***是ES6中导入模块的方式
//由于ES6的代码太高级，浏览器解析不了，所以这一行执行不了，会报错
import $ from 'jquery'
//const $ = require('jquery')
//使用import语法，导入css样式表
import './css/index.css'
import './css/index.less'
import './css/index.scss'
//注意：如果要通过路径的形式去引入node_modules中相关的文件，可以直接省略路径前面的node_modeles这一层目录，直接写包的名称，然后后面跟上具体的文件路径
//不写node_modules这一层目录，默认就回去node_modules中去查找
import 'bootstrap/dist/css/bootstrap.css'
//注意：webpack默认只能打包处理JS类型的文件，无法处理其他非JS类型的文件；
//如果要处理非JS类型的文件，我们需要手动安装一些适合第三方loader加载器；
//1.如果想要打包处理css文件，需要安装npm i style-loader css-loader -D
//2.打开webpack.config.js这个配置文件，在里面新增一个配置节点叫做module，它是一个对象，在这个module对象上有个rules属性，这个rules属性是个数组，这个数组存放了所欲第三方文件的匹配和处理规则

//注意：webpack处理第三方文件类型的过程：
//1.发现这个要处理的文件不是JS文件，就会去配置文件中查找有没有对应的第三方loader规则；
//2.如果能找到对应的规则，就会调用对应的loader处理这种文件类型；
//3.在调用loader的时候，是从后往前调用的；
//4.当最后的一个loader调用完毕，会把处理的结果直接交给webpack进行打包合并，最终输出到bundle.js中去


/* $(function () {
  $('li:odd').css('backgroundColor', 'pink')
  $('li:even').css('backgroundColor', function () {
    return '#8BC34A'
  })
}) */
//经过刚才的演示，webpack可以做什么事情
//1.webpack能够处理Js文件的相互依赖关系；
//2.webpack能够处理js的兼容问题，把高级的的、浏览器不识别的语法转化为低级的、浏览器能正常识别的与法

//之前运行的打包命令 webpack 要打包的文件的路径 打包好的输出文件的路径

//在 npm version >= 5.2.0 开始，自动安装了npx。
//npx是什么呢？ npx 会帮你执行依赖包里的二进制文件。 
//此处安装webpack和webpack-cli都是局部安装，输入webpack或webpack-cli命令是无效的，正确命令需要加上npx例如 npx webpack .\src\main.js -o .\dist\bundle.js
//webpack的打包cli命令也已修改：k的打包cli命令已经更改：
//webpack <entry> [<entry>] -o <output></output>

//class关键字，是ES6中提供的新语法，是用来实现ES6中面向对对象编程的方式
class Person {
  //使用static关键字，可以定义静态属性
  //所谓静态属性，就是可以直接通过类名直接访问的属性
  //实例属性：只能通过类的实例来访问的属性，叫做实例属性
  static info = {
    name: 'zs',
    age: 20
  }
}
//访问Person类身上的info静态属性
console.log(Person.info)
//在webpack中，默认只能处理一部分ES6的新语法，一些更高级的ES6语法或者ES7语法，webpack处理不了
//这时需要借助第三方的loader来帮助webpack处理这些高级语法，当第三方loader把高级语法转化为低级的语法之后，会把结果交给webpack去打包给bundle.js中
// 通过Babel可以帮我们将高级的语法转化为低级的语法
//1.在webpack中，可以运行如下两套命令，安装两套包，去安装Babel相关的loader功能
//1.1第一套包：npm i babel-core babel-loader babel-plugin-transform-runtime -D  转换器作用
//1.2第二套包：npm i babel-preset-env babel-preset-stage-0 -D 语法相当于字典翻译规则 babelv7以上弃用了stage-*
//2.打开webpack的配置文件，在module节点下的rules数组中，添加一个新的匹配规则：
//2.1{test:/\.js$/,use:'babel-loader',exclude:/node_modules/}
//2.2注意：在配置babel的loader规则的时候，必须把node_modules目录，通过exclude选项排除掉，原因有两点：
//2.2.1不排除则会把node_modules中所有的第三方JS文件都能打包编译，这样会非常消耗CPU，同时打包速度非常慢
//2.2.2即使最后babel把所有node_modules中的JS转换完毕，项目也无法正常运行
//3.在项目的根目录中，新建一个叫做.babelrc的babel配置文件，这个配置文件，属于JSON格式，所以在写.babelrc配置的时候，必须符合JSON语法规范，不能写注释，字符串必须用双引号
//3.1在.babelrc写如下的配置：可以把preset翻译成【语法】
// {
//   "presets": ["env","stage-0"],
//   "plugins": ["transform-runtime"]
// }
//4.目前安装的babel-preset-env是比较新的ES语法，之前安装的babel-preset-es2015，现在除了一个更新的语法插件叫做babel-preset-env，它包含了所有的和es***相关的语法
//java c#实现面向对象的方式完全一样了，class是从后端语言中借鉴过来的
//var p1 = new Person()

// function Animal(name) {
//   this.name = name
// }
// Animal.info = 123

// var a1 = new Animal('小花')

//这是静态属性
//console.log(Animal.info)
//这是实例属性
//console.log(a1.info)