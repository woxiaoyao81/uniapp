根据官方或网友分享收集的Nativejs调用原生函数案例

 ## 一、目前提供的功能(目前都是Android版)

```
 * 1、打开系统设置openSetting
 * 2、打开应用设置openAppSetting
 * 3、根据包名启动第三方应用openApp
 * 4、根据包名发送广播broadCast
 * 5、获取本机的所有安装的包名和应用程序名getApplication
 ```

 ## 二、调用示例

 1、导入封装库import wxy from '@/common/wxy-android.js';
 
 2、调用封装的函数

 let appArr = wxy.getApplication();
 
 要记得加上// #ifdef APP-PLUS...//// #endif，它只适合Android，IOS可以自己修改

 3、其它调用示例

```
 // #ifdef APP-PLUS
// 根据包名发送广播
wxy.broadCast('com.android.launcher3', 'com.linspirer.edu.homeaction');
// #endif
```
```
// #ifdef APP-PLUS
// 根据包名启动第三方应用
wxy.openApp("com.ndwill.swd.appstore","应用商店");
// #endif
```
```
// #ifdef APP-PLUS
// wifi设置
wxy.open(wxy.WIFI_SETTINGS);
// #endif
```
## 三、关于NativeJS学习想说的话

不可否认NativeJS将JS延伸到APP原生是非常不错的想法，正如Nodejs实现服务器一样，不过在学习过程中还是遇到太多的坑，这里推荐了DCloud_App_Array老大写的入门教程<https://ask.dcloud.net.cn/article/88>，Nativejs示例<https://ask.dcloud.net.cn/article/114>和在插件市场的Nativejs的代码(重点是DCloud_App_Array写的),还有最推荐实践项目就是HbuilderX自带的Hello 5+的HTML5Plus规范演示,从中我学习很多，现在总算是入门了，给我Java代码，我就能转成NJS代码，怎么转换，不再为null或JSBObject而苦恼，可以看我在论坛社区发表的文章，算是一篇带你真正了解NativeJS实战的经验总结了，

不过在本插件中获取本机安装的包名和应用名，需要等待3秒左右，不知是NativeJS转换Java需要的开销,还是Java代码本身就需要这些时间。前段时间我也总结了与AS的混合开发，抽时间测试下。至于AS混合开发中编写Java代码可参考我的Gitee<https://gitee.com/freegroup81/uniapp/tree/main/%E7%A6%BB%E7%BA%BF%E6%89%93%E5%8C%85>

最后祝愿大家都能熟练掌握这门技术