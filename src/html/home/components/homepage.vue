<template>
	<section class="home-page">
		<!-- <Menu mode="horizontal" active-name="1" @on-select="handelSelect" :active-name="activeName">
            <div class="layout-assistant">
                <Menu-item name="allOrganization" >所有组织</Menu-item>
                <Menu-item name="myOrganization" >已加入组织</Menu-item>
           	 	<Menu-item name="noJoinOrganization" >未加入组织</Menu-item>
            </div>
        </Menu> -->
		<mynav/> 
		<img  class="background" src="../../../assets/images/draw@2x.png">
		<div class="login-title margin-top">Welcome To Anywork   	&nbsp;: )</div>
		<div class="login-title margin-chinese">日拱一猝无有尽</div>
		<Button  v-on:click="chooseOrgination" v-if="!this.orginationName" class="choose-orgination" :style=buttonStyle >{{this.orginationName ? this.orginationName : '选择你的组织'}} > </Button>
		<Button disabled="false" v-on:click="chooseOrgination" v-if="this.orginationName" class="choose-orgination" :style=buttonStyle >{{this.orginationName ? this.orginationName : '选择你的组织'}} > </Button>
		<div class="main" :style=origanitionStyle>
        	<loading :spinShow="spinShow" />
			<organizations v-show="!spinShow" :organizations="organizationList" :title="title" v-on:disappear="noShow" />
        </div>
		<div class="choose-container">
			<div v-on:click="toPath(1)">
				<img src="../../../assets/images/preview@1x.png"/>
				<div>课前预习</div>
			</div>
			<div v-on:click="toPath(2)">
				<img src="../../../assets/images/pratice@1x.png"/>
				<div>课后练习</div>
			</div>
			<div v-on:click="toPath(3)">
				<img src="../../../assets/images/exam@1x.png"/>
				<div>课程考试</div>
			</div>
			<div v-on:click="toPath(4)">
				<img src="../../../assets/images/collect@1x.png"/>
				<div>错题收藏</div>
			</div>

		</div>
		<div class="news-container" v-if="allnews.length > 0">
			<h2>公告</h2>
			<section class="news-all-container"  v-if="!showAll">
				<div class="news-item-container"  v-for="item in news" v-bind:key="item.messageId">
					<div  class="news-img">
						<img src="../../../assets/images/read@1x.png" />
					</div>

					<div class="news-title">{{item.content}}</div>
					<div class="news-context">
						<div>
							<Icon type="ios-person-outline" />&nbsp;
							{{item.publisher}}
						</div>
						<div class="news-time">
							<Icon type="ios-clock-outline" />&nbsp;
							{{item.createTime}}
						</div>
					</div>
				</div>
			</section>
			<section class="news-all-container"  v-if="showAll || news.length <= 0">
				<div class="news-item-container"  v-for="item in pagenews[pageNum - 1]" v-bind:key="item.messageId">
					<div  class="news-img">
						<img src="../../../assets/images/read@1x.png" />
					</div>

					<div class="news-title">{{item.content}}</div>
					<div class="news-context">
						<div>
							<Icon type="ios-person-outline" />&nbsp;
							{{item.publisher}}
						</div>
						<div class="news-time">
							<Icon type="ios-clock-outline" />&nbsp;
							{{item.createTime}}
						</div>
					</div>
				</div>
				<Page :total="allnews.length" :current="pageNum" page-size="10" @on-change="handlePage" class="page-news"/>
			</section>
			<section class="show-all">
				<div v-if="!showAll" v-on:click="changeNews">展开<Icon type="ios-arrow-down" /></div>
				<div v-if="showAll" v-on:click="changeNews">收起<Icon type="ios-arrow-up" /></div>
			</section>
		</div>
		<div class="news-container">
			<h2>排行榜</h2>
			<section class="rank-container">
				<!-- <section class="rank-left">
					<img src="../../../assets/images/first@1x.png"/>
					<img src="../../../assets/images/second@1x.png"/>
					<img src="../../../assets/images/third@1x.png"/>
					<img src="../../../assets/images/first@1x.png"/>
					<img src="../../../assets/images/first@1x.png"/>
					<img src="../../../assets/images/first@1x.png"/>
				</section> -->
				<section class="rank-right">
					<div class="rank-item"   v-for="(item, index) in rank" v-bind:key="item.number">
						<i>
							NO.{{index + 1}}
						</i>
						<img :src=item.imagePath />
						<div class="number-name">{{ item.username }}</div>
						<div class="number-score">{{ item.score }}</div>
						<!-- <div >{{ item.studentId }}</div> -->
						<div class="number-students">{{ item.studentId }}</div>
					</div>
				</section>
			</section>
		</div>
	</section>
