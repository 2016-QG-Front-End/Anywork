<template>
	<div class="program-item" :key="index" >
		<center class="num">
			题号 : {{this.index + 1}}
			<span>分数: <Input-number class="socre-input" :min="0" size="small" v-model="score" ></Input-number></span>
		</center> 
		<section>
			<div class="content-wrap">{{this.content}}
				<textarea class="content" placeholder="请填写题目" @input="inputQuestion($event)" v-model="content"></textarea>
			</div>
			<div class="answer-wrap">{{this.answer}}
				<textarea class="answer" placeholder="答案" @input="inputAnswer($event)" v-model="answer"></textarea>
			</div>
		</section>
	</div>
</template>
<script>
	export default {
	    data: function(){
	    	return {
	    		score: 5,
	    		content: '',
	    		answer: ''
	    	}
	    },
		props:['index', 'question'],
	    computed: {
	    	info: function(){
	    		return {
	    			type: 5,
	    			other: 0,
	    			socre: this.score,
	    			questionId: 'program-' + this.index,
		    		content: this.content,
		    		key: this.answer,
	    		}
	    	}
	    },
	    watch: {
	    	info: function(state){
	    		this.$emit('set-question-item',this.info);
	    	}
	    },
	    methods:{
	        selectAnswer (e) {
				this.answer = e.target.innerHTML
			},
			inputQuestion (event) {
				var target = event.target ? event.target : event.srcElement;
				this.content = target.value
			},
			inputAnswer (event) {
				var target = event.target ? event.target : event.srcElement;
				this.answer = target.value
			}	
	    },
	    mounted() {
    		var question = this.question
	    	if(typeof question === 'object'){
	    		this.score = question.socre || 0;
	    		this.content = question.content || '';
	    		this.answer = question.key || ''
	    	}
	    },
	    beforeDestroy() {
	    	this.$emit('delete-question-item','program-'+ this.index)
	    }
	}
</script>

<style scoped>
	.program-item {
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

	.answer-wrap, .answer{
      	padding: 6px;
		font-size: 16px;
	}
	.answer-wrap {
		position: relative;
      	
      	margin-top: 10px;
		padding: 0 8px;
		min-height: 100px;
		
       	white-space: pre-wrap;  /* 使该 div 的填充字体时表现出来的换行效果与 textarea 一致 */ 
	    word-wrap: break-word;  /* 使该 div 的填充字体时表现出来的换行效果与 textarea 一致 */ 
	    word-break: break-all;  /* 使该 div 的填充字体时表现出来的换行效果与 textarea 一致 */ 
	}
  
	.answer {
		position: absolute;
		top: 0px;
		right: 0;
      
		width: 100%;
		height: 100%;  /* 使 textarea 的高度跟其父元素的高度保持一致 */
      
		color: #495060;
		border: 1px solid #dedede;
		outline: none;
	}
</style>