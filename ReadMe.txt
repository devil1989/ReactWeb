author:jeffrey chen
time：2016/01/05
description: 使用react创建项目


使用到的相关资料:
	react:主要用到的react和react-dom，最基础的东西
	redux：用于管理react中的state，
	webpack：用于模块化打包，包括jsx和es6转化为es5（还用到了webpack-dev-server：热插拔）
	react route：用于react的单页面应用程序的路由设置（暂时还没有使用）



文件结构：
origin:所有项目的未压缩文件，里面有各个项目的文件夹，每个项目文件夹里面又会未压缩好的build文件夹
dest：所有项目的压缩文件，里面有各个项目的文件夹，每个项目文件夹里面又会有压缩好的build文件夹
gruntfile.js:grunt的压缩脚本文件





这种结构的好处：
	每个项目在dest中都有独立的压缩文件，可以独立发布，只要不修改公共的common文件夹的内容，项目之间相互独立，发布的时候只要把dest中对应的那个项目发上即可
	每个项目都有独立的打包脚本，如果想修改所有的项目的打包方式，可以修改common中的打包脚本