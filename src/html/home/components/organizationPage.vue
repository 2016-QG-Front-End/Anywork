<template>
	<section class="organ-page">
		<!-- <Menu mode="horizontal" active-name="1" @on-select="handelSelect" :active-name="activeName">
            <div class="layout-assistant">
                 <Menu-item name="test" >考试</Menu-item>
                <Submenu name="practice">
                    <template slot="title">
                        <Icon type="ios-person"></Icon>
                        练习
                    </template>
					<Menu-item v-for="item in testChapterList" :name="item.chapterId" :key="item.chapterId">
						{{item.chapterName}}
					</Menu-item>
                </Submenu>
            </div>
        </Menu> -->
		<mynav :questionNumbers="1"/>
		<div class="paper-nav">
			<div>
				<img src="../../../assets/images/preview@1x.png"/>
				<div>{{testName}}</div>
			</div>
			<!-- <img src="../../../assets/images/anywork@2x.png"/> -->
		</div>
		<div class="main">
			<!-- <div class="header">
				<h2>{{title}}</h2>
			</div> -->
			<!-- <Menu-item v-for="item in testChapterList" :name="item.chapterId" :key="item.chapterId">
						{{item.chapterName}}
			</Menu-item> -->                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
			<!-- <loading :spinShow="spinShow" /> -->
			<!-- <papers  :papers="paperList" /> -->
			<div class="chapter-container" v-for="(item, index) in testChapterList" :key="item.chapterId">
				<div  class="chapter-Item" v-on:click="showPaper(index)">
					<div>
						<img src="../../../assets/images/phone@2x.png"/>
						<div>{{ item.chapterName }}</div>
					</div>
					<Icon :type="iconType" class="icon-chapter"/>
					<!-- <Icon type="ios-arrow-up" /> -->
					<!-- <div class="subject-container"> -->
				</div>
				<div class="subject-container" v-if="item.isShow">
					<div class="subject-item" v-for="papers in item.paperList" :key="papers.testpaperId" v-on:click="handleDetailPaper(papers)"> 
						<div class="subject-item-left">
							<div class="subject-item-state unfinish" v-if="papers.status == 3">
								未完成
							</div>
							<div class="subject-item-state uncommit" v-else-if="papers.status == 2">
								未提交
							</div>
							<div class="subject-item-state finish" v-else-if="papers.status == 1">
								已完成
							</div>
							<div class="subject-item-commom subject-item-tt">{{papers.testpaperTitle}}</div>
						</div>
						<div class="subject-item-right">
							<div  class="subject-item-commom subject-item-right-c">
								<Icon type="ios-alarm-outline"  class="subject-item-commom subject-icon"/>
								{{papers.createTime}} —— {{papers.endingTime}} 
							</div>
						</div>
					</div>

				</div>
			</div>
			<div v-if="testChapterList.length <= 0">这里并没有试卷可以让你考试，急需老师上传</div>
        </div>
	</section>
</template>

