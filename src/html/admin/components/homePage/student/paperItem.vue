<template>
	<section class="page-item">
		<p class="title">{{this.type}}</p>
		<div class="info-wrap">
			<p>{{this.type}}题目： {{this.testpaperTitle}}</p>
			<p>开始时间： {{this.createTimeFormat}}</p>
			<p>结束时间： {{this.endingTimeFormat}}</p>
			<p>试卷总分： {{this.testpaperScore}}</p>
			<p>考试得分： {{this.allScore}}</p>
		</div>
	</section>
</template>

<script>
export default {
  data() {
    return {
      type: ""
    };
  },
  props: [
    "createTime",
    "endingTime",
    "testpaperId",
    "testpaperTitle",
    "testpaperScore",
    "testpaperType",
    "objectScore",
    "subjectScore"
  ],
  computed: {
    createTimeFormat() {
      return new Date(this.createTime).toLocaleString().slice(0, -3);
    },
    endingTimeFormat() {
      return new Date(this.endingTime).toLocaleString().slice(0, -3);
    },
    allScore(state) {
      return state.objectScore + state.subjectScore;
    }
  },
  methods: {},
  created() {
    this.testpaperType === 0 ? (this.type = "练习") : (this.type = "考试");
  }
};
</script>

<style scoped>
.page-item {
  position: relative;
  width: 245px;
  min-height: 150px;
  box-shadow: 0 0 1px 0.2px #a09e9e;
  cursor: default;
  vertical-align: bottom;
}
.page-item:hover {
  box-shadow: 0 0 1px 0.7px #60c793;
}
.title {
  text-align: center;
  background-color: rgb(0, 188, 155);
  color: white;
  padding: 3px;
}
.info-wrap {
  padding: 5px;
}

@media only screen and (max-width: 992px) {
  .page-item {
    width: 100%;
    height: auto;
    max-height: 20rem;
    margin-bottom: 40px;
    box-shadow: 0 0 1rem 1.2px #a09e9e;
  }
}
</style>