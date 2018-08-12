<template>
	<section>
		<typetab 
			:tabs="tabs" 
			@tab-select="tabSelect"
		/>
		<span class="socre">
			得分：<span>{{score}}</span>
		</span>
		<Button class="submit-bt" type="success" @click="submitScore">确定批改</Button>
		<question-nav :questionList="questionList" @current-question="showCurrentQuestion"/>
		<component v-show="hasQuestion" 
			class="question-wrap" 
			:is="questionType" 
			:questionItem="currentQuestion" 
			:index="currentQuestionIndex" 
			:key="currentQuestionIndex"
			:mark="currentMark"
			@set-score="setScore"/>
	</section>
</template>

<script>
	import { mapState, mapActions} from 'vuex';
	import paper from  '../../../store/types/paper'
	import student from '../../../store/types/student'

	import typetab from './questionTypeTab'
	import questionNav from './questionNav'
	import choose from './check/choose'
	import pad from './check/pad'
	import judge from './check/judge'
	import issue from './check/issue'
	import integrated from './check/integrated'
	import program from './check/program'

	export default {
		data: function(){
			return {
				score: 0,
				questionScoreObj: {},
				currentMark: undefined,
				tabs: {
					choose: '选择题',
					pad: "填空题",
					judge: "判断题",
					issue: "问答题",
					integrated: "综合题",
					program: "编程题",
				},
				questionList: [],
				questionType: 'choose',
				currentQuestion: undefined,
				currentQuestionIndex: 0,
				hasQuestion: true
			}
		},
		components: {
			typetab,
			'question-nav': questionNav,
			choose,
			pad,
			judge,
			issue,
			integrated,
			program
		},
		computed: {
			...mapState({
				'questionAnswerInfo': state => {
					return state.paper.questionAnswerInfo
				},
				answerAnalysisList: state => {
					return state.paper.questionAnswerInfo.studentAnswerAnalysis || []
				},
				'paper': state => {
					return state.paper
				},
				'student': state => {
					return state.student
				}
			}),

			chooseList () {	
				return this.answerAnalysisList.filter(function(item){
					return item.question.type === 1
				})
			},
			padList () {	
				return this.answerAnalysisList.filter(function(item){
					return item.question.type === 3
				})
			},
			judgeList () {
				return this.answerAnalysisList.filter(function(item){
					return item.question.type === 2
				})
			},
			issueList () {
				return this.answerAnalysisList.filter(function(item){
					return item.question.type === 4
				})
			},
			programList () {
				return this.answerAnalysisList.filter(function(item){
					return item.question.type === 5
				})
			},
			integratedList () {
				return this.answerAnalysisList.filter(function(item){
					return item.question.type === 6
				})
			}
		},
		methods: {
			...mapActions(paper.actions),

			tabSelect(name) {
				this.questionList = this[name+'List']
				this.currentQuestionIndex = 0
				this.questionType = name

				if(this.questionList.length!==0){
					this.hasQuestion = true
					this.showCurrentQuestion({
						index: 0,
						questionId: this.questionList[0].question.questionId || undefined,
					})
				}else{
					this.hasQuestion = false
				}
			},

			/**
			 * [showCurrentQuestion description]
			 * @param  {[type]} data [data.questionId, data.index]
			 */
			showCurrentQuestion (data) {
				this.currentQuestionIndex = data.index
				if(data.questionId === undefined ){
					this.currentQuestion = undefined
					return
				}
				var question = this.questionList.filter(function(item){
					if(item.question.questionId === data.questionId){
						return item
					}
				})[0]
				this.currentQuestion = question
				this.currentMark = this.questionScoreObj[question.question.questionId]
				console.log(this.questionScoreObj)
				console.log(question.question.questionId)
			},

			setScore (data) {
				this.questionScoreObj[data.questionId] = data.score
				var obj = this.questionScoreObj
				var score = 0
				for(var id in obj){
					score += obj[id]
				}
				this.score = score
			},

			submitScore () {
				var obj = this.questionScoreObj
				var arr = []
				var data = {}
				for(var id in obj){
					arr.push({
						questionId: Number(id),
						socre: obj[id]
					})
				}
				data['teacherJudge'] = arr
				data['studentId'] = this.student.studentId
				data['testpaperId'] = this.paper.testpaperId

				this.submitJudge(data).then((data) => {
					this.questionScoreObj = {}
					if(data.state){
						this.$Message.success(data.info)
					}else{
						this.$Message.error(data.info)
					}
				}).catch((err) => {
					this.$Message.error(err)
				})
			}

		},
		created () {

			this.getPaperAnswerById({
				testpaperId: this.paper.testpaperId,
				userId: this.student.studentId
			}).then((data) => {
				this.questionScoreObj = {}
				if(data.state){
					this.score = this.questionAnswerInfo.socre
					this.answerAnalysisList.forEach((item) => {
						this.questionScoreObj[item.question.questionId] = item.socre
					})
					this.questionList = this.chooseList
					this.showCurrentQuestion({
						index: 0,
						questionId: this.questionList[0].question.questionId,
					})
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
	}
	.question {
		margin-top: 10px;
	}
	.socre {
		float: right;
		margin: 0 10px;
		font-size: 20px;
		color: #19be6b;
		border-bottom: 1px solid
	}
	.socre span {
		font-size: 30px;
	}
	.question-wrap {
		padding: 0 10px;
	}
	.submit-bt {
		position: absolute;
		right: 8px;
		top: 60px;
	}

/*	@media only screen and (max-width: 992px) {
		.submit-bt {
		    top: -5.6rem;
    		right: 10px;
		}
		.socre {
			font-size: 2rem;
		}
		.socre span {
			font-size: 2.5rem;
		}
	}*/
</style>