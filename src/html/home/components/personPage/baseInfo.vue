<template>
	<section>
		<div class="header">
			<h2>基本信息</h2>
			<Button class="save-info" type="success" @click="saveInfo">保存</Button>
		</div>
		<div class="info">
		 	<div>
		 		<span class="text">我的账号</span>
				<Input class="input" type="text" disabled :value="user.email"></Input>
		 	</div>
		 	<div>
		 		<span class="text">我的昵称</span>
				<Input class="input" type="text" v-model="newUserName"></Input>
		 	</div>
		 	<div>
		 		<span class="text">我的电话</span>
				<Input class="input" type="text" v-model="newPhone"></Input>
		 	</div>
		</div>
	</section>
</template>

<script>
	import {mapState, mapActions} from 'vuex';
	import user from  '../../store/types/user'
	export default {
		data () {
			return {
				newUserName: '',
				newPhone: ''
			}
		},
		computed: {
			...mapState({
				'user': state => {
					return state.user
				},
			})
		},
		methods: {
			...mapActions(user.actions),

			saveInfo () {
				this.updateInfo({
					userName: this.newUserName,
					phone: this.newPhone,
					email: ''
				}).then((data) => {
					if(data.state){
						this.$Message.success(data.info)		
					}else{
						this.$Message.error(data.info + ",请稍后重试！")
					}
				}).catch((err) => {
					this.$Message.error(err)
				})
			}
		},
		created () {
			this.newUserName = this.user.userName;
			this.newPhone = this.user.phone
		}
	}
</script>

<style scoped>
	.info {
		padding-left: 40px;
		padding-bottom: 30px;
	}
	.info div {
		margin-top: 10px;
	}
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