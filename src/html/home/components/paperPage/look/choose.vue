<template>
	<div :key="questionItem.question.questionId" >
		<p class="true-answer">正确答案: {{this.questionItem.question.key}}</p>
		<p class="your-answer">你的答案: {{this.yourAnswe}} <span :class="[this.questionItem.isTrue?'true':'false']">{{this.questionItem.isTrue ? '(正确)' : '(错误)'}}</span></p>
		<center class="num">
			题号 : {{this.index + 1}}
			<span class="socre">{{questionItem.question.socre}}分</span>
		</center> 
		<section>
			<div class="content">{{questionItem.question.content}}</div>
			<p class="answer"> A : {{questionItem.question.a}} </p>
			<p class="answer"> B : {{questionItem.question.b}} </p>
			<p class="answer"> C : {{questionItem.question.c}} </p>
			<p class="answer"> D : {{questionItem.question.d}} </p>
			<div>
				<span class="answer_option">
					<label :class="[{trueResult: key === 'A'},{errorResult: studentAnswer === 'A'}]">A</label>
				</span>
	    		<span class="answer_option">
					<label :class="[{trueResult: key === 'B'},{errorResult: studentAnswer === 'B'}]">B</label>
				</span>
	    		<span class="answer_option">
					<label :class="[{trueResult: key === 'C'},{errorResult: studentAnswer === 'C'}]">C</label>
				</span>
	    		<span class="answer_option">
					<label :class="[{trueResult: key === 'D'},{errorResult: studentAnswer === 'D'}]">D</label>
				</span>
			</div>
		</section>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				key : '',
				studentAnswer: ''
			}
		},
		props: {
			questionItem: {
				required: true,
				default: () => {
					return  {
						question: {
						}
					}
				}
			},
			index: {
				required: true,
				default: 0
			}
		},
		computed: {
			yourAnswe () {
				if(this.questionItem.studentAnswer!==''){
					return this.questionItem.studentAnswer
				}else{
					return '未回答'
				}
			}
		},
		methods: {
			init() {
				if(this.questionItem.isTrue){
					this.key = this.questionItem.question.key
				}else{
					this.key = this.questionItem.question.key
					this.studentAnswer = this.questionItem.studentAnswer
				}
			}
		},
		watch: {
			questionItem: function() {
				this.init()
			}
		},
		mounted () {
			this.init()
		}
	}
</script>

<style scoped>

	section {
	    border: 1px solid #dedede;
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
	    margin-bottom: 10px;
	    border: 0 rgba(255, 255, 255, 0);
	    border-bottom: 1px solid #dedede;
	    font-size: 22px;
       	white-space: pre-line;
	    word-wrap: break-word;
	    word-break: break-all;
	}
	.answer {
	    padding: 0 25px;
	    font-size: 16px;
	}
	.trueResult {
	    background-color: #19be6b;
	    color: #fff;
	}
	.errorResult {
		background-color: #FF431E;
	    border: 1px solid #FF431E;
	    color: #fff;
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
	label {
		display: inline-block;
	    padding: 0 2rem;
	    margin: 1rem .5rem;
       	font-size: 1.2rem;
	    color: #19be6b;
	    border: 1px solid #19be6b;
	}
	input[type=radio] {
	    display: none;
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
	}
</style>