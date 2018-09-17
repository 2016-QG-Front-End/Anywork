<template>
	<section>
		<!-- <typetab 
			:tabs="tabs" 
			@tab-select="tabSelect"
		/> -->
		<ul  v-if="coundAnswer">
			<choose class="question"  v-for="(item, index) in chooseList" :questionItem="item" :index="index"  :questionNumbers="questionNumbers" :key="index" @choose-select="answerHandel"/>
			<!-- <center class="no-question-tip" v-if="chooseList <= 0"> ~没有题目~ </center> -->
		</ul>

		<ul  v-if="coundAnswer">
			<pad class="question"  v-for="(item, index) in padList" :questionItem="item" :index="index + chooseList.length" :questionNumbers="questionNumbers" :key="index" @pad-enter="answerHandel"/>
			<!-- <center class="no-question-tip" v-if="padList <= 0"> ~没有题目~ </center> -->
		</ul>
		<ul  v-if="coundAnswer">
			<judge class="question"  v-for="(item, index) in judgeList" :questionItem="item" :index="index + chooseList.length + padList.length" :questionNumbers="questionNumbers"  :key="index" @judge-select="answerHandel"/>
			<!-- <center class="no-question-tip" v-if="judgeList <= 0"> ~没有题目~ </center> -->
		</ul>
		<ul  v-if="coundAnswer">
			<issue class="question"  v-for="(item, index) in issueList" :questionItem="item" :index="index + chooseList.length + padList.length + judgeList.length" :questionNumbers="questionNumbers" :key="index" @issue-answer="answerHandel"/>
			<!-- <center class="no-question-tip" v-if="issueList <= 0"> ~没有题目~ </center> -->
		</ul>
		<!-- <ul v-show = "showTab === 'integrated'" v-if="coundAnswer">
			<integrated class="question" v-for="(item, index) in integratedList" :questionItem="item" :index="index" :key="index" @integrate-answer="answerHandel"/>
			<center class="no-question-tip" v-if="integratedList <= 0"> ~没有题目~ </center>
		</ul>
		<ul v-show = "showTab === 'program'" v-if="coundAnswer">
			<program class="question" v-for="(item, index) in programList" :questionItem="item" :index="index" :key="index" @program-answer="answerHandel"/>
			<center class="no-question-tip" v-if="programList <= 0"> ~没有题目~ </center>
		</ul> -->
		<div>{{time}}</div>
		<Button class="submit-bt" type="success" size="large" @click="toSubmitAnswer" :disabled="!coundAnswer">提交</Button>
	</section>
</template>

