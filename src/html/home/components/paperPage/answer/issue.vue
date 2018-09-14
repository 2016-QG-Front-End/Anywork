<template>
	<li :key="questionItem.questionId" >
		<div class="num">
			{{this.index + 1}}&nbsp;/&nbsp;{{this.questionNumbers}}&nbsp;&nbsp;（简答题）
			<!-- <span class="socre">{{questionItem.socre}}分</span> -->
		</div> 
		<section>
			<div class="content" >{{questionItem.content}}</div> 
			<dir class="answer-wrap">{{questionAnswer}}
				<textarea class="issue-answer" rows='1' cols='1' @input="selectAnswer($event)"></textarea>
			</dir>
		</section>
	</li>
</template>

<script>
	export default {
		data () {
			return {
				questionAnswer: '',
			}
		},
		props: ['questionItem', 'index', 'questionNumbers'],
		methods : {
			selectAnswer (event) {
				var target = event.target ? event.target : event.srcElement;
				this.questionAnswer = target.value
				this.$emit('issue-answer', {
					questionId: this.questionItem.questionId.toString(),
					studentAnswer: this.questionAnswer
				})
			}	
		},
		mounted () {
			// this.paperQuestionListL = this.paper.paperQuestionList.length
			// console.log(this.questionNumbers)
			if (questionItem.key) {
				this.questionAnswer = questionItem.key
				this.$emit('choose-select', {
					questionId: this.questionItem.questionId.toString(),
					studentAnswer: this.questionAnswer
				})
			}
		}
	}
</script>

<style scoped>
	section {
	    /* border: 1px solid #dedede; */
	    padding: 0.1px;
	    padding-bottom: 0px;
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
	    border: 0 rgba(255, 255, 255, 0);
	    /* border-bottom: 1px solid #dedede; */
	    font-size: 22px;
       	white-space: pre-wrap;
	    word-wrap: break-word;
	    word-break: break-all;
	}
	.answer-wrap {
		position: relative;
		padding: 0 8px;
		margin: 10px 8px;
		min-height: 44px;
		padding: 6px;
		font-size: 16px;
       	white-space: pre-wrap;
	    word-wrap: break-word;
	    word-break: break-all;
	}
	.issue-answer {
		position: absolute;
		top: 0px;
		right: 0;
		width: 100%;
		height: 100%;
		padding: 6px;
		font-size: 16px;
		color: #495060;
		box-shadow: 0 0 2px 2px #548CFE;
		overflow: hidden;
		outline: none;
		resize:none;
	}

	@media only screen and (max-width: 992px) {
		.content {
		    font-size: 3rem;
		}
		.answer-wrap {
			min-height: 25rem;
		    font-size: 2.5rem;
		}
		.issue-answer {
		    font-size: 2.5rem;
		}
	}
</style>