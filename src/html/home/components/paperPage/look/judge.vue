<template>
	<div :key="questionItem.question.questionId" >
		<!-- <p class="true-answer">正确答案: {{this.trueAnswer}}</p> -->
		<!-- <p class="your-answer">你的答案: {{this.yourAnswer}} <span :class="[this.questionItem.isTrue?'true':'false']">{{this.questionItem.isTrue ? '(正确)' : '(错误)'}}</span></p> -->
		<div class="num">
			<!-- 题号 : {{this.index + 1}} -->
			{{this.index + 1}}&nbsp;/&nbsp;{{this.answerlength}}&nbsp;&nbsp;（判断题）
			<Icon :type="showCollection" class="star" @click="upDataCollection"/>
			<!-- <span class="socre">{{questionItem.question.socre}}分</span> -->
		</div> 
		<section>
			<div class="content" >{{questionItem.question.content}}</div> 
			<div class="judge-select">
				<span class="answer_option">
					<label><Icon :type="'ios-checkmark'+ trueIcon" class="icon" :class="[!this.questionItem.isTrue && yourAnswer === true ? 'error-answer' : '']" ></Icon></label>
				</span><br/>
				<span class="answer_option">
					<label><Icon :type="'ios-close'+ falseIcon" class="icon" :class="[!this.questionItem.isTrue && yourAnswer === false ? 'error-answer' : '']" ></Icon></label>
				</span>
			</div>
			<p class="true-answer">解析：正确答案为 {{this.trueAnswer}}， 你的答案为 {{this.yourAnswer}} <span :class="[this.questionItem.isTrue?'true':'false']">{{this.questionItem.isTrue ? '(正确)' : '(错误)'}}</span></p>
			<p class="true-analysis">
				{{this.questionItem.analysis ? this.questionItem.analysis : '此答案暂时没有解析'}}
			</p>
		</section>
	</div>
</template>

<script>
	import { mapState, mapActions} from 'vuex';
	import paper from  '../../../store/types/paper'
	export default {
		data () {
			return {
				trueIcon: '-outline',
				falseIcon: '-outline',
				clickCollection: false,
				showCollection: 'ios-star-outline'
			}
		},
		props: ['questionItem', 'index', 'answerlength', 'isCollect'],
		computed: {
			yourAnswer () {
				if(this.questionItem.studentAnswer.toString() === '0' || this.questionItem.studentAnswer.toString() === '1'){
					return Boolean(Number(this.questionItem.studentAnswer))
				}else{
					return '未回答'
				}		
			},
			trueAnswer () {
				return Boolean(Number(this.questionItem.question.key))
			}
		},
		methods: {
			...mapActions(paper.actions),
			upDataCollection () {
				this.clickCollection = !this.clickCollection
				let that = this
				if (this.clickCollection) {
				//需要对题目进行收藏
					this.upLoadCollection({
						questionId: this.questionItem.question.questionId
					}).then(data => {
						this.$Notice.success({
							title: '收藏成功',
							// desc: nodesc ? '' : 'Here is the notification description. Here is the notification description. '
						});
						that.showCollection = 'ios-star'
					}).catch(err => {
						this.$Notice.error({
							title: '收藏失败，发生错误',
							desc: err.info
						});
					})
				} else {
				//取消收藏
					this.deleteCollection({
						questionId: this.questionItem.question.questionId
					}).then(data => {
						this.$Notice.success({
							title: '取消收藏成功',
							// desc: nodesc ? '' : 'Here is the notification description. Here is the notification description. '
						});
						that.showCollection = 'ios-star-outline'
					}).catch(err => {
						this.$Notice.error({
							title: '取消失败，发生错误',
							desc: err.info
						});
					})
				}
			}
		},
		watch: {

			clickCollection: function () {
				// this.showCollection = this.clickCollection
				this.showCollection = this.clickCollection ? "ios-star" : "ios-star-outline"
			}
		},
		created () {

			if(Number(this.questionItem.question.key)){
				this.trueIcon = ''
			}else{
				this.falseIcon = ''
			}

			if(!this.questionItem.isTrue && this.yourAnswer !== '未回答'){
				this.trueIcon = this.falseIcon = ''
			}else if(this.yourAnswer === '未回答'){
				this.trueIcon = this.falseIcon = '-outline'
			}
			if (this.isCollect) {
				this.clickCollection = this.isCollect
				// this.showCollection = 'ios-star'
			}
		}
	}
</script>

<style scoped>
	.star {
		color: #f5a623;
		cursor: pointer;
	}
	section {
	    /* border: 1px solid #dedede; */
	    padding: 0.1px;
	}
	.num {
		position: relative;
		/* background-color: #548CFE; */
		color: #548CFE;
		font-size: 1.6em;
		padding: 10px 10px 0;
	}
	.num span {
		position: absolute;
		right: 0;
		padding: 0 10px;
		background-color: #548CFE;
	}
	.content {
        width: 100%;
	    padding: 10px 10px 0;
	    margin-bottom: 10px;
	    /* border: 0 rgba(255, 255, 255, 0); */
	    /* border-bottom: 1px solid #dedede; */
	    font-size: 20px;
       	white-space: pre-line;
	    word-wrap: break-word;
	    word-break: break-all;
	}
	input[type='radio'] {
		display: none;
	}
	.judge-select {
		margin: 10px 0 10px 0;
	}
	.answer_option {
		margin: 5px;
	}
	.icon {
		color: #548CFE; 
		font-size: 40px;
	}
	.error-answer {
		color: red;
	}

	.true-answer {
		/* margin-top: 20px; */
		color:#FF431E;
		padding: 10px 10px 0;
	}
	.true-analysis {
		padding: 10px 10px 51px 10px;
		font-size: 16px;
		margin: 0 0 16px 0;
		border-bottom: 1px solid #e4dddd;
	}
	.true-answer, .your-answer {
		font-size: 16px;
	}
	.your-answer span{
		display: inline-block;
		margin: 0 0 10px 10px;
	}
	.true {
		color: #19be6b;
	}
	.false {
		color: #FF431E;
	}
	label i {
		font-size: 40px;
		cursor: pointer;
	}
	@media only screen and (max-width: 992px) {
		.content {
		    font-size: 3rem;
		}
		.answer {
		    font-size: 2.5rem;
		}
		.icon {
			font-size: 8rem;
		}
		.true-answer, .your-answer {
			font-size: 2rem;
		}
	}
</style>