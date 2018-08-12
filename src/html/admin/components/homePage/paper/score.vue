<template>
	<section>
		<h1>评分</h1>
		<section class="content-wrap">
			<div class="paper-info">
				<span class="title">科目：{{paper.testpaperTitle}}</span>
				<span class="score">总分：{{paper.testpaperScore}}</span>
				<span class="time">时间：{{createTimeFormat}} -- {{endingTimeFormat}}</span>
			</div> 
			<check-answer />
		</section>
	</section>
</template>

<script>
	import { mapState, mapActions} from 'vuex';
	import paper from  '../../../store/types/paper'

	import checkAnswer from './checkAnswer'

	export default {
		data: function(){
			return {
			}
		},
		components: {
			'check-answer' : checkAnswer
		},
		computed: {
			...mapState({
				'paper': state => {
					return state.paper
				},
			}),

			createTimeFormat () {
				return new Date(this.paper.createTime).toLocaleString().slice(0, -3)
			},
			endingTimeFormat () {
				return new Date(this.paper.endingTime).toLocaleString().slice(0, -3)
			}
		},
		methods: {
		}
	}
</script>

<style scoped>
	h1 {
		padding: 10px 20px 5px;
	    margin-bottom: 10px;
	    border-bottom: 1px solid #b4b4b4;
	}
	.content-wrap {
	    margin: 0 34px;
	}
	.paper-page {
		width: 70%;
		height: 100%;
		min-width: 1000px;
		margin: auto;
		padding: 10px;
		background-color: white;
		overflow: hidden;
	}

	.main {
		padding: 10px 20px;
	}

	.paper-info {
		position: relative;
		margin-bottom: 5px;
	}

	.paper-info span {
		display: inline-block;
	    margin: 10px 10px 10px 0;
	    padding: 3px 5px;
	    font-size: 20px;
	    box-shadow: 0 0 7px 0px #a6a6a6;
	}
	.score, .time{
		float: right;
	}
</style>