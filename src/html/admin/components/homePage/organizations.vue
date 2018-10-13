<template>
	<section>
		<!-- <div class="on-organ" @click="toggleTag">
			<span id="organ-name">{{selected ? myOrganizationList[organIndex].organizationName : '全部组织'}}</span>
			<span class="arrow" :class="optionsOpen ? 'opened' : 'closed'"></span>
		</div>
		<p class="read-more">详情</p>
		<transition name="fade">
			<ul class="organ-list" v-show="optionsOpen" name="organ-list">
			    <li @click="changeIndex(-1, null)">全部组织</li>
				<li v-for="(organ, index) in myOrganizationList" :key="organ.organizationId"
					:organizationId = "organ.organizationId"
					:organizationName = "organ.organizationName"
					@click="changeIndex(index, organ)">{{organ.organizationName}}</li>
			</ul>
		</transition> -->
		<Dropdown trigger="click">
			<Button type="primary" >
				{{selected ? myOrganizationList[organIndex].organizationName : '全部组织'}}
				<Icon type="ios-arrow-down"></Icon>
			</Button>
			<DropdownMenu slot="list">
				<DropdownItem @click.native="changeIndex(-1, null)">全部组织</DropdownItem>
				<DropdownItem v-for="(organ, index) in myOrganizationList" :key="organ.organizationId"
					:organizationId = "organ.organizationId"
					:organizationName = "organ.organizationName"
					@click.native="changeIndex(index, organ)">{{organ.organizationName}}</DropdownItem>
			</DropdownMenu>
		</Dropdown>
		<Button type="primary" class="create-bt" @click="createOrgan">创建新组织</Button>
		<div class="member-part" v-if="!selected">
			<div class="header">
				<h2>我的组织</h2>
			</div>
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
		</div>
		<div class="member-part" v-if="selected">
			<div class="header">
				<h2>组织成员</h2>
			</div>
			<!-- <loading :spinShow="spinShow" /> -->
			<div class="students">
				<student-item 
					v-for="item in studentsList.slice(currentList[0] , currentList[1])" 
					:key="item.userId" 
					:userId = "item.userId"
					:userName = "item.userName" 
					:email = "item.email" 
					:phone = "item.phone"
					:student = "item.studentId"
					:organizationId = "organization.organizationId"
				/>
			</div>
			<div class="pages">
				<p class="prev" @click="filpPage(-1)">上一页</p>
				<span class="page-item" v-for="(item, index) in pageCount"
				@click="filpPage(index)">{{ index + 1}}</span>
				<p class="next" @click="filpPage(-2)">下一页</p>
			</div>
		</div>
		<Dropdown style="margin-left: 20px">
			<Button type="primary" ghost>
				选择试卷
				<Icon type="ios-arrow-down"></Icon>
			</Button>
			<DropdownMenu slot="list">
				<DropdownItem>驴打滚</DropdownItem>
				<DropdownItem>炸酱面</DropdownItem>
				<DropdownItem disabled>豆汁儿</DropdownItem>
				<DropdownItem>冰糖葫芦</DropdownItem>
				<DropdownItem divided>北京烤鸭</DropdownItem>
			</DropdownMenu>
		</Dropdown>
		<Dropdown style="margin-left: 20px">
			<Button type="primary">
				选择组织
				<Icon type="ios-arrow-down"></Icon>
			</Button>
			<DropdownMenu slot="list">
				<DropdownItem>驴打滚</DropdownItem>
				<DropdownItem>炸酱面</DropdownItem>
				<DropdownItem disabled>豆汁儿</DropdownItem>
				<DropdownItem>冰糖葫芦</DropdownItem>
				<DropdownItem divided>北京烤鸭</DropdownItem>
			</DropdownMenu>
		</Dropdown>
		<div class="ranking-part">
			<div class="header">
				<h2>排行榜</h2>
				<leader-board></leader-board>
			</div>
		</div>
	</section>

</template>

