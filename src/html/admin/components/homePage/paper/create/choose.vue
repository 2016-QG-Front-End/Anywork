<template>
	<div class="choose-item" :key="index" >
		<center class="num">
			题号 : {{this.index + 1}}
			<span>分数: <Input-number class="socre-input" :min="0" size="small" v-model="score" ></Input-number></span>
		</center> 
		<section>
			<div class="content-wrap">{{this.content}}
				<textarea class="content" placeholder="请填写题目" @input="inputQuestion($event)" :value="content"></textarea>
			</div>
			<p class="answer"> A : <Input class="answer-input" type="text" v-model="answerA"></Input> </p>
			<p class="answer"> B : <Input class="answer-input" type="text" v-model="answerB"></Input> </p>
			<p class="answer"> C : <Input class="answer-input" type="text" v-model="answerC"></Input> </p>
			<p class="answer"> D : <Input class="answer-input" type="text" v-model="answerD"></Input> </p>
			<div class="select-wrap">
				<span class="answer_option">
					<label :class="{on: selectItem === 'A'}" @click.stop="selectAnswer">A</label>
				</span>
	    		<span class="answer_option">
					<label :class="{on: selectItem === 'B'}" @click.stop="selectAnswer">B</label>
				</span>
	    		<span class="answer_option">
					<label :class="{on: selectItem === 'C'}" @click.stop="selectAnswer">C</label>
				</span>
	    		<span class="answer_option">
					<label :class="{on: selectItem === 'D'}" @click.stop="selectAnswer">D</label>
				</span>
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
	    		answerA: '',
	    		answerB: '',
	    		answerC: '',
	    		answerD: '',
	    		selectItem: 'A'
	    	}
	    },
		props:['index', 'question'],
	    computed: {
	    	info: function(){
	    		return {
	    			type: 1,
	    			other: 0,
	    			socre: this.score,
	    			questionId: 'choose-' + this.index,
		    		content: this.content,
		    		a: this.answerA,
		    		b: this.answerB,
		    		c: this.answerC,
		    		d: this.answerD,
		    		key: this.selectItem,
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
				this.selectItem = e.target.innerHTML
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
	    		this.answerA = question.a || '';
	    		this.answerB = question.b || '';
	    		this.answerC = question.c || '';
	    		this.answerD = question.d || '';
	    		this.content = question.content || '';
	    		this.selectItem = question.key || 'A'
	    	}
	    },
	    beforeDestroy() {
	    	this.$emit('delete-question-item','choose-'+ this.index)
	    }
	}
</script>

<style scoped>
	.choose-item {
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
/* 	.content-wrap {
        width: 100%;
    border-bottom: 1px solid #dedede;
}
.content-wrap textarea {
    border: 0 rgba(255, 255, 255, 0);
    padding: 10px 10px 0;
	width: 100%;
    font-size: 16px;
} */
	.answer {
		margin-top: 10px;
	    padding: 0 10px;
	    font-size: 16px;
	}
	.answer-input {
		width: 300px;
	}
	.select-wrap {
		margin-left: 5px;
	}
	.on {
	    background-color: #19be6b;
	    color: #fff;
	}
	label {
		display: inline-block;
	    padding: 0 2rem;
	    margin: 1rem .5rem;
       	font-size: 1.2rem;
	    color: #19be6b;
	    cursor: pointer;
	    border: 1px solid #19be6b;
	}
</style>