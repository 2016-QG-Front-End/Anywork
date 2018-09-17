<template>
	<section>
		<!-- <typetab 
			:tabs="tabs" 
			@tab-select="tabSelect"
		/> -->
		<span class="socre">
			客观题得分：<span>{{this.questionAnswerInfo.socre}}</span>
		</span>
		<!-- <Button class="do-again" type="success" v-if="this.paper.hasDown===1" @click="doAgain">再做一次</Button> -->
		<!-- <question-nav :questionList="questionList" @current-question="showCurrentQuestion"/> -->

		<!-- <component    class="question-wrap" :is="questionType" :questionItem="currentQuestion" :index="currentQuestionIndex" :key="currentQuestionIndex"/> -->

		<div v-for="(item, index) in answerAnalysisList" v-bind:key="item.question.questionId">
			<choose v-if="item.question.type == 1" :answerlength="answerAnalysisList.length" :questionItem="item" :index="index" :key="index"></choose>
			<judge v-if="item.question.type == 2" :answerlength="answerAnalysisList.length" :questionItem="item" :index="index" :key="index"></judge>
			<pad v-if="item.question.type == 3" :answerlength="answerAnalysisList.length" :questionItem="item" :index="index" :key="index"></pad>
			<issue v-if="item.question.type == 4" :answerlength="answerAnalysisList.length" :questionItem="item" :index="index" :key="index"></issue>
		</div>
	</section>
</template>

<script>
	import { mapState, mapActions} from 'vuex';
	import paper from  '../../store/types/paper'
	import user from '../../store/types/user'

	import typetab from './questionTypeTab'
	import questionNav from './questionNav'
	import choose from './look/choose'
	import pad from './look/pad'
	import judge from './look/judge'
	import issue from './look/issue'
	import integrated from './look/integrated'
	import program from './look/program'

	export default {
		data: function(){
			return {
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
				hasQuestion: true,
				isCollect: false,
				allCollections: null,
				detailCs: [],
				questions: []
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
				'user': state => {
					console.log(state.user)
					return state.user
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
			},

			doAgain () {
				this.$router.push({
					name: 'answerPaper',
					params: { 
						doAgain: true,
					}
				})
			},
			getQueryStringArgs(url){
				url = url == null ? window.location.href : url;
				var qs = url.substring(url.lastIndexOf("?") + 1);
				var args = {};
				var items = qs.length > 0 ? qs.split('&') : [];
				var item = null;
				var name = null;
				var value = null;
				for(var i=0; i<items.length; i++){
					item = items[i].split("=");
					//用decodeURIComponent()分别解码name 和value（因为查询字符串应该是被编码过的）。
					name = decodeURIComponent(item[0]);
					value = decodeURIComponent(item[1]);
		
					if(name.length){
						args[name] = value;
					}
				}
				if (args.isCollect) {
					this.isCollect =  args.isCollect;
				}
				
			},
			getAllCollections () {
				let len = this.allCollections.length
				let cData = this.allCollections
				for (let i = 0; i < len; i++) {
					this.detailCollection({
						questionId: cData[i].questionId
					}).then(data => {
						detailCs.push(data.data)
					}).catch(err => {
						this.$Message.error(err)
					})
				}
			}
		},
		created () {
			if(this.paper.hasDown && (this.$route.params.handel === undefined || this.$route.params.handel !== 'submit')){
				this.getFinishedPaperAnswerById({
					testpaperId: this.paper.testpaperId,
				}).then((data) => {
					if(data.state){
						this.questionList = this.chooseList
						this.questions = data.data.studentAnswerAnalysis
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
			} else if (this.isCollect) {
				let that = this
				this.getCollections().then(data => {
					that.allCollections = data.data
				}).catch(err => {
					this.$Message.error(err)
				})
			} else {
				this.questionList = this.chooseList
				this.showCurrentQuestion({
					index: 0,
					questionId: this.questionList[0].question.questionId,
				})
			}
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
	.submit-bt {
		float: right;
		margin: 20px 10px 10px;
	}
	.socre {
		float: right;
		margin: 0 10px;
		font-size: 20px;
		color: #548CFE;
		border-bottom: 1px solid
	}
	.socre span {
		font-size: 30px;
	}
	.question-wrap {
		padding: 0 10px;
	}
	.do-again {
		position: absolute;
		right: 30px;
		top: 65px;
	}

	@media only screen and (max-width: 992px) {
		.do-again {
	        top: -5.6rem;
		    right: 10px;
		    font-size: 2rem;
	        padding: 0.5rem 1rem;
		}
		.socre {
			font-size: 2rem;
		}
		.socre span {
			font-size: 2.5rem;
		}
	}
</style>