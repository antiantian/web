var C = function(t, e) {
			var i = t.navigator.userAgent;
			return {
				isMobile: function() {
					var t = this;
					return t.isAndroid() || t.isIOS() || /AppleWebKit.*Mobile/i.test(i) || /MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(i)
				},
				isAndroid: function() {
					return !!i.match(/Android/i)
				},
				isIOS: function() {
					return !!i.match(/iPhone|iPad|iPod/i)
				},
				isIOS9: function() {
					var t = this;
					return !!(t.isIOS() && t.compareVersion(t.returnSysVersion(), "9.1") >= 0)
				},
				isMobileQQ: function() {
					return /QQ\/([\d\.]+)/.test(i) || /(iPad|iPhone|iPod).*? (IPad)?QQ\/([\d\.]+)/.test(i) || /\bV1_AND_SQI?_([\d\.]+)(.*? QQ\/([\d\.]+))?/.test(i)
				},
				isWx: function() {
					return !!i.match(/micromessenger/i)
				},
				isWeixin: function() {
					return i.indexOf('MicroMessenger') > -1 || i.indexOf('micromessenger') > -1
				},
				isAndroidChrome: function() {
					var t = this;
					return !(!i.match(/Chrome\/([\d.]+)/) && !i.match(/CriOS\/([\d.]+)/) || !t.isAndroid())
				},
				isUlspecialBrower: function() {
					var t = this,
						e = ["BaiduBrowser"];
					return e.indexOf(t.returnBrowser().split("|")[0]) >= 0
				},
				isTimeoutSpecialBrower: function() {
					var t = this,
						e = ["UCBrowser", "BaiduBrowser", "Weibo"];
					return !!(e.indexOf(t.returnBrowser().split("|")[0]) >= 0 || t.isMobileQQ())
				},
				isguideSpecialBrower: function() {
					var t = this,
						e = ["BaiduBrowser", "Weibo"];
					return !!(e.indexOf(t.returnBrowser().split("|")[0]) >= 0 || t.isWx())
				},
				isAppLinkDevice: function() {
					var t = this;
					return "ChromeBrowser" === t.returnBrowser().split("|")[0] && /Chrome\/([\w.]+)|CriOS\/([\d.]+)/i.exec(i)[1].split(".")[0] >= 51
				},
				returnSysVersion: function() {
					var t = this,
						e = [],
						r = i.match(/(Android);?[\s\/]+([\d.]+)?/),
						n = i.match(/(iPad).*OS\s([\d_]+)/),
						o = !n && i.match(/(iPhone\sOS)\s([\d_|.]+)/);
					return t.isIOS() && o && !n ? e.push(o[2].replace(/_/g, ".").split(".")[0], o[2].replace(/_/g, ".").split(".")[1]) : t.isIOS() && !o && n ? e.push(n[2].replace(/_/g, ".").split(".")[0], n[2].replace(/_/g, ".").split(".")[1]) : t.isAndroid && r && e.push(r[2].replace(/_/g, ".").split(".")[0], r[2].replace(/_/g, ".").split(".")[1]), e.join(".")
				},
				compareVersion: function(t, e) {
					var i = t.split("."),
						r = e.split(".");
					if (t === e) return 0;
					for (var n = 0; n < i.length; n++) {
						var o = parseInt(i[n]);
						if (!r[n]) return 1;
						var a = parseInt(r[n]);
						if (o < a) return -1;
						if (o > a) return 1
					}
					return -1
				},
				returnBrowser: function() {
					var t, e = "",
						r = this;
					if (/baidubrowser\/([\w.]+)/i.exec(i)) e = "other";
					else if (/Firefox\/([\w.]+)|FxiOS\/([\w.]+)/i.exec(i)) t = /Firefox\/([\w.]+)|FxiOS\/([\w.]+)/i.exec(i), e = "Firefox|" + t[1];
					else if (/Weibo__([\w.]+)/i.exec(i)) t = /Weibo__([\w.]{3})/i.exec(i), e = "Weibo|" + t[1].replace(/_/g, ".");
					else if (r.isWx()) {
						t = /MicroMessenger\/([\w.]+)/i.exec(i);
						var n = t[1].replace(/_/g, "."),
							o = /(\d+\.\d+\.\d+\.\d+)/.exec(n);
						e = "wechat|" + n, o && (e = "wechat|" + o[1])
					} else if (/QQ\/([\w.]+)/i.exec(i)) t = /QQ\/([\w.]+)/i.exec(i), e = "qqMobile|" + t[1];
					else if (/MQQBrowser\/([\w.]+)/i.exec(i)) t = /MQQBrowser\/([\w.]+)/i.exec(i), e = "QQBrowser|" + t[1];
					else if (/UCBrowser\/([\w.]+)/i.exec(i)) t = /UCBrowser\/([\w.]+)/i.exec(i), e = "UCBrowser|" + t[1];
					else if (/miuibrowser\/([\w.]+)/i.exec(i)) t = /miuibrowser\/([\w.]+)/i.exec(i), e = "miuiBrowser|" + t[1];
					else if (/Chrome\/([\w.]+)|CriOS\/([\d.]+)/i.exec(i)) t = /Chrome\/([\w.]+)|CriOS\/([\d.]+)/i.exec(i), e = "ChromeBrowser|" + t[1];
					else if (/Safari\/([\w.]+)/i.exec(i) && /Version/i.test(i)) {
						t = /Safari\/([\w.]+)/i.exec(i) && /Version/i.test(i);
						var a = /Version\/([\w.]+)/i.exec(i);
						e = "Safari|" + a[1]
					} else e = /(ipad|iphone).* applewebkit\/.* mobile/i.test(i) ? "Safari" : "other";
					return e
				}
			}
		}(window, document)
		
 function checkmobile(){
     var flag = false;  
    var agent = navigator.userAgent.toLowerCase();  
    var keywords = [ "android", "iphone", "ipod", "ipad", "windows phone", "mqqbrowser" ];  
    
    //排除 Windows 桌面系统  
    if (!(agent.indexOf("windows nt") > -1) || (agent.indexOf("windows nt") > -1 && agent.indexOf("compatible; msie 9.0;") > -1)) {  
        //排除苹果桌面系统  
        if (!(agent.indexOf("windows nt") > -1) && !agent.indexOf("macintosh") > -1 ) {  
            for (var item in keywords) {  
                if (agent.indexOf(item) > -1 ) {  
                    flag = true;  
                    break;  
                }  
            }  
        }  
    }  
    return flag;
 }


 function wzw(){}
