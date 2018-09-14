<template>
	<section class="container-b" style="overflow-x: hidden;">
		
		<mynav/>
	  	
	  	<!-- <Breadcrumb class="bread-crub">
            <Breadcrumb-item v-for="item in breadCrumbList" :href="item.path" :key="item.name">{{item.name}}</Breadcrumb-item>
        </Breadcrumb> -->
		
	  	<router-view class="view"></router-view>
		
	</section>
</template>

<script>
import mynav from './components/myNav'

export default {
	name: 'app',
	data: function(){
		return {
			breadCrumbList: [{
						name: '首页',
						path: '/homepage'
					}]
		}
	},

	components: {
		mynav
	},

	watch: {
		$route: function(to, from) {
			var pages = {
				homepage: {
					name: '首页',
					path: '/homepage'
				},
				organizationPage: {
					name: '试卷',
					path: '/organizationPage'
				},
				answerPaper: {
					name: '答题',
					path: '/paperPage/answerPaper'
				},
				lookAnswer: {
					name: '答题情况',
					path: '/paperPage/lookAnswer'
				},
				personPage: {
					name: '个人主页',
					path: '/personPage/myOrganization'
				},
				myOrganization: {
					name: '我的组织',
					path: '/personPage/myOrganization'
				},
				myTest: {
					name: '我的考试',
					path: '/personPage/myTest'
				},
				myPractice: {
					name: '我的练习',
					path: '/personPage/myPractice'
				},
				changePassword: {
					name: '修改密码',
					path: '/personPage/changePassword'
				},
				baseInfo: {
					name: '修改信息',
					path: '/personPage/baseInfo'
				},
				feedback: {
					name: '意见反馈',
					path: '/feedback'
				}
			}
			var myRouter = {
				homepage: [
					pages.homepage
				],
				organizationPage: [
					pages.homepage,
					pages.organizationPage
				],
				answerPaper: [
					pages.homepage,
					pages.organizationPage,
					pages.answerPaper
				],
				lookAnswer: [
					pages.homepage,
					pages.organizationPage,
					pages.lookAnswer
				],
				myOrganization: [
					pages.homepage,
					pages.personPage,
				],
				myTest: [
					pages.homepage,
					pages.personPage,
				],
				myPractice: [
					pages.homepage,
					pages.personPage,
				],
				changePassword: [
					pages.homepage,
					pages.personPage,
				],
				baseInfo: [
					pages.homepage,
					pages.personPage,
				],
				feedback: [
					pages.homepage,
					pages.feedback
				]
			}
            var target = to.path.split('\/').pop()
		 	this.breadCrumbList = myRouter[target]
        
		}
	}
}
</script>

<style scoped>
.container-b {
    min-width: 1150px;
    min-height: 800px;
}
.background {
    position: absolute;

/* right: 0px; */
    top: 0;
    right: -56px;
    z-index: -1;

    width: 60%;
    height: 100%;

    pointer-events: none;
}
.bread-crub {
    margin: auto;
    margin-bottom: 4px;
    padding: 5px 0 4px 9px;
    width: 70%;
    min-width: 1000px;

    background-color: white;
}
body {
    background-color: #fff;
}
@media only screen and (max-width: 992px) {
    .bread-crub {
        width: 100%;
        min-width: 0;

        font-size: 2rem;
    }
}





</style>