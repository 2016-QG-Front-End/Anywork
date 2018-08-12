<template>
	<center class="contain">
		<img class="logo" src="../../assets/images/logo.png">
		<div class="form" @keyup.enter="toLogin">
			<Mytip content="密码" :info="emailInfo">
				<Input class="input" type="text" v-model="email" placeholder="密码" icon="ios-email-outline"></Input>
			</Mytip>
			<Mytip content="确认密码" :info="passwordInfo">
				<Input class="input" type="password" v-model="password" placeholder="密码" icon="ios-locked-outline"></Input>
			</Mytip>
			<Button class="login-bt" type="primary" long @click="comfirm" :loading="loadStatu">确定</Button>
		</div>
	</center>
</template>

<script>
	import { mapState, mapActions } from 'vuex'  
	import user from './store/types/user'
	import { IP } from 'src/utils/interaction'

	import Mytip from './components/Mytip.vue'
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
			comfirm: function () {
				if (this.email !== this.password) {
					this.$Message.warning('密码不比配');
				}
				let that = this
				this.newPassword({

				}).then(data => {
					that.$Notice.success({
						title: '修改成功',
					});
				}).catch(err => {
                	that.$Notice.error({
						title: '修改失败',
					});
				})
			}
		},
		watch: {
			password: function (val) {
				if (this.email !== val) {
					this.passwordInfo = '与密码不匹配'
				} else {
					this.passwordInfo = ''
				}
			}
		}
	}
</script>

<style scoped>
.contain {
    height: 100%;

    background-color: #272727;
}
.logo {
    position: absolute;
    top: 20px;
    left: 20px;
}
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

#app {
    padding: .1px;
    height: 100%;

    background-color: #272727;
}
.logo {
    position: absolute;
    top: 20px;
    left: 20px;
}

@media only screen and (max-width: 768px) {
    .logo {
        width: 80px;
    }
}















</style>