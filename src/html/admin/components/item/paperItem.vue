<template>
	<section class="page-item" :class="{'pointer': testpaperType}" @click="handel"  v-if="showPaper">
		<p class="title">{{this.type}}</p>
		<div class="info-wrap">
			<p>{{this.type}}题目： {{this.testpaperTitle}}</p>
			<p>开始时间： {{this.createTimeFormat}}</p>
			<p>结束时间： {{this.endingTimeFormat}}</p>
			<p>试卷总分： {{this.testpaperScore}}</p>
		</div>
		<span class="delete" @click.stop.prevent="deleteHandel"><Icon type="ios-close-outline"></Icon></span>
		<span class="download" @click.stop.prevent="toDownloadPaper"><Icon type="ios-download-outline"></Icon></span>
	</section>
</template>

<script>
	import { IP } from 'src/utils/interaction'
	import { mapState, mapActions} from 'vuex';
	import user from  '../../store/types/user'
	import paper from  '../../store/types/paper'
	import organization from '../../store/types/organization'
	export default {
		data () {
			return {
				type: '',
				hasDown: 0,
				showPaper: true,
			}
		},
		props: ['createTime', 'endingTime', 'testpaperId', 'testpaperTitle', 'testpaperScore', 'testpaperType','chapterId'],
		computed: {
			...mapState({
				'user' : (state) => state.user,
				'organization' : (state) => state.organization,
			}),

			createTimeFormat () {
				return new Date(this.createTime).toLocaleString().slice(0, -3)
			},
			endingTimeFormat () {
				return new Date(this.endingTime).toLocaleString().slice(0, -3)
			},
			excelDownloadURL (state) {
				return IP + 'quest/'+ state.organization.organizationId +'/export/' + state.testpaperId + '.xlsx'
			}
		},
		methods: {
			...mapActions(paper.actions),
			
			handel() {
				if(this.testpaperType === 0) {
					return
				}
				this.setPaperInfo({
					createTime: this.createTime,
					endingTime: this.endingTime,
					testpaperId: this.testpaperId,
					testpaperTitle: this.testpaperTitle,
					testpaperScore: this.testpaperScore,
					testpaperType: this.testpaperType,
					hasDown: this.hasDown
				}).then((data) => {
                    if(data.state){
                        this.$router.push({
							name: 'completeStatus',
						})
                    }else{
                        this.$Message.error(data.info )
                    }
                }).catch((err) => {
                    this.$Message.error(err)
                })
			},
			deleteHandel() {
				this.setPaperInfo({
					createTime: this.createTime,
					endingTime: this.endingTime,
					testpaperId: this.testpaperId,
					testpaperTitle: this.testpaperTitle,
					testpaperScore: this.testpaperScore,
					testpaperType: this.testpaperType,
					hasDown: this.hasDown
				}).then((data) => {
                    if(data.state){
                        this.toDeletePaper()
                    }else{
                        this.$Message.error(data.info )
                    }
                }).catch((err) => {
                    this.$Message.error(err)
                })
			},
			toDeletePaper() {
				this.deletePaper({
					testpaperId: this.testpaperId
				}).then((data) => {
                    if(data.state){
                      	this.$Message.success(data.info )
                      	this.showPaper = false
                    }else{
                        this.$Message.error(data.info )
                    }
                }).catch((err) => {
                    this.$Message.error(err)
                })
			},
			toDownloadPaper() {
				this.downloadPaper({
					organizationId: this.organization.organizationId,
					testpaperId: this.testpaperId
				}).then((data) => {
                    if(data.state){
                      	this.download()
                    }else{
                        this.$Message.error(data.info )
                    }
                }).catch((err) => {
                    this.$Message.error(err)
                })
			},
			download() {
				var el = document.createElement('a')
				el.href = IP + 'excel/'+ this.user.userId +'.xls'
				el.download = this.testpaperTitle + '.xls'
				document.body.appendChild(el)
				el.click()
				el.parentNode.removeChild(el)
			}
		},
		created () {
			this.testpaperType === 0 ? this.type = '练习' : this.type = '考试'
			this.hasDown = Number(this.chapterId) === -1 ? 0 : 1    //因需求原因将 -1 表示未做过试卷，0表示做过试卷
		}
	}
</script>

<style scoped lang="less">
	.page-item {
	    display: inline-block;
	    position: relative;
	    width: 18%; 
	    min-width: 230px;
	    height: 140px;
    	margin: .9%;
		padding: 0 0 25px;
		box-shadow: 0 0 1px 0.2px #a09e9e;
		vertical-align: bottom;
	}
	.pointer {
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
		& p {
			line-height: 25px;
			padding-left: 10px;
		}
	}
	.download {
	   	position: absolute;
    	right: 7px;
    	bottom: -7px;
    	font-size: 35px;
    	color: #9e9e9e;
    	cursor: pointer;

	    &:hover {
			color: #00bc9b
	    }
	}
	.delete {
	    position: absolute;
	    right: 5px;
	    top: 19px;
	    font-size: 32px;
	    color: #9e9e9e;
    	cursor: pointer;

	 	&:hover {
			color: #00bc9b
	    }
	}

	@media only screen and (max-width: 992px) {
		.page-item {
		    width: 100%; 
		    height: auto; 
		    max-height: 20rem; 
		    margin-bottom: 40px;
		    box-shadow: 0 0 1rem 1.2px #a09e9e;
		}
	}
</style>