//浏览器相关信息
//android webview 需要app进行支持，Android web view初始化时，在navigator中添加标识 
 wzw.prototype={
        versions:function(){
            var u = navigator.userAgent, app = navigator.appVersion;
            return {
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                iosView: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                weixin: u.indexOf('MicroMessenger') > -1 || u.indexOf('micromessenger') > -1, //是否微信 （2015-01-22新增）
                qq: u.indexOf('QQ')>-1 || u.indexOf('qq')>-1, //是否QQ
                uc: u.indexOf('UCBrowser') > -1 || u.indexOf('uc') > -1,
                androidView: u.indexOf('ANDROIDWEBVIEW')>-1//需要app端配合,在userAgent中加入标识
            };
        },
        language:(navigator.browserLanguage || navigator.language).toLowerCase(),
        appVersion:navigator.appVersion,
        isIOS:function(){
            if (/iPhone|iPod|iPad/.test(navigator.userAgent)) { return true;}
            else {return false;}
        },
        isAndroid:function(){
            if (/(Android)/i.test(navigator.userAgent)) {return true}
            else{return false}
        },
        isIOSView:function(){
            var standalone = window.navigator.standalone,
            userAgent = window.navigator.userAgent.toLowerCase(),
            safari = /Safari/.test( userAgent );
            if(!standalone && !safari){
                return true;
            }else{
            return false;
            }
        },
        isMobile:function(){
            var versions=this.versions();
            if(versions.mobile||versions.android||versions.ios){ return true }
            else{return false}
        },
        isPc:function(){
            var versions=this.versions();
            if(versions.mobile||versions.android||versions.ios){ return false }
            else{return true}
        }
    }


function connectWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge)
    } else {
        document.addEventListener(
            'WebViewJavascriptBridgeReady'
            , function() {
                callback(WebViewJavascriptBridge)
            },
            false
        );
    }
    //iOS使用
    if (window.WebViewJavascriptBridge) { 
      return callback(WebViewJavascriptBridge); 
    }
    if (window.WVJBCallbacks) { 
      return window.WVJBCallbacks.push(callback); 
    }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() { 
      document.documentElement.removeChild(WVJBIframe) 
    }, 0)
}

function transTime(text){
   return text?moment(text).format('YYYY-MM-DD HH:mm:ss'):text
}
function getDateDiff(dateTimeStamp){
     let result;
      var minute = 1000 * 60;
      var hour = minute * 60;
      var day = hour * 24;
      var halfamonth = day * 15;
      var month = day * 30;
      var year =month*12;
      var now = new Date().getTime();
      var diffValue = now - dateTimeStamp;
      if(diffValue < 0){return;}
      
      var yearC =diffValue/year;
      var monthC =diffValue/month;
      var weekC =diffValue/(7*day);
      var dayC =diffValue/day;
      var hourC =diffValue/hour;
      var minC =diffValue/minute;
     
      if(yearC>=1){
      	 result="" + parseInt(yearC) + "年前";
      }else if(monthC>=1){
        result="" + parseInt(monthC) + "月前";
      }
      else if(weekC>=1){
        result="" + parseInt(weekC) + "周前";
      }
      else if(dayC>=1){
        result=""+ parseInt(dayC) +"天前";
      }
      else if(hourC>=1){
        result=""+ parseInt(hourC) +"小时前";
      }
      else if(minC>=1){
        result=""+ parseInt(minC) +"分钟前";
      }else
      result="刚刚";
      return result;
    }
function getDateTimeStamp(dateStr){
      return Date.parse(dateStr.replace(/-/gi,"/"));
    }
function fromTime(time){
   let loctime=  Date.parse(new Date(time)) ;
   let lova2 =Date.parse(new Date("2018-01-05 16:46:52"))
   return getDateDiff(time)
 // console.log(moment("2018-01-05 16:46:52", 'YYYY-MM-DD HH:mm:ss'))
 // console.log(moment("2018-01-05 16:46:52", "YYYY-MM-DD HH:mm:ss"))
 // return moment([2018,1,8]).fromNow()
}
window.onload=function(){
	Vue.prototype.isMobile = C.isMobile();
	Vue.prototype.isAndroid = C.isAndroid();
	Vue.prototype.isIOS = C.isIOS();
}
