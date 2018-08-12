<template>
  	<div class="layout">
        <div class="layout-header">
            <div class="layout-ceiling-main">
				<img class="avator" :src="userPhoto">
            	<span class="user-name">{{this.user.userName}}</span>
                <a @click.prevent="toExit">注销</a>
            </div>
        </div>
        <div class="layout-content">
            <router-view class="view layout-content-main"></router-view>
        </div>
    </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
import user from './store/types/user'
export default {
	name: 'app',
	data () {
        return {
            activeName: 'myOrganization'
        }
    },
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
    created () {
		this.getMyInfo().then((data) => {
			if(data.state){
				this.$router.push({
                    name: 'organizations'
                })
			}else{
				this.$Message.error(data.info)
			}
		}).catch((err) => {
			window.location.href = "./login.html"			
		})
	}
}
</script>

<style scoped>
    .layout, .layout-menu-left{
        height: 100%;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 200px;
        margin-top: 8px;
        padding-bottom: 20px;
        /*overflow: hidden;*/
        border-radius: 4px;
    }
    .layout-content-main{
        /*padding: 10px;*/
    }
    .layout-menu-left{
        position: fixed;
        width: 250px;
        overflow-y: auto;
        background: #464c5b;
    }
    .layout-header{
        position: fixed;
        top: 0;
        z-index: 5;
        width: 100%;
        padding: 10px 0;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
        background: #fff;
        overflow: hidden;
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
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }    
    .avator {
        vertical-align: middle;
        width: 28px;
        height: 28px;
        border: 1px solid #b7b7b7;
        border-radius: 50%;
    }
    .user-name {
        margin-right: 20px;
        color: #929292;
    }
	@media only screen and (max-width: 768px){
		
	}
</style>