<template>
	<div :key="questionItem.question.questionId" >
		<p class="true-answer">正确答案: {{this.trueAnswer}}</p>
		<p class="your-answer">你的答案: {{this.yourAnswer}} <span :class="[this.questionItem.isTrue?'true':'false']">{{this.questionItem.isTrue ? '(正确)' : '(错误)'}}</span></p>
		<center class="num">
			题号 : {{this.index + 1}}
			<span class="socre">{{questionItem.question.socre}}分</span>
		</center> 
		<section>
			<pre class="content">{{questionItem.question.content}}</pre>
			<span class="pad-item" v-for="index in questionItem.question.other" :key="index">
				<span>{{index}}. </span>
				<Input class="pad-input" type="text"  disabled/>
			</span>
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
		props: ['questionItem', 'index'],
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
	    font-size: 22px;
	    margin: 0 5px 10px;
        padding: 10px 10px 0;
        border-bottom: 1px solid #dedede;
        overflow: auto;
	}
	.pad-item {
	    display: inline-block;
		margin: 10px 0 10px 20px;
	}
	.pad-input {
		width: 200px;
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