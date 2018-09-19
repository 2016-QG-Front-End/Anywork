<template>
	<section>
		<!-- <div class="header"> -->
			<h2 class="head">修改密码</h2>
			<!-- <Button class="save-info" type="success" @click="changePassword">保存</Button> -->
		<!-- </div> -->
		<div class="info">
		 	<div  class="commom-info-input">
		 		<span class="text">原始密码</span>
				<Input class="input" type="password" v-model="oldPassword" placeholder="请输入你的原始密码"></Input> 
		 	</div>
			<div  class="commom-info-input">
		 		<span class="text">重置密码</span>
				<Input class="input" type="password" v-model="newPassword" placeholder="请输入你的新密码"></Input> 
		 	</div>
			 <div  class="commom-info-input">
		 		<span class="text">再次输入密码</span>
				<Input class="input" type="password" v-model="newPassword" placeholder="请输入你的新密码"></Input> 
		 	</div>
			 <div class="commom-info-button">
				 <Button class="save-info" type="success" @click="changePassword">保存</Button>
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
	.commom-info-input {
		border-bottom: 1px solid #548CFE;
		width: 368px;
		position: relative;
		margin-top: 20px;
		display: flex;
    	align-items: center;
		    margin-top: 36px;
	}
	.commom-info-button {
		width: 300px;
		position: relative;
	}
	.head {
		padding: 0 30px;
    font-size: 2.8em;
	color:#548CFE;
	}
	.header {
		position: relative;
		padding: 10px 20px 5px;
		margin-bottom: 20px;
		border-bottom: 1px solid #b4b4b4;
	}
	.save-info {
		/* position: absolute; */
		/* right: 25px; */
		/* top: 5px; */
		width: 100%;
		background: #548CFE;
		border-color: #548CFE;
		height: 42px;
		font-size: 1.5em;
		margin: 54px 0px;
	}
	.info {
		padding-left: 40px;
		padding-bottom: 30px;
	}
	.info div {
		/* margin-top: 10px; */
	}
	.text {
		display: inline-block;
		width: 140px;
		padding-right: 10px;
		text-align: left;
		    font-size: 18px;
		color: #548CFE;
	}
	.input {
		    width: 220px;
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