<template>
	<view class="content">
		<section>
			<view class="modifybank-text " style="line-height: 70upx; width: 100%;">
				<view><span>昵称</span></view>
				<view class="">
					<input style="width: 100%" placeholder="请输入昵称" v-model="senddata.nickName" type="text"/>
				</view>
			</view>
			<view class="modifybank-text " style="line-height: 70upx; width: 100%;">
				<view><span>用户名</span></view>
				<view class="">
					<input placeholder="请输入用户名" v-model="senddata.userName" type="text" @blur="findUserName"/>
				</view>
			</view>
			<view class="modifybank-text">
				<view><span>密码</span></view>
				<view class="" style="flex-grow: 1;">
					<input type="password" style="width: 100%;" v-model="senddata.passWord" placeholder="请输入6位以上包含数字、字母的密码"/>
				</view>
			</view>
			<view class="modifybank-text">
				<view><span>确认密码</span></view>
				<view class="">
					<input type="password" style="width: 100%; " v-model="senddata.rePassWord" placeholder="请确认你的密码"/>
				</view>
			</view>
			<view class="modifybank-text">
			    <view><span>+86</span></view>
			    <view class="">
				  <input  style="width: 100%; " type="number" maxlength="11" v-model="senddata.mobile" placeholder="请输入手机号"/>
				</view>
			</view>
			<view class="modifybank-text">
			    <view><span>邀请码</span></view>
			    <view class="">
				  <input  style="width: 100%; " type="number" maxlength="11" v-model="senddata.promotionCode" placeholder="请输入邀请码"/>
				</view>
			</view>
			<button type="warn" class="round" style="margin-bottom: 0upx;" @tap="save">立即注册</button>
			<button type="default" class="round" style="margin-top: 10upx;" @tap="gotologin">已有账号</button>
		</section>
	</view>
</template>

<script>
	import {
	    mapState 
	} from 'vuex';  
import {formValidate} from "../util/util.js"

