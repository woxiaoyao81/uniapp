// 根据官方或网友分享收集的Nativejs调用原生函数案例
/**
 * 目录提供的功能（目前都是Android版)
 * 1、打开系统设置openSetting
 * 2、打开应用设置openAppSetting
 * 3、根据包名启动第三方应用openApp
 * 4、根据包名发送广播broadCast
 * 5、获取本机的所有安装的包名和应用程序名getApplication
 */


/**
 * 打开系统设置页面
 * @param {String} setting 设置页面标识
 * 参考Android原生android.provider.Settings类中定义的常量
 * https://ext.dcloud.net.cn/plugin?id=1061
 * https://ask.dcloud.net.cn/question/14732
 * 在页面中引用此模块
 * import wxy from "@/common/wxy-android.js"
 * 调用模块的方法
 * wxy.open(wxy.SETTINGS);
 */
function openSetting(setting) {
	try {
		let os = plus.os.name;
		if ('Android' == os) {
			const main = plus.android.runtimeMainActivity();
			let intent = plus.android.newObject('android.content.Intent', setting);
			main.startActivity(intent);
		} else {
			//unsupport, nothing to do.
		}
	} catch (e) {
		console.error('error @openSettings!!');
	}
}

/**
 * 打开应用设置页面
 * https://ext.dcloud.net.cn/plugin?id=1061
 */
function openAppSetting() {
	try {
		let os = plus.os.name;
		if ('Android' == os) {
			const main = plus.android.runtimeMainActivity();
			let intent = plus.android.newObject('android.content.Intent', 'android.settings.APPLICATION_DETAILS_SETTINGS');
			let uri = plus.android.invoke('android.net.Uri', 'fromParts', 'package', main.getPackageName(), null);
			plus.android.invoke(intent, 'setData', uri);
			main.startActivity(intent);
		} else {
			//unsupport, nothing to do.
		}
	} catch (e) {
		console.error('error @openAppSetting!!');
	}
}

// 参考DCloud官方提供的H5+APP中runtime.html调用第三方应用案例
// 根据包名从应用市场下载
function androidMarket(pname) {
	plus.runtime.openURL("market://details?id=" + pname);
}
/**
 * 根据包名启动第三方应用
 * @param {String} pname 包名，如微信是com.tencent.mm
 * @param {String} pnamestr 应用名称，如微信
 */
function openApp(pname, pnamestr) {
	try {
		const os = plus.os.name;
		if ('Android' == os) {
			plus.runtime.launchApplication({
				pname: pname
			}, function(e) {
				let str = `检查到您未安装"${pnamestr}",是否到商城搜索下载？`;
				plus.nativeUI.confirm(str, function(i) {
					if (i.index == 0) {
						androidMarket(pname);
					}
				});
			});
		} else {
			//unsupport, nothing to do.
		}
	} catch (e) {
		console.error('error @openApp!!');
	}
}

/**
 * 根据包名和行为向第三方应用发送广播
 * @param {String} pname 包名，如微信是com.tencent.mm
 * @param {String} action 行为
 * @param {Object} data   参数，由于js没索引数组，所以以对象的形式传递参数
 * 关于Nativejs的常规API和高级API区别见https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/88
 */
function broadCast(pname, action, data = {}) {
	try {
		const os = plus.os.name;
		if ('Android' == os) {
			const main = plus.android.runtimeMainActivity();
			// 常规Nativejs API
			// let Intent = plus.android.importClass("android.content.Intent");
			// let intent = new Intent();
			// intent.setPackage(pname);
			// intent.setAction(action);			
			// for (let [key, value] of Object.entries(data)) {
			//   intent.putExtra(key, value);
			// }
			// 高级Nativejs API
			let intent = plus.android.newObject('android.content.Intent');
			plus.android.invoke(intent, 'setPackage', pname);
			plus.android.invoke(intent, 'setAction', action);
			for (let [key, value] of Object.entries(data)) {
				plus.android.invoke(intent, 'putExtra', key, value);
			}
			main.sendBroadcast(intent);
		} else {
			//unsupport, nothing to do.
		}
	} catch (e) {
		console.error('error @broadCast!!');
	}
}

