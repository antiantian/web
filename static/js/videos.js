/**
 * 
 * @authors zcy (1366969408@qq.com)
 * @date    2018-01-03 15:20:57
 * @version $Id$
 */
/*
Vue.prototype.isMobile = C.isMobile();
	Vue.prototype.isAndroid = C.isAndroid();
	Vue.prototype.isIOS = C.isIOS();
*/
var vm = new Vue({
	  el: '#app',

	  data(){
	 	return(
	        {  
	          videoapi:'videoapi',
	          isHideNews:true,
	          isMobile:C.isMobile(),
	          videoData:[],
	          commandData:[],
	          dataNotice:{}
	        }
	      )
	 },
     computed:{
        titlename:function(){
           return this.onjectDetail?this.onjectDetail.title:null
        },
     },
	  methods: {
	  	bannerSlide:function(){
	  		     var that=this;
	             this.$nextTick(function(){    
	                 $(function(){
	                    var swiper = new Swiper('#baberIndex', {
					        slidesPerView: 2,
					        spaceBetween: 15,
					        freeMode: true,
					        slidesPerView: 'auto',
					    });
					    $(".swiper-slide").css({width:'43%'})
					     
	                 })     
					          
						   
				 })	
          },
	  	setAppType:function(mess){
          this.messType=mess
	  	},
	    reverseMessage: function () {
	      this.message = this.message.split('').reverse().join('')
	    },
	    setContents:function(mess){
	    	var that=this;
	    	this.$nextTick(function(){    
              $(function(){
              	let  content = that.dataNotice.content.replace(/(style=")(.*?)(")/ig,"");
                    document.getElementById('chuangwei_content_inner').innerHTML= content
             
	          })
	       })    
	    },
	    renderDetails:function(obj,name){
	    	  this[name]=obj
	    	  if(name=='videoData'){
	    	  	this.bannerSlide()
	    	  }  
	    	  if(name=='dataNotice'){
	    	  	this.setContents()
	    	  }
	    },
        testClick1:function() {
                  var str1 = '1';
                  var str2 = '222';
                  var data = "name=" + str1 + ",pass=" + str2;
                  //call native method
                  window.WebViewJavascriptBridge.callHandler(
                      'submitFromWeb'
                      , {'param': data }
                      , function(responseData) {
                          document.getElementById("show").innerHTML = "send get responseData from java, data = " + responseData
                      }
                  );
        },
        testiOSClick2:function(){
            window.webkit.messageHandlers.openBigPicture.postMessage({methodName:"openBigPicture:",data:"tanwei"});
        },
        itemDetails:function(id,url){
        //	var data="videoId="+id+",videoUrl="+url
        	var data={
                     "videoId":id,
                     "videoUrl":url
        	        }
           if(this.isAndroid){
	            //call native method
	            window.WebViewJavascriptBridge.callHandler(
	                'relativeDetails'
	                , {
	                	  "videoId":id,
                          "videoUrl":url
	                  }
	                , function(responseData) {
	                    document.getElementById("show").innerHTML = "send get responseData from java, data = " + responseData
	                }
	            );
           }
           if(this.isIOS){
           	 window.webkit.messageHandlers.relativeDetails.postMessage({methodName:"relativeDetails:",data:data});
           }
        },
        moreCommands:function(params){
           if(this.isAndroid){
              //call native method
	            window.WebViewJavascriptBridge.callHandler(
	                'moreCommands'
	                , {'param': params }
	                , function(responseData) {
	                    document.getElementById("show").innerHTML = "send get responseData from java, data = " + responseData
	                }
	            );
           }
           if(this.isIOS){
           	 window.webkit.messageHandlers.moreCommands.postMessage({methodName:"moreCommands:",data:params});
           }
        },
        thumbsUp:function(params){
           if(this.isAndroid){
              //call native method
	            window.WebViewJavascriptBridge.callHandler(
	                'thumbsUp'
	                , {'param': params }
	                , function(responseData) {
	                    document.getElementById("show").innerHTML = "send get responseData from java, data = " + responseData
	                }
	            );
           }
           if(this.isIOS){
           	 window.webkit.messageHandlers.thumbsUp.postMessage({methodName:"thumbsUp:",data:params});
           }
        },
         thumbsUp_render_self:function(obj){
          const ids=obj.id;
          const zan=obj.zan;
          const cmdata=this.commandData;
          for(let i=0;i<cmdata.length;i++){
          	   if(cmdata[i].resourceId==ids){
                  if(zan==1){
                     cmdata[i].likes+=1;
			      }else{
                     cmdata[i].likes-=1;
			      }
                  break;
          	   }
          }
          
        }
	  },
      mounted(){
	      	 document.title = '页面标题'
	         var a= new wzw();
	        this.isMobile=a.isMobile();
	        this.isAndroid=a.isAndroid();
	        this.isIOS=a.isIOS();
	        if(this.isAndroid){
	        	//安卓方法
	         var that = this;
	            // 第一连接时初始化bridage
	              connectWebViewJavascriptBridge(function(bridge) {
	                  bridge.init(function(message, responseCallback) {
	                      var data = {
	                          'Javascript Responds': '测试中文!'
	                      };
	                      responseCallback(data);
	                  });
	                  // 注册一个"functionInJs",
	                  bridge.registerHandler("functionInJs", function(data, responseCallback) {
	                      that.setAppType(data)
	                      document.getElementById("show").innerHTML = ("data from Java: = " + data);
	                      var responseData = "Javascript Says  我要你的地址!";
	                      // response层
	                      responseCallback(responseData);
	                  });
	                  // 注册一个"renderVideo", 相关视频列表
	                  bridge.registerHandler("renderRelativeVideo", function(data, responseCallback) {
	                        var objects = JSON.parse(data);
			                that.renderDetails(objects.releaseRespList,'videoData')
			                that.renderDetails(objects.resourceResp,'dataNotice');
			                that.renderDetails(objects.commentsRespList,'commandData')
	                        var responseData = "Javascript Says  change innerhtml!";
	                        responseCallback(responseData);
	                  });
	                  //当前视频
	                  bridge.registerHandler("renderVideo", function(data, responseCallback) {
	                      //that.renderDetails({title:data,details:'近五场比赛，高尚在场上完全迷失了自己，其三分球更是7投1中，命中率仅为15%。曾经14轮首发的高尚，近来其首发'})
	                      that.renderDetails(data,'dataNotice') //videoData
	                      var responseData = "Javascript Says  change innerhtml!";
	                      responseCallback(responseData);
	                  });
	                  //评论
	                  bridge.registerHandler("renderCommand", function(data, responseCallback) {
	                      //that.renderDetails({title:data,details:'近五场比赛，高尚在场上完全迷失了自己，其三分球更是7投1中，命中率仅为15%。曾经14轮首发的高尚，近来其首发'})
	                      that.renderDetails(data,'commandData') //videoData
	                      var responseData = "Javascript Says  change innerhtml!";
	                      responseCallback(responseData);
	                  });
	                   //评论点赞
                     bridge.registerHandler("thumbsUp_render", function(data, responseCallback) {
                        //that.renderDetails({title:data,details:'近五场比赛，高尚在场上完全迷失了自己，其三分球更是7投1中，命中率仅为15%。曾经14轮首发的高尚，近来其首发'})
                        var objects = JSON.parse(data);
                        that.thumbsUp_render_self(objects) //videoData
                        var responseData = "Javascript Says  change innerhtml!";
                        responseCallback(responseData);
                     });
	              })
	        }
	        if(this.isIOS){
	           var that = this;
	               //iOS使用  开始
	            window.renderRelativeVideo=function(obj){
	            	// /commentsRespList   resourceResp   releaseRespList
	            	var objects =  obj;
	                that.renderDetails(objects.releaseRespList,'videoData')
	                that.renderDetails(objects.resourceResp,'dataNotice');
	                that.renderDetails(objects.commentsRespList,'commandData')
	            }
	             window.thumbsUp_render=function(obj){
                      that.thumbsUp_render_self(obj)
              }
	       }   
      },
	})