</template>

<script>
	import { mapState, mapActions} from 'vuex';
	import organization from  '../store/types/organization'
	import user from  '../store/types/user'
	import organizations from './homePage/organizations'
	import loading from './item/loading'
	import mynav from './myNav'
	export default {
		data () {
			return {
				buttonStyle: '',
				origanitionStyle: '',
				organizationList: [],
				title: '',
				isAble: false,
				activeName: 'allOrganization',
				spinShow: false,
				showAll: false,
				orginationName: '',
				websock: null,
				pageNum: 1,
				pagenews: [],
				news:[
					// {
					// 	title: '第一张练习已经发布',
					// 	time: '',
					// 	name: '古天乐'
					// },
					// {
					// 	title: '第一张练习已经发布',
					// 	time: '',
					// 	name: '古天乐'
					// }
				],
				allnews: [

				],
				rank: [{
					imagePath: '../../../assets/images/first@1x.png',
					username: '黄海景',
					studentId: "3116004777"
				},{
					imagePath: '../../../assets/images/first@1x.png',
					username: '黄海景',
					studentId: "3116004777"
				},{
					imagePath: '../../../assets/images/first@1x.png',
					username: '黄海景',
					studentId: "3116004777"
				},{
					imagePath: '../../../assets/images/first@1x.png',
					username: '黄海景',
					studentId: "3116004777"
				},{
					imagePath: '../../../assets/images/first@1x.png',
					username: '黄海景',
					studentId: "3116004777"
				},{
					imagePath: '../../../assets/images/first@1x.png',
					username: '黄海景',
					studentId: "3116004777"
				}]
			}
		},
		components: {
			organizations,
			loading,
			mynav
		},
		computed: {
			...mapState({
				'allOrganizationList': state => {
					return state.organization.allOrganizationList
				},
				'myOrganizationList': state => {
					return state.organization.myOrganizationList
				},
				'searchResultList': state => {
					return state.organization.searchResultList
				},
				'noJoinOrganizationList' : state => {
					return state.organization.noJoinOrganizationList
				}
			})
		},
		methods: {
			...mapActions(organization.actions),
			...mapActions(user.actions),
			changeNews () {
				this.showAll = !this.showAll
			},
			initWebSocket: function () {
				const wsuri = 'ws://10.21.56.107:8080' + "/websocket/" + this.user.userId;//ws地址
				// console.log(this.user)
				// console.log(this.userId)
	　　		this.websock = new WebSocket(wsuri); 
				this.websock.onopen = this.websocketonopen;
				this.websock.onerror = this.websocketonerror;
				this.websock.onmessage = this.websocketonmessage;
				this.websock.onclose = this.websocketclose;
			},
			websocketonopen: function () {
　　　　　　　　console.log("WebSocket连接成功");
　　　　　　 },
　　　　　　 websocketonerror: function (e) { //错误
 　　　　　　 console.log("WebSocket连接发生错误");
　　　　　　 },
	　　　　websocketonmessage: function (e){ //数据接收 
	　　　　　　const redata = JSON.parse(e.data);
	　　　　　　console.log(redata);
				let that = this
				if (redata.type == 1) {
					this.poepleNumber = redata.onlineCount
				} else {
					// this.$Modal.confirm({
					// 	title: redata.title,
					// 	content: '<p>' + redata.content + '</p><p>发布人：' + redata.publisher + '</p>',
					// onOk: () => {
					// 			that.sendNoticed(redata.messageId)
					// 		},
					// 		onCancel: () => {
					// 			that.$Message.info('点击了取消');
					// 		}
					// 	});
					let obj = {
						content: redata.content,
						title: redata.title,
						publisher: redata.publisher,
						messageId: redata.messageId,
						createTime: redata.createTime
					}
					that.news.splice(0, 0,obj)
				}
	　　　　}, 
			websocketclose () {
				console.log("WebSocket连接关闭");
			},
	　　　　 websocketcloses () {
				// this.websock.close()
			},
			noShow () {
				
				this.origanitionStyle = 'animation:endorag 1s both 1 linear'
				this.buttonStyle = 'animation:start 0.5s both 1 linear'
			},
			toPath (indexNumber) {
				if (indexNumber == 1) {
					location.href = 'http://localhost:8080/html/home.html#/organizationPage?test=2'
				} else if (indexNumber == 2) {
					location.href = 'http://localhost:8080/html/home.html#/organizationPage?test=3'
				} else if (indexNumber == 3) {
					location.href = 'http://localhost:8080/html/home.html#/organizationPage?test=1'
				} else {
					location.href = 'http://localhost:8080/html/home.html#/'
				}
			},
			chooseOrgination () {
				//选择组织
				this.buttonStyle = 'animation:end 1s both 1 linear'
				this.origanitionStyle = 'animation:start 1s both 1 linear'
			},
			handelSelect (name) {
				if(name === "allOrganization"){
					this.toGetAllOrgan()
				}else if(name === "myOrganization" ){
					this.toGetMyOrgan()
				}else if(name === "noJoinOrganization"){
					this.toGetNoJoinOrgan()
				}
			},
			toGetAllOrgan () {
				this.spinShow = true
				let that = this
				this.getAllOrganizations().then((data) => {
					if(data.state){
						this.spinShow = false
						let arr = []
						
						for (let i = 0; i < this.allOrganizationList.length; i++) {
							if (this.allOrganizationList[i].isJoin != 1) {
								arr.push(this.allOrganizationList[i])
							} else  {
								this.setOrganizationInfo({
									organizationId: this.allOrganizationList[i].organizationId,
									teacherName: this.allOrganizationList[i].teacherName,
									organizationName: this.allOrganizationList[i].organizationName,
								})
								// console.log(this.allOrganizationList[i])
								that.orginationName = this.allOrganizationList[i].organizationName
								that.isAble = false
								break;
							}
						}
						// this.organizationList = arr
						this.organizationList = this.allOrganizationList
						this.title = "所有组织"
					}else{
						this.$Message.error(data.info + ",请重新登陆！")
					}
				}).catch((err) => {
					this.$Message.error(err)
				})
			},
			toGetMyOrgan () {
				this.spinShow = true
				this.getMyOrganizations().then((data) => {
					if(data.state){
						this.spinShow = false
						this.organizationList = this.myOrganizationList
						this.title = "已加入组织"
					}else{
						this.$Message.error(data.info + ",请重新登陆！")
					}
				}).catch((err) => {
					this.$Message.error(err)
				})
			},
			toGetNoJoinOrgan () {
				this.spinShow = true
				this.getNoJoinOrganizations().then((data) => {
					if(data.state){
						this.spinShow = false
						this.organizationList = this.noJoinOrganizationList
						this.title = "未加入组织"
					}else{
						this.$Message.error(data.info + ",请重新登陆！")
					}
				}).catch((err) => {
					this.$Message.error(err)
				})
			},
			toGetSearchResultList (searchInfo) {
				this.spinShow = true
				this.searchOrganizations({
					organizationName: searchInfo
				}).then((data) => {
					this.spinShow = false
					if(data.state){
						this.organizationList = this.searchResultList
						this.title = "搜索结果"
						this.activeName = ""
					}else{
						this.$Message.error(data.info + ",请重新登陆！")
					}
				}).catch((err) => {
					this.$Message.error(err)
				})
			},
			getAllNews () {
				let page = 0
				// this.getNews({
				// 	status: 1,
				// 	pageNum: page,
				// 	pageSize: 10
				// }).then(data => {
				// 	for (let i = 0; i < data.list.length; i++) {
				// 		this.news.push(data.list)
				// 	}
				// 	if (!data.isLastPage) {

				// 	}
				// 	// this.news = data.list
				// }).catch(err => {
				// 	this.$Message.error("请重新刷新！")
				// })
				while (true) {
					if (this.getUnkonwnNews(page++)) {
						break
					}
				}
				page = 0
				while (true) {
					if (this.getkonwnNews(page++)) {
						break
					}
				}
				// this.getNews({
				// 	status: 0,
				// 	pageNum: 0,
				// 	pageSize: 10
				// }).then(data => {
				// 	this.news = data.list
				// }).catch(err => {
				// 	this.$Message.error("请重新刷新！")
				// })
				// 将所有消息进行分组
				for (let j = 0; j < this.allnews.length; j += 10) {
					let arr = []
					for(let i = j; i < j + 10; i++) {
						arr.push(this.allnews)
					}
					this.pagenews.push(arr)
				}
			},
			getUnkonwnNews (page) {
				this.getNews({
					status: 1,
					pageNum: page,
					pageSize: 10
				}).then(data => {
					for (let i = 0; i < data.list.length; i++) {
						this.news.push(data.list)
						this.allnews.push(data.list)
					}
					return data.isLastPage
					// this.news = data.list
				}).catch(err => {
					this.$Message.error("请重新刷新！")
				})
			},
			getkonwnNews (page) {
				this.getNews({
					status: 0,
					pageNum: page,
					pageSize: 10
				}).then(data => {
					for (let i = 0; i < data.list.length; i++) {
						// this.news.push(data.list)
						this.allnews.push(data.list)
					}
					return data.isLastPage
					// this.news = data.list
				}).catch(err => {
					this.$Message.error("请重新刷新！")
				})
			},
			handlePage (value) {
				this.pageNum = value
			}
		},
		created () {
			if(this.$route.params.search === undefined || !this.$route.params.search){
				this.toGetAllOrgan()
			}else{
				let searchInfo = this.$route.params.searchInfo
				this.toGetSearchResultList(searchInfo)
			}
			let that = this
			this.getRank({
				leaderboardType: 2
			}).then(data => {
				that.rank = data
			}).catch(err => {
				this.$Message.error("请重新刷新！")
			})
			this.$bus.$on('search-organ', this.toGetSearchResultList)
			this.initWebSocket()
		},
		beforeDestroy () {
			  this.$bus.$off('search-organ', this.toGetSearchResultList)
			  this.websocketcloses()
		},
	}
