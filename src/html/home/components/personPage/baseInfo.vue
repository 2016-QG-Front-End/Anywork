<template>
	<section>
		<div class="header">
			<!-- <h2>基本信息</h2> -->
			<!-- <Button class="save-info" type="success" @click="saveInfo">保存</Button> -->
		</div>
		<div class="info">
		 	<div class="commom-info-input">
		 		<span class="text">邮箱</span>
				<Input class="input" type="text"   v-model="email"></Input>
		 	</div>
		 	<!-- <div class="commom-info-input">
		 		<span class="text">昵称</span>
				<Input class="input" type="text" disabled v-model="newUserName"></Input>
		 	</div> -->
		 	<div class="commom-info-input">
		 		<span class="text">电话</span>
				<Input class="input" type="text" v-model="newPhone"></Input>
		 	</div>
			 <div class="commom-info-button">
			 <Button class="save-info" type="success" @click="saveInfo">保存</Button>
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
				newPhone: '',
				email: ''
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

					phone: this.newPhone,
					email: this.email
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
			this.newPhone = this.user.phone;
			this.email = this.user.email
			if (this.$route.params.isChangeI) {
				location.href = location.href + '?isChangeI=true'
			}
		}
	}
</script>

<style>
input,input:active{
    border: none !important;
    /* border-bottom: 1px solid #d2d2d2 !important; */
    outline: none;
    box-shadow: none;
    width: 100%;
	transition: none;
	font-size: 16px;
}
input {
	padding: 0 0 0 0 !important;
	font-size: 16px !important;
}
input:hover,
input:focus {
	transition: none !important;
	box-shadow: none !important;
}
</style>

<style scoped>
	.commom-info-input {
		border-bottom: 1px solid #548CFE;
		width: 300px;
		position: relative;
		margin-top: 20px;
		display: flex;
    	align-items: center;
	}
	.commom-info-button {
		width: 300px;
		position: relative;
	}
	.info {
		padding-left: 40px;
		padding-bottom: 30px;
	}
	.info div {
		/* margin-top: 10px; */
	}
	.header {
		position: relative;
		padding: 10px 20px 5px;
		margin-bottom: 20px;
		/* border-bottom: 1px solid #b4b4b4; */
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
		margin: 18px 0px;
	}
	.text {
		display: inline-block;
		width: 56px;
		padding-right: 10px;
		text-align: left;
		font-size: 20px;
		color: #548CFE;
	}
	.input {
		width: 200px;
		vertical-align: initial;
		border: none;
		font-size: 16px;
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