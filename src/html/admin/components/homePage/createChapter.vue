<template>
		<div class="info-wrap">
<Tag v-for="item in testChapterList" :key="item.chapterId" :name="item.chapterName"  closable @on-close="toDeleteChapter(item.chapterId)">{{item.chapterName}}<Icon type="edit" @click="editChapterName(item.chapterName,item.chapterId)"></Icon></Tag>

            <Button icon="android-add" type="dashed" @click="handelModel">添加章节</Button>
      
			<Modal
		        title="章节名称"
		        v-model="showModel" 
		        @on-ok="toCreateChapter" >
		        <Input type="text" placeholder="章节名" v-model="chapterName"></Input>
    	</Modal>

      <Modal
		        title="修改章节名称"
		        v-model="showEditModel" 
		        @on-ok="toUpdateChapter">
		        <Input type="text" placeholder="章节名" v-model="newchapterName">{{newchapterName}}</Input>
    	</Modal>



    <Modal title="选择组织" v-model="chooseOrganization" @on-ok="choosedOrganization">
		      <Select v-model="this.organization.organizationId" class="select-type" @on-change="clickedItem">
			        <Option v-for="item in organizationList" :value="item.organizationId" :key="item.organizationId" >{{item.organizationName}}</Option>
			    </Select>
    	</Modal>


		</div>
</template>

<script>
// "type": "题目类型" , //1‐选择题 2‐判断题 3‐填空题 4‐问答题 5‐编程题 6‐综合题
import { mapState, mapActions } from "vuex";
import user from "../../store/types/user";
import paper from "../../store/types/paper";

//import organization.js
// import organization from  "../../store/types/organization";

export default {
  data() {
    return {
      chapterId: 1,
      showModel: false,
      showEditModel: false,
      chapterName: "",
      newchapterName: "",
      chapterIdForUpdate:0,
      count: [0, 1, 2],

      organizationList:[],
      chooseOrganization:false
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
clickedItem(val){
console.log("yourchoosedItem"+ val)
this.organization.organizationId = val;
},
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
    editChapterName(chapterName,chapterId) {
      this.showEditModel = true;
      this.newchapterName = chapterName;
      this.chapterIdForUpdate = chapterId;
    },
    toCreateChapter() {
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
    toUpdateChapter() {
      let that = this
      this.updateChapter({
        chapterId: this.chapterIdForUpdate,
        chapterName: this.newchapterName
      })
        .then(data => {
          if (data.state) {
            this.$Message.success(data.info);
            this.chapterId = data.chapterId;
            this.chapterName = "";
            that.toGetChapterList();
          } else {
            this.$Message.error(data.info);
          }
        })
        .catch(err => {
          this.$Message.error(err);
        });
    },
    toDeleteChapter(chapterId) {
      let that = this
      this.deleteChapter({
        chapterId: chapterId
      }).then(data => {
        if (data.state) {
          this.$Message.success(data.info);
          this.chapterId = data.chapterId;
          that.toGetChapterList();
        } else {
          this.$Message.error(data.info);
        }
      });
    },
  choosedOrganization(val){
    // console.log(val);

    console.log(this.organization.organizationId);

    this.toGetChapterList();
  },
},

  created() {
    if(this.organization.organizationId==null){
      	this.getMyOrganizations().then((res) => {
          var b = new Array();
          b = res.data;
          this.organizationList = b;
          this.chooseOrganization = true;
          chooseOrganization = true;

			}).catch((err) => {
				this.$Message.error(err)
			})
    }
  }
}
</script>

<style scoped lang='less'>
.info-wrap {
  & > div {
    display: block;
    height:35px;
    font-size:15px;
    line-height: 35px;

  }
  button {
    margin-top: 10px;
  }
}
</style>