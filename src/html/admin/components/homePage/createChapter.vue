<template>
		<div class="info-wrap">
<Tag v-for="item in testChapterList" :key="item.chapterId" :name="item.chapterName"  closable @on-close="toDeleteChapter(item.chapterId)">{{item.chapterName}}</Tag>
      
            <Button icon="md-add" type="dashed" @click="handelModel">添加章节</Button>
      
			<Modal
		        title="章节名称"
		        v-model="showModel" 
		        @on-ok="toCreatechapter" >
		        <Input type="text" placeholder="章节名" v-model="chapterName"></Input>
    	</Modal>
		</div>
</template>

<script>
// "type": "题目类型" , //1‐选择题 2‐判断题 3‐填空题 4‐问答题 5‐编程题 6‐综合题
import { mapState, mapActions } from "vuex";
import user from "../../store/types/user";
import paper from "../../store/types/paper";

export default {
  data() {
    return {
      chapterId: 1,
      showModel: false,
      chapterName: "",
      count: [0, 1, 2]
    };
  },
  computed: {
    ...mapState({
      organization: state => state.organization,
      testChapterList: state => state.paper.testChapterList
    })
  },
  methods: {
    ...mapActions(paper.actions),

    toGetChapterList() {
      this.getChapterList({
        organizationId: this.organization.organizationId
      })
        .then(data => {
          if (data.state) {
          } else {
            this.$Message.error(data.info);
          }
        })
        .catch(err => {
          this.$Message.error(err);
        });
    },
    handelModel() {
      this.showModel = true;
    },

    toCreatechapter() {
      this.addChapter({
        organizationId: this.organization.organizationId,
        chapterName: this.chapterName
      })
        .then(data => {
          if (data.state) {
            this.$Message.success(data.info);
            this.chapterId = data.chapterId;
          } else {
            this.$Message.error(data.info);
          }
        })
        .catch(err => {
          this.$Message.error(err);
        });
    },
    toDeleteChapter(chapterId) {
      this.deleteChapter({
        chapterId: chapterId
      }).then(data => {
        if (data.state) {
          this.$Message.success(data.info);
          this.chapterId = data.chapterId;
        } else {
          this.$Message.error(data.info);
        }
      });
    },
    chooseChapter(val) {
      console.log(val);
    }
  },

  created() {
    this.toGetChapterList();
  }
};
</script>

<style scoped lang='less'>
.info-wrap {
  & > div {
    display: block;
  }
  button {
    margin-top: 10px;
  }
}
</style>