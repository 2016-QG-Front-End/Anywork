<template>
	<li :key="questionItem.questionId" >
		<center class="num">
			题号 : {{this.index + 1}}
			<span class="socre">{{questionItem.socre}}分</span>
		</center> 
		<section>
			<div class="content">{{questionItem.content}}</div>
			<p class="answer"> A : {{questionItem.a}} </p>
			<p class="answer"> B : {{questionItem.b}} </p>
			<p class="answer"> C : {{questionItem.c}} </p>
			<p class="answer"> D : {{questionItem.d}} </p>
			<div>
				<span class="answer_option">
					<label :class="{on: selectItem === 'A'}" @click.stop="selectAnswer">A</label>
					{{questionItem.a}}
				</span>
	    		<span class="answer_option">
					<label :class="{on: selectItem === 'B'}" @click.stop="selectAnswer">B</label>
					{{questionItem.b}}
				</span>
	    		<span class="answer_option">
					<label :class="{on: selectItem === 'C'}" @click.stop="selectAnswer">C</label>
					{{questionItem.c}}
				</span>
	    		<span class="answer_option">
					<label :class="{on: selectItem === 'D'}" @click.stop="selectAnswer">D</label>
					{{questionItem.d}}
				</span>
			</div>
		</section>
	</li>
</template>

<script>
	export default {
		data () {
			return {
				selectItem : ''
			}
		},
		props: ['questionItem', 'index'],
		methods : {
			selectAnswer (e) {

				this.selectItem = e.target.innerHTML
				this.$emit('choose-select', {
					questionId: this.questionItem.questionId.toString(),
					studentAnswer: this.selectItem
				})
			}	
		}
	}
</script>

<style scoped>

	section {
	    border: 1px solid #dedede;
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
	    margin-bottom: 10px;
	    border: 0 rgba(255, 255, 255, 0);
	    border-bottom: 1px solid #dedede;
	    font-size: 22px;
       	white-space: pre-line;
	    word-wrap: break-word;
	    word-break: break-all;
	}
	.answer {
	    padding: 0 25px;
	    font-size: 16px;
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