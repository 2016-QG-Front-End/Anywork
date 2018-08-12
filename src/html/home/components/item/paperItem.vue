<template>
	<section class="page-item" @click="handel">
		<span class="has-down-tip" v-show="hasDown"><Icon type="ios-checkmark"></Icon></span>
		<p class="title">{{this.type}}</p>
		<div class="info-wrap">
			<p>{{this.type}}题目： {{this.testpaperTitle}}</p>
			<p>开始时间： {{this.createTimeFormat}}</p>
			<p>结束时间： {{this.endingTimeFormat}}</p>
			<p>试卷总分： {{this.testpaperScore}}</p>
		</div>
	</section>
</template>

<script>
	import { IP } from 'src/utils/interaction'
	import { mapActions} from 'vuex';
	import paper from  '../../store/types/paper'
	export default {
		data () {
			return {
				type: '',
				hasDown: 0
			}
		},
		props: ['createTime', 'endingTime', 'testpaperId', 'testpaperTitle', 'testpaperScore', 'testpaperType','chapterId'],
		computed: {
			createTimeFormat () {
				return new Date(this.createTime).toLocaleString().slice(0, -3)
			},
			endingTimeFormat () {
				return new Date(this.endingTime).toLocaleString().slice(0, -3)
			}
		},
		methods: {
			...mapActions(paper.actions),
			
			handel() {
				this.setPaperInfo({
					createTime: this.createTime,
					endingTime: this.endingTime,
					testpaperId: this.testpaperId,
					testpaperTitle: this.testpaperTitle,
					testpaperScore: this.testpaperScore,
					testpaperType: this.testpaperType,
					hasDown: this.hasDown
				})
				this.$router.push({
					name: 'answerPaper',
				})
			}
		},
		created () {
			this.testpaperType === 0 ? this.type = '练习' : this.type = '考试'
			this.hasDown = Number(this.chapterId) === -1 ? 0 : 1    //因需求原因将 -1 表示未做过试卷，0表示做过试卷
		}
	}
</script>

<style scoped>
	.page-item {
		position: relative;
		width: 210px;
		height: 120px;
		max-height: 120px;
		padding: 0 0 25px;
		box-shadow: 0 0 1px 0.2px #a09e9e;
		cursor: pointer;
	}
	.page-item:hover {
		box-shadow: 0 0 1px 0.7px #60c793;
	}
	.title {
		text-align: center;
		background-color: rgb(0, 188, 155);
		color: white;
		padding: 3px;
	}
	.info-wrap {
		padding: 5px;
	}
	.has-down-tip {
		position: absolute;
       	top: -3px;
    	right: 4px;
	    color: #ffffff;
	    font-size: 20px;
	}

	@media only screen and (max-width: 992px) {
		.page-item {
		    width: 100%; 
		    height: auto; 
		    max-height: 20rem; 
		    margin-bottom: 40px;
		    box-shadow: 0 0 1rem 1.2px #a09e9e;
		}

		.has-down-tip {
		    top: -7px;
		    right: 11px;
		    font-size: 3rem;
		}
	}
</style>