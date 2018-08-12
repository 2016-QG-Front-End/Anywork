<template>
	<li :key="questionItem.questionId" >
		<center class="num">
			题号 : {{this.index + 1}}
			<span class="socre">{{questionItem.socre}}分</span>
		</center> 
		<section>
			<div class="content" >{{questionItem.content}}</div> 
			<div class="judge-select">
				<span class="answer_option">
					<label @click="selectAnswer(1)"><Icon :type="'ios-checkmark'+ trueIcon" color="#19be6b"></Icon></label>
				</span>
				<span class="answer_option">
					<label @click="selectAnswer(0)"><Icon :type="'ios-close'+ falseIcon" color="#19be6b"></Icon></label>
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
		props: ['questionItem', 'index'],
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