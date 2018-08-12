<template>
	<Spin class="loading" v-if="spinShow" >
        <Icon type="load-c" class="spin-icon-load"></Icon>
        <div>Loading</div>
    </Spin>
</template>

<script>
	export default {
		data () {
			return {

			}
		},
		props: ['spinShow'],
	}
</script>

<style>
	.loading {
		position: absolute;
		top: 30px;
		left: 0;
		width: 100%;
		margin-top: 20px;
		font-size: 18px;
	}
	.spin-icon-load{
        font-size: 40px;
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        0% { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        100%   { transform: rotate(360deg);}
    }
	
	@media only screen and (max-width: 992px) {
		.loading {
			font-size: 2rem;
		}		
		.spin-icon-load {
			font-style: 5rem;
		}
	}
</style>