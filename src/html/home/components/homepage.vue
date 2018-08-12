<template>
	<section class="home-page">
		<Menu mode="horizontal" active-name="1" @on-select="handelSelect" :active-name="activeName">
            <div class="layout-assistant">
                <Menu-item name="allOrganization" >所有组织</Menu-item>
                <Menu-item name="myOrganization" >已加入组织</Menu-item>
           	 	<Menu-item name="noJoinOrganization" >未加入组织</Menu-item>
            </div>
        </Menu>
        <div class="main">
        	<loading :spinShow="spinShow" />
			<organizations v-show="!spinShow" :organizations="organizationList" :title="title" />
        </div>
	</section>
</template>

<script>
	import { mapState, mapActions} from 'vuex';
	import organization from  '../store/types/organization'

	import organizations from './homePage/organizations'
	import loading from './item/loading'

	export default {
		data () {
			return {
				organizationList: [],
				title: '',
				activeName: 'allOrganization',
				spinShow: false
			}
		},
		components: {
			organizations,
			loading
		},
		computed: {
			...mapState({
				'allOrganizationList': state => {
					return state.organization.allOrganizationList
				},
				'myOrganizationList': state => {
					return state.organization.myOrganizationList
				},
				'searchResultList': state => {
					return state.organization.searchResultList
				},
				'noJoinOrganizationList' : state => {
					return state.organization.noJoinOrganizationList
				}
			})
		},
		methods: {
			...mapActions(organization.actions),

			handelSelect (name) {
				if(name === "allOrganization"){
					this.toGetAllOrgan()
				}else if(name === "myOrganization" ){
					this.toGetMyOrgan()
				}else if(name === "noJoinOrganization"){
					this.toGetNoJoinOrgan()
				}
			},
			toGetAllOrgan () {
				this.spinShow = true
				this.getAllOrganizations().then((data) => {
					if(data.state){
						this.spinShow = false
						this.organizationList = this.allOrganizationList
						this.title = "所有组织"
					}else{
						this.$Message.error(data.info + ",请重新登陆！")
					}
				}).catch((err) => {
					this.$Message.error(err)
				})
			},
			toGetMyOrgan () {
				this.spinShow = true
				this.getMyOrganizations().then((data) => {
					if(data.state){
						this.spinShow = false
						this.organizationList = this.myOrganizationList
						this.title = "已加入组织"
					}else{
						this.$Message.error(data.info + ",请重新登陆！")
					}
				}).catch((err) => {
					this.$Message.error(err)
				})
			},
			toGetNoJoinOrgan () {
				this.spinShow = true
				this.getNoJoinOrganizations().then((data) => {
					if(data.state){
						this.spinShow = false
						this.organizationList = this.noJoinOrganizationList
						this.title = "未加入组织"
					}else{
						this.$Message.error(data.info + ",请重新登陆！")
					}
				}).catch((err) => {
					this.$Message.error(err)
				})
			},
			toGetSearchResultList (searchInfo) {
				this.spinShow = true
				this.searchOrganizations({
					organizationName: searchInfo
				}).then((data) => {
					this.spinShow = false
					if(data.state){
						this.organizationList = this.searchResultList
						this.title = "搜索结果"
						this.activeName = ""
					}else{
						this.$Message.error(data.info + ",请重新登陆！")
					}
				}).catch((err) => {
					this.$Message.error(err)
				})
			}
		},
		created () {
			if(this.$route.params.search === undefined || !this.$route.params.search){
				this.toGetAllOrgan()
			}else{
				let searchInfo = this.$route.params.searchInfo
				this.toGetSearchResultList(searchInfo)
			}
			this.$bus.$on('search-organ', this.toGetSearchResultList)
		},
		beforeDestroy () {
		  	this.$bus.$off('search-organ', this.toGetSearchResultList)
		},
	}
</script>

<style scoped>
	.home-page {
		position: relative;
		width: 70%;
		height: 100%;
		min-width: 1000px;
		margin: auto;
		padding: 0 10px;
		background-color: white;
	}

	.main {
		padding: 10px 20px;
		position: relative;
		min-height: 120px;
	}
	@media only screen and (max-width: 992px) {
		.home-page {
			width: 100%;
			min-width: 0;
		}
		.main {		
			min-height: 150px;
		}
	}
</style>