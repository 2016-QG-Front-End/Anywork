<template>
	<div :key="questionItem.question.questionId" >
		<!-- <p class="true-answer">正确答案: {{this.trueAnswer}}</p> -->
		<!-- <p class="your-answer">你的答案: {{this.yourAnswer}} <span :class="[this.questionItem.isTrue?'true':'false']">{{this.questionItem.isTrue ? '(正确)' : '(错误)'}}</span></p> -->
		<div class="num">
			{{this.index + 1}}&nbsp;/&nbsp;{{this.answerlength}}&nbsp;&nbsp;（填空题）
			<!-- <span class="socre">{{questionItem.question.socre}}分</span> -->
		</div> 
		<section>
			<pre class="content">{{questionItem.question.content}}</pre>
			<span class="pad-item" v-for="index in questionItem.question.other" :key="index">
				<span>{{index}}. </span>
				<Input class="pad-input" type="text"  disabled/>
			</span>
			<p class="true-answer">解析：正确答案为 {{this.questionItem.question.key}}， 你的答案为 {{this.yourAnswe}} <span :class="[this.questionItem.isTrue?'true':'false']">{{this.questionItem.isTrue ? '(正确)' : '(错误)'}}</span></p>
			<!-- <p class="your-answer">你的答案: {{this.yourAnswe}} <span :class="[this.questionItem.isTrue?'true':'false']">{{this.questionItem.isTrue ? '(正确)' : '(错误)'}}</span></p> -->
			<p class="true-analysis">
				{{this.questionItem.analysis ? this.questionItem.analysis : '此答案暂时没有解析'}}
			</p>
		</section>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				questionAnswer: {}
			}
		},
		props: ['questionItem', 'index', 'answerlength'],
		computed: {
			yourAnswer () {
				var arr = this.questionItem.studentAnswer.split('∏')
				return arr.join('   ；   ')
			},
			trueAnswer () {
				var arr = this.questionItem.question.key.split('∏')
				return arr.join('   ；   ')
			}
		},
		methods : {
	
		}
	}
</script>

<style scoped>

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
	.pad-item {
	    display: inline-block;
		margin: 10px 0 10px 20px;
	}
	.pad-input {
		width: 200px;
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

	@media only screen and (max-width: 992px) {
		.content {
		    font-size: 3rem;
		}
		.answer {
		    font-size: 2.5rem;
		}
		label {
			font-size: 3rem;
		    padding: 0 4rem;
		}

		.true-answer, .your-answer {
			font-size: 2rem;
		}
		.pad-item {
		    display: block;
			padding-left: 2rem;
			margin-bottom: 1rem;
		}
		.pad-input {
		    width: 80%;
		}
	}
</style>