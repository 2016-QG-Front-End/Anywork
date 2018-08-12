<template>
	<section>
		<div class="paper-item" v-for="paper in papers"  :key="paper.testpaperId">
			<paperitem 
				:createTime = "paper.testpaper.createTime"
				:endingTime = "paper.testpaper.endingTime"
				:testpaperId = "paper.testpaper.testpaperId"
				:testpaperScore = "paper.testpaper.testpaperScore"
				:testpaperTitle = "paper.testpaper.testpaperTitle"
				:testpaperType = "paper.testpaper.testpaperType"
				:chapterId = "paper.testpaper.chapterId"
				:objectScore = "paper.object"
				:subjectScore = "paper.subject"
			/>
		</div>
		<p v-if="papers.length<=0" class="no-info"> 没有数据... </p>
	</section>
</template>

<script>
	
	import paperitem from './paperItem'
	export default {
		data () {
			return {

			}
		},
		props: ['papers'],
		components: {
			paperitem
		},
	}
</script>

<style scoped>
	.paper-item {
		display: inline-block;
		margin: 10px;
		vertical-align: bottom;
	}
	.no-info {
		margin-top: 30px;
		text-align: center;
		font-size: 20px;
	}

	@media only screen and (max-width: 992px) {
		.paper-item {
			display: block;
		}
	}
</style>
