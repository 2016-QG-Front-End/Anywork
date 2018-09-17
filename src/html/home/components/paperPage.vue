<template>
	<section class="paper-page"> 
		<!-- <div class="paper-info">
			<span class="title">科目：{{paper.testpaperTitle}}</span>
			<span class="score">总分：{{paper.testpaperScore}}</span>
			<span class="time">时间：{{createTimeFormat}}  {{endingTimeFormat}}</span>
		</div>  -->
		<!-- <div class="time"></div>
		<div class="time-choose">12:11:11</div> -->
		<div class="paper-nav">
			<div>
				<img src="../../../assets/images/preview@1x.png"/>
				<div>{{testName}}</div>
			</div>
			<img src="../../../assets/images/anywork@2x.png"/>
		</div>
		<div class="tools-choose">
			<div class="answer-card" v-if="isAnswer">{{hour}}:{{min}}:{{sec}}</div>
			<div class="answer-card" v-if="isAnswer">
				<img src="../../../assets/images/papre.png" />
				答题卡
			</div>
			<div class="answer-card" v-on:click="toTop">回到<br/>顶部</div>
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
				time: new Date(),
				currTime: new Date(),//当前日期对象
				secs: 0,
				mins:0,
				hours: 0,
				isAnswer: true,
				testName: null,
			}
		},
		// props: ['testPaperType'],
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
			},
			sec () {
				if (this.secs < 10) {
					return '0' + this.secs;
				} else  {
					return '' + this.secs;
				}

			},
			min() {//将当前的分钟数转化为分针旋转的度数
				if (this.sec == 60) {
					this.secs = 0
					++this.mins;
				}
				if (this.mins < 10) {
					return '0' + this.mins;
				} else {
					return '' + this.mins;
				}
			},
			hour() {//将当前的小时数转化为时针旋转的度数
				// return this. currTime.getHours() - this.time.getHours();
				if (this.mins == 60) {
					this.mins = 0
					++this.hours;
				}
				if (this.hours < 10) {
					return '0' + this.hours;
				} else {
					return '' + this.hours;
				}
			}
		},
		methods: {
			toTop: function () {
				// let top = document.body.scrollTop || document.documentElement.scrollTop
				let setTime = setInterval(function () {
					let top = document.body.scrollTop || document.documentElement.scrollTop
					let speed = (document.body.scrollTop || document.documentElement.scrollTop) / 4
					if (top) {
						top -= speed
					} else {
						top = 0
						clearInterval(setTime)
					}
					document.body.scrollTop = document.documentElement.scrollTop = top
				}, 30)
				// document.body.scrollTop = document.documentElement.scrollTop = 0;
			},
			showTime: function () {
				let time = new Date()

			},
			getQueryStringArgs(url){
				url = url == null ? window.location.href : url;
				var qs = url.substring(url.lastIndexOf("?") + 1);
				var args = {};
				var items = qs.length > 0 ? qs.split('&') : [];
				var item = null;
				var name = null;
				var value = null;
				for(var i=0; i<items.length; i++){
					item = items[i].split("=");
					//用decodeURIComponent()分别解码name 和value（因为查询字符串应该是被编码过的）。
					name = decodeURIComponent(item[0]);
					value = decodeURIComponent(item[1]);
		
					if(name.length){
						args[name] = value;
					}
				}
				if (args.test == 1) {
					this.testName = '课程考试'
				} else if (args.test == 2) {
					this.testName = '课前预习'
				} else {
					this.testName = '课后练习'
				}
				// this.testPaperType =  args.test;
			}
		},
		mounted () {
			// this.time = new Date()
			// this.currTime = new Date();
			let that = this
			setInterval(()=>{//钩子函数，在实例创建的时候运行定时器，我们只需要动态刷新当前的日期对象即可
				that.secs++
			},1000)
			if (location.href =='http://localhost:8080/html/home.html#/paperPage/lookAnswer') {
				this.isAnswer = false
			}
			if (this.$route.params.testPaperType == 1) {
					this.testName = '课程考试'
				} else if (this.$route.params.testPaperType == 2) {
					this.testName = '课前预习'
				} else {
					this.testName = '课后练习'
				}
			// this.getQueryStringArgs(location.href)
			
		}
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
	.paper-nav {
		display: flex;
		padding: 10px 32px;
		align-items: center;
		justify-content: space-between;
		margin: 100px 0 0 0;
	}
	.paper-nav div {
		display: flex;
		/* padding: 10px 32px; */
		align-items: center;
		font-size: 1.4em;
    	font-weight: 600;
		color:#548CFE;
	}
	.paper-nav div  div {
		margin: 0 0 0 20px;
	}
	.tools-choose {
		position: fixed;
		bottom: 70px;
    	right: 60px;
	}
	.answer-card {
		width: 70px;
		height: 70px;
		background-color: #548CFE;
		margin: 10px 0 10px 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-radius: 5em;
		font-size: 14px;
		color: #fff;
		cursor: pointer;
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