<template>
	<div class="student-item" @click="handel">
		<img :src=" '/anywork/picture/' + userId + '.jpg?' + refresh ">
		<div>
			<p><strong>姓名：</strong>{{userName}}</p>
			<p><strong>账号：</strong>{{email}}</p> 
			<p><strong>电话：</strong>{{phone}}</p>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions} from 'vuex';
	import student from  '../../store/types/student'

	export default {
		data() {
			return {
				refresh: ''
			}
		},
		props: ['userName', 'userId', 'email', 'phone', 'organizationId', 'studentId'],
		methods: {
			...mapActions(student.actions),

			handel() {
				this.setStudentInfo({
					studentName: this.userName,
					studentId: this.userId
				}).then((data) => {
					if(data.state){
						this.$router.push({
							name: 'studentDownPaper'
						})
					}else{
						this.$Message.error(data.info)
					}
				}).catch((err) => {
					this.$Message.error(err)
				})
			}
		},
		created () {
			this.refresh = new Date().getTime() - new Date().getTime() % 60000
		}
	}

</script>

<style scoped lang='less'>
	.student-item {
		display: inline-block;
		width: 18%;
		min-width: 300px;
		box-shadow: 0 0 5px 1px #8c8c8c;
		padding: 30px 10px;
		margin: 10px 1%;
		cursor: pointer;

		&:hover {
			box-shadow: 0 0 5px 1px #60c793
		}

		& img {
			float: left;
			display: inline-block;
			width: 100px;
			height: 100px;
			margin-right: 10px;
	    	border: 1px solid #dedede
		}

		& p {
			margin-top: 10px;
		}
	}

</style>