<script>
	import { mapState, mapActions} from 'vuex';
	import paper from  '../../store/types/paper'
	import user from '../../store/types/user'

	import typetab from './questionTypeTab'
	import choose from './answer/choose'
	import pad from './answer/pad'
	import judge from './answer/judge'
	import issue from './answer/issue'
	import integrated from './answer/integrated'
	import program from './answer/program'

	export default {
		data: function(){
			return {
				tabs: {
					choose: '选择题',
					pad: "填空题",
					judge: "判断题",
					issue: "问答题",
					// integrated: "综合题",
					// program: "编程题",
				},
				showTab: 'choose',
				paperAnswer: [],
				coundAnswer: true
			}
		},
		components: {
			typetab,
			choose,
			pad,
			judge,
			issue,
			integrated,
			program
		},
		computed: {
			...mapState({
				'paper': state => {
					return state.paper
				},
				'user': state => {
					return state.user
				}
			}),
			// time () {
			// 	let time = new Date()

			// 	return 
			// }
			chooseList () {	
				return this.paper.paperQuestionList.filter(function(question){
					return question.type === 1
				})
			},
			padList () {	
				return this.paper.paperQuestionList.filter(function(question){
					return question.type === 3
				})
			},
			judgeList () {
				return this.paper.paperQuestionList.filter(function(question){
					return question.type === 2
				})
			},
			issueList () {
				return this.paper.paperQuestionList.filter(function(question){
					return question.type === 4
				})
			},
			programList () {
				return this.paper.paperQuestionList.filter(function(question){
					return question.type === 5
				})
			},
			integratedList () {
				return this.paper.paperQuestionList.filter(function(question){
					return question.type === 6
				})
			},
			questionNumbers () {
				return this.paper.paperQuestionList.length
			}

		},
		methods: {
			...mapActions(paper.actions),

			toGetPaperInfo () {

				if(!this.paper.testpaperId) return

				this.getPaperAnswerById({
					testpaperId: this.paper.testpaperId,
					choice: this.paper.hasDown == 2 ? 1 : 0
				}).then((data) => {
					if(data.state){
						this.paperAnswer = data.data.map(function(item){
							if(item.type > 3){
								return {
									questionId: item.questionId.toString(),
									studentAnswer: ' '
								}
							}else if(item.type === 3){
								var arr = new Array()
								for(let i=0; i<item.other; i++){
									arr.push(' ')
								}
								return {
									questionId: item.questionId.toString(),
									studentAnswer: arr.join('∏')
								}
							}else if(item.type === 2){
								return {
									questionId: item.questionId.toString(),
									studentAnswer: ''
								}
							}else if(item.type === 1){
								return {
									questionId: item.questionId.toString(),
									studentAnswer: ''
								}
							}
						})
						console.log('this.paperAnswer' + this.paperAnswer)
					}else{
						this.coundAnswer = false
						this.$Message.error(data.info)
					}
				}).catch((err) => {
					this.$Message.error(err)
				})
			},
			tabSelect(name) {
				this.showTab = name
			},
			answerHandel(data){
				var paperAnswer = this.paperAnswer.filter(function(item){
					if(item.questionId !== data.questionId){
						return true
					}
				})
				paperAnswer.push(data)
				this.paperAnswer = paperAnswer
			},
			submitAnswer (data) {
				let time = new Date()
				let timeStr = ''
				timeStr += time.getFullYear()
				timeStr += '-'
				timeStr += (time.getMonth() + 1) < 10 ? ('0' + ((time.getMonth() + 1))) : ((time.getMonth() + 1))
				timeStr += '-'
				timeStr += ((time.getDate()) < 10) ? ('0' + time.getDate()) : time.getDate()
				timeStr += ' '
				timeStr += ((time.getHours()) < 10) ? ('0' + time.getHours()) : time.getHours()
				timeStr += ':'
				timeStr += ((time.getMinutes()) < 10) ? ('0' + time.getMinutes()) : time.getMinutes()
				timeStr += ':'
				timeStr += ((time.getSeconds()) < 10) ? ('0' + time.getSeconds()) : time.getSeconds()
				var datas = {
					studentId: this.user.userId,
					testpaperId: this.paper.testpaperId,
					studentAnswer: this.paperAnswer,
					temporarySave: data,
					endTime: timeStr
				}
				this.submitPaper(datas).then((data) => {
					if(data.state){
						this.$Message.success(data.info)
						this.$router.push({
							name: 'lookAnswer',
							params: {
								handel: 'submit'
							}
						})
						
					}else{
						this.$Message.error(data.info)
					}
				}).catch((err) => {
					this.$Message.error(err)
				})
			},
			toSubmitAnswer() {
				if(this.paper.hasDown === 1){
					var r=confirm("提交试卷后将不能再提交，是否继续？");
					if (r==true){
					  	this.submitAnswer(0)
					}else {
					  	// alert("You pressed Cancel!");
					}
				}else {
					this.submitAnswer(0)
				}
			}
		},
		created () {
			// 将该试卷提交的答案填入默认答案，因为后台是通过遍历提交的题目id一个个查找，如果有题目没做的话会缺失
			console.log(this.$route.params.doAgain, this.paper.hasDown)
			if(this.$route.params.doAgain === undefined || !this.$route.params.doAgain){
				//说明不是回退回来
				if(this.paper.hasDown == 1){
					this.$router.push({
						name: 'lookAnswer',
						params: { testPaperType: this.$route.params.testPaperType }
					})
					// 已经提交答案，请求该试卷答案信息，并跳转
				}else{
					// 如果没有提交答案
					this.toGetPaperInfo()

				}
			}else{
				//在查看答案那里跳转回来的，直接开始做题
				this.toGetPaperInfo()
			}
		},
		/*beforeRouteLeave (to, from, next) {
			console.log('bf', this.paper.testpaperType)
			// 从做题页面离开，但是并没有提交过考试试卷
		    if(from.name==='answerPaper' && to.name!='lookAnswer' && !this.paper.hasDown && this.paper.testpaperType===1){
		    	var r=confirm("提交试卷/离开后将不能再提交，是否继续？");
				if (r==true){
					next()
				}else {
				  	// alert("You pressed Cancel!");
				}
		    }else{
				next()
		    }
	  	}*/

	}
</script>

<style scoped>
ul {
    list-style: none;
}
.question {
    margin-top: 10px;
}
.submit-bt {
    float: right;

    margin: 20px 10px 10px;
	width: 104px;
}
.no-question-tip {
    margin: 10px 0;
    border-top: 6px solid rgb(0, 188, 155);
    padding: 20px 0 0 0;

    font-size: 25px;
    letter-spacing: 3px;
}

@media only screen and (max-width: 992px) {
    .no-question-tip {
        font-size: 37px;
    }
}


</style>