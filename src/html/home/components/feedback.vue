<template>
	<section>
		<h1 class="header">意见反馈</h1>
		<div class="wrap">
			<p class="blockquote">
				描述：如果该网站使用过程中出现了什么问题，请将其提交给我们，我们会尽快修复 ^v^
			</p>
			<textarea v-model="suggestion"></textarea>
			<Button class="submit-bt" type="primary" @click="toSubmitSuggestion">提交BUG</Button>
		</div>
	</section>
</template>

<script>
	import {mapActions} from 'vuex'
	import user from '../store/types/user'
	
	export default {
		data() {
			return {
				suggestion: ''
			}
		},
		methods: {
			...mapActions(user.actions),

			toSubmitSuggestion() {
				this.submitSuggestion({
					description: this.suggestion
				}).then((data) => {
					if(data.state){
						this.$Message.success(data.info)
						this.suggestion = ''
					}else{
						this.$Message.error(data.info)
					}
				}).catch((err) => {
					this.$Message.error(err)
				})
				// alert(this.suggestion)
			}
		}
	}
</script>


<style scoped>
	section {
		width: 70%;
		height: 100%;
		min-width: 1000px;
		margin: auto;
		padding: 10px 10px 60px;
		background-color: white;
	}	
	.header {
		position: relative;
		padding: 10px 20px 5px;
		margin-bottom: 10px;
		border-bottom: 1px solid #b4b4b4;
	}
	.wrap {
	    margin-top: 20px;
	    padding: 0 30px;
	}
	.blockquote {
		font-size: 16px;
	    border-left: 4px solid #dddddd;
	    padding: 0 15px;
	    color: #777777;
	}
	textarea {
	    margin-top: 20px;
	    width: 100%;
	    height: 300px;
	    padding: 6px;
	    font-size: 18px;
	    color: #495060;
	    border: 1px solid #bfbfbf;
	    overflow: hidden;
	    outline: none;
	}
	.submit-bt {
		float: right;
	}

	@media only screen and (max-width: 992px){
		.blockquote {
			font-size: 2rem;
		}
		textarea {
		    margin-top: 2rem;
		    width: 100%;
		    height: 600px;
		    padding: 1rem;
		    font-size: 2.5rem;
		}
		section {
			padding-bottom: 7rem;
		}
	}
</style>