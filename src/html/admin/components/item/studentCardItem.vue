<template>
	<div class="student-item" @click="handel">
		<!-- <img :src=" '/anywork/picture/' + userId + '.jpg?' + refresh "> -->
		<img :src="'https://qgstudio.org/anywork' + studentImg">
		<div>
			<p>{{userName}}</p>
			<p>{{studentId}}</p> 
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions, mapGetters} from 'vuex';
	import student from  '../../store/types/student'

	export default {
		data() {
			return {
				refresh: ''
			}
		},
		props: ['userName', 'userId', 'email', 'phone', 'organizationId', 'studentId', 'studentImg'],
		computed: {
			'studentPhoto' : function() {
				return this.$store.getters.studentPhoto
			}
			
		},
		methods: {
			...mapActions(student.actions),

			handel() {
				console.log("touxiang: " + this.studentImg)
				this.setStudentInfo({
					studentName: this.userName,
					studentId: this.studentId,
					studentImg: this.studentImg
				}).then((data) => {
					if(data.state){
						// this.$router.push({
						// 	name: 'studentDownPaper'
						// })
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
		width: 11%;
		min-width: 120px;
        // box-shadow: 0 0 5px 1px #8c8c8c;
        border-radius: 4px;
		padding: 30px 10px;
        margin: 20px 1.5%;

        
        background-color: #393C42; 
        color: #fff;
        cursor: pointer;
        text-align: center;

/*
		&:hover {
			box-shadow: 0 0 5px 1px #60c793
		}
*/
		& img {
            display: inline-block;
            
            margin: 10px auto;
			width: 40px;
            height: 40px;
			border-radius: 50%;
		}

		& p {
			margin-top: 10px;
		}
	}

</style>