<template>
	<ul @click="handel">
		<li v-for="(value, key ,index) in tabs" :name="key" :class="{active: target===key}" :key="index">{{value}}</li>
	</ul>
</template>

<script>
	export default {
		data () {
			return {
				target: Object.getOwnPropertyNames(this.tabs)[0]
			}
		},
		props: ['tabs'],
		methods: {
			handel (e) {
				var name = e.target.getAttribute('name')
				if(this.target === name){
					return
				}else{
					this.target = name
					this.$emit('tab-select',name)
				}
			}
		}
	}
</script>

<style scoped>
	ul {
		display: inline;
	}
	li {
		display: inline-block;
		padding: 5px 14px;

		color: white;
		font-size: 16px;
		cursor: pointer;
		background-color: rgb(0, 188, 155);

		-webkit-touch-callout: none;
	    -webkit-user-select: none;
	    -moz-user-select: none;
	    -ms-user-select: none;
	    user-select: none;
	}
	.active {
		background-color: rgb(7, 118, 99);
	}

</style>