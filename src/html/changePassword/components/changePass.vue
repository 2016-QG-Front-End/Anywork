<template>
	<center>
		<div class="form" @keyup.enter="toLogin">
			<Mytip content="旧密码" :info="newPasswordInfo">
				<Input class="input" type="text" v-model="oldPassword" placeholder="旧密码" icon="ios-email-outline"></Input>
			</Mytip>
			<Mytip content="新密码" :info="oldPasswordInfo">
				<Input class="input" type="text" v-model="newPassword" placeholder="新密码" icon="ios-email-outline"></Input>
			</Mytip>
			<Button class="login-bt" type="primary" long @click="confirm" :loading="loadStatu">提交</Button>
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
				newPassword: '',
				oldPassword: '',

				newPasswordInfo: '',
				oldPasswordInfo: '',
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
            confirm: function () {
                let that = this
                this.updatePassword({
					oldPassword: this.oldPassword,
					newPassword: this.newPassword
                }).then(data => {
                    that.$Notice.success({
                        title: '修改成功',
                        desc: data.info ? data.info : ''
                    })
                }).catch(err=>{
                    this.$Notice.error({
                        title: '修改失败，可能是旧密码错误',
                    });
                })
            }
		},
		watch: {
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