/**
 * 获取本机的所有安装的包名和应用程序名
 * //下面是Java实现代码
 * //获取PackageManager
 * PackageManager packageManager = context.getPackageManager();
 * //获取所有已安装程序的包信息
 * List <PackageInfo> packageInfos = packageManager.getInstalledPackages(0);
 * // 遍历所有安装程序的包信息和应用程序名
 * ApplicationInfo applicationInfo = null;
 * if (packageInfos != null) {
 * 	for (int i = 0; i < packageInfos.size(); i++) {
 * 		String packName = packageInfos.get(i).packageName;
 * 		applicationInfo = packageManager.getApplicationInfo(packName, 0);
 * 		String appName=(String)((applicationInfo != null) ? packageManager.getApplicationLabel(applicationInfo) : "???");
 * 		Log.e(TAG, "PackageName:" + packName+",ApplicationName:"+appName);
 * 	}
 * }
 */
function getApplication() {
	// NativeJS实现代码
	try {
		const os = plus.os.name;
		if ('Android' == os) {
			const main = plus.android.runtimeMainActivity();
			let pManager = plus.android.invoke(main, 'getPackageManager');
			let pInfo = plus.android.invoke(pManager, 'getInstalledPackages', 0);
			let total = plus.android.invoke(pInfo, 'size');
			let packName = '';
			let appName = '';
			let obj = null;
			let appArr = new Array();
			// 遍历获取包名和应用名称
			for (let i = 0; i < total; i++) {
				// 获取包名
				packName = plus.android.getAttribute(plus.android.invoke(pInfo, 'get', i), 'packageName');
				// 获取包名对应的应用名
				obj = plus.android.invoke(pManager, 'getApplicationInfo', packName, 0);
				appName = plus.android.invoke(pManager, 'getApplicationLabel', obj);
				// console.log(packName, appName);
				obj = {};
				obj.packName = packName;
				obj.appName = appName;
				// console.log(obj);
				appArr.push(obj);
			}
			return appArr;
		} else {
			//unsupport, nothing to do.
		}
	} catch (e) {
		console.error('error @getApplication!!');
	}
}

module.exports = {
	SETTINGS: 'android.settings.SETTINGS',
	APN_SETTINGS: 'android.settings.APN_SETTINGS',
	LOCATION_SOURCE_SETTINGS: 'android.settings.LOCATION_SOURCE_SETTINGS',
	USER_SETTINGS: 'android.settings.USER_SETTINGS',
	WIRELESS_SETTINGS: 'android.settings.WIRELESS_SETTINGS',
	SECURITY_SETTINGS: 'android.settings.SECURITY_SETTINGS',
	PRIVACY_SETTINGS: 'android.settings.PRIVACY_SETTINGS',
	WIFI_SETTINGS: 'android.settings.WIFI_SETTINGS',
	WIFI_IP_SETTINGS: 'android.settings.WIFI_IP_SETTINGS',
	BLUETOOTH_SETTINGS: 'android.settings.BLUETOOTH_SETTINGS',
	CAST_SETTINGS: 'android.settings.CAST_SETTINGS',
	DATE_SETTINGS: 'android.settings.DATE_SETTINGS',
	SOUND_SETTINGS: 'android.settings.SOUND_SETTINGS',
	DISPLAY_SETTINGS: 'android.settings.DISPLAY_SETTINGS',
	LOCALE_SETTINGS: 'android.settings.LOCALE_SETTINGS',
	VOICE_INPUT_SETTINGS: 'android.settings.VOICE_INPUT_SETTINGS',
	INPUT_METHOD_SETTINGS: 'android.settings.INPUT_METHOD_SETTINGS',
	MANAGE_APPLICATIONS_SETTINGS: 'android.settings.MANAGE_APPLICATIONS_SETTINGS',
	DEVICE_INFO_SETTINGS: 'android.settings.DEVICE_INFO_SETTINGS',
	NOTIFICATION_SETTINGS: 'android.settings.NOTIFICATION_SETTINGS',
	open: openSetting,
	openAppSetting: openAppSetting,
	openApp: openApp,
	broadCast: broadCast,
	getApplication: getApplication
}
