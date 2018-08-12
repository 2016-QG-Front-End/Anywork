<template>
	<section>
		<div class="header">
			<h1>{{student.studentName}}</h1>
			<Menu mode="horizontal" active-name="studentTest" @on-select="selectRouter">
	            <div class="layout-assistant">
	                <Menu-item name="studentTest" > 考试 </Menu-item>
	                <Menu-item name="studentPractice" > 练习 </Menu-item>
	            </div>
	        </Menu>
		</div>
		<papers :papers="papersList"/>
		<loading :spinShow="spinShow" />
	</section>
</template>

<script>
	import { mapState, mapActions } from 'vuex' 
	import student from '../../../store/types/student'
	import organization from '../../../store/types/organization'

	import papers from './papers'
	import loading from '../../item/loading'

	export default {
		data() {
			return {
				papersList: [],
				testsList: [],
				practicesList: [],
				spinShow: false
			}
		},
		components: {
			papers,
			loading
		},
		computed: {
			...mapState({
				'student': (state) => state.student,
				'studentTestList' : (state) => state.organization.studentTestList,
				'studentPracticeList' : (state) => state.organization.studentPracticeList,
				'organizationId': state => state.organization.organizationId
 			})
		},

		methods: {
			...mapActions(organization.actions),

			selectRouter(name) {
				switch (name) {
					case 'studentTest' : 
						this.toGetStudentTestsById();
						break;
					case 'studentPractice' :
						this.toGetStudentPracticesById()
				}
			},
/*			handelPaperList() {
				var allPaperList = ;
				this.testsList = []
				this.practicesList = []
				allPaperList.forEach(item => {
					if(item.testpaper.testpaperType === 1) {
						this.testsList.push(item)
					}else if(item.testpaper.testpaperType === 0) {
						this.practicesList.push(item)
					}
				})
			},*/

			toGetStudentTestsById() {
				this.spinShow = true
				this.getStudentTestsById({
					organizationId: this.organizationId,
					userId: this.student.studentId
				}).then((data) => {
					if(data.state){
						this.spinShow = false
						this.testsList = this.studentTestList;
						this.papersList = this.testsList
					}else{
						this.$Message.error(data.info)
					}
				}).catch((err) => {
					this.$Message.error(err)
				})
			},
			toGetStudentPracticesById() {
				this.spinShow = true
				this.getStudentPracticesById({
					organizationId: this.organizationId,
					userId: this.student.studentId
				}).then((data) => {
					if(data.state){
						this.spinShow = false
						// 把被做过的练习分离出来
						this.practicesList = this.studentPracticeList.filter(item => {
							return item.ifAttend
						});
						this.papersList = this.practicesList
					}else{
						this.$Message.error(data.info)
					}
				}).catch((err) => {
					this.$Message.error(err)
				})
			},
		},
		mounted() {
			this.toGetStudentTestsById()
			this.papersList = this.testsList
		}

	}
</script>

<style scoped>	
	section {
		position: relative;
	}
	.header {
		position: relative;
		overflow: hidden;
	}
	h1 {
	    right: 37px;
	    position: absolute;
	    z-index: 1;
	}
</style>