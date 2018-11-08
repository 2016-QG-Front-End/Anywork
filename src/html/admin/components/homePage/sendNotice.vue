<template>
	<section>
		<!-- <Dropdown class="push-dowm" @on-click='doMore'>
			<Button type="primary">
				{{organiaza}}
				<Icon type="ios-arrow-down"></Icon>
			</Button>
			<DropdownMenu slot="list"  v-for="item in organiazations" v-bind:key="item.organizationId">
				<DropdownItem :name='item.organizationId'>{{item.organizationName}}</DropdownItem>

			</DropdownMenu>
		</Dropdown> -->

		<noticeHistory></noticeHistory><Button @click="showSend" class="send-notice">发布公告</Button>
		<section class="container" v-if="isShow">
			<section class="container-item">
				<Input v-model="topic" placeholder="请输入你的主题" style="width: 300px" />
				<br/>
				<br/>
				<Input v-model="context" placeholder="请输入你的内容" style="width: 300px" />
				<br/><br/>
				<Button  @click="hideSend">关闭</Button>
				<Button type="warning" @click="submit">提交</Button>
			</section>
		</section>
	</section>
</template>
<script>
	import { mapState, mapActions} from 'vuex';
	import organization from  '../../store/types/organization'
	import noticeHistory from  './noticeHistory'
	import loading from '../item/loading'
	import studentItem from '../item/studentItem'
	export default {
		data () {
			return {		
				spinShow: false,
				topic: '',
				context: '',
				isShow: false,
				organiaza: '没有组织',
				organiazations: []
			}		
		},
		components: {
			loading,
			'student-item': studentItem,
			noticeHistory
		},
		computed: {
			...mapState({
				'studentsList': state => {
					return state.organization.studentsList
				},
				'organization': state => state.organization
			})
		},
		methods: {
			...mapActions(organization.actions),
			submit: function () {
				let that = this
				this.sendNotice({
					title: this.topic,
					content: this.context
				}).then(data => {
					that.$Notice.success({
						title: '消息发送成功',
					});
					that.isShow = false
				}).catch(err => {
					
				})
			},
			showSend: function () {
				this.isShow = true
			},
			hideSend: function () {
				this.isShow = false
			},
			doMore: function (nameId) {
				
			}
			
		},
		created () {
			let that = this
			// this.getOrganationNostice().then(data=> {
			// 	if (!data) {
			// 		that.$Notice.error({
            //         	title: '没有你创建的组织',
                    
			// 		});
			// 		return
			// 	}
			// 	that.organiazations = data
			// }).catch(err => {
			// 	that.$Notice.error({
            //         title: '请求组织失败，请刷新',
                    
            //     });
			// })
		}
	}
</script>
<style>
.send-notice {
	position: absolute;
    top: 82px;
    right: 26px;
    z-index: 10;
    border: none;
    background: none;
    color: #2d8cf0;
    font-size: 1.3em;
    font-weight: 600;
}
.push-dowm {
	position: absolute;
	top: 10px;
    z-index: 9;
}
.container-item {
	position: absolute;
    background-color: #fff;
    padding: 30px;
    -webkit-box-shadow: 0 0 13px 6px #e8e8e8;
    box-shadow: 0 0 0px 6px #e8e8e8;
    top: 142px;
    left: 50%;
    margin: 0px 0 0 -182px;
    text-align: right;
    border-radius: 1em;
}
.container {
	width: 100%;
    height: 100vh;
    z-index: 100;
    background-color: rgba(0,0,0,0.4);
    position: absolute;
    top: 0;
    left: 0;
}
</style>
