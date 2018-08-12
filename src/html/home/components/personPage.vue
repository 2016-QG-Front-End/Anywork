<template>
	<section class="person-page">
		<div class="left-section">
			<center class="person-info">
				<img class="photo" :src="userPhoto">
				<p class="name">{{this.user.userName}}</p>
				<div>
					<Button type="success" @click="goBackHomepage">返回首页</Button>
					<upload class="upload" v-show="avataredit" :server="upload.server" :api="upload.api" :filename="upload.filename" :params="upload.params" @success="upsuccess" v-model="newavatar" :crop="upload.crop" :width="upload.width" :height="upload.height" :ok="upload.ok" :cancel="upload.cancel">
						<Button type="success" ref="avatarInput">修改头像</Button>
					</upload>
				</div>
				<div class="bar">
					<Button type="success" @click="updatePassword">修改密码</Button>
					<Button type="success" @click="updateBaseInfo" >修改信息</Button>
				</div>
				<p class="email">
					<Icon class="icon" type="person" color="#00BC9B" size="20"></Icon> {{user.email}}
				</p> 
				<p class="mark">
					<Icon class="icon" type="android-contact" color="#00BC9B"  size="20"></Icon> {{user.mark===0?'学生':'老师'}}</p>
			</center>
		</div>
		<div class="reight-section">
			<div class="main">
				<Menu mode="horizontal" @on-select="selectRouter" :active-name="activeName">
		            <div class="layout-assistant">
		                <Menu-item name="myOrganization" >我的组织</Menu-item>
		                <Menu-item name="myTest" >我的考试</Menu-item>
		                <Menu-item name="myPractice" >我的练习</Menu-item>
		                <Submenu name="3">
		                    <template slot="title">
		                        <Icon type="ios-person"></Icon>
		                        个人信息
		                    </template>
		                    <Menu-item name="changePassword">修改密码</Menu-item>
		                    <Menu-item name="baseInfo">修改信息</Menu-item>
		                    <Menu-item name="changePhoto">修改头像</Menu-item>
		                </Submenu>
		            </div>
		        </Menu>
				<router-view class="router-item"></router-view>
			</div>
		</div>
	</section>
</template>

<script>
	import upload from './personPage/uploadavatar.vue'
	import { IP } from 'src/utils/interaction'
	import { mapState, mapGetters, mapActions } from 'vuex';
	import user from  '../store/types/user'
	export default {
		data () {
			return {
				activeName: 'myOrganization',
				newavatar: null,
		      	upload: {
			        server: IP,
			        api: "/user/upload",
			        preview: false,
			        crop: true,
			        width: 400,
			        height: 400,
			        cancel: '取消',
			        ok: '裁剪',
			        filename: 'file',
			        auto: true,
		       	},
		       	avataredit: true,
			}
		},
		components: { upload },
		computed: {
			...mapState({
				'user': state => {
					return state.user
				}
			}),
			...mapGetters([
				'userPhoto',
			])
		},
		methods: {
			...mapActions(user.actions),
			updateBaseInfo () {
				this.$router.push({
					name: 'baseInfo'
				})
				this.activeName = "baseInfo"
			},
			updatePassword () {
				this.$router.push({
					name: 'changePassword'
				})
				this.activeName = "changePassword"
			},
			goBackHomepage () {
				this.$router.push({
					name: 'homepage'
				})
			},
			selectRouter (name) {
				if(name === 'changePhoto'){
					this.$refs.avatarInput.$el.nextElementSibling.click()
					return 
				}
				this.$router.push({
					name: name
				})
			},
			upsuccess () {
				this.refresh()
		    },
		},
	}
</script>

<style scoped>
	.person-page {
		width: 70%;
		height: 100%;
		min-width: 1000px;
		margin: auto;
	}
	.left-section {
		float: left;
		width: 280px;
		padding: 0 10px 0 0;
		box-sizing: border-box;
	}
	.person-info {
		padding: 10px;
		box-shadow: 0 0 1px 1px #b4b4b4;
		background-color: white;
	}
	.photo {
		width: 100px;
		height: 100px;
		border-radius: 50%;
	}
	.name {
		margin-bottom: 10px;
	}
	.bar {
		margin-top: 5px;
		margin-bottom: 20px;
	}
	.person-info .email, .person-info .mark {
		margin-top: 5px;
		margin-left: 10px;
		text-align: left;
	}
	.icon {
	    vertical-align: middle;
	}

	.reight-section {
		float: left;
		width: calc( 100% - 280px );
		padding: 0 0px 10px 0;
		box-sizing: border-box;
	}
	.main {
		padding: 10px;
		box-shadow: 0 0 1px 1px #b4b4b4;
		box-sizing: border-box;
		background-color: white;
	}

	.left-section .upload {
        display: inline-block;
    	width: 80px;
	}

	.router-item {
		margin-top: 20px;
		padding: 0 30px;
	}

	@media only screen and (max-width: 992px) {
		.person-page {
			width: 100%;
			min-width: 0;
		}
		.left-section {
			display: none;
		}

		.reight-section {
			width: 100%;
		}
		.router-item {
			min-height: 130px;
		}
	}
</style>