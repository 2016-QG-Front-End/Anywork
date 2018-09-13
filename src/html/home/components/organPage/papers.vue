<template>
	<section>
		<ul key="organization" class="organization-k">
			<li class="paper-item" v-for="paper in papers"  :key="paper.testpaperId">
				<paperitem 
					:createTime = "paper.createTime"
					:endingTime = "paper.endingTime"
					:testpaperId = "paper.testpaperId"
					:testpaperScore = "paper.score"
					:testpaperTitle = "paper.testpaperTitle"
					:testpaperType = "paper.testpaperType"
					:chapterId = "paper.chapterId"
					:doneQuestions = 'paper.doneQuestions'
					:testpaperAllScore = 'paper.testpaperScore'
					:paperStatus = 'paper.status'
				/>
			</li>
		</ul>
		<p v-if="papers.length<=0" class="no-info"> 没有数据... </p>
	</section>
</template>

<script>
	
	import paperitem from '../item/paperItem'
	export default {
		data () {
			return {

			}
		},
		props: ['papers', 'title'],
		components: {
			paperitem
		},
	}
</script>

<style scoped>
.paper-item {
    display: inline-block;

    margin: 10px;
}
.no-info {
    margin-top: 30px;

    font-size: 20px;
    text-align: center;
}
.organization-k {
    display: flex;

    flex-wrap: wrap;
}
.organization-k li {
    /* flex-grow: 1; */
    width: 210px;
}
@media only screen and (max-width: 992px) {
    .paper-item {
        display: block;
    }
    .no-info {
        font-size: 3rem;
    }
}

</style>
