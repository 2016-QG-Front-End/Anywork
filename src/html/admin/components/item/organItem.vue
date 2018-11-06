<template>
	<center class="organ-item" @click="this.handel" v-if="!hasExit">
		<img class="organ-img" :src="img">
		<h2>{{organizationName}}</h2>
		<p class="title" >组织</p>
		<p class="teacher"><strong>教师：</strong>{{teacherName}}</p>
		<p class="token"><strong>秘钥：</strong>{{token}}</p>
		<div class="tip-wrap" @mouseenter="toggleTip" @mouseleave="toggleTip">
			<p class="description" ><strong>描述：</strong><span>{{description}}</span></p>
			<p class="tip"  v-show="false" >{{description}}</p>
		</div>	
		<p class="count">人数: {{count}}</p>
		<span class="exit-organ" @click.stop.prevent="toDeleteOrganization"><Icon type="ios-close-outline"></Icon></span>
		<span class="upload-organ" @click.stop.prevent="toUploadOrganization"><Icon type="ios-compose-outline"></Icon></span>
	</center>
</template>

<script>
	import { IP } from 'src/utils/interaction'
	import { mapActions} from 'vuex';
	import organization from  '../../store/types/organization'
	export default {
		data () {
			return {
				// organImg : IP + "picture/organization/"+ this.organizationName + ".jpg?" + ( new Date().getTime() - new Date().getTime() % 60000 ),  //以一分钟刷新一次
				// organImg: require('@/assets/images/noimage.png'),
				hasExit: false,
				showTip: false,
				// index: 
			}
		},
		props: ['organizationId', 'teacherId', 'teacherName', 'organizationName', 'description', 'count', 'token', 'index', 'img'],
		computed: {
			isEllipsis (state) {
				return state.description.length >= 12 ? true : false
			},
		},
		methods: {
			...mapActions(organization.actions),

			handel () {
				this.setOrganizationInfo({
					organizationId: this.organizationId,
					organName: this.organizationName,
					teacherId: this.teacherId,
					teacherName: this.teacherName,
				})
				// this.$router.push({
				// 	name: 'students',
				// })
				this.$emit('chooseOrgan', this.index)
			},
			toDeleteOrganization () {
				this.deleteOrganization({
					organizationId: this.organizationId
				}).then((data) => {
					if(data.state){
						this.hasExit = true
						this.$Message.success(data.info)
					}else{
						this.$Message.error(data.info)
					}
				}).catch((err) => {
					this.$Message.error(err)
				})
			},
			toUploadOrganization() {
				this.$emit('upload-organ', {
					organizationId: this.organizationId,
					organizationName: this.organizationName,
					description: this.description,
					imgSrc: this.organImg
				})
			},
			toggleTip () {
				this.showTip = !this.showTip
			}
		},
	}
</script>

<style scoped>
	.organ-item {
		position: relative;
		width: 220px;
		height: 200px;
		max-height: 200px;
		padding: 0 0 25px;
		box-shadow: 0 0 1px 0.2px #a09e9e;
		cursor: pointer;
	}
	.organ-item:hover {
		box-shadow: 0 0 1px 0.7px #60c793;
	}
	h2 {
	    line-height: 70px;
        padding-left: 70px
	}
	.title {
		padding: 5px 0;
		color: white;
		background-color: rgb(0, 188, 155)
	}
	.teacher {
		text-align: left;
		padding: 5px 10px 3px;
	}
	.token {
		text-align: left;
		padding: 0px 10px 3px;
	}
	.poptip {
		width: 100%
	}
	.description {
	    position: relative;
	    height: 1.7em;
	    padding: 0 10px;
	    text-align: left;
	    overflow: hidden;
	}
	.description strong {
		float: left;
	    display: inline-block;
	    height: 40px;
	}
	.ellipsis:after {
	    content: '...';
	    position: absolute;
	    right: 5px;
	    bottom: 0;
	    padding: 0 0.6em;
	    background-color: white;
	}
	.tip-wrap {
		position: relative;
	}
	.tip {
		display: inline-block;
		position: absolute;
	    top: 0;
	    left: 46px;
	    z-index: 3;

		min-width: 53%;
	    padding: 5px;
	    
	    box-shadow: 0 0 1px 1px #c5c5c5;
	    background-color: white;
	    border-radius: 2px;	
	}
	.tip-ellipsis {
		width: 100%;
	}
	.count {
		position: absolute;
		bottom: 5px;
		right: 5px;
	}
	.organ-img {
		position: absolute;
		left: 5px;
		top: 5px;
		width: 60px;
		height: 60px;
	}
	.exit-organ {
	    position: absolute;
	    font-size: 27px;
    	bottom: -6px;
    	left: 40px;
		color: #9e9e9e;
	}
	.upload-organ {
		position: absolute;
    	bottom: -6px;
    	left: 10px;
	    font-size: 30px;
		color: #9e9e9e;
	}
	.exit-organ:hover, .upload-organ:hover {
		color: rgb(0, 188, 155);
	}

	@media only screen and (max-width: 992px) {
		.organ-item{
		    max-height: 25rem;
		    width: 100%;
		    height: auto;
		    box-shadow: 0px 0 18px 0.2px #525252;
		}

		h2 {
			line-height: 10rem;
			padding-left: 10rem;
		}
		.organ-img {
			left: 1rem;
			top: 1rem;
			width: 8rem;
			height: 8rem;
			margin: 0;
		}
		.exit-organ {
			font-size: 4rem;
			right: 1rem;
		}
		.upload-organ {
			font-size: 4rem;
			right: 8rem;
		}
	}
</style>