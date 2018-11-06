<template>
	<section>
		<Dropdown trigger="click">
			<Button type="primary" >
				<!-- {{selected ? myOrganizationList[organIndex].organizationName : '全部组织'}} -->
				{{organization.organName == ''? '全部组织' : organization.organName}}
				<Icon type="ios-arrow-down"></Icon>
			</Button>
			<DropdownMenu slot="list">
				<DropdownItem @click.native="changeIndex(-1, null); getPapers()">全部组织</DropdownItem>
				<DropdownItem v-for="(organ, index) in myOrganizationList" :key="organ.organizationId"
					:organizationId = "organ.organizationId"
					:organizationName = "organ.organizationName"
					@click.native="changeIndex(index, organ); getPapers(organ.organizationId);">{{organ.organizationName}}</DropdownItem>
			</DropdownMenu>
		</Dropdown>
		<Dropdown style="margin-left: 20px" trigger="click">
			<Button type="primary" ghost>
				{{ selectTest ? papersList[testIndex].testpaperTitle : "选择试卷" }}
				<Icon type="ios-arrow-down"></Icon>
			</Button>
			<DropdownMenu slot="list">
				<DropdownItem v-for="(paper, index) in papersList" :key="papersList.testpaperId"
				:testpaperId = "paper.testpaperId"
				:testpaperTitle = "paper.testpaperTitle"
				@click.native="setCurrentTest(index, paper.testpaperId)">{{paper.testpaperTitle}}</DropdownItem>
			</DropdownMenu>
		</Dropdown>
		<Button type="primary" class="create-bt" v-show="!selected" @click="createOrgan">创建新组织</Button>
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
					:index = "index"
					@upload-organ = "uploadOrganization"
					@chooseOrgan = "enterOrgan"
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
		<div class="ranking-part">
			<div class="header">
				<h2>排行榜</h2>
			</div>
			<leader-board v-if="havePaper" :testpaperId = "papersList[testIndex].testpaperId"
				:total = "!selected"
				:organizationId = "myOrganizationList[organIndex].organizationId"></leader-board>
			<p class="no-data" v-if="!havePaper">暂无数据</p>
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
				selected: false,
				testIndex: 0,
				selectTest: false,
				havePaper: false
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
				'papersList': state => {
					return state.organization.organPaperList
				},
				'organization': state => state.organization,
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
				
				this.optionsOpen = false
				if(index == -1) {
					this.selected = false
					this.pageCount = 0
					this.setOrganizationInfo({
						organName: '',
					})
				} else {
					this.organIndex = index
					this.setOrganizationInfo({
						organizationId: organ.organizationId,
						organName: organ.organizationName,
						teacherId: organ.teacherId,
						teacherName: organ.teacherName,
					})
					this.getStudentsByOrganId({
						organizationId: this.organization.organizationId
					})
					this.selected = true
					// alert(this.pageCount)
				}
				// alert(this.selected)
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
			},
			getPapers(id) {
				this.getMyPapers(id)
			},
			setCurrentTest (index, id) {
				if(index >= 0) this.testIndex = index
				this.selectTest = true
				this.setTestId({
					teatId: id,
				})
			},

			enterOrgan(index) {
				this.selected = true;
				this.organIndex = index;
				this.getStudentsByOrganId({
						organizationId: this.organization.organizationId
					})
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
			this.getMyPapers().then((data) => {
				if(data.state){
					this.havePaper = true
				}else{
					// this.$Message.error(data.info)
					this.havePaper = false
				}
			}).catch((err) => {
				this.$Message.error(err)
			})
			// this.toGetStudentsByOrganId()
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

	.ranking-part {
		min-height: 200px;
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

/** 翻页 **/
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

		margin: 25px 5px;
		border: 1px solid #548cef;
		width: 24px;
		height: 24px;

		color: #548cef;
		font-size: 14px;
		text-align: center;

		cursor: pointer;
	}

/** end 翻页 **/

.no-data {
	text-align: center;
	margin: 30px auto;

	font-size: 20px;
}


</style>