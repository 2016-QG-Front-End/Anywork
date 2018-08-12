<template>
	<section>
		<loading :spinShow="spinShow" />
		<div>
			<student-item 
				v-for="item in studentsList" 
				:key="item.userId" 
				:userId = "item.userId"
				:userName = "item.userName" 
				:email = "item.email" 
				:phone = "item.phone"
				:organizationId = "organization.organizationId"
			/>
		</div>
		<p v-if="studentsList.length<=0" class="no-info"> 没有数据... </p>
	</section>
</template>

<script>
	import { mapState, mapActions} from 'vuex';
	import organization from  '../../store/types/organization'

	import loading from '../item/loading'
	import studentItem from '../item/studentItem'
	export default {
		data () {
			return {		
				spinShow: false,
			}		
		},
		components: {
			loading,
			'student-item': studentItem
		},
		computed: {
			...mapState({
				'studentsList': state => {
					return state.organization.studentsList
				},
				'organization': state => state.organization
			})
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
			
		},
		created () {
			this.toGetStudentsByOrganId()
			this.refresh = new Date().getTime() - new Date().getTime() % 60000
		}
	}
</script>

<style scoped lang='less'>
	section {
		position: relative;
	}
	.no-info {
		margin-top: 30px;
		text-align: center;
		font-size: 20px;
	}
</style>