<template>
	<div class="judge-item" :key="index" >
		<center class="num">
			题号 : {{this.index + 1}}
			<span>分数: <Input-number class="socre-input" :min="0" size="small" v-model="score" ></Input-number></span>
		</center> 
		<section>
			<div class="content-wrap">{{this.content}}
				<textarea class="content" placeholder="请填写题目" @input="inputQuestion($event)" v-model="content"></textarea>
			</div>
			<div class="judge-select">
				<span class="answer_option">
					<label @click="selectAnswer(1)"><Icon :type="'ios-checkmark'+ trueIcon" color="#19be6b"></Icon></label>
				</span>
				<span class="answer_option">
					<label @click="selectAnswer(0)"><Icon :type="'ios-close'+ falseIcon" color="#19be6b"></Icon></label>
				</span>
			</div>
		</section>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				score: 5,
				content: '',
				trueIcon: '',
				falseIcon: '-outline',
				questionAnswer: 1
			}
		},
		props: ['index', 'question'],
	    computed: {
	    	info: function(){
	    		return {
	    			type: 2,
	    			other: 0,
	    			socre: this.score,
	    			questionId: 'judge-' + this.index,
		    		content: this.content,
		    		key: this.questionAnswer.toString(),
	    		}
	    	}
	    },
	    watch: {
	    	info: function(state){
	    		this.$emit('set-question-item',this.info);
	    	},
	    	questionAnswer: function(result) {
	    		if(result){
					this.trueIcon = ''
					this.falseIcon = '-outline'
					this.questionAnswer = 1
				}else {
					this.falseIcon = ''
					this.trueIcon = '-outline'
					this.questionAnswer = 0
				}
	    	}
	    },
		methods : {
			selectAnswer (result) {
				this.questionAnswer = result
			},
			inputQuestion (event) {
				var target = event.target ? event.target : event.srcElement;
				this.content = target.value
			}	
		},
	    mounted() {
    		var question = this.question
	    	if(typeof question === 'object'){
	    		this.score = question.socre || 0;
	    		this.content = question.content || '';
	    		this.selectAnswer(Number(question.key))
	    	}
	    },
		beforeDestroy() {
	    	this.$emit('delete-question-item','judge-'+ this.index)
	    }
	}
</script>

<style scoped>
	.judge-item {
		margin-top: 10px;
	}
	section {
		padding: 10px 8px;
	    border: 1px solid #dedede;
	}
	.num {
		position: relative;
		color: white;
		line-height: 30px;
		background-color: rgb(0, 188, 155);
	}
	.num span {
		position: absolute;
		right: 5px;
		vertical-align: middle;
	}
	.socre-input {
		width: 50px;
	}
	.content-wrap, .content {   /* 统一div 和 textarea 的字体大小和padding*/ 
      	padding: 6px;
		font-size: 16px;
  	}
  
  	.content-wrap {
		position: relative;
      
		padding: 0 8px;
		min-height: 60px;
		
       	white-space: pre-wrap;  /* 使该 div 的填充字体时表现出来的换行效果与 textarea 一致 */ 
	    word-wrap: break-word;  /* 使该 div 的填充字体时表现出来的换行效果与 textarea 一致 */ 
	    word-break: break-all;  /* 使该 div 的填充字体时表现出来的换行效果与 textarea 一致 */ 
	}
  
	.content {
		position: absolute;
		top: 0px;
		right: 0;
      
		width: 100%;
		height: 100%;  /* 使 textarea 的高度跟其父元素的高度保持一致 */
      
		color: #495060;
		border: 1px solid #dedede;
		outline: none;
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