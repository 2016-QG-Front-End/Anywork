<template>
	<section>
		<h1>试卷：{{paper.testpaperTitle}}</h1>
		<h2>学生列表 :</h2>
		<complete-status-item 
			v-for="item in studentList" 
			:key="item.studentId" 
			:studentName="item.studentName" 
			:studentId="item.studentId" 
			:ifAttend="item.ifAttend" 
			:ifCheck="item.ifCheck"
			:object="item.object"
			:subject="item.subject" 
			:testpaper="item.testpaper"
		/>
	</section>
</template>

<script>
	import { mapState, mapActions} from 'vuex';
	import paper from  '../../../store/types/paper'
	import organization from  '../../../store/types/organization'


	import loading from '../../item/loading'
	import completeStatusItem from '../../item/completeStatusItem'
	export default {
		data () {
			return {		
				spinShow: false,
			}		
		},
		components: {
			loading,
			'complete-status-item': completeStatusItem
		},
		computed: {
			...mapState({
				'studentList': state => state.paper.studentList,
				'paper': state => state.paper,
				'organization': state => state.organization
			})
		},
		methods: {
			...mapActions(paper.actions),

			toGetStudentsByTest() {
				this.spinShow = true
				this.getStudentsByTest({
					organizationId: this.organization.organizationId,
					testpaperId: this.paper.testpaperId
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
			
		},
		created () {
			this.toGetStudentsByTest()
			this.refresh = new Date().getTime() - new Date().getTime() % 60000
		}
	}
</script>

<style scoped lang='less'>
	section {
		position: relative;
	}
	h1 {
		padding: 10px 20px 5px;
	    margin-bottom: 10px;
	    border-bottom: 1px solid #b4b4b4;
	}
	h2 {
		padding: 10px 20px 5px;
	    margin-bottom: 10px;
	}
	.no-info {
		margin-top: 30px;
		text-align: center;
		font-size: 20px;
	}
</style>