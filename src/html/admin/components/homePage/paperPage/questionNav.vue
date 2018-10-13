<template>
	<section>
		<ul @click="selectHandel">
			<p class="title">答题情况</p>
			<li 
				v-for="(item, index) in questionList"
				:class="[
					{right: item.isTrue && item.question.type <=3},
					{error: !item.isTrue && item.question.type <=3},
					{'un-score': item.question.type > 3},
					{select: index === select}
				]" 
				:index = "index"
				:questionId = "item.question.questionId"
			>
				{{index + 1}}
			</li>
		</ul>
		<center class="no-question-tip" v-if="questionList <= 0"> ~没有题目~ </center>
	</section>
</template>

<script>
	import { mapState, mapActions} from 'vuex';
	import paper from  '../../store/types/paper'

	import typetab from './questionTypeTab'

	export default {
		data: function(){
			return {
				select: 0
			}
		},
		props: ['questionList'],
		components: {

		},
		computed: {

		},
		methods: {
			selectHandel (e) {
				if(e.target.tagName.toUpperCase() === 'LI'){
					var index = Number(e.target.getAttribute('index'))
					this.select = index
					
					this.$emit('current-question', {
						index: index,
						questionId: Number(e.target.getAttribute('questionId')),
					})
				}
			}
		},		
		watch: {
			questionList: function() {
				this.select = 0
			}
		}
	}
</script>

<style scoped>
	ul {
		margin: 20px 100px 10px 10px;
	    padding: 0 0 10px;
	    border-bottom: 1px solid #dedede;
	}
	.title {
		font-size: 16px;
		font-weight: bold;
		margin-bottom: 5px;
	}
 	li {
		display: inline-block;
		width: 40px;
		height: 40px;
		margin: 5px;
		font-size: 18px;
		color: white;
		line-height: 40px;
		text-align: center;
		cursor: pointer;
		border-radius: 50%;
		transition: 0.3s all linear;
	}
 	/*li:hover {
		border-radius: 0;
	} */
	.right {
		background-color: #19be6b;
	}
	.error {
		background-color: #FF431E;
	}
	.un-score {
		background-color: #7b7b7b;
	}
	.select {
		border-radius: 20%;
	}
	.no-question-tip {
		font-size: 25px;
		margin: 20px;
		letter-spacing: 3px;
	}

	@media only screen and (max-width: 992px) {
		.title {
			font-size: 2rem;
		}
		li {
		    width: 6rem;
	    	height: 6rem;
	    	line-height: 6rem;
	    	font-size: 3.2rem;
		}
		.no-question-tip {
			 font-size: 37px;

		}
	}
</style>