<template>
	<section class="nav" >
		<div class="nav-wrap" v-if=" false ">
			<a class="logo" href="./home.html#/homepage">
			</a>
			<ul class="sub-nav">
				<li class="search" :class="{select: showSearch}" @click="toggleSearch" @mouseleave="hideSearch">
					<Icon type="ios-search"></Icon> 搜索
					<div class="search-wrap" v-show="showSearch" @keyup.enter="search">
						<Input class="input" type="text" v-model="searchInfo" size="small" placeholder="搜索组织"></Input>
						<span @click="search"><Icon type="ios-search" class="search-bt" color="black"></Icon></span>
					</div>
				</li>
				<li @click="seeMyInfo"><Icon type="ios-bell-outline"></Icon> 消息</li>
				<li class="photo" :class="{select: personNav}" @click="togglePersonNav" @mouseleave="hidePersonNav">
					<img :src="userPhoto">
					<ul class="person-info" v-show="personNav">
						<li @click="toPersonPage">个人主页</li>
						<li @click="toFeedback">修改密码</li>
						<li @click="toExit">退出登录</li>
					</ul>
				</li>
				
			</ul>
			<div class="people-number">在线人数：{{ poepleNumber }}人</div>
		</div>
		<div class="new-container">
			<img src="../../../assets/images/anywork@1x.png" />
			<div class="container-nav">
				<img class="new-img" :src="userPhoto">
				<li class="photo" :class="{select: personNav}" @click="togglePersonNav" @mouseleave="hidePersonNav">
					<img src="../../../assets/images/gg.png">
					<ul class="person-info" v-show="personNav">
						<li @click="toPersonPage">个人主页</li>
						<li @click="toFeedback">修改密码</li>
						<li @click="toExit">退出登录</li>
					</ul>
				</li>
			</div>
		</div>
	</section>
</template>

<script>

	// @mouseenter="togglePersonNav" @mouseleave="togglePersonNav"
	
	import {mapState, mapGetters, mapActions} from 'vuex'
	import user from '../store/types/user'
	export default { 
		data () {
			return {
				showSearch: false,
				personNav: false,
				searchInfo: '',
				poepleNumber: '',
				websock: null
			}
		},
		props: ['questionNumbers'],
		computed: {
			...mapState({
				'user': state => {
					return state.user
				}
			}),
			...mapGetters([
				'userPhoto',
			])
		},
		methods: {
			...mapActions(user.actions),

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
					this.$Modal.confirm({
						title: redata.title,
						content: '<p>' + redata.content + '</p><p>发布人：' + redata.publisher + '</p>',
						onOk: () => {
							that.sendNoticed(redata.messageId)
						},
						onCancel: () => {
							that.$Message.info('点击了取消');
						}
					});
				}
　　　　　　}, 
			toggleSearch (e) {
				if(e.target.localName.toLocaleUpperCase()!=='LI'){
					return
				}
				this.showSearch = !this.showSearch
			},
			togglePersonNav () {
				this.personNav = !this.personNav
			},
			sendNoticed: function (noticeId) {
				this.noticed({
					messageId: noticeId
				}).then(data => {

				}).catch(err => {
					that.$Notice.warning({
						title: '请求错误',
						desc: 'err'
					});
				})
			},
			hideSearch () {
				this.showSearch = false
			},
			hidePersonNav () {
				this.personNav = false
			},
			search () {
				// 若不是在 homepage 页面，使用 bus 来传数据就可能导致 homepage.vue 模块还没加载，不能监听到事件
				if(this.$route.name !== 'homepage'){
					this.$router.push({
						name: 'homepage',
						params: { 
							search: true,
							searchInfo: this.searchInfo
						}
					})
				}else{
					this.$bus.$emit('search-organ',this.searchInfo)
				}
				this.searchInfo = ''
			},
			toPersonPage(){
				// this.$router.push({
				// 	name: 'baseInfo',
				// 	params: {
				// 		isChangeI: true
				// 	}
				// })
				location.href='https://qgstudio.org/anywork/html/home.html#/personPage/baseInfo?isChangeI=true'
			},
			toFeedback() {
				// this.$router.push({
				// 	name: 'feedback'
				// })
				location.href='https://qgstudio.org/anywork/html/home.html#/personPage/changePassword'
			},
			toExit () {
				this.exit().then((data) => {
					if(data.state){
						window.location.href = "./login.html"			
					}else{
						this.$Message.error(data.info + ",请稍后重试！")
					}
				}).catch((err) => {
					this.$Message.error(err)
				})
			},
			seeMyInfo() {
				this.$Message.info('该功能暂未开放')
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
				if (args.isCollect) {
					return this.isCollect =  args.isCollect;
				}
				
			},
		},
		mounted () {
			if (!this.getQueryStringArgs(location.href)) {
				let that = this
				this.getMyInfo().then((data) => {
					if(data.state && !that.questionNumbers){
						this.setPhoto()
						// that.initWebSocket()
						this.$emit('use-websock')
						this.$router.push('homepage')
					}
				}).catch((err) => {
					window.location.href = "./login.html"			
				})
			}
		},
		created () {
			
		}
	}
