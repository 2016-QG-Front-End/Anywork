<template>
	<section class="paper-page"> 
		<div class="paper-info">
			<span class="title">科目：{{paper.testpaperTitle}}</span>
			<span class="score">总分：{{paper.testpaperScore}}</span>
			<span class="time">时间：{{createTimeFormat}} -- {{endingTimeFormat}}</span>
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