<template>
	<center class="organ-item" @click="handel" v-if="!hasExit">
		<img class="organ-img" :src="organImg">
		<span class="exit-organ" v-if="canExit" @click.stop.prevent="toExitOrganization"><Icon type="close-round" ></Icon></span>
		<h2>{{organizationName}}</h2>
		<!-- <p class="title" :class="[!showJoin ? 'dim' : '']">{{title}}</p> -->
		<!-- <p class="teacher"><strong>教师：</strong>{{teacherName}}</p>
		<div class="tip-wrap" @mouseenter="toggleTip" @mouseleave="toggleTip">
			<p class="description" :class="{ellipsis : isEllipsis}"><strong>描述：</strong>{{description}}</p> -->
			<!-- <p class="tip" v-show="showTip" >{{description}}</p> -->
		<!-- </div>	
		<p class="count">人数: {{studentCount}}</p> -->
	</center>
</template>

<script>
	import { IP } from 'src/utils/interaction'
	import { mapActions} from 'vuex';
	import organization from  '../../store/types/organization'
	export default {
		data () {
			return {
				organImg : IP + "picture/organization/"+ this.organizationId + ".jpg?" + ( new Date().getTime() - new Date().getTime() % 60000 ),  //以一分钟刷新一次
				token: '',
				showJoin: false,
				hasExit: false,
				showTip: false,
				studentCount: this.count,
			}
		},
		props: ['organizationId', 'teacherName', 'organizationName', 'description', 'isJoin', 'count', 'canExit'],
		computed: {
			title (state) {
				return state.showJoin ? '组织' : '未加入';
			},
			isEllipsis (state) {
				return state.description.length >= 27 ? true : false
			},
		},
		methods: {
			...mapActions(organization.actions),

			handel () {
				if(this.showJoin){
					this.setOrganizationInfo({
						organizationId: this.organizationId,
						teacherName: this.teacherName,
						organizationName: this.organizationName,
					})
					this.$router.push({
						name: 'organizationPage',
					})
				}else{
					let that = this
					this.$Modal.confirm({
	                    render: (h) => {
	                        return h('div', {
	                        },[
	                        	h('span',{
                        			style: {
                        				marginBottom: '5px',
										display: 'inline-block'
                        			}
	                        	},['请输入加入组织的密钥']),
	                        	h('Input', {
		                            props: {
		                                value: this.token,
										autofocus: true,
										
		                            },
		                            on: {
		                                input: (val) => {
											this.token = val
											
		                                }
		                            }
		                        })
	                        ])
	                    },
	                    onOk: ()=>{
							if (this.token.length < 6) {
								this.$Notice.error({
									title: '密钥格式不对',
									desc: '请输入大于等于6个数字'
								});
								return
							}
							var re = /^\d*$/;   //^匹配字符串开始位置   \d 匹配任意一个十进制数字，等价于[0-9]  * 匹配0次 1次或者多次前面的字符  $匹配字符串的结束位置
							if (!re.test(this.token)) {
									
								this.$Notice.error({
									title: '密钥只可能是整数',
								});
								this.token = ''
								return 	
							}
	                    	this.joinOrganization({
	                    		organizationId: this.organizationId.toString(),
  								token: this.token
	                    	}).then((data) => {
								if(data.state){
									this.$Message.success(data.info)
									this.showJoin = !this.showJoin
									this.studentCount += 1;
								}else{
									this.$Message.error(data.info + ",请稍后重试！")
								}
								this.token = ''
							}).catch((err) => {
								this.$Message.error(err)
							})
	                    }
					})
					
				}
			},
			toExitOrganization () {
				this.exitOrganization({
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
			toggleTip () {
				this.showTip = !this.showTip
			}
		},
		created () {
			this.showJoin = Number(this.isJoin) === 0 ? false : true
		}
	}
</script>

<style scoped>
.organ-item {
    position: relative;

    padding: 0 0 25px;
    width: 242px;
    height: 72px;
    max-height: 190px;

    box-shadow: 0 0 1px .2px #a09e9e;

    cursor: pointer;
}
.organ-item:hover {
    box-shadow: 0 0 1px .7px #60c793;
}
h2 {
    padding-left: 70px;

    line-height: 70px;
    ;
}
.title {
    padding: 5px 0;

    color: white;
    background-color: rgb(0, 188, 155);
}
.dim {
    background-color: #9b9b9b;
}
.teacher {
    padding: 13px 10px 8px 10px;

    text-align: left;
}
.poptip {
    width: 100%;
}
.description {
    overflow: hidden;

    position: relative;

    padding: 0 10px 10px;
    padding-right: 20%;
    height: 2.8em;

    text-align: left;
}
.ellipsis:after {
    position: absolute;
    right: 5px;
    bottom: 0;

    padding: 0 5px;

    line-height: 1.4em;

    background-color: white;

    content: "...";
}
.tip-wrap {
    position: relative;

    width: 120%;
}
.tip {
    display: inline-block;

    position: absolute;
    top: 0;
    left: 46px;
    z-index: 3;

    border-radius: 2px;
    padding: 5px;
    min-width: 53%;
    max-width: 100%;

    background-color: white;

    box-shadow: 0 0 1px 1px #c5c5c5;
}
/*.tip:after {
	    content: "";
	    width: 0px;
	    height: 0px;
	    position: absolute;
	    left: -14px;
	    top: 2px;
	    border-style: solid;
	    border-color: rgba(255, 255, 255, 0) #b9b9b9 rgba(255, 255, 255, 0) rgba(255, 255, 255, 0);
	    border-width: 7px;
	}*/
.count {
    position: absolute;
    right: 5px;
    bottom: 5px;
}
.organ-img {
    position: absolute;
    top: 5px;
    left: 5px;

    width: 60px;
    height: 60px;
}
.exit-organ {
    position: absolute;
    top: -5px;
    right: 0;

    padding: 5px;

    font-size: 18px;

    color: rgba(0, 0, 0, .22);
}
.exit-organ:hover {
    color: rgb(0, 188, 155);
}

@media only screen and (max-width: 992px) {
    .organ-item {
        margin: 0;
        width: 100%;
        height: auto;
        max-height: 25rem;

        box-shadow: 0 0 18px .2px #525252;
    }

    h2 {
        padding-left: 10rem;

        line-height: 10rem;
    }
    .organ-img {
        top: 1rem;
        left: 1rem;

        margin: 0;
        width: 8rem;
        height: 8rem;
    }
    .exit-organ {
        right: 1rem;

        font-size: 4rem;
    }
}










</style>