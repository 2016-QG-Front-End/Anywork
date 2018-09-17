<template>
	<li :key="questionItem.questionId" >
		<center class="num">
			<!-- 题号 : {{this.index + 1}} -->
			<!-- {{this.index + 1}}&nbsp;/&nbsp;{{this.questionNumbers}}&nbsp;&nbsp;（判断题） -->
			<span class="socre">{{questionItem.socre}}分</span>
		</center> 
		<section>
			<div class="content" >{{questionItem.content}}</div> 
			<dir class="answer-wrap">{{questionAnswer}}
				<!-- <textarea class="issue-answer" @input="selectAnswer($event)"></textarea> -->
				<!-- <div class="right-editer-context">-->
                
					<editor v-model="content"  @init="editorInit"  theme="chrome"  id="editor" ></editor>
                <!-- </div> -->
			</dir>
		</section>
	</li>
</template>
<script>

</script>
<script>
import editor from 'vue2-ace-editor'
	// var editor
    // class Editor {
    //     constructor(el) {

    //     }
    //     init ()  {
	// 		var editor = ace.edit("editor");
	// 		editor.setTheme("ace/theme/clouds");
	// 		editor.getSession().setMode("ace/mode/sql");
    //     }
    // }
	export default {
		data () {
			return {
				questionAnswer: '',
				content: ''
			}
		},
		props: ['questionItem', 'index'],
		components: {
			editor: editor,
		},
		watch: {
			content: function (val) {
				// var target = event.target ? event.target : event.srcElement;
				// this.questionAnswer = target.value
				this.$emit('program-answer', {
					questionId: this.questionItem.questionId.toString(),
					studentAnswer: val
				})
				// console.log(val)
			}
		},
		methods : {
			selectAnswer (event) {
				// console.log(event)
				// var target = event.target ? event.target : event.srcElement;
				// this.questionAnswer = target.value
				// this.$emit('program-answer', {
				// 	questionId: this.questionItem.questionId.toString(),
				// 	studentAnswer: this.questionAnswer
				// })
			},
			editorInit: function () {
				require('brace/ext/language_tools') //language extension prerequsite...
				require('brace/mode/html')                
				require('brace/mode/javascript')    //language
				require('brace/mode/less')
				require('brace/theme/chrome')
				require('brace/snippets/javascript') //snippet
			}
		},
		mounted () {
			// editor = new Editor()
			// editor.init()
		}


	}
</script>


<style scoped>
#editor {
    margin: 0;
    width: 100%;
    height: 100%;
    min-height: 150px;
}
.right-editer-context {
    width: 100%;
    height: 100%;
}
section {
    border: 1px solid #dedede;
    padding: .1px;
}
.num {
    position: relative;

    color: white;
    background-color: rgb(0, 188, 155);
}
.num span {
    position: absolute;
    right: 0;

    padding: 0 10px;

    background-color: rgb(0, 149, 124);
}
.content {
    border: 0 rgba(255, 255, 255, 0);
    border-bottom: 1px solid #dedede;
    padding: 10px 10px 0;
    width: 100%;

    font-size: 22px;
    white-space: pre-wrap;
    word-wrap: break-word;
    word-break: break-all;
}
.answer-wrap {
    display: flex;

    position: relative;

    margin: 0;

/* padding: 0 8px; */
    padding: 0;
    min-height: 150px;

    font-size: 16px;
    white-space: pre-wrap;
    word-wrap: break-word;
    word-break: break-all;
}
.issue-answer {
    position: absolute;
    top: 0;
    right: 0;

    border: 1px solid #dedede;
    padding: 6px;
    width: 100%;
    height: 100%;

    font-size: 16px;

    color: #495060;

    outline: none;
}


@media only screen and (max-width: 992px) {
    .content {
        font-size: 3rem;
    }
    .answer-wrap {
        min-height: 25rem;

        font-size: 2.5rem;
    }
    .issue-answer {
        font-size: 2.5rem;
    }
}






































</style>