<template>
	<section class="student-item" >
		<span class="name">{{studentName}}</span>
		<Button class="check-bt" type="primary" @click="handel">评分</Button>
		<span class="check-status" :class="{'hasDown': ifCheck}">{{checkStatus}}</span>
		<span class="attend-status" :class="{'hasDown': ifAttend}">{{attendStatus}}</span>
		<span class="score-wrap">
			<span class="score">客观题: <strong>{{object}}</strong></span>
			<span class="score">主观题: <strong>{{subject}}</strong></span>
			<span class="score">总分: <strong>{{subject + object}}</strong></span>
		</span>
	</section>
</template>

<script>
	import {mapState, mapActions} from 'vuex'
	import paper from '../../store/types/paper'
	import student from '../../store/types/student'
	export default {
		data() {
			return {

			}
		},
		props: ['studentName', 'studentId', 'ifAttend', 'ifCheck','subject','object', 'testpaper'],
		computed: {
			attendStatus: (state) => {
				return state.ifAttend ? '已完成' : '未完成'
			},
			checkStatus: (state) => {
				return state.ifCheck ? '已评分' : '未评分'
			}
		},
		methods: {
			...mapActions(paper.actions),
			...mapActions(student.actions),

			score() {
				if(!this.ifAttend){
					alert('该学生未做体，尚不能评分！')
					return
				}
				this.setPaperInfo(this.testpaper).then((data) => {
                    if(data.state){
						this.$router.push({
							name: 'score'
						})
                    }else{
                        this.$Message.error(data.info)
                    }
                }).catch((err) => {
                    this.$Message.error(err)
                })
			},
			handel() {
				this.setStudentInfo({
					studentName: this.studentName,
					studentId: this.studentId
				}).then((data) => {
					if(data.state){
						this.score()
					}else{
						this.$Message.error(data.info)
					}
				}).catch((err) => {
					this.$Message.error(err)
				})
			}
		}
	}
</script>

<style scoped>
	.student-item {
	    border: 1px solid #dedede;
	    padding: 8px;
	    margin: 10px;
	    border-radius: 4px;
	}
	.attend-status, .check-status, .check-bt {
		float: right;
		margin-right: 20px;
	}
	.name {
	    display: inline-block;
	    padding: 2px 11px;
	    min-width: 100px;
	    font-size: 16px;
	    font-weight: bold;
	    text-align: center;
	    color: #646e77;
	    border-right: 1px solid #b3b3b3;
	}
	.attend-status, .check-status {
	    padding: 5px;
	    color: white;
	    border: 1px dashed #929292;
	    border-radius: 3px;
	    background-color: #ffa8a8;
        cursor: default;
	}
	.hasDown {
		background-color: #7ec580;
	}

	.check-bt {
    	padding: 5px 15px;
	}
	.score-wrap {
	    float: right;
		margin-right: 30px;
	}
	.score {
	    margin-right: 10px;
	    font-size: 15px;
	    color: #646e77;
	    line-height: 37px;
	}
	.score strong {
		padding: 0 10px;
		border-bottom: 1px solid;
	}
</style>
