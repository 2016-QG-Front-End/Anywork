<template>
	<section>
		<div class="header">
			<h2>我的组织</h2>
		</div>
		<loading :spinShow="spinShow" />
		<ul key="organization" v-show="!spinShow">
			<organitem class="organ-item" v-for="(organ, index) in myOrganizationList"  :key="organ.organizationId"
				:organizationId = "organ.organizationId" 
				:teacherName = "organ.teacherName" 
				:teacherId = "organ.teacherId"
				:organizationName = "organ.organizationName" 
				:description = "organ.description" 
				:isJoin = "organ.isJoin" 
				:count = "organ.count" 
				:canExit = "true"
				v-on:exit="emit"
			 />
		</ul>
		<p v-if="myOrganizationList.length<=0" class="no-info"> 没有数据... </p>
	</section>
</template>

<script>
	import { mapState, mapActions} from 'vuex';
	import organization from  '../../store/types/organization'

	import organitem from '../item/organItem'
	import loading from '../item/loading'
	export default {
		data () {
			return {		
				spinShow: true,
				hasExit: false
			}		
		},
		components: {
			organitem,
			loading
		},
		computed: {
			...mapState({
				'myOrganizationList': state => {
					return state.organization.myOrganizationList
				},
			})
		},
		methods: {
			...mapActions(organization.actions),
			emit () {
				this.hasExit = true
			}
		},
		created () {
			this.spinShow = true
			this.getMyOrganizations().then((data) => {
				if(data.state){
					this.spinShow = false
				}else{
					this.$Message.error(data.info + ",请重新登陆！")
				}
			}).catch((err) => {
				this.$Message.error(err)
			})
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
	.organ-item {
		display: inline-block;
		margin: 14px;
	}	
	.no-info {
		margin-top: 30px;
		text-align: center;
		font-size: 20px;
	}
</style>