export default {
	components:{
	
	},
	data() {
		return {
			code_reg:'',
			yzm:'',
			key:'',
			code:'',
			sendAuthCode:true,
			auth_time:0,
			thessid:'',
			senddata:{
				userName: '',
				code: '',    ///图片验证码
				passWord: '',
				rePassWord: '',
				invite:'',
				refer:'app',
				nickName:'',
				key:'',
				promotionCode: '',
				mobile:'',
			},
			isExist: false,
		}
	},
	computed: {
		...mapState(['hasLogin','userInfo'])
	},
	created() {
		this.key = Math.floor(Math.random()*100000)+100000;
		this.senddata.key= this.key ;
		// this.yzm = 'http://www.8000026.com/apicom/index/getyzm?w=120&h=60&n=2&key='+ this.key;
		let webroot=(this.$request.getConfig()["baseUrl"]);	
		this.yzm = webroot+'apicom/index/getyzm?w=120&h=60&n=2&key='+ this.key+'&apitype=1';
	},
        mounted() {
            // console.log(this.$route.query.id)
		},
		onShow() {
		  
		},
        methods: {
			getAuthCode:function () {
				   if(!this.code_reg){
						uni.showToast({
							icon:"none",
							title:"请先输入图片中的验证码"
						})
			            return
			        }
			        let params = {
			            mobile: this.senddata.user_name,
			            key:this.key,
						ssid:this.thessid,
			            code:this.code_reg
			        }
				    this.sendAuthCode = false;
					this.$apiconfig.sendcode({data:params}).then(res2=>{
				        let res=res2.data;
						if(res.code == 1){
							uni.showToast({
								icon:"none",
								title:res.msg
							})
						    this.auth_time = 80;
						    var auth_timetimer =  setInterval(()=>{
						    this.auth_time--;
						    if(this.auth_time<=0){
						        this.sendAuthCode = true;
						        clearInterval(auth_timetimer);
						        }
						    }, 1000);
						}else{
							uni.showToast({
								icon:"none",
								title:res.msg
							})
							 this.key = Math.floor(Math.random()*100000)+100000
							 let webroot=(this.$request.getConfig()["baseUrl"]);	
						    // this.yzm = 'http://www.8000026.com/apicom/index/getyzm?w=120&h=60&n=2&key='+ this.key;
						    this.yzm = webroot+'apicom/index/getyzm?w=120&h=60&n=2&key='+ this.key+'&apitype=1';
						}
					})
			},
             url(){
                 this.key = Math.floor(Math.random()*100000)+100000;
				  this.senddata.key= this.key;
                 // this.yzm = 'http://www.8000026.com/apicom/index/getyzm?w=120&h=60&n=2&key='+ this.key;
             	 let webroot=(this.$request.getConfig()["baseUrl"]);	
                  this.yzm = webroot +'apicom/index/getyzm?w=120&h=60&n=2&key='+ this.key+'&apitype=1';
                 // console.log(this.key)
             },
			 gotologin(e){
				 uni.navigateTo({
				 	url:"/pages/index/login"
				 })
			 },
			save(e){
				if(this.isExist){
					uni.showModal({
						showCancel:false,
						title:"",
						content:"用户名已存在",
					})
					return
				}
				if(!formValidate(this.senddata.nickName,'require') || !formValidate(this.senddata.userName,'require') || !formValidate(this.senddata.passWord,'require')
					|| !formValidate(this.senddata.rePassWord,'require')){
					uni.showModal({
						showCancel:false,
						title:"",
						content:"请将表格填写完整",
					})
					return
				}
				if(this.senddata.mobile && !formValidate(this.senddata.mobile,'phone')){
					uni.showModal({
						showCancel:false,
						title:"",
						content:"手机号格式不正确",
					})
					return
				}
				if(!formValidate(this.senddata.passWord,'password')){
					uni.showModal({
						showCancel:false,
						title:"",
						content:"请输入6位以上包含数字、字母的密码",
					})
					return
				}
				if(this.senddata.passWord !== this.senddata.rePassWord){
					uni.showModal({
						showCancel:false,
						title:"",
						content:"两次密码不一致",
					})
					return
				}          
				this.$apiconfig.regist_f({data:this.senddata}).then(res=>{
					if(res.data.data.rows){
						uni.showToast({
							icon:"none",
							title:"成功",
						})
					}
					if(res.data.data.rows){
						setTimeout(function(){
							/*uni.navigateBack({
								delta:1
							})*/
							uni.reLaunch({
								url:"login"
							})
						},1500)
					}
				});
			},
			findUserName(){
				this.$apiconfig.findUserName_f({data:this.senddata}).then(res=>{
					if(res.data.data.rows){
						this.isExist = res.data.data.rows
						uni.showModal({
							showCancel:false,
							title:"",
							content:"用户名已存在",
						})
					}
				});
			},
        }
}
</script>

 <style scoped lang="less">
	
  .router-view{
          background:#F1F1F1; 
       }
   section{
       .modifybank-text{
           background:#fff;
           position:relative;
           display:flex;
           justify-content:flex-start;
           width: 100%;
      
       
           padding:26upx 20upx;
           border-bottom: 1upx solid #dcdcdc;
             i{
               color:#999;
               position:absolute;
               left:92%;
               top:15upx;
               font-size:40upx;
             }
             select{
                 width: 65%;
                 height: 100%;
                 margin-right: 20upx;
                 line-height: 60upx;
                 color: #222;
                 font-size: 28upx;
                 border:none;
                 color:black;
                 background:#fff;
                 // appearance:none;
                 // -moz-appearance:none;
                 // -webkit-appearance:none;
                 // -ms-appearance:none;
             }
     
             input{
                 width: 65%;
                 height: 100%;
                 margin-right: 20upx;
                 line-height: 60upx;
                 color: #222;
                 font-size:28upx;
                 background:#fff;
                 overflow: hidden;
                 text-overflow:ellipsis;
                 white-space: nowrap;
                 background:none;
             }
           
       }
       button{
               width:90%;
               margin:40upx auto;
             
       }
	   button:after{
	      border: none;
	   }
       .item-lable{
           line-height:80upx;
           padding-left: 30upx;
           padding-right: 30upx;
           color: #999;
           font-size: 28upx;
       }
   .item_bock {
     display: flex;
     align-items: center;
     justify-content: space-between;
     height:94upx;
     width: 300upx;
     padding:0upx 24upx 0upx 38upx;
     border-bottom: 1upx solid #f7f7f7;
     background: #fff;
   }  
		
       .modifybank-text>view:nth-child(1){
       			width: 150upx;
				font-size: 26upx;
       		}
   }
     
		
</style>