$(function(){
	var contents= {
	               "id": 3602,
	               title:'2018 年将重点抓这些大事',
	               additionalInformation:null,
	               createDate:'2017-12-20  16:30',
	               count:1324,
	               duration:'01:28',
	               src:'/static/images/video.png',
	               content:`<p>央经济工作会议12月18日至20日在北京举行。会议总结党的十八大以来我国经济发展历程，分析当前经济形势，并部署2018年经济工作。</p>`
	           };

	var dataCommand=[
	 {
       id:26,
       customerAccount:'13024182659',
       src:'http://img.taopic.com/uploads/allimg/110810/6451-110Q009245992.jpg',
       comment:'期待明晚的精彩直播！',
       "createTime":"2018-01-05 16:43:13",
       likes:0
     },{
       id:27,
       customerAccount:'13024182659',
       src:'http://img.taopic.com/uploads/allimg/110810/6451-110Q009245992.jpg',
       comment:'难得的闲暇时光，夕阳正好~',
       "createTime":"2018-01-05 16:44:55",
       likes:102
     },{
       id:28,
       customerAccount:'13024182659',
       src:null,
       comment:'难得的闲暇时光，夕阳正好~',
       "createTime":"2018-01-05 16:46:52",
       likes:102
     }
	];
	var videoData=[
	  {   
       id:'1',
       title:"保姆纵火案庭审中断背后：律师申请消防员出庭未果",
       createTime:"2018-01-05 16:43:13",
       likes:200,
       src:'http://img.taopic.com/uploads/allimg/110810/6451-110Q009245992.jpg'
  },{
       id:'2',
       title:"支付宝狂撒20亿微信大肆封杀用户，阿里腾讯都背负着怎样的焦虑？",
       createTime:"2018-01-05 08:44:55",
       likes:284,
       src:'http://img.taopic.com/uploads/allimg/110810/6451-110Q009245992.jpg'
  },{
       id:'3',
       title:"乌兹别克斯坦改革成效初显，今年中乌双边贸易将超额完成？",
       createTime:"2018-01-05 16:44:55",
       likes:284,
       src:'http://img.taopic.com/uploads/allimg/110810/6451-110Q009245992.jpg'
  }
	]
	// renderCommand(dataCommand)
 //    renderVideo(contents)
	// renderRelativeVideo(videoData)
})
