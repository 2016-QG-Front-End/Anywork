<template>
  	<div id="app">
		<img class="logo" src="~assets/images/draw@2x.png">
    	<Login v-if="login" v-on:to-register="toggleRegister"/>
    	<Register v-else-if="register" v-on:to-login="toggleLogin"/>
		<forgetpassword v-else v-on:to-password="toggleLogin"/>
  	</div>
</template>

<script>
import Login from './components/login'
import Register from './components/register'
import forgetpassword from './components/forget_password'
export default {
	name: 'app',
	data (){
		return {
			login: true,
			register: false
		}
	},
	components: {
		Login,
		Register,
		forgetpassword
	},
	methods: {
		toggleLogin (judge){
			this.login = true
			this.register = false
		},
		toggleRegister (judge){
			if (judge) {
				this.login = false
				this.register = true
			} else {
				this.login = false
				this.register = false
			}

		},
		togglePassword (){
			this.login = false
			this.register = false
		}
	}
}
</script>

<style scoped>
	#app{
		padding: 0.1px;
   	 	height: 100%;
   	 	/* background-color: #272727; */
		overflow-x: hidden;
		width: 100%;
	}

	.logo {
		position: absolute;
		right: -56px;
		/* right: 0px; */
		/* top: 20px; */
		pointer-events: none;
		height: 100%;
		width: 60%;
	}
	body {
		overflow: hidden;
	}
	@media only screen and (max-width: 768px){
		.logo {
			width: 80px;
		}
	}
</style>
