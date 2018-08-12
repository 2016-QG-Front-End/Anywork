<template>
  	<div id="app">
		<img class="logo" src="~assets/images/logo.png">
		<changePass />
  	</div>
</template>

<script>

import changePass from './components/changePass'
export default {
	name: 'app',
	data (){
		return {
			login: true,
			register: false
		}
	},
	components: {
		changePass
	},
	methods: {

	}
}
</script>

<style scoped>
#app {
    padding: .1px;
    height: 100%;

    background-color: #272727;
}
.logo {
    position: absolute;
    top: 20px;
    left: 20px;
}

@media only screen and (max-width: 768px) {
    .logo {
        width: 80px;
    }
}

</style>
