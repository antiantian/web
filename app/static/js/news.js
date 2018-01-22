/**
 * 
 * @authors zcy (1366969408@qq.com)
 * @date    2018-01-03 15:20:41
 * @version $Id$
 */

var vm = new Vue({
	  el: '#app',

	 data(){
	 	 return(
	        {  
	          isHideNews:true,
	          relativeData:[],
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
	  	setContents:function(){
	  		 var that=this
             this.$nextTick(function() {
             	    let  content = that.dataNotice.content.replace(/(style=")(.*?)(")/ig,"");
                    document.getElementById('chuangwei_content_inner').innerHTML= content
             })
          },
	  	setAppType:function(mess){
          this.messType=mess

	  	},
	    reverseMessage: function () {
	      this.message = this.message.split('').reverse().join('')
	    },
	    renderDetails:function(obj,name){
              this[name]=obj
	    	  if(name=='dataNotice'){
	    	  	this.setContents()
	    	  } 
	    },
        itemDetails:function(params){
           if(this.isAndroid){
	            //call native method
	            window.WebViewJavascriptBridge.callHandler(
	                'relativeDetails'
	                , {'param': params }
	                , function(responseData) {
	                    document.getElementById("show").innerHTML = "send get responseData from java, data = " + responseData
	                }
	            );
           }
           if(this.isIOS){
           	 window.webkit.messageHandlers.relativeDetails.postMessage({methodName:"relativeDetails:",data:params});
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
      	   //  document.title = '页面标题'
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
	                  bridge.registerHandler("renderRelativeNews", function(data, responseCallback) {
	                      //that.renderDetails({title:data,details:'近五场比赛，高尚在场上完全迷失了自己，其三分球更是7投1中，命中率仅为15%。曾经14轮首发的高尚，近来其首发'})
	                      //  that.renderDetails(data,'relativeData') //videoData
	                        var objects = JSON.parse(data);
			                that.renderDetails(objects.releaseRespList,'relativeData')
			                that.renderDetails(objects.resourceResp,'dataNotice');
			                that.renderDetails(objects.commentsRespList,'commandData')
	                       var responseData = "Javascript Says  change innerhtml!";
	                       responseCallback(responseData);
	                  });
	                  //点赞
	                  bridge.registerHandler("thumbsUp_h5", function(data, responseCallback) {
	                      //that.renderDetails({title:data,details:'近五场比赛，高尚在场上完全迷失了自己，其三分球更是7投1中，命中率仅为15%。曾经14轮首发的高尚，近来其首发'})
	                      var objects = JSON.parse(data);
	                      that.thumbsUp_render_self(objects) //videoData
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
	            window.renderRelativeNews=function(obj){
	            	// /commentsRespList   resourceResp   releaseRespList
	            	var objects =  obj;
	                that.renderDetails(objects.releaseRespList,'relativeData')
	                that.renderDetails(objects.resourceResp,'dataNotice');
	                that.renderDetails(objects.commentsRespList,'commandData')
	            };
	            window.thumbsUp_h5=function(obj){
	            	that.thumbsUp_render_self(obj) //videoData
	            }

	            window.renderCommand=function(data){
	            	// /commentsRespList   resourceResp   releaseRespList
	            	that.renderDetails(data,'commandData') //videoData
	            };
	            window.renderNews=function(data){
	            	 
	            	// /commentsRespList   resourceResp   releaseRespList
	            	that.renderDetails(data,'dataNotice') //videoData
	            };
	             window.thumbsUp_render=function(obj){
                      that.thumbsUp_render_self(obj)
                }
	       }   
      },
	})

$(function(){
		      var relativeData=[{   
                   id:'1',
                   title:"保姆纵火案庭审中断背后：律师申请消防员出庭未果",
                   createTime:"13024182659",
                   likes:200,
                   src:'http://img.taopic.com/uploads/allimg/110810/6451-110Q009245992.jpg'
		          },{
                   id:'2',
                   title:"支付宝狂撒20亿微信大肆封杀用户，阿里腾讯都背负着怎样的焦虑？",
                   createTime:"13024182659",
                   likes:284,
                   src:'http://img.taopic.com/uploads/allimg/110810/6451-110Q009245992.jpg'
		          },{
                   id:'3',
                   title:"乌兹别克斯坦改革成效初显，今年中乌双边贸易将超额完成？",
                   createTime:"13024182659",
                   likes:284,
                   src:'http://img.taopic.com/uploads/allimg/110810/6451-110Q009245992.jpg'
		          }] 
		     var dataNotice={
	               "id": 3602,
	               title:'蔡英文最低工资梦想遭嘲讽：搪塞之词，丢脸！1111111',
	               additionalInformation:null,
	               createDate:1515396969000,
		           content:`<img class="doc-image doc-image-small" src="http://i1.go2yd.com/image.php?type=thumbnail_336x216&amp;url=http://si1.go2yd.com/get-image/0JVP5uprtVQ"/><p>【环球时报驻台北特约记者 李名】台湾地区领导人蔡英文日前跟财经媒体记者茶叙时感慨台湾为什么留不住人才与资金。她认为起薪低是人才外流的重要因素,因此必须要慢慢拉高劳工最低薪资,并称“3万元(新台币,下同)是我的梦想”。此话一出,立即在岛内引发反弹。</p>
			<p>2017年接近尾声,台湾“劳动部”26日提醒,明年度基本工资为2.2万元、时薪140元。蔡英文进一步称,明年是景气好转的一年,当局要加速建设台湾,让年轻人有更多就业机会,不再低薪。据台湾联合新闻网26日报道,各部门目前都在构思如何达成目标。“劳动部政务次长”苏丽琼透露还在收集各方意见,时间表不确定。至于基本工资有无可能调到3万元,“经济部次长”王美花称,企业如果愿意主动响应当然最好,所以蔡英文才提到这是她的梦想。</p>
			<p>《中国时报》26日称,根据各国际机构陆续发布的2018年经济增长率预估数值,台湾在亚洲开发地区都是敬陪末座;昔日同为“亚洲四小龙”的新加坡、韩国和香港,甚至后进的“五小虎”泰国、越南、菲律宾、马来西亚和印尼不用说了,“如今台湾的经济成长率其实已到了连哈萨克斯坦都不如的局面”。据悉,去年参选“总统”的新北市长朱立伦当时提出基本工资调高到3万元的政见,结果被蔡英文嘲笑说“如果这样,就可以得诺贝尔奖”。</p>
			<p>民进党辩解称,执政以来调涨基本工资近2000元,超过国民党执政8年的调升幅度。国民党发言人洪孟楷反击说,马英九执政时期共5次调整基本薪资,从17280元一直调整到20008元,增加金额为2728元。反观蔡英文执政后,到明年才是2.2万元,增加1992元,“所以马政府时期的2728是大于还是小于蔡政府的1992元,民进党的立委为了护航,难道连基本算术都不会了?”前国民党“立委”孙大千在脸书直言,什么叫梦想?其实就是委婉地告诉你,做不到,“没有办法给大家一个明确的方向和承诺,只能用梦想来搪塞,真的很丢脸!”</p>
			<p>与经济一样难看的,是蔡英文的支持率。美丽岛电子报25日公布的最新民调显示,蔡英文的信任度已降至执政19个月以来的新低,只剩32%;施政满意度因受惠于“赖清德效应”一度止跌回升,但近来上涨的全部都吐了回去,不满意度重新回到六成以上。民调还显示,过去蔡英文总自认最受年轻人和高学历者欢迎,但如今这群人已变成最不满意她的一群人,其中20岁至29岁满意蔡英文表现的比例仅剩21.8%。</p>
			<p>《中国时报》26日的一篇文章称,面对如此难看的经济展望,人民想知道的是蔡英文的解方。可惜的是,她谈的却是一厢情愿的梦想。文章说,执政19个月后,蔡英文面对媒体竟好意思说,她一直在思考如何让资金和人才都能留在台湾,“不知道蔡英文还要思考多久?岁月不待人,人才和资金也是”。台湾中央日报网络报称,蔡英文在民调低迷之时,看不到有任何反省或改变,不但继续追杀国民党,而且僵化两岸对峙,结果是原来的支持者不爽,原来的反对者更坚定,“这个现象的确让人很纳闷,为什么会有这样的政治人物?”</p>`
	          };
		     var commandData=[{
                   resourceId:26,
                   customerAccount:'13024182659',
                   src:'http://img.taopic.com/uploads/allimg/110810/6451-110Q009245992.jpg',
                   comment:'期待明晚的精彩直播！',
                   createTime:1515396969000,
                   likes:0
                 },{
                   resourceId:27,
                   customerAccount:'13024182659',
                   src:'http://img.taopic.com/uploads/allimg/110810/6451-110Q009245992.jpg',
                   comment:'难得的闲暇时光，夕阳正好~',
                   createTime:13024182659,
                   likes:102
                 },{
                   resourceId:28,
                   customerAccount:'13024182659',
                   src:null,
                   comment:'难得的闲暇时光，夕阳正好~',
                   createTime:1515396969000,
                   likes:102
                 }];    
          // renderCommand(commandData)
         //  renderNews(dataNotice)

           
	       // renderRelativeNews(relativeData)      
	          
})