</script>

<style scoped>
.people-number {
    position: absolute;
    top: 65px;
    right: 8px;

    color: #000;
}
.new-img {
    border-radius: 5em;
    width: 30px;
    height: 30px;
}
.new-container {
    display: flex;

    align-items: center;
}
.container-nav {
    display: flex;

    position: relative;
    left: 90%;
    z-index: 9;

    align-items: center;
    justify-content: center;
}
.nav {
    /* position: fixed; */
    top: 0;
/* background-color: #3d444c; */
    /* box-shadow: 0 1px 2px 2px rgba(73, 73, 73, 0.38); */
    z-index: 1000;

    margin: 96px 0 0  0;
    width: 100%;
}
.nav-wrap {
    position: relative;

    margin: auto;
    width: 70%;
    min-width: 1000px;
}
.logo {
    display: inline-block;

    width: 50px;
    height: 50px;

/*margin-left: 15%;*/

    vertical-align: middle;

    background-image: url("~assets/images/logo.png");
    background-size: contain;
}
.nav li {
    display: inline-block;

    width: 82px;

    line-height: 50px;
    text-align: center;

    color: white;

    cursor: pointer;
}
.sub-nav {
    position: absolute;
    top: 0;
    right: 0;
}
.select {
    /* background-color: #666666; */
}
.photo img {
    display: inline-block;

    border-radius: 50%;
    border-radius: 5em;
    width: 30px;
    height: 16px;

    vertical-align: middle;
}
.person-info {
    position: absolute;
    top: 40px;

/* background-color: #666666; */
    z-index: 1000;
}
.person-info li {
    display: block;

    padding: 10px 16px;

    line-height: 20px;

    color: #000;
;
}
.person-info li:hover {
    /* background-color: #484747; */
}
.search-wrap {
    position: absolute;
    top: 48px;
    z-index: 1000;

    padding: 0 5px;
    width: 200px;

    background-color: #666;
}
.search-bt {
    position: absolute;
    top: 15px;
    right: .5rem;

    font-size: 1.5rem;

    cursor: pointer;
}

@media only screen and (max-width: 992px) {
    .nav {
/* background-color: #3d444c; */
        /* box-shadow: 0 1px 2px 2px rgba(73, 73, 73, 0.38); */
        z-index: 1000;

        width: 100%;
    }
    .nav-wrap {
        width: 99%;
        min-width: 0;
    }
    .logo {
        width: 8rem;
        height: 8rem;
    }
    .nav li {
        width: 12rem;

        line-height: 8rem;
    }
    .photo img {
        width: 6rem;
        height: 6rem;
    }
    .person-info {
        top: 8rem;
        right: 0;

        font-size: 2rem;
        line-height: 3rem;
    }

    .person-info li {
        line-height: 5rem;
    }
    .search-wrap {
        top: 8rem;

        padding: 0 1rem;
        width: 25rem;
    }

    .search-bt {
        top: 45px;
        right: 2rem;

        font-size: 3rem;
    }
}

</style>