<template>
  	<div id="app">
  		<center class='wrap'>
			<span class="ribbon">邮箱验证失败</span>
			<img class="img" src="./images/fail.jpg">
			<h2>快去 <a href= './login.html'>网页端</a> 或 APP端 重新注册吧 ~</h2>
  		</center>
  	</div>
</template>

<script>
import { myAxios, IP} from 'src/utils/interaction'
export default {
	name: 'app',
	data (){
		return {
		}
	},
	created () {
		/*myAxios({
            method: 'POST',
            url: 'user/login',
        }).then(function(res){
            
        }).catch(function(err){
            console.log(err)
        })*/
	}
}
</script>

<style scoped>
	.wrap {
        box-shadow: 1px 1px 10px 0px black;
	    margin: 50px;
	    padding-bottom: 30px;
	}
	.ribbon {
	    display: inline-block;
	    position: relative;
	    top: 20px;
	    width: calc(100% + 20px);
	    height: 70px;
	    margin-left: -10px;
	    margin-right: -10px;

	    text-align: center;
		text-transform: uppercase;
	    line-height: 70px;
	    font-size: 40px;
	    font-weight: bold;
	    text-indent: 20px;
	    letter-spacing: 40px;
    	color: white;
    	
    	border-radius: 5px 5px 0 0;
	    background: #F44336;
	    border-radius: 5px 5px 0 0;
	}

	.ribbon::before {
	    content: "";
	    position: absolute;
	    height: 0;
	    width: 0;
	    border-top: 10px solid #ad2116;
	    border-left: 10px solid transparent;
	    bottom: -10px;
	    left: 0;
	}
	.ribbon::after {
	    content: "";
	    position: absolute;
	    height: 0;
	    width: 0;
	    border-top: 10px solid #ad2116;
	    border-right: 10px solid transparent;
	    right: 0;
	    bottom: -10px;
	}
	.img {
		width: 300px;
    	margin-top: 50px;
	}
	a {
	    color: #03A9F4;
    	text-decoration: none;
	}

	@media only screen and (max-width: 768px){
		.wrap {
		    margin: 5px;
		}
		.ribbon {
   	 	    letter-spacing: 10px;
		    font-size: 35px;
		    text-indent: 5px;
		}
		.img[data-v-7470d920] {
		    width: 100%;
		}
	}
</style>
