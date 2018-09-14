<template>
	<li :key="questionItem.questionId" >
		<div class="num">
			{{this.index + 1}}&nbsp;/&nbsp;{{this.questionNumbers}}&nbsp;&nbsp;（填空题）
			<!-- <span class="socre">{{questionItem.socre}}分</span> -->
		</div> 
		<section>
			<pre class="content">{{questionItem.content}}</pre>
			<span class="pad-item" v-for="index in questionItem.other" :key="index">
				<!-- <span>{{index}}. </span> -->
				答:<Input class="pad-input" type="text" v-model="questionAnswer[index-1]" @input="selectAnswer" :key="index" />
			</span>
		</section>
	</li>
</template>

<script>
	export default {
		data () {
			return {
				questionAnswer: {}
			}
		},
		props: ['questionItem', 'index', 'questionNumbers'],
		methods : {
			selectAnswer () {
				var questionAnswer = this.questionAnswer
				var answer = new Array()
				for(let i=0; i<this.questionItem.other; i++){
					answer[i] = ''
				}

				var keyArr = Object.keys(questionAnswer)

				keyArr.forEach((item)=>{
					answer[item] = questionAnswer[item]
				})
				
				var studentAnswer = answer.join('∏')
				
				this.$emit('pad-enter', {
					questionId: this.questionItem.questionId.toString(),
					studentAnswer: studentAnswer
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
<style>
        input,input:active{
            border: none !important;
            /* border-bottom: 1px solid #d2d2d2 !important; */
            outline: none;
            box-shadow: none !important;
            width: 100%;
        }

</style>

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
	    font-size: 22px;
	    margin: 0 5px 10px;
        padding: 10px 10px 0;
        /* border-bottom: 1px solid #dedede; */
        overflow: auto;
	}
	.pad-item {
	    display: inline-block;
		margin: 10px 0 10px 20px;
		box-shadow: 0 0 2px 2px #548CFE;
		padding: 0px 10px 0 6px;
    	font-size: 1.3em;
		color: #548CFE;
	}
	.pad-input {
		width: 200px;
		border: none;
	}
	.pad-input input {
		border: none;
	}

	@media only screen and (max-width: 992px) {
		.content {
		    font-size: 3rem;
		}
		.answer {
		    font-size: 2.5rem;
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