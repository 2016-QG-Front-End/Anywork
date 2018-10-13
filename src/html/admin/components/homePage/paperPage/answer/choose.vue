<template>
	<li :key="questionItem.questionId" >
		<div class="num">
			{{this.index + 1}}&nbsp;/&nbsp;{{this.questionNumbers}}&nbsp;&nbsp;（单选题）
			<!-- <span class="socre">{{questionItem.socre}}分</span> -->
		</div> 
		<section>
			<div class="content">{{questionItem.content}}</div>
			<div>
				<span class="answer_option">
					<label :class="{on: selectItem === 'A'}" @click.stop="selectAnswer">A</label>
					&nbsp;&nbsp;&nbsp;&nbsp;{{questionItem.a}}
				</span><br/>
	    		<span class="answer_option">
					<label :class="{on: selectItem === 'B'}" @click.stop="selectAnswer">B</label>
					&nbsp;&nbsp;&nbsp;&nbsp;{{questionItem.b}}
				</span><br/>
	    		<span class="answer_option">
					<label :class="{on: selectItem === 'C'}" @click.stop="selectAnswer">C</label>
					&nbsp;&nbsp;&nbsp;&nbsp;{{questionItem.c}}
				</span><br/>
	    		<span class="answer_option">
					<label :class="{on: selectItem === 'D'}" @click.stop="selectAnswer">D</label>
					&nbsp;&nbsp;&nbsp;&nbsp;{{questionItem.d}}
				</span>
			</div>
		</section>
	</li>
</template>

<script>
import { mapState, mapActions} from 'vuex';
import paper from  '../../../store/types/paper'
	export default {
		data () {
			return {
				selectItem : '',
				paperQuestionListL: 0
			}
		},
		computed: {
			// 'paper': state => {
			// 	console.log(state.paper)
			// 	return state.paper
			// },
			// paperQuestionListL() {
			// 	return this.paper.paperQuestionList.length
			// }
			...mapState({
				'paper': state => {
					return state.paper
				},
				'user': state => {
					return state.user
				}
			}),
		},
		props: ['questionItem', 'index', 'questionNumbers'],
		methods : {

			selectAnswer (e) {
				// console.log(this.paper.paperQuestionList.length)
				this.selectItem = e.target.innerHTML
				this.$emit('choose-select', {
					questionId: this.questionItem.questionId.toString(),
					studentAnswer: this.selectItem
				})
			}	
		},
		mounted () {
			// this.paperQuestionListL = this.paper.paperQuestionList.length
			// console.log(this.questionItem)
			if (this.questionItem.key) {
				this.selectItem = this.questionItem.key
				this.$emit('choose-select', {
					questionId: this.questionItem.questionId.toString(),
					studentAnswer: this.selectItem
				})
				console.log(this.paperAnswer)
			}
		}
	}
</script>

<style scoped>
	.answer_option {
		font-size: 1.3em;
	}
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
	.on {
	    background-color: #548CFE;
	    color: #fff;
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
	}
</style>