<script>
	import { mapState, mapActions} from 'vuex';
	import paper from  '../store/types/paper'

	import papers from './organPage/papers'
	import loading from './item/loading'
	import mynav from './myNav'
	export default {
		data: function(){
			return {
				activeName: 'test',
				paperList: [],
				title: '',
				spinShow: true,
				testPaperType: null,
				iconType: 'ios-arrow-down',
				testName: null,
			}
		},
		components: {
			papers,
			loading,
			mynav
		},
		computed: {
			...mapState({
				'allTestPaperList' : state => {
					return state.paper.allTestPaperList
				},
				'allPracticePaperList' : state => {
					return state.paper.allPracticePaperList
				},
				'testChapterList': state => {
					return state.paper.testChapterList
				},
				'organizationId' : state => {
					return state.organization.organizationId
				}
			})
		},
		methods: {
			...mapActions(paper.actions),

			handelSelect (name) {
				if(name ==='test' ){
					this.toGetAllTestPapers()
				}else {
					this.toGetPracticeListByChapter(Number(name))
				}

			},
			handleDetailPaper (data) {
				this.setPaperInfo({
					createTime: data.createTime,
					endingTime: data.endingTime,
					testpaperId: data.testpaperId,
					testpaperTitle: data.testpaperTitle,
					testpaperScore: data.testpaperScore,
					testpaperType: this.testpaperType,
					hasDown: data.status,
					paperStatus: data.status,
					testpaperAllScore: data.testpaperScore,
					doneQuestions: data.doneQuestions,
					totalQuestions: data.totalQuestions

				})
				this.$router.push({
					name: 'answerPaper',
					//  path: 'Homepage'
					params: { testPaperType: this.testPaperType }
				})
			},
			showPaper (index) {
				if (!this.testChapterList[index].paperList.length) {
					this.$Notice.warning({
						title: '这一章节没有题目',
						// desc: nodesc ? '' : 'Here is the notification description. Here is the notification description. '
					});
				}
				this.changePaperShows(index)
			},
			selectChapter (chapterId) {
				this.getPracticeListByChapter({
					organizationId: this.organizationId,
					chapter: chapterId,
					testPaperType: parseInt(this.testPaperType)
				}).then((data) => {
					if(data.state){
						this.spinShow = false
						this.paperList = this.allPracticePaperList
						this.title = "练习"
					}else{
						this.$Message.error(data.info)
					}
				}).catch((err) => {
					this.$Message.error(err)
				})
			},
			toGetAllTestPapers () {
				this.spinShow = true
				this.getAllTestPapers({
					organizationId: this.organizationId.toString(),
					chapter: '0',
					testPaperType: parseInt(this.testPaperType)
				}).then((data) => {
					if(data.state){
						this.spinShow = false
						this.paperList = this.allTestPaperList
						this.title = "考试"
					}else{
						// this.$Message.error(data.info)
					}
				}).catch((err) => {
					this.$Message.error(err)
				})
			},

			toGetChapterList () {
				let that = this
				this.getChapterList({
					organizationId: this.organizationId
				}).then((data) => {
					if(data.state){
						for (let i = 0; i < that.testChapterList.length; i++) {
							that.selectChapter(that.testChapterList[i].chapterId)
						}
					}else{
						// this.$Message.error(data.info)
					}
				}).catch((err) => {
					this.$Message.error(err)
				})
			},

			toGetPracticeListByChapter (chapterId) {
				this.spinShow = true
				this.getPracticeListByChapter({
					organizationId: this.organizationId,
					chapter: chapterId,
					testPaperType: parseInt(this.testPaperType)
				}).then((data) => {
					if(data.state){
						this.spinShow = false
						this.paperList = this.allPracticePaperList
						this.title = "练习"
					}else{
						// this.$Message.error(data.info)
					}
				}).catch((err) => {
					this.$Message.error(err)
				})
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
				this.testPaperType =  args.test;
			}
		},
		created () {
			if(this.organizationId === undefined) {
				this.$router.push({
					name: 'homepage',
				})
			}else{
				this.getQueryStringArgs(location.href)
				// this.toGetAllTestPapers()
				this.toGetChapterList()

			}
		},
	}
</script>

<style scoped>
.subject-container {
	/* border-top: 1px solid #eae8e8; */
}
.subject-item-tt {
	min-width: 300px;
	margin:  0 0 0 18px;
}
.subject-icon {
	margin: 0 10px 0 0;
}
.subject-item,
.subject-item-left,
.subject-item-right {
	display: flex;
	justify-content: space-between;
}
.unfinish {
	background-color: #ee5353;
}
.uncommit {
	background-color: #3bb255;
}
.finish{
	background-color: #499ad3;
}
.subject-item-right-c {
	display: flex;
	align-items: center;
}
.subject-item-state {
	padding: 4px 6px;
	color: #fff;
}
.subject-item-commom {
	font-size: 1.5em;
}
.subject-item {
	height: 68px;
	align-items: center;
	border-top: 2px solid #eae8e8;
	    height: 68px;
}
.subject-item-left {
	/* width: 200px; */
}
.subject-item-right {
	flex-grow: 1;
	justify-content: flex-end;
}
.chapter-container  {

    /* display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between; */

    margin: 40px 0;
    -webkit-box-shadow: 0 0 36px 2px #b4b4b4;
    box-shadow: 0 0 36px 2px #b4b4b4;
    /* -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center; */
    
    padding: 0 20px;
    border-radius: 1em;
	cursor: pointer;
}
.chapter-Item {
	display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
	align-items: center;
	height: 64px;
	    font-size: 1.5em;
    font-weight: 600;
}
.icon-chapter {
	font-size: 30px;
}
.chapter-Item div {
	display: flex;
	align-items: center;
}
.chapter-Item div div {
	margin: 0 20px;
}
.organ-page {
    margin: auto;
    padding: 0 10px;
    width: 70%;
    min-width: 1000px;
    height: 100%;

    background-color: white;
}
	.paper-nav {
		display: flex;
		/* padding: 10px 32px; */
		align-items: center;
		justify-content: space-between;
		margin: 42px 0 0 0;
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
.header {
    position: relative;

    margin-bottom: 10px;
    border-bottom: 1px solid #b4b4b4;
    padding: 10px 20px 5px;
}
.main {
    position: relative;

    /* padding: 10px 20px; */
    min-height: 130px;
}

@media only screen and (max-width: 992px) {
    .organ-page {
        width: 100%;
        min-width: 0;
    }
    .main {
        min-height: 150px;
    }
}




</style>