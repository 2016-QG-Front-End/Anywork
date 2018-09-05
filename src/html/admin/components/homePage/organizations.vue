<template>
	<section>
		<div class="header">
			<h2>我的组织</h2>
			<Button type="primary" class="create-bt" @click="createOrgan">创建新组织</Button>
		</div>
		<loading :spinShow="spinShow" />
		<div key="organization" v-show="!spinShow">
			<organitem class="organ-item" v-for="(organ, index) in myOrganizationList"  :key="organ.organizationId"
				:organizationId = "organ.organizationId" 
				:teacherName = "organ.teacherName" 
				:teacherId = "organ.teacherId"
				:organizationName = "organ.organizationName" 
				:description = "organ.description" 
				:count = "organ.count" 
				:token = "organ.token"
				@upload-organ = "uploadOrganization"
			 />
		</div>
		<transition name="fade">
			<div class="modal" v-show="showModel">
	        	<h2>{{modalTitle}}</h2>
		        <p>组织名</p><Input type="text" v-model="organizationName"></Input>
		        <div class="avatar-wrap">
		        	<p class="description-tip">组织头像</p>
			        <div class="upload-file" @click="addFile">
			        	<img :src="imgSrc">
			        	<input class="file-input" type="file" ref="fileInput" @change="changeFile">
			        </div>
		        </div>
		        <div class="description-wrap"><p class="description-tip">组织描述</p><textarea v-model="description" class="description"></textarea></div>
				<p>组织口令</p><Input type="text" v-model="token"></Input>
		        <Button class="bt" type="primary" @click="modelOk">确定</Button>
		        <Button class="bt" type="primary" @click="modelCancel">取消</Button>
		    </div>
		</transition>
    	<div :class="{'modal-cover': showModel}"></div>
	</section>
</template>

<script>
	import { mapState, mapActions} from 'vuex';
	import organization from  '../../store/types/organization'

	import organitem from '../item/organItem'
	import loading from '../item/loading'
	export default {
		data () {
			return {		
				spinShow: true,
				hasExit: false,
				showModel: false,
				organizationName: '',
				description: '',
				file: null,
				imgSrc: '',
				modalTitle: '',
				token: '',
				alterOrganId : undefined
			}		
		},
		components: {
			organitem,
			loading
		},
		computed: {
			...mapState({
				'myOrganizationList': state => {
					return state.organization.myOrganizationList
				},
			})
		},
		methods: {
			...mapActions(organization.actions),

			createOrgan() {
				this.modalTitle = '创建组织'
				this.showModel = true;
			},			
			uploadOrganization(organ) {
				this.alterOrganId = organ.organizationId
				this.organizationName = organ.organizationName,
				this.description = organ.description,
				this.imgSrc = organ.imgSrc
				this.modalTitle = '修改组织'
				this.showModel = true;
			},
			addFile() {
				this.$refs.fileInput.click()
			},
			changeFile() {
				this.file = this.$refs.fileInput.files[0]
				var reader = new FileReader();
				reader.onload = () => {
					this.imgSrc = reader.result
				}
				reader.readAsDataURL(this.file)
			},
			ToCreateOrganization() {
				var data = new FormData()
				data.append('organizationName', this.organizationName)
				data.append('description', this.description)
				data.append('file', this.file)
				data.append('token', this.token)

				this.createOrganization(data).then((data) => {
					if(data.state){
						this.showModel= false
						this.organizationName = ''
						this.description = ''
						this.file = null
						this.imgSrc = ''
						this.token = ''
						this.$Message.success(data.info)
					}else{
						this.$Message.error(data.info)
					}
				}).catch((err) => {
					this.$Message.error(err)
				})
			},
			ToAlterOrganization(id) {
				var data = new FormData()
				data.append('organizationName', this.organizationName)
				data.append('description', this.description)
				data.append('file', this.file)
				data.append('organizationId ', id)

				this.alterOrganization(data).then((data) => {
					if(data.state){
						this.showModel= false
						this.organizationName = ''
						this.description = ''
						this.file = null
						this.imgSrc = ''
						this.$Message.success(data.info)
					}else{
						this.$Message.error(data.info)
					}
				}).catch((err) => {
					this.$Message.error(err)
				})
			},
			modelOk() {
				if(this.modalTitle === '修改组织'){
					this.ToAlterOrganization(this.alterOrganId)
				}else{
					this.ToCreateOrganization()
				}
			},
			modelCancel() {
				this.showModel = false;
			}
		},
		created () {
			this.spinShow = true
			this.getMyOrganizations().then((data) => {
				if(data.state){
					this.spinShow = false
				}else{
					this.$Message.error(data.info)
				}
			}).catch((err) => {
				this.$Message.error(err)
			})
		}
	}
</script>

<style scoped>
	section {
		position: relative;
		min-height: 100px;
	    background: white;
	}
	.header {
		position: relative;
		padding: 10px 20px 5px;
		margin-bottom: 10px;
		border-bottom: 1px solid #b4b4b4;
	}
	.organ-item {
		display: inline-block;
	    margin: 10px 15px;
	}
	.create-bt {
		position: absolute;
		right: 10px;
		top: 0px;
	}
	.description-wrap {
	    width: calc(100% - 130px);
	    margin-left: 130px;
	}
	.description-tip {
		margin-top: 10px;
	}
	.description {
	    width: 100%;
	    height: 120px;
		padding: 5px;
	    border: 1px solid #dadada;
	}
	.avatar-wrap {
		float: left;

	}
	.upload-file {
		position: relative;
		width: 120px;
		height: 120px;
		cursor: pointer;
	}
	.upload-file img {
		position: absolute;
		z-index: 3;
	    width: 100%;
    	height: 100%;
	    border: 1px solid #dadada;
	}
	.upload-file:before {
	    display: block;
	    content: '';
	    position: absolute;
	    border-top: 1px solid #dadada;
	    width: 90%;
	    top: 50%;
	    left: 5%;
	}
	.upload-file:after {
	 	display: block;
	    content: '';
	    position: absolute;
	    border-right: 1px solid #dadada;
	    height: 90%;
       	left: 50%;
    	top: 5%;
	}
	.file-input {
		display: none;
	}
	.modal {
	    position: fixed;
	    top: 100px;
	    left: 50%;
	    z-index: 6;
	    width: 400px;
	    margin-left: -200px;
	    padding: 10px 14px;
	    border-radius: 5px;
	    box-shadow: 0 0 6px 1px #89a29e;
	    background-color: white;
	    overflow: hidden;
	}
	.modal-cover:before {
	    content: '';
	    display: block;
	    position: fixed;
	    z-index: 5;
	    background: rgba(0, 0, 0, 0.50);
	    width: 100%;
	    height: 100%;
	    top: 0;
	    left: 0;
	}
	.modal .bt {
		float: right;
		margin: 5px;
	}
	.fade-enter-active, .fade-leave-active {
	  	transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active 在低于版本 2.1.8 中 */ {
	  	opacity: 0.5;
	}
</style>