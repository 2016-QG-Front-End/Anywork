<template>
	<center>
		<div class="form" @keyup.enter="toLogin">
			<Mytip content="邮箱" :info="emailInfo">
				<Input class="input" type="text" v-model="email" placeholder="邮箱" icon="ios-email-outline"></Input>
			</Mytip>
			<Button class="login-bt" type="primary" long @click="confirm" :loading="loadStatu">提交</Button>
			<a href="#" class="register" @click="toRegister">前往登录</a>
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
            toRegister: function () {
                this.$emit('to-password')
            },
            confirm: function () {
                let that = this
                this.forgetPassword({
                    email: this.email
                }).then(data => {
                    that.$Notice.success({
                        title: '发送成功',
                        desc: data.info ? data.info : ''
                    })
                    that.$emit('to-password')
                }).catch(err=>{
                    this.$Notice.error({
                        title: '提交失败，可能是邮箱错误',
                    });
                })
            }
		},
		watch: {
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