(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/regist"],{2514:function(t,e,n){},3604:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n("2f62"),o=n("2b29");function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},a=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),a.forEach(function(e){s(t,e,n[e])})}return t}function s(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var r={components:{},data:function(){return{code_reg:"",yzm:"",key:"",code:"",sendAuthCode:!0,auth_time:0,thessid:"",senddata:{userName:"",code:"",passWord:"",rePassWord:"",invite:"",refer:"app",nickName:"",key:"",promotionCode:"",mobile:""},isExist:!1}},computed:i({},(0,a.mapState)(["hasLogin","userInfo"])),created:function(){this.key=Math.floor(1e5*Math.random())+1e5,this.senddata.key=this.key;var t=this.$request.getConfig()["baseUrl"];this.yzm=t+"apicom/index/getyzm?w=120&h=60&n=2&key="+this.key+"&apitype=1"},mounted:function(){},onShow:function(){},methods:{getAuthCode:function(){var e=this;if(this.code_reg){var n={mobile:this.senddata.user_name,key:this.key,ssid:this.thessid,code:this.code_reg};this.sendAuthCode=!1,this.$apiconfig.sendcode({data:n}).then(function(n){var a=n.data;if(1==a.code){t.showToast({icon:"none",title:a.msg}),e.auth_time=80;var o=setInterval(function(){e.auth_time--,e.auth_time<=0&&(e.sendAuthCode=!0,clearInterval(o))},1e3)}else{t.showToast({icon:"none",title:a.msg}),e.key=Math.floor(1e5*Math.random())+1e5;var i=e.$request.getConfig()["baseUrl"];e.yzm=i+"apicom/index/getyzm?w=120&h=60&n=2&key="+e.key+"&apitype=1"}})}else t.showToast({icon:"none",title:"请先输入图片中的验证码"})},url:function(){this.key=Math.floor(1e5*Math.random())+1e5,this.senddata.key=this.key;var t=this.$request.getConfig()["baseUrl"];this.yzm=t+"apicom/index/getyzm?w=120&h=60&n=2&key="+this.key+"&apitype=1"},gotologin:function(e){t.navigateTo({url:"/pages/index/login"})},save:function(e){this.isExist?t.showModal({showCancel:!1,title:"",content:"用户名已存在"}):(0,o.formValidate)(this.senddata.userName,"require")&&(0,o.formValidate)(this.senddata.passWord,"require")&&(0,o.formValidate)(this.senddata.rePassWord,"require")?!this.senddata.mobile||(0,o.formValidate)(this.senddata.mobile,"phone")?(0,o.formValidate)(this.senddata.passWord,"password")?this.senddata.passWord===this.senddata.rePassWord?this.$apiconfig.regist_f({data:this.senddata}).then(function(e){e.data.data.rows&&t.showToast({icon:"none",title:"成功"}),e.data.data.rows&&setTimeout(function(){t.reLaunch({url:"login"})},1500)}):t.showModal({showCancel:!1,title:"",content:"两次密码不一致"}):t.showModal({showCancel:!1,title:"",content:"请输入6位以上包含数字、字母的密码"}):t.showModal({showCancel:!1,title:"",content:"手机号格式不正确"}):t.showModal({showCancel:!1,title:"",content:"请将表格填写完整"})},findUserName:function(){var e=this;this.$apiconfig.findUserName_f({data:this.senddata}).then(function(n){n.data.data.rows&&(e.isExist=n.data.data.rows,t.showModal({showCancel:!1,title:"",content:"用户名已存在"}))})}}};e.default=r}).call(this,n("543d")["default"])},4050:function(t,e,n){"use strict";(function(t){n("55c5"),n("921b");a(n("66fd"));var e=a(n("a4fa"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"849c":function(t,e,n){"use strict";n.r(e);var a=n("3604"),o=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,function(){return a[t]})}(i);e["default"]=o.a},a011:function(t,e,n){"use strict";var a=n("2514"),o=n.n(a);o.a},a4fa:function(t,e,n){"use strict";n.r(e);var a=n("e742"),o=n("849c");for(var i in o)"default"!==i&&function(t){n.d(e,t,function(){return o[t]})}(i);n("a011");var s,r=n("f0c5"),d=Object(r["a"])(o["default"],a["b"],a["c"],!1,null,"0fd7c35d",null,!1,a["a"],s);e["default"]=d.exports},e742:function(t,e,n){"use strict";var a,o=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"b",function(){return o}),n.d(e,"c",function(){return i}),n.d(e,"a",function(){return a})}},[["4050","common/runtime","common/vendor"]]]);