</script>

<style scoped>
.background {
	position: absolute;
    /* right: 0px; */
    top: -114px;
    right: -327px;
    z-index: -1;
    width: 1010px;
    height: 891px;
    pointer-events: none;
}
.margin-top {
	margin-top: 212px;
}
.number-score {
	margin: 0 70px;
	min-width: 54px;
    max-width: 54px;
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
}
.show-all {
    padding: 10px 20px;

    text-align: right;
}
.show-all div {
    font-size: 16px;

    cursor: pointer;
}
.page-news {
    text-align: center;
}
.home-page {
    position: relative;

    margin: 100px auto 0 auto;
    width: 70%;
    min-width: 1000px;
    height: 100%;
    /* padding: 0 10px; */
    /* background-color: white; */
}
.news-container {
    margin: 40px 0;
}
.news-container h2 {
    font-size: 2.5em;
}

.news-title {
    font-size: 20px;
}
.news-img {
    display: flex;

    position: absolute;
    top: 16px;
    left: -24px;

    border-radius: 4em;
    width: 58px;
    height: 58px;

    background: #fff;

    box-shadow: 0 0 24px 4px #dedbdb;

    align-items: center;
    justify-content: center;
}
.news-time {
    margin: 0 0 0 76px;
}
.news-context {
    display: flex;

    height: 26px;

    font-size: 16px;
    line-height: 26px;
}
.news-item-container {
    position: relative;

    margin: 26px 0;
    border-radius: 3em;
    padding: 10px 66px;
    height: 80px;

    box-shadow: 0 0 24px 4px #dedbdb;
}
.rank-container {
    display: flex;
}
.rank-item {
    display: flex;

    font-size: 18px;

    align-items: center;
	margin: 10px 0;
	justify-content: space-between;
	    border-radius: 4em !important;
}
.number-name {
	max-width:150px;
	min-width: 150px;
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
}
.number-students {
    /* position: relative; */
    /* right: 0; */
    margin: 0 0 0 545px;
	overflow: hidden;
	max-width:150px;
	min-width: 150px;
	text-overflow:ellipsis;
	white-space: nowrap;
}
.rank-item img {
    /* margin: 0 50px 0 0; */
    border-radius: 4em;
    width: 60px;
    height: 60px;
	margin: 0 50px 0 88px;
}
.rank-left {
    display: flex;

/* width: 4%; */

    width: 54px;
    height: 482px;

    flex-direction: column;
    justify-content: space-between;
}
.rank-right {
    display: flex;

    padding: 0  88px 0 22px;

    flex-direction: column;
    /* flex-grow: 1; */
	width: 100%;
    justify-content: space-between;
}
.choose-container {
    display: flex;

    z-index: 8;

    margin: 534px 0 100px 0;

/* width: 126%; */

    justify-content: space-between;
}
.choose-container img {
    z-index: 8;

    margin: 0 30px;
}
.choose-container > div {
    display: flex;

    margin: 0 28px;
    width: 160px;
    height: 182px;

    color: #548cfe;

    box-shadow: 0 0 24px 4px #dedbdb;

    align-items: center;
    flex-direction: column;
    justify-content: center;
}
.choose-container > div > div {
    margin: 12px 0;

    font-size: 1.5em;
}
.margin-chinese {
    margin: 50px 0;
}
.choose-orgination {
    position: absolute;

    border-radius: 2em;

/* margin: 69px 0 0 0; */

    font-size: 1rem;

    color: #fff;
    background-color: #548cfe;

    /* animation: end 1s both infinite linear; */
}
.login-title {
    /* text-align: center; */
    font-size: 1.67rem;

    color: #548cfe;
}
.main {
    position: relative;
    position: absolute;
	top: 280px;
    left: -2324px;

    margin: 20px 0;
    border-radius: 4em;
    padding: 10px 20px;
    max-width: 1400px;
    min-height: 120px;

/* max-width:  */

    background-color: rgba(255,255,255,.8);

    box-shadow: 0 0 20px 2px #dedbdb;

    /* animation: start 5s both infinite linear; */
}
@media only screen and (max-width: 992px) {
    .home-page {
        width: 100%;
        min-width: 0;
    }
    .main {
        min-height: 150px;
    }
}
@keyframes start {
    0% {
        left: -2324px;

        opacity: 0;
    }100% {
        left: 0;

        opacity: 1;
    }
}
@keyframes end {
    0% {
        left: 0;

        opacity: 1;
    }100% {
        left: 2324px;

        opacity: 0;
    }
}
@keyframes endorag {
    0% {
        opacity: 1;
    }
	70% {
		opacity: 0.7;
	}
	100% {
        opacity: 0;
    }
}
</style>