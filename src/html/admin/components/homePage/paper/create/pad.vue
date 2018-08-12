<template>
	<div class="pad-item" :key="index" >
		<center class="num">
			题号 : {{this.index + 1}}
			<span>分数: <Input-number class="socre-input" :min="0" size="small" v-model="score" ></Input-number></span>
		</center> 
		<section>
			<div class="content-wrap">{{this.content}}
				<textarea class="content" ref="content" placeholder="请填写题目" @input="inputQuestion($event)" v-model="content"></textarea>
			</div>
			<div class="add_pad">
				<span @click="addPad">插入填空<Icon type="plus-circled"></Icon></span>
			</div>
			<div class="pads-wrap">
				<div v-for="(item, padIndex) in pads.length">
					<span class="pad-num">{{padIndex+1}}</span><Input type="text" class="input" v-model="pads[padIndex].val"></Input>
					<span @click="deletePad(padIndex)"><Icon class="delete_pad" type="close-round"></Icon></span>
				</div>
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
				pads: [],
	    	}
	    },
		props:['index', 'question'],
	    computed: {
	    	padKey (state) {
	    		var keys = []
	    		this.pads.forEach((item) => {
	    			keys.push(item.x)
	    		})
	    		return keys
	    	},
	    	info: function(){
	    		return {
	    			type: 3,
	    			other: this.pads.length,
	    			socre: this.score,
	    			questionId: 'pad-' + this.index,
		    		content: this.content,
		    		key: this.padKey.join('∏'),

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
			},
			addPad: function(e, padVal){
				var num = Number(this.pads.length) + 1;
				var text='(___'+num+'___)';
	            var content = this.content;
	            this.pads.push({val: padVal || ''});

	            var obj = this.$refs.content //obj为文本框
	            console.log(obj)
                var startPos = obj.selectionStart;
                var endPos = obj.selectionEnd;
	            if(padVal===undefined) {
		            if (obj.selectionStart || obj.selectionStart == '0'){
		                console.log(startPos, endPos)
		                this.pads[num-1].val = obj.value.substring(startPos,endPos);
		                content = (obj.value.substring(0, startPos) + text + obj.value.substring(endPos, obj.value.length));
		                obj.selectionStart = startPos + text.length;
		                obj.selectionEnd = startPos + text.length;
		            } else {
		                content += text;
		            }
		            obj.focus();
		            obj.setSelectionRange(content.length,content.length)
	            }
	            this.content = content;
			},
			deletePad: function(num){
				this.pads.splice(num,1);
			}
	    },	    
	    mounted() {
    		var question = this.question
	    	if(typeof question === 'object') {
	    		if(question.key && question.key.length > 0){
		    		var arr = question.key.split('∏')
		    		arr.forEach((item) => {
		    			this.addPad(undefined, item)
		    		})
	    		}
	    		this.score = question.socre || 0;
	    		this.content = question.content || '';
	    	}
	    },
	    beforeDestroy() {
	    	this.$emit('delete-question-item','pad-'+ this.index)
	    }
	}
</script>

<style scoped lang="less">
	.pad-item {
		margin-top: 10px;
	}
	section {
	    border: 1px solid #dedede;
	    padding: 10px 8px;
	    overflow: hidden;
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
		min-height: 100px;
		
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

	.add_pad {
		padding: 10px 10px 0;
		float: right;
		font-size: 18px;
		color: #00bc9b;

		span {
			cursor: pointer;
		}
	}
</style>

<style lang="less">
	.pads-wrap {
		margin-left: 5px;
		margin-right: 100px;
		
		div {
			display: inline-block;
			position: relative;
			margin-right: 8px;
			margin-top: 5px;
		}

		.pad-num {
		    position: absolute;
		    top: 5px;
		    left: 0px;
		    z-index: 1;
		    width: 21px;
		    line-height: 32px;
		    text-align: center;
		    border-right: 1px solid #dedede;
		}

		.input {
			width: 200px;
			
			input {
				padding-left: 25px;
				padding-right: 20px;
			}
		}

		.delete_pad {
		    position: absolute;
		    right: 8px;
		    top: 5px;
		    line-height: 32px;
		    width: 22px;
		    display: inline-block;
		    text-align: center;
		    cursor: pointer;
		}

	}
</style>