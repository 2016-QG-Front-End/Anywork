<template>
	<center>
		<div class="form" @keyup.enter="toRegister">
			<Mytip content="学号" :info="nameInfo">
			    <Input class="input" type="text" v-model="userName" placeholder="学号" icon="ios-person-outline"></Input>
            </Mytip>

            <Mytip content="邮箱" :info="emailInfo">
				<Input class="input" type="text" v-model="email" placeholder="邮箱" icon="ios-email-outline"></Input>
            </Mytip>

			<Mytip content="手机号码" :info="phoneInfo">
				<Input class="input" type="text" v-model="phone" placeholder="手机号码" icon="iphone"></Input>
            </Mytip>
			
			<Mytip content="密码" :info="passwordInfo">	
				<Input class="input" type="password" v-model="password" placeholder="密码" icon="ios-locked-outline"></Input>
            </Mytip>
			
			<Mytip content="确认密码" :info="rePasswordInfo">
				<Input class="input" type="password" v-model="rePassword" placeholder="确认密码" icon="ios-unlocked-outline"></Input>
            </Mytip>
          	<Row :gutter="10">
  		        <Col span="12"><img :src="barcodeURL + '?' + refresh" class="barcode" @click="refreshBarcode"></Col>
  		        <Col span="12">
  		        	<Mytip content="验证码" :info="barcodeInfo">
  		        		<Input class="input" type="text" v-model="barcode"></Input>
  		        	</Mytip>
  		        </Col>
          	</Row> 

			<Button class="login-bt" type="primary" long @click="toRegister" :loading="loadStatu">注册</Button>
			<a href="#" class="a-login" @click="toLogin">前往登录</a>
			<!-- <Checkbox class="competence" v-model="mark">
				<Icon type="ios-person-outline"></Icon>
            	<span>注册教师</span>
			</Checkbox> -->
		</div>
	</center>
</template>

<script>
	import { mapState, mapActions } from 'vuex'  
	import user from '../store/types/user'
	import { IP } from 'src/utils/interaction'
	
	import Mytip from './Mytip.vue'

	export default {
		data () {
			return {
				userName: '',
				email: '',
				phone: '',
				password: '',
				rePassword: '',
				loadStatu: false,
				barcode: '',
				mark: false,
				barcodeURL: IP + 'utils/valcode',
				refresh: new Date().valueOf(),

				nameInfo: '',
				emailInfo: '',
				phoneInfo: '',
				passwordInfo: '',
				rePasswordInfo: '',
				barcodeInfo : '',
			}
		},
		components: {
			Mytip
		},
		computed: {
		    ...mapState({
		    	'user': state => {
		    		return state.user
		    	}
		    }),
		},
		methods: {
			...mapActions(user.actions),
			toRegister: function () {
				if(!this.check()) return
				this.loadStatu = true
				this.register({
					studentId: this.userName,
					email: this.email,
					phone: this.phone,
					password: this.password,
					valcode: this.barcode,
					mark: Number(this.mark)
				}).then(data => {
					if(data.state){
						this.onSuccess(data.info)
						this.toLogin()
					}else{
						this.onError(data.info)
					}
				}).catch(err => {
					this.onError(err)
				})
			},
			onSuccess (info) {
				this.$Message.success(info);
			},
			onError (err) {
				this.loadStatu = false
				this.$Message.error(err);
			},
			toLogin () {
				this.$emit('to-login')
			},
			check () {
				if(this.userName.trim()=="" || this.email.trim()=="" || this.phone.trim()=="" || this.password.trim()=="" || this.barcode.trim()=="" || this.password.trim() !== this.rePassword.trim()){
					this.$Message.error("请填写好所有的信息")
					return false
				}else{
					return true
				}
			},
			refreshBarcode() {
				this.refresh = new Date().valueOf()
			}
		},
		watch: {
			userName: function(val) {
				if(val.trim()===""){
					this.nameInfo = "请输入用户名"
				}else{
					this.nameInfo = ""
				}
			},
			email: function(val){
				var regEmail =  /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/; 
				if(val===''){
					this.emailInfo = "请输入邮箱";
				}else if(!regEmail.test(val)){
					this.emailInfo = "邮箱格式不对";
				}else {
					this.emailInfo = ""
				}
			},
			password: function(val){
				if(val===''){
					this.passwordInfo ="请输入密码";
				}
			},
			rePassword: function(val){
				if(val===''){
					this.rePasswordInfo = "请确定密码"
				}else if(this.rePassword!==this.password){
					this.rePasswordInfo = "确认密码不匹配"
				}else {
					this.rePasswordInfo = ""
				}
			},
			barcode: function(val){
				if(val.length>0) this.barcodeInfo = ""
				else this.barcodeInfo = "请填写验证码";
			}
		},
	}
</script>

<style scoped>
.form {
    position: relative;
    top: 250px;

    box-sizing: border-box;
    border-radius: 10px;
    padding: 30px;
    width: 25%;
    min-width: 350px;

    background-color: #585858;

    box-shadow: 0 0 8px 2px #585858;
}
.input,
.login-bt {
    margin: 0 0 20px 0;
}
.forget-psw {
    margin-right: 10px;
    border-right: 1px solid white;
    padding-right: 10px;
}
.barcode {
    width: 100%;
    height: 32px;
}
.competence {
    position: absolute;
    bottom: 30px;
    left: 32px;

    color: white;
}
.a-login {
    color: #a0a0a0;
}
@media only screen and (max-width: 768px) {
    .form {
        top: 120px;
    }
}



</style>
