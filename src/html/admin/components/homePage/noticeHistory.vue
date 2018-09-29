<template>
	<section>
		<div class="nav-notice">
			发布记录
		</div>
		
		<section>
			<Table :columns="columns1" :data="data1"></Table>
			<!-- <Page :total="data1.endRow" :style="{textAlign:'center',margin:'10px 20px'}"/> -->
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
                        title: '行为',
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
								}, '删除'),
								 h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            // this.remove(params.row.messageId)
                                        }
                                    }
                                }, '预览')
							]);
							//  h('div', [
                            //     h('Button', {
                            //         props: {
                            //             type: 'primary',
                            //             size: 'small'
                            //         },
                            //         style: {
                            //             marginRight: '5px'
                            //         },
                            //         on: {
                            //             click: () => {
                            //                 this.show(params.index)
                            //             }
                            //         }
                            //     }, 'View'),
                            //     h('Button', {
                            //         props: {
                            //             type: 'error',
                            //             size: 'small'
                            //         },
                            //         on: {
                            //             click: () => {
                            //                 this.remove(params.index)
                            //             }
                            //         }
                            //     }, 'Delete')
                            // ]);
                        }
                    }
                ],
                data1: [],
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
				let i = 0;
				let hasNextPage = false
				
				// this.getNo(0)
					
				
			},
			getNo: function (index) {
				let that = this
				this.getNotice({
						pageNum: index,
						pageSize: 20,
				}).then(data => {
						for (let l in data.list) {
							that.data1.push = data.list[l]
						}
						// th at.data1 = data
						if (data.hasNextPage) {
							that.getNo(data.nextPage)
						}
						
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
<style>
.nav-notice::before {
	    content: " ";
    width: 6px;
    background-color: #e81a37;
    display: block;
    height: 25px;
    margin-right: 8px;
}
.nav-notice {
	    height: 50px;
    /* line-height: 43px; */
    display: flex;
    align-items: center;
    font-size: 1.8em;
}
</style>
