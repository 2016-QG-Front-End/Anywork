<template>
	<center>
		<div class="form" @keyup.enter="toLogin">
			<Mytip content="学号" :info="emailInfo">
				<Input class="input" type="text" v-model="email" placeholder="学号" icon="ios-email-outline"></Input>
			</Mytip>
			<Mytip content="密码" :info="passwordInfo">
				<Input class="input" type="password" v-model="password" placeholder="密码" icon="ios-locked-outline"></Input>
			</Mytip>
			<Row :gutter="10">
		        <Col span="12"><img :src="barcodeURL + '?' + refresh" class="barcode" @click="refreshBarcode"></Col>
		        <Col span="12">
		        	<Mytip content="验证码" :info="barcodeInfo">
		        		<Input class="input" type="text" v-model="barcode" placeholder="验证码"></Input>
		        	</Mytip>
		        </Col>
		    </Row>
			<Button class="login-bt" type="primary" long @click="toLogin" :loading="loadStatu">登陆</Button>
			<a href="#" class="forget-psw" @click="forgetPasswork">忘记密码</a>
			<a href="#" class="register" @click="toRegister">前往注册</a>
			<Checkbox class="competence" v-model="admin">
				<Icon type="ios-person-outline"></Icon>
            	<span>教师端</span>
			</Checkbox>
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
				email: '',
				password: '',
				loadStatu: false,
				barcode: '',
				admin: false,
				barcodeURL: IP + 'utils/valcode',
				refresh: new Date().valueOf(),

				emailInfo: '',
				passwordInfo: '',
				barcodeInfo: '',
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
			toLogin: function () {
				if(!this.check()) return

				if(!this.admin) {
					this.loadStatu = true
					this.login({
						studentId: this.email,
						password: this.password,
						valcode: this.barcode
					}).then(data => {
						if(data.state){
							this.onSuccess(data.info)
						}else{
							this.onError(data.info)
						}
					}).catch(err => {
						this.onError(err)
					})
				}else {
					this.loadStatu = true
					this.login({
						studentId: this.email,
						password: this.password,
						valcode: this.barcode
					}).then(data => {
						if(data.state && data.mark){
							this.onAdminSuccess(data.info)
						}else{
							if(!data.state){
								this.onError(data.info)
							}else if(!data.mark) {
								this.onError('您没有权限登陆教师端!')
							}
						}
					}).catch(err => {
						this.onError(err)
					})
				}

			},
			onSuccess (info) {
				this.$Message.success(info);
				window.location.href="./home.html"
			},
			onAdminSuccess (info) {
				this.$Message.success(info);
				window.location.href="./admin.html"
			},
			onError (err) {
				this.loadStatu = false
				this.$Message.error(err);
			},
			toRegister () {
				this.$emit('to-register', 1)
			},
			check () {
				if(this.email.trim()=="" || this.password.trim()=="" || this.barcode.trim()==""){
					this.$Message.error("请填写好所有的信息")
					return false
				}else{
					return true
				}
			},
			refreshBarcode() {
				this.refresh = new Date().valueOf()
			},
			forgetPasswork() {
				// if(this.email.trim()=="") {
				// 	this.$Message.error("请填写好邮箱");
				// 	return;
				// }
				// this.forgetPassword({
				// 	email: this.email
				// }).then(data => {
				// 	if(data.state){
				// 		this.$Message.success(data.info)
				// 	}else {
				// 		this.$Message.error(data.info)
				// 	}
				// }).catch(err => {
				// 	this.$Message.error(err)
				// })
				this.$emit('to-register', 0)
			}

		},
		watch: {
			barcode: function(val){
				if(val.length>0) this.barcodeInfo = ""
				else this.barcodeInfo = "请填写验证码";
			}
		}
	}
</script>

<style scoped>
.form {
    position: relative;
    top: 300px;

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

    color: #a0a0a0;
}
.register {
    color: #a0a0a0;
}
.competence {
    position: absolute;
    bottom: 30px;
    left: 32px;

    color: white;
}
.barcode {
    border: .1px solid #797979;
    width: 100%;
    height: 32px;

    cursor: pointer;
}

@media only screen and (max-width: 768px) {
    .form {
        top: 120px;
    }
}





</style>