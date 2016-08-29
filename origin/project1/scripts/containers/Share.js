/*
 *author:jiajiechen
 *time：2015/12/25
 *description：航班动态详情页的”分享和关注“功能
 */
import {PropTypes, Component} from 'react';
import {connect} from 'react-redux';

const Share= React.createClass({
	getInitialState:function(){},
	componentDidMount:function(){},
	componentWillMount:function(){},
	render:function(){
		var data={};
		var _this=this;
		return (
			<div className="fboard-action">
                <div className="fboard-share fboard-action-item"  onClick={_this.share}>
                    <i className="iconfont"></i>
                    <div>分享</div>
                </div>
                <div className="fboard-watch fboard-action-item"  onClick={_this.focus}>
                    <i className="iconfont"></i>
                    <div>关注</div>
                </div>
                <div className="fboard-watch fboard-watch-cancel fboard-action-item" style={{display:"none"}} onClick={_this.unfocus}>
                    <i className="iconfont"></i>
                    <div>取消关注</div>
                </div>
            </div>
		)
	},
	share:function(){
		if(window.isHybrid){
			var smsg={};//需要后续添加
			var imageUrl=location.origin+"schedule/images/"+this.getType()+".png";//正常，延误，起飞，取消，备降，返航，到达
			var title=smsg.title;
			var text=smsg.ctent;
			var linkUrl=smsg.url;
			// var businessCode=;//用于统计的业务类型码
			CtripShare.wrap_call_default_share(imageUrl,title,text,linkUrl);
		}
		else{
			alert("你好，暂时不支持分享");
		}
	},

	//状体和图片名称相对应
	getType:function(txt){
		var txt=txt.replace(/\s/g,"");
		var rst="";
		switch (txt){
			case "正常":
				rst="share-zc";
				break;
			case "延误":
				rst="share-yw";
				break;
			case "起飞":
				rst="share-qf";
				break;
			case "取消":
				rst="share-qx";
				break;
			case "备降":
				rst="share-bj";
				break;
			case "返航":
				rst="share-fh";
				break;
			case "到达":
				rst="share-dd";
				break;
			case "失联":
				rst="share-sl";
				break;
			case "可能返航":
				rst="share-knfh";
				break;
			case "可能备降":
				rst="share-knbj";
				break;
			default:
				rst="zc";
				break;
		}
		return rst;
	},

	focus:function(){

	},
	unfocus:function(){

	},
	getParam:function(type){
		var detialInfo={"var":{}};
		return {
			"ver":1,
			"token":"",
			"attList":[{
				"fno":detialInfo.var.flightNo,//航班号
				"dpCode":detialInfo.var.dPort,//出发机场三字码
				"apCode":detialInfo.var.aPort,//到达机场三字码
				"dDate":detialInfo.var.pdDate,//所选某天次航班的起飞日期 YYMMDD
				"toTime":detialInfo.var.pdDate,//航班起飞时间
				"aptime":"",//航班计划达到时间
				"titId":"",//瓷贴ID,仅用于WP系统
				"oType":type//操作类型;1:添加;2:删除
			}]
		}
	}
});



// var options = {
//     // title: '携程航班列表',
//     // desc: date.format('M月d日 星期e ') + cities.join(' - ') + ' 航班列表',
//     title: title,
//     desc: date.format('M月d日 星期e ') + cities.join(' - ') + (param.trip == 2 ? ' 往返程' : '') + ' ' + title,
//     href: window.location.origin + '/html5/flight/matrix-list-intl.html?dcity=' + param.dcity + '&acity=' + param.acity + '&trip=' + param.trip + '&ddate1=' + param.ddate1 + '&ddate2=' + param.ddate2 + '&seo=0',
//     icon: window.location.origin + '/html5/flight/assets/html5/img/logo-100x100.png'
// };

// cShell.share(options) .done(function () {}) .fail(function (err) {});