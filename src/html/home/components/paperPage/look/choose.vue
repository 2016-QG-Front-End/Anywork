<template>
	<div :key="questionItem.question.questionId" >
		
		<div class="num">
			{{this.index + 1}}&nbsp;/&nbsp;{{this.answerlength}}&nbsp;&nbsp;（单选题）
			<!-- <span class="socre">{{questionItem.question.socre}}分</span> -->
		</div> 
		<section>
			<div class="content">{{questionItem.question.content}}</div>
			<!-- <p class="answer"> A : {{questionItem.question.a}} </p>
			<p class="answer"> B : {{questionItem.question.b}} </p>
			<p class="answer"> C : {{questionItem.question.c}} </p>
			<p class="answer"> D : {{questionItem.question.d}} </p> -->
			<div>
				<span class="answer_option">
					<label :class="[{trueResult: key === 'A'},{errorResult: studentAnswer === 'A'}]">A</label>&nbsp;&nbsp;&nbsp;&nbsp;{{questionItem.question.a}}
				</span><br/>
	    		<span class="answer_option">
					<label :class="[{trueResult: key === 'B'},{errorResult: studentAnswer === 'B'}]">B</label>&nbsp;&nbsp;&nbsp;&nbsp;{{questionItem.question.b}}
				</span><br/>
	    		<span class="answer_option">
					<label :class="[{trueResult: key === 'C'},{errorResult: studentAnswer === 'C'}]">C</label>&nbsp;&nbsp;&nbsp;&nbsp;{{questionItem.question.c}}
				</span><br/>
	    		<span class="answer_option">
					<label :class="[{trueResult: key === 'D'},{errorResult: studentAnswer === 'D'}]">D</label>&nbsp;&nbsp;&nbsp;&nbsp;{{questionItem.question.d}}
				</span><br/>
			</div>
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
			},
			answerlength: {
				required: true
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
	    /* border: 1px solid #dedede; */
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
	.answer {
	    padding: 0 25px;
	    font-size: 16px;
	}
	.trueResult {
	    background-color: #548CFE;
	    color: #fff;
	}
	.errorResult {
		background-color: #FF431E;
	    border: 1px solid #FF431E;
	    color: #fff;
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
	label {
		display: inline-block;
		/* padding: 0.2rem 0.2rem; */
		margin: .7rem .5rem;
		font-size: 1.2rem;
		color: #548CFE;
		cursor: pointer;
		width: 32px;
		border: 1px solid #548CFE;
		height: 32px;
		text-align: center;
		border-radius: 5em;
		line-height: 32px;
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