<script>
	import { mapState, mapActions} from 'vuex';
	import organization from  '../../store/types/organization'

	import organitem from '../item/organItem'
	import loading from '../item/loading'
	import studentItem from '../item/studentCardItem'
	import leaderBoard from './leaderBoard'
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
				alterOrganId : undefined,
				optionsOpen: false,
				organIndex: 0,
				currentPage: 0,
				// pageCount: 5,
				selected: false
			}		
		},
		components: {
			organitem,
			loading,
			'student-item': studentItem,
			leaderBoard
		},
		computed: {
			...mapState({
				'myOrganizationList': state => {
					return state.organization.myOrganizationList
				},
				'studentsList': state => {
					return state.organization.studentsList
				},
				// 'pageCount': state => {
				// 	return state.organization.studentsList.length
				// },
				'organization': state => state.organization
			}),
			pageCount : function() {
				var len = this.studentsList.length
				if((len % 14) != 0) {
					return (len - (len % 14)) / 14 + 1
				} else {
					return this.studentsList.length / 14
				}
			},
			currentList: function() {
				var start = this.currentPage * 14
				if((start + 14) > this.studentsList.length) {
					var end = this.studentsList.length - 1
				} else {
					var end = start + 14
				}
				return [start, end]
			}
		},
		methods: {
			...mapActions(organization.actions),

			toGetStudentsByOrganId() {
				this.spinShow = true
				this.getStudentsByOrganId({
					organizationId: this.organization.organizationId
				}).then((data) => {
					if(data.state){
						this.spinShow = false
						// this.$Message.success(data.info)
					}else{
						this.$Message.error(data.info)
					}
				}).catch((err) => {
					this.$Message.error(err)
				})
			},
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
			},
			toggleTag() {
				this.optionsOpen = !this.optionsOpen;
			},
			changeIndex(index, organ) {
				this.organIndex = index
				this.optionsOpen = false
				if(index == -1) {
					this.selected = false
					this.pageCount = 0
				} else {
					this.setOrganizationInfo({
						organizationId: organ.organizationId,
						organName: organ.organizationName,
						teacherId: organ.teacherId,
						teacherName: organ.teacherName,
					})
					this.toGetStudentsByOrganId()
					this.selected = true
					// alert(this.pageCount)
				}
			},
			filpPage(index) {
				if(index == -1) {
					if(this.currentPage == 0) {
						alert("已经是第一页")
						return ;
					}
					this.currentPage --
				} else if(index == -2) {
					if(this.currentPage == this.pageCount - 1) {
						alert("已经是最后一页")
						return ;
					}
					this.currentPage ++
				} else {
					this.currentPage = index
				}
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
			this.toGetStudentsByOrganId()
			this.refresh = new Date().getTime() - new Date().getTime() % 60000
		}
	}
</script>

<style scoped>
	section {
		position: relative;
		min-height: 100px;
	}

	.member-part,
	.ranking-part {
		position: relative;
		margin-top: 20px;
		margin-bottom: 50px;
		border-radius: 4px;
		min-height: 100px;
	    background: white;


	}


	.member-part::before {
		content: '';
		display: inline-block;
		position: absolute;
		top: 10px;

		width: 6px;
		height: 24px;

		background-color: #ff093f;
	}

	.ranking-part::before {
		content: '';
		display: inline-block;
		position: absolute;
		top: 10px;

		width: 6px;
		height: 24px;

		background-color: #7d09ff;
	}

	.header {
		position: relative;
		padding: 10px 20px 5px;
		margin-bottom: 10px;
		border-bottom: 1px solid #f0f0f0;

		color: #393c42;
	}
	.organ-item {
		display: inline-block;
	    margin: 10px 15px;
	}
	.create-bt {
		position: absolute;
		right: 10px;
		top: 8px;

		z-index: 100;
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

	.on-organ {
		padding: 8px 18px;
		border-radius: 5px;
		box-shadow: 10px 10px 50px 10px rgb(225, 225, 225);
	}


	.arrow {
		display: inline-block;
		position: absolute;
		top: 10px;
		right: 10px;

		width: 9px;
		height: 9px;

		transform: rotate(-135deg);
		/* transition:all .5s ease-in .1s; */
		border: 2px solid #FFFFFF;
		border-bottom: 0;
		border-right:0;
	}

	.opened {
		top: 14px;
		transform: rotate(45deg);
		transition:all .1s ease-in .01s;
	}

	.closed {
		top: 10px;
		transform: rotate(-135deg);
		transition:all .1s ease-in .01s;
	}

	.organ-list {
		position: absolute;
		top: 45px;

		border:1px solid #548CEF;
		border-bottom: none;
		width: 153px;
		/* height: 32px; */
		

		background: #fff;
		color: #548CFE;
		text-align: center;
		font-size: 16px;
		z-index: 110;
	}

	.organ-list li {
		border-bottom:1px solid #548CEF;
		/* border-top: none; */

		list-style: none;
		height: 32px;
		line-height: 32px;
		cursor: default;
	}

	.organ-list li:hover,
	.organ-list li:active{
		background: #548CEF;
		color: #fff;
		
	}

	.organ-list li:link,
	.organ-list li:visited{
		background: #fff;
		color: #548CFE;
	}

	.appear {
		display: block;
	}

	.hidden {
		display: none;
	}

	.read-more {
		position: absolute;
		top: 18px;
		left: 180px;
		color: #548cef;
		font-size: 14px;
		cursor: pointer;
	}

	.read-more:hover {
		color: #aaa
	}

	.students {
		width: 95%;
		margin: 0 auto;
	}

	.pages {
		/* width: 15%; */
		text-align: center;
		/* margin: 10px 0; */
	}

	.prev,
	.next {
		display: inline-block;

		width: 48px;
		height: 24px;
		border: 1px solid #548cef;

		color: #548cef;
		font-size: 14px;

		cursor: pointer;
	}

	.page-item {
		display: inline-block;

		margin: 0 5px;
		border: 1px solid #548cef;
		width: 24px;
		height: 24px;

		color: #548cef;
		font-size: 14px;
		text-align: center;

		cursor: pointer;
	}
</style>