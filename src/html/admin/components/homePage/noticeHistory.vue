<template>
	<section>
		通知记录
		<section>
			<Table :columns="columns1" :data="data1.list"></Table>
			<Page :total="data1.endRow" :style="{textAlign:'center',margin:'10px 20px'}"/>
		</section>
	</section>
</template>
<script>
	import { mapState, mapActions} from 'vuex';
	import organization from  '../../store/types/organization'

	import loading from '../item/loading'
	import studentItem from '../item/studentItem'
	export default {
		data () {
			return {		
				spinShow: false,
                columns1: [
                    {
                        title: '主题',
                        key: 'title'
                    },
                    {
                        title: '内容',
                        key: 'content'
                    },
                    {
                        title: '时间',
                        key: 'createTime'
                    },{
                        title: 'Action',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.row.messageId)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data1: {
					pageNum: 0,
					endRow:0
				},
				pages: 0
			}		
		},
		components: {
			loading,
			'student-item': studentItem
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
			initNotice: function () {
				let that = this
				this.getNotice({
					pageNum: this.data1.pageNum,
    				pageSize: 20,
				}).then(data => {
					that.data1 = data
				}).catch(err => {
					that.$Notice.error({
						title: '请求失败',
						desc: err
					});
				})
			},
			remove: function (id) {
				let that = this
				this.deleteNotice({
					"messageId": id
				}).then(data => {
					that.$Notice.success({
						title: '删除成功',
					});
					that.initNotice()
				}).catch(err => {
					that.$Notice.error({
						title: '请求失败',
						desc: err
					});
				})
			}
			
		},
		created () {
			this.initNotice()
		}
	}
</script>
