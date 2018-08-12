<template>
	<section>
		<loading :spinShow="spinShow" />
		<paperitem 
			v-for="paper in organTestList"  
			:key="paper.testpaperId"
			:createTime = "paper.createTime"
			:endingTime = "paper.endingTime"
			:testpaperId = "paper.testpaperId"
			:testpaperScore = "paper.testpaperScore"
			:testpaperTitle = "paper.testpaperTitle"
			:testpaperType = "paper.testpaperType"
			:chapterId = "paper.chapterId"
		/>
		<p v-if="organTestList.length<=0" class="no-info"> 没有数据... </p>
	</section>
</template>

<script>
	import { mapState, mapActions} from 'vuex';
	import organization from  '../../store/types/organization'

	import paperitem from '../item/paperItem'
	import loading from '../item/loading'
	export default {
		data () {
			return {
				spinShow: false
			}
		},
		components: {
			loading,
			paperitem
		},
		computed: {
			...mapState({
				'organTestList': state => {
					return state.organization.organTestList
				},
				'organization': state => state.organization
			})
		},
		methods: {
			...mapActions(organization.actions),

			toGetTestsByOrganId() {
				this.spinShow = true
				this.getTestsByOrganId({
					organizationId: this.organization.organizationId.toString()
				}).then((data) => {
					if(data.state){
						this.spinShow = false
						// this.$Message.success(data.info)
					}else{
						this.$Message.error(data.info)
					}
				}).catch((err) => {
					this.$Message.error(err)
				})
			},
			
		},
		created() {
			this.toGetTestsByOrganId()
		}
	}
</script>

<style scoped>
	section {
		position: relative;
	}
	.no-info {
		margin-top: 30px;
		text-align: center;
		font-size: 20px;
	}

	@media only screen and (max-width: 992px) {
		.paper-item {
			display: block;
		}
	}
</style>
