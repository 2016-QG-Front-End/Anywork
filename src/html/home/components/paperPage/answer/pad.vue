<template>
	<li :key="questionItem.questionId" >
		<center class="num">
			题号 : {{this.index + 1}}
			<span class="socre">{{questionItem.socre}}分</span>
		</center> 
		<section>
			<pre class="content">{{questionItem.content}}</pre>
			<span class="pad-item" v-for="index in questionItem.other" :key="index">
				<span>{{index}}. </span>
				<Input class="pad-input" type="text" v-model="questionAnswer[index-1]" @input="selectAnswer" :key="index" />
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
		props: ['questionItem', 'index'],
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