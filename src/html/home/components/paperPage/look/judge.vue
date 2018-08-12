<template>
	<div :key="questionItem.question.questionId" >
		<p class="true-answer">正确答案: {{this.trueAnswer}}</p>
		<p class="your-answer">你的答案: {{this.yourAnswer}} <span :class="[this.questionItem.isTrue?'true':'false']">{{this.questionItem.isTrue ? '(正确)' : '(错误)'}}</span></p>
		<center class="num">
			题号 : {{this.index + 1}}
			<span class="socre">{{questionItem.question.socre}}分</span>
		</center> 
		<section>
			<div class="content" >{{questionItem.question.content}}</div> 
			<div class="judge-select">
				<span class="answer_option">
					<label><Icon :type="'ios-checkmark'+ trueIcon" class="icon" :class="[!this.questionItem.isTrue && yourAnswer === true ? 'error-answer' : '']" ></Icon></label>
				</span>
				<span class="answer_option">
					<label><Icon :type="'ios-close'+ falseIcon" class="icon" :class="[!this.questionItem.isTrue && yourAnswer === false ? 'error-answer' : '']" ></Icon></label>
				</span>
			</div>
		</section>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				trueIcon: '-outline',
				falseIcon: '-outline',
			}
		},
		props: ['questionItem', 'index'],
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
		}
	}
</script>

<style scoped>
	section {
	    border: 1px solid #dedede;
	    padding: 0.1px;
	}
	.num {
		position: relative;
		background-color: rgb(0, 188, 155);
		color: white;
	}
	.num span {
		position: absolute;
		right: 0;
		padding: 0 10px;
		background-color: rgb(0, 149, 124);
	}
	.content {
        width: 100%;
	    padding: 10px 10px 0;
	    border: 0 rgba(255, 255, 255, 0);
	    border-bottom: 1px solid #dedede;
	    font-size: 22px;
       	white-space: pre-line;
	    word-wrap: break-word;
	    word-break: break-all;
	}
	input[type='radio'] {
		display: none;
	}
	.judge-select {
		margin: 10px 0 10px 15px;
	}
	.answer_option {
		margin: 5px;
	}
	.icon {
		color: #19be6b; 
		font-size: 40px;
	}
	.error-answer {
		color: red;
	}

	.true-answer {
		margin-top: 20px;
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