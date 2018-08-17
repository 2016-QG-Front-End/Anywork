<template>
	<section>
		<section>
			<Input v-model="topic" placeholder="请输入你的主题" style="width: 300px" />
			<br/>
			<br/>
			<Input v-model="context" placeholder="请输入你的内容" style="width: 300px" />
			<br/><br/>
			<Button type="warning" @click="submit">提交</Button>
		</section>
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
				topic: '',
				context: ''
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
			submit: function () {
				let that = this
				this.sendNotice({
					title: this.topic,
					content: this.context
				}).then(data => {
					that.$Notice.success({
						title: '消息发送成功',
					});
				}).catch(err => {
					
				})
			}

			
		},
		created () {

		}
	}
</script>
