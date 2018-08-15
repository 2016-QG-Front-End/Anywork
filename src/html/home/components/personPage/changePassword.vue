<template>
	<section>
		<div class="header">
			<h2>修改密码</h2>
			<Button class="save-info" type="success" @click="changePassword">保存</Button>
		</div>
		<div class="info">
		 	<div>
		 		<span class="text">旧密码</span>
				<Input class="input" type="password" v-model="oldPassword"></Input> 
		 	</div>
			<div>
		 		<span class="text">新密码</span>
				<Input class="input" type="password" v-model="newPassword"></Input> 
		 	</div>
		</div>
	</section>
</template>

<script>
	import { mapActions} from 'vuex';
	import user from  '../../store/types/user'
	export default {
		data () {
			return {
				newPassword: '',
				oldPassword: ''
			}
		},
		methods: {
			...mapActions(user.actions),

			changePassword () {
				if (!this.newPassword.length || !this.oldPassword.length) {
					this.$Message.error('请填写完整的信息进行修改密码')
					return 
				}
				this.updatePassword({
					newPassword: this.newPassword,
					oldPassword: this.oldPassword
				}).then((data) => {
					if(data.state){
						this.$Message.success(data.info)
						window.location = '../../../html/login.html'		
					}else{
						this.$Message.error(data.info + ",请稍后重试！")
					}
					this.newPassword = ""
				}).catch((err) => {
					this.$Message.error(err)
				})
			}
		}
	}
</script>

<style scoped>
	.header {
		position: relative;
		padding: 10px 20px 5px;
		margin-bottom: 20px;
		border-bottom: 1px solid #b4b4b4;
	}
	.save-info {
		position: absolute;
		right: 25px;
		top: 5px;
	}
	.info {
		padding-left: 40px;
		padding-bottom: 30px;
	}
	.info div {
		margin-top: 10px;
	}
	.text {
		display: inline-block;
		width: 80px;
		padding-right: 10px;
		text-align: right;
		font-size: 16px;
	}
	.input {
		width: 200px;
		vertical-align: initial;
	}

	@media only screen and (max-width: 992px) {
		.text {
			width: 9rem;
			font-size: 2rem;
		}
		.input {
			width: 50%;
		}
	}
</style>