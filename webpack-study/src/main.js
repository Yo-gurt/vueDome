//这个 main.js 是我们项目的JS入口文件

//1.导入Jquery
//import *** from ***是
import $ from 'jquery'
//const $ = require('jquery')

$(function () {
  $('li:odd').css('backgroundColor', 'lightblue')
  $('li:evev').css('backgroundColor', function () {
    return '#D97634'
  })
})