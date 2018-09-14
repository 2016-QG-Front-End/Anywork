<template>
	<section class="paper-page"> 
		<!-- <div class="paper-info">
			<span class="title">科目：{{paper.testpaperTitle}}</span>
			<span class="score">总分：{{paper.testpaperScore}}</span>
			<span class="time">时间：{{createTimeFormat}} -- {{endingTimeFormat}}</span>
		</div>  -->
		<div class="time"></div>
		<div class="time-choose">12:11:11</div>
		<div>
			<div class="answer-card">
				<img src="../../../assets/images/letter@1x.png" />
				答题卡
			</div>
			<div class="answer-card">回到顶部</div>
		</div>
		<router-view class="main"></router-view>
	</section>
</template>

<script>
	import { mapState, mapActions} from 'vuex';
	import paper from  '../store/types/paper'
	import user from '../store/types/user'

	export default {
		data: function(){
			return {
			}
		},
		computed: {
			...mapState({
				'paper': state => {
					return state.paper
				},
				'user': state => {
					return state.user
				}
			}),

			createTimeFormat () {
				return new Date(this.paper.createTime).toLocaleString().slice(0, -3)
			},
			endingTimeFormat () {
				return new Date(this.paper.endingTime).toLocaleString().slice(0, -3)
			}
		},
		methods: {
		},
	}
</script>

<style scoped>
	.time {
		width: 150px;
		height: 28px;

		position: fixed;
		top: 0;
		right: 74px;

			border-top: 30px solid #548CFE;
			border-right:20px solid transparent;
			border-bottom:0px solid transparent;
			border-left:20px solid transparent;
	}
	.time-choose {
		width: 150px;
		height: 28px;
		text-align: center;
		position: fixed;
		top: 0;
		right: 74px;
		line-height: 28PX;
		font-size: 1.5em;
		font-weight: 600;
		color:#fff;
	}
	.paper-page {
		width: 70%;
		height: 100%;
		min-width: 1000px;
		margin: auto;
		padding: 0 10px;
		background-color: white;
		overflow: hidden;
	}

	.main {
		padding: 10px 20px;
	}

	.paper-info {
		position: relative;
		border-bottom: 1px solid #a6a6a6;
	}

	.paper-info span {
		display: inline-block;
	    margin: 10px;
	    padding: 3px 5px;
	    font-size: 20px;
	    box-shadow: 0 0 7px 0px #a6a6a6;
	}
	.score, .time{
		float: right;
	}

	@media only screen and (max-width: 992px) {
		.paper-page {
			width: 100%;
			min-width: 0;
		}
		.paper-info {
		    padding-top: 1rem;
			padding-bottom: 1rem;
		}

		.paper-info span {
			font-size: 2rem;
		}

		.time {
			float: none;
		}
	}
</style>