<template>
	<section>
		<div class="header">
			<h2>{{title}}</h2>
		</div>
		<loading :spinShow="spinShow" />
		<papers v-show="!spinShow" :papers="myPracticeList" />
	</section>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import paper from  '../../store/types/paper'

	import papers from '../organPage/papers'
	import loading from '../item/loading'

	export default {
		data () {
			return {
				title: '我的练习',
				spinShow: true,
			}
		},
		components: {
			papers,
			loading
		},
		computed: {
			...mapState({
				'myPracticeList': state => {
					return state.paper.myPracticeList
				},
			}),
		},
		methods: {
			...mapActions(paper.actions),
			
			toGetMyPractice () {
				this.spinShow = true
				this.getMyPracticePaper().then((data) => {
					if(data.state){
						this.spinShow = false						
					}else{
						this.$Message.error(data.info)
					}
				}).catch((err) => {
					this.$Message.error(err)
				})
			}	
		},
		created () {
			this.toGetMyPractice()
		}
	}
</script>

<style scoped>
	section {
		position: relative;
		min-height: 100px;
	}
	.header {
		position: relative;
		padding: 10px 20px 5px;
		margin-bottom: 10px;
		border-bottom: 1px solid #b4b4b4;
	}
</style>