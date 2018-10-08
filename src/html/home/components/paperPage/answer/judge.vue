<template>
	<li :key="questionItem.questionId" >
		<div class="num">
			{{this.index + 1}}&nbsp;/&nbsp;{{this.questionNumbers}}&nbsp;&nbsp;（判断题）
			<!-- <span class="socre">{{questionItem.socre}}分</span> -->
		</div> 
		<section>
			<div class="content" >{{questionItem.content}}</div> 
			<div class="judge-select">
				<span class="answer_option">
					<label @click="selectAnswer(1)"><Icon :type="'ios-checkmark'+ trueIcon" color="#548CFE" class="icon"></Icon></label>
					
				</span><br/>
				<span class="answer_option">
					<label @click="selectAnswer(0)"><Icon :type="'ios-close'+ falseIcon" color="#548CFE"  class="icon"></Icon></label>
				</span>
			</div>
		</section>
	</li>
</template>

<script>
	export default {
		data () {
			return {
				trueIcon: '-outline',
				falseIcon: '-outline',
				questionAnswer: undefined
			}
		},
		props: ['questionItem', 'index', 'questionNumbers'],
		methods : {
			selectAnswer (result) {
				if(result){
					this.trueIcon = ''
					this.falseIcon = '-outline'
					this.questionAnswer = 1
				}else {
					this.falseIcon = ''
					this.trueIcon = '-outline'
					this.questionAnswer = 0
				}
				this.$emit('judge-select', {
					questionId: this.questionItem.questionId.toString(),
					studentAnswer: this.questionAnswer
				})
			}	
		},
		mounted () {
			// this.paperQuestionListL = this.paper.paperQuestionList.length
			// console.log(this.questionNumbers)
			if (this.questionItem.key) {
				this.questionAnswer = this.questionItem.key
				// this.$emit('choose-select', {
				// 	questionId: this.questionItem.questionId.toString(),
				// 	studentAnswer: this.questionAnswer
				// })
				this.selectAnswer(parseInt(this.questionItem.key))
			}
		}
	}
</script>

<style scoped>
	.icon {
		height: 30px;
		width: 30px;
		margin: .7rem 0;
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
		label i{
			font-size: 8rem;
		}
	}
</style>