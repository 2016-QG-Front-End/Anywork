<template>
	<div :key="questionItem.question.questionId" >
		<div class="mark">
			<span>评分：</span><Input class="mark-input" type="text" v-model="score"></Input>
		</div>
		<center class="num">
			题号 : {{this.index + 1}}
			<span class="socre">{{questionItem.question.socre}}分</span>
		</center> 
		<section>
			<div class="content" >{{questionItem.question.content}}</div> 
			<dir class="answer-wrap">
				<div class="issue-answer" @input="selectAnswer"></div>
			</dir>
		</section>
		<div class="true-answer">
			正确答案: 
			<p>{{this.questionItem.question.key}}</p>
		</div>
		<div class="your-answer">学生的答案:</span>
			<p>{{this.questionItem.studentAnswer}}</p> 
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				questionAnswer: '',
				score: 0
			}
		},
		props: ['questionItem', 'index', 'mark'],
		methods : {
			selectAnswer (e) {
				this.questionAnswer = e.target.innerText
				this.$emit('issue-answer', {
					questionId: this.questionItem.question.questionId.toString(),
					studentAnswer: this.questionAnswer
				})
			}	
		},
		watch: {
			score: function(val) {
				if(!isNaN(val)){
					this.$emit('set-score', {
						questionId: this.questionItem.question.questionId,
						score: Number(val),
					})
				}else{
					this.$emit('set-score', {
						questionId: this.questionItem.question.questionId,
						score: 0,
					})
				}
			},
		},
		mounted() {
			if(this.mark !== undefined){
				this.score = this.mark
			}else{
				this.score = this.questionItem.socre
			}
		}
	}
</script>

<style scoped>	
	.mark {
		text-align: right;
		margin: 22px 0;
	}
	.mark:after {
		content: '';
		display: table;
		clear: both;
	}
	.mark span {
		font-size: 18px;
		font-weight: bold;
		color: green;
	}
	.mark-input {
		display: inline-block;
		width: 85px;
	}
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
       	white-space: pre-wrap;
	    word-wrap: break-word;
	    word-break: break-all;
	}
	.answer-wrap {
		padding: 0 8px;
		margin: 10px 0;
	}
	.issue-answer {
		width: 100%;
		max-width: 100%;
		min-height: 80px;
		padding: 6px;
		font-size: 16px;
		color: #495060;
		border: 1px solid #dedede;
		outline: none;
	}
	.true-answer {
		margin-top: 20px;
	}
	.true-answer, .your-answer {
		font-size: 16px;
		margin-bottom: 10px;
	}
	.your-answer {
		margin-bottom: 10px;
    	padding-bottom: 30px;
	}
	.true-answer p, .your-answer p {
		padding: 8px;
		border: 1px solid #dedede;
		white-space: pre-wrap;
	    word-wrap: break-word;
	    word-break: break-all;
	}
	.your-answer span{
		display: inline-block;
		margin: 0 0 20 10px;
	}

	@media only screen and (max-width: 992px) {
		.content {
		    font-size: 3rem;
		}
		.issue-answer {
		    font-size: 2.5rem;
		    min-height: 8rem;
		}
		.true-answer, .your-answer {
			font-size: 2rem;
		}
	}
</style>