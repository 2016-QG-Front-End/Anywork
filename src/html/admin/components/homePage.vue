<template>
  	<div class="layout">
        <div class="layout-menu-left">
            <Menu ref="leftMenu" :active-name="activeName" theme="dark" width="auto" @on-select="onSelect" @on-open-change="onOpenChange">
                <div class="layout-logo-left">{{organization.organName}}</div>
                <!-- <Submenu name="organization" v-show="showSubmenu" >
                    <template slot="title">
                        <Icon type="ios-navigate"></Icon>
                        组织
                    </template>
                    <Menu-item name="students">组织中的学生</Menu-item>
                    <Menu-item name="tests">组织中的试卷</Menu-item>
                    <Menu-item name="practices">组织中的练习</Menu-item>
                </Submenu> -->
                <Menu-item name="organizations" v-show="showSubmenu"><Icon type="ios-people"></Icon>组织</Menu-item>

                    
                    
                    <Submenu name="paper" v-if="showSubmenu">
                    <template slot="title"><Icon type="ios-keypad"></Icon>组卷</template>
                        <Menu-item name="createChapter">章节</Menu-item>
                        <Menu-item name="createPaper">试卷</Menu-item>
                    </Submenu>

                <!-- <Submenu name="paper" v-if="showSubmenu">
                    <template slot="title">
                        <Icon type="ios-keypad"></Icon>
                        出卷
                    </template>
                    <Menu-item name="createTest">考试</Menu-item>
                    <Menu-item name="createPractice">练习</Menu-item>
                </Submenu> -->
                <!-- <Submenu name="info" v-if="showSubmenu">
                    <template slot="title">
                        <Icon type="ios-analytics"></Icon>
                        通知
                    </template> -->
                    <Menu-item name="sendNotice"><Icon type="ios-paper"></Icon>发通知</Menu-item>
                    <!-- <Menu-item name="noticeHistory">通知记录</Menu-item> -->
                <!-- </Submenu> -->
            </Menu>
        </div>
        <div class="layout-right">
            <div class="layout-breadcrumb">
                <!-- <Breadcrumb>
                    <Breadcrumb-item v-for="item in breadCrumbList" :href="item.path" :key="item.name">{{item.name}}</Breadcrumb-item>
                </Breadcrumb> -->
            </div>
            <div class="layout-content">
                <router-view class="view"></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapActions} from 'vuex'
    import user from '../store/types/user'
    import organization from '../store/types/organization'
    export default {
    	data () {
            return {
                activeName: 'students',
                showSubmenu: true,
                organName: '',
                breadCrumbList: []
            }
        },
    	computed: {
    		...mapState({
    			'user': state => {
    				return state.user
    			},
                'organization': state => {
                    return state.organization
                }
    		}),
    		...mapGetters([
    			'userPhoto',
    		])
    	},
        methods: {
        	...mapActions(user.actions),

            onSelect (itemName) {
               	this.$router.push({
    				name: itemName,
    			})
            },
            onOpenChange (openName) {
               // console.log(openName);
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
            }
        },
        updated() {
            // if(this.$route.name === 'organizations'){
            //     this.organName = ''
            // }else{
            //     this.organName = this.organization.organName
            // }
            // this.organName = this.organization.organName
        },
        beforeRouteUpdate (to, from, next) {
            var matchedArray = to.path.split('\/')
            matchedArray.shift()
            this.breadCrumbList = matchedArray.map(function(item, index){
                return {
                   path: to.matched[0].props.default.path[item],
                   name: to.matched[0].props.default.name[item]
                }
            })
            // if(to.name !== 'organizations') {
            //     this.showSubmenu = true
            // }else {
            //     this.showSubmenu = false
            // }
            next()
    	},
    }
</script>

<style scoped>
    .layout, .layout-menu-left{
        height: 100%;
    }
    .layout-breadcrumb{
        padding: 0px 15px 5px;
    }
    .layout-content{
        min-height: 200px;
        padding: .1px;
        padding-bottom: 20px;
        /* background: #fff; */
        border-radius: 4px;
    }
    .layout-menu-left{
        position: fixed;
        top: 0px;
        left: 0;
        z-index: 6;
        width: 250px;
        overflow-y: auto;
        background: #464c5b;
    }
    .layout-right {
        width: calc(100% - 260px );
        margin-left: 255px;
        margin-top: 40px;
    }
    .view {
        padding: 10px 10px 10px 10px;
    }
    .layout-ceiling-main{
        float: right;
        margin-right: 15px;
    }
    .layout-ceiling-main a{
        color: #9ba7b5;
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        margin: 15px auto;
        color: white;
        text-align: center;
        line-height: 30px;
        font-size: 19px;
        border-radius: 3px;
        background: #5b6270;
    }


	@media only screen and (max-width: 768px){
		
	}
</style>