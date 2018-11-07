<template>
	<section>
		<div class="info-wrap">
			<!-- <div>
				<span>出卷老师</span>
				<Input type="text" class="input" disabled :value="user.userName"></Input>
			</div> -->
      		<div>
				<span>试卷标题</span>
				<Input type="text" class="input" v-model="testpaperTitle"></Input>
			</div>
			<div class="chapter-wrap">
				<span>试卷类型</span>
				<Select v-model="paperType" class="select-type" @on-change="choosePaperType">
					<Option value="1">考试</Option>
					<Option value="2">预习题</Option>
					<Option value="3">课后复习题</Option>
				</Select>
			</div>
			<br/>
			<div>
				<span>做题时间</span>
				<Date-picker class="input" type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间" v-model="date"></Date-picker>
			</div>
			<div class="chapter-wrap">
				<span>练习章节</span>
				<Select v-model="chapterId" class="select-type" @on-change="chooseChapter">
			        <Option v-for="item in testChapterList" :value="item.chapterId" :key="item.chapterId" >{{item.chapterName}}</Option>
					<Button class="create-chapter" @click="handelModel">创建新章节</Button>
			    </Select>
			</div>
			<Modal
		        title="章节名称"
		        v-model="showModel" 
		        @on-ok="toCreatechapter" >
		        <Input type="text" placeholder="章节名" v-model="chapterName"></Input>
    		</Modal>
		</div>

		    <a :href="templateURL" download="template.xlsx">
		    	<Button type="primary">下载模板</Button>
		    </a>
			<!-- <input type="file" ref="fileInput" class="file-input" @change="fileChange"> -->
      <span v-show="choosedFile">{{choosedFileName}}</span>
			<Button type="primary" v-show="uploadType==='byFile'" @click="uploadHandle">选择文件</Button>
			<Button type="primary" @click="create" v-show="canCreate">发布</Button>

  
			<Modal
		        :title="previewPaperTitle+'__'+previewPaperType"
		        v-model="previewDialog" 
            width="700">
   <p slot="header" style="color:#6297fc;height:50px;padding-top:10px">
            <img  v-bind:src="eyeUrl" style="height:30px;vertical-align:middle">
            <span style="font-size:30px;font-weight:300;vertical-align:middle">{{previewPaperType}}</span>
        </p>


            <div class="answer" v-for="item in previewpaperContent" v-bind:key="item.questionId">

              <h3 v-if="item.type==1">选择题</h3>
              <h3 v-if="item.type==2">判断题</h3>
              <h3 v-if="item.type==3">填空题</h3>
              <h3 v-if="item.type==4">问答题</h3>

             <h4> {{item.content}}</h4>

             <!-- 选择题 -->
            <ul v-if="item.type==1">
            <li><span class="abc">A</span>{{item.a}}</li>
            <li><span class="abc">B</span>{{item.b}}</li>
            <li><span class="abc">C</span>{{item.c}}</li>
            <li><span class="abc">D</span>{{item.d}}</li>
            </ul>

            </div>
    		</Modal>


			<Modal
		        :title="analyzePaperTitle+'__'+previewPaperType"
		        v-model="analyzeDialog" 
            width="700"
            >
            <p slot="header" style="color:#6297fc;height:50px;padding-top:10px">
            <img  v-bind:src="eyeUrl" style="height:30px;vertical-align:middle">
            <span style="font-size:30px;font-weight:300;vertical-align:middle">{{previewPaperType}}</span>
            <span style="color:red;font-weight:bolder;margin-left:30px">平均分:{{averageScore}}</span>
        </p>

           
                <div class="answer" v-for="item in analyzepaperContent" v-bind:key="item.questionId">
                  <div class="question-type">
              <h3 v-if="item.type==1">选择题</h3>
              <h3 v-if="item.type==2">判断题</h3>
              <h3 v-if="item.type==3">填空题</h3>
              <h3 v-if="item.type==4">问答题</h3>
              <span>错误率:{{item.errorRate}}</span>
</div>
             <h4> {{item.content}}</h4>
                  

             <!-- 选择题 -->
            <ul v-if="item.type==1">
            <li><span class="abc">A</span>{{item.a}}</li>
            <li><span class="abc">B</span>{{item.b}}</li>
            <li><span class="abc">C</span>{{item.c}}</li>
            <li><span class="abc">D</span>{{item.d}}</li>
            解析:正确答案<span>{{item.key}}</span>
            </ul>

            <!-- 判断题 -->
            <div v-if="item.type==2">
              解析:正确答案:<span>{{item.key}}</span>
            </div>

            <!-- 填空题 -->
            <div v-if="item.type==3">
             解析:正确答案: <span>{{item.key}}</span>
              </div>


              <!-- 问答题 -->
              <div v-if="item.type==4">
              解析:正确答案:<span>{{item.key}}</span>
              </div>
            </div>
    		</Modal>


<!-- 修改试卷信息 -->
        <Modal
        title="修改试卷信息"
        v-model="updateDialog"
        @on-ok="toUpdatePaper">

          <div>
				<span>试卷标题</span>
				<Input type="text" class="input" v-model="updatePaperTitle"></Input>
			</div>
			<div class="chapter-wrap">
				<span>试卷类型</span>
				<Select v-model="paperType" class="select-type" @on-change="choosePaperType">
					<Option value="1">考试</Option>
					<Option value="2">预习题</Option>
					<Option value="3">课后复习题</Option>
				</Select>
			</div>
			<br/>
			<div>
				<span>做题时间</span>
				<Date-picker class="input" type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间" v-model="updateDate"></Date-picker>
			</div>

        </Modal>


    <!-- 表格预览 -->
		<Table border :columns="columns7" :data="pratiseLists[pageNum - 1]"></Table>
		<Page :total="totalPar" :current="pageNum"   @on-change="changeNum" class="pagepra"/>

		<!-- end表格预览 -->
	</section>
</template>

<script>
// "type": "题目类型" , //1‐选择题 2‐判断题 3‐填空题 4‐问答题 5‐编程题 6‐综合题
import { mapState, mapActions } from "vuex";
import user from "../../store/types/user";
import paper from "../../store/types/paper";
import organization from "../../store/types/organization";
import { IP } from "src/utils/interaction";
// import practicesHistory from "../paper/practicesHistory.vue"

export default {
  data() {
    return {
      chapterId: null,
      paperType: null,
      testpaperType: null,
      testpaperTitle: "",
      date: [],
      updateDate: [],
      templateURL: IP + "excel/template.xlsx",
      showModel: false,
      chapterName: "",

      uploadType: "byFile",
      canCreate: true,
      fileInput: null,
      upfile: null,
      choosedFile: false,
      choosedFileName: "",

      previewDialog: false,
      previewPaperTitle: "",
      previewpaperContent: [],

      previewPaperType: "",

      analyzeDialog: false,
      analyzePaperTitle: "",
      eyeUrl: require('@/assets/images/preview@1x.png'),
      analyzepaperContent: "分析试卷内容",
      averageScore:0,

      updateDialog: false,
      updatePaperTitle: "",

      totalPar: 0,
      columns7: [
        {
          title: "试卷标题",
          key: "testpaperTitle"
        },
        {
          title: "开始时间",
          key: "createTime"
        },
        {
          title: "结束时间",
          key: "endingTime"
        },
        {
          title: "操作",
          key: "action",
          width: 300,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      // alert('dyfyfty');
                      this.toPreviewPaper(
                        params.row.testpaperTitle,
                        params.row.testpaperId
                      );
                    }
                  }
                },
                "预览"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.toAnalyzePaper(
                        params.row.testpaperTitle,
                        params.row.testpaperId
                      );
                    }
                  }
                },
                "分析"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "warning",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.toShowUpdateDialog(
                        params.row.testpaperTitle,
                        params.row.testpaperId
                      );
                    }
                  }
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.toDeletePaper(params.row.testpaperId);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      pratiseLists: [],
      pageNum: 1
    };
  },

  computed: {
    ...mapState({
      user: state => state.user,
      organization: state => state.organization,
      paperQuestionList: state => state.paper.paperQuestionList,
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
    choosePaperType(val) {
      this.testpaperType = val;
    },
    chooseChapter(val) {
      console.log(val);
    },
    toCreatePaper(data) {
      this.createPaper(data)
        .then(data => {
          if (data.state) {
            this.$Message.success(data.info);
            this.getPractice();
            // this.canCreate = false;
            this.testpaperTitle = "";
            this.paperType = null;
            this.date = [];
            this.chapterId = null;
            this.upfile = null;
            this.choosedFile = false;
          } else {
            this.$Message.error(data.info);
          }
        })
        .catch(err => {
          this.$Message.error(err);
        });
    },
    dateFormat(fmt, date) {
      var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        S: date.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );

      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
      return fmt;
    },
    create() {
      if (this.check()) {
        var data = new FormData();
        data.append("file", this.upfile);
        data.append("testpaperTitle", this.testpaperTitle);
        data.append("testpaperType", this.testpaperType);
        data.append(
          "createTime",
          this.dateFormat("yyyy-MM-dd hh:mm:ss", this.date[0])
        );
        data.append(
          "endingTime",
          this.dateFormat("yyyy-MM-dd hh:mm:ss", this.date[1])
        );
        data.append("chapterId", this.chapterId);
        this.toCreatePaper(data);
      }
    },
    check() {
      if (
        this.testpaperTitle.trim() === "" ||
        this.date.length === 0 ||
        this.paperType === null ||
        this.chapterId === null
      ) {
        alert("试卷信息不能为空");
        return false;
      } else if (this.upfile === null) {
        alert("请选择上传的试卷文件!");
        return false;
      }
      return true;
    },
    uploadHandle() {
      // this.canCreate = false;
      // var fileInput = this.$refs.fileInput
      // fileInput.click()
      var el = document.createElement("input");
      el.setAttribute("type", "file");
      el.setAttribute("class", "file-input");
      el.onchange = this.fileChange;
      document.body.appendChild(el);
      this.fileInput = el;
      this.fileInput.click();
    },
    fileChange() {
      var fileInput = this.fileInput;
      if (!fileInput.files) {
        alert(
          "该浏览器不支持上传模板生成试卷，请升级浏览器或使用其他浏览器或使用在线出卷功能生成试卷"
        );
        return;
      }
      if (fileInput.files.length <= 0) {
        return;
      }
      var file = fileInput.files[0];
      var reg = /^.*\.(?:xls|xlsx)$/i; //文件名可以带空格
      if (!reg.test(file.name)) {
        //校验不通过
        alert("请上传excel格式的文件!");
        return;
      } else {
        console.log(file.name);
        this.choosedFile = true;
        this.choosedFileName = file.name;
        this.upfile = file;
      }
    },
    getPractice() {
      let that = this;
      this.getExPracticeList({
        organizationId: this.organization.organizationId
      })
        .then(data => {
          let arr = [];
          for (let i = 0; i < data.length; i += 10) {
            let ari = [];
            for (let j = i; j < i + 10; j++) {
              if (!data[j]) break;
              ari.push(data[j]);
            }
            arr.push(ari);
          }
          that.totalPar = data.length;
          that.pratiseLists = arr;
        })
        .catch(err => {
          console.log("error");
        });
    },
    changeNum(value) {
      this.pageNum = value;
    },
    // 预览试卷
    toPreviewPaper(title, paperID) {
      this.previewDialog = true;
      this.previewPaperTitle = title;
      this.previewPaper({
        testpaperId: paperID,
        organizationId: this.organization.organizationId
      })
        .then(data => {
          if (data.info.state) {
            this.previewpaperContent = data.info.data.questions;

            switch (data.info.data.testpaperType) {
              case 1:
                this.previewPaperType = "考试";
                break;
              case 2:
                this.previewPaperType = "课前预习";
                break;
              case 3:
                this.previewPaperType = "课后复习题";
                break;
            }
            this.$Message.success(data.info.stateInfo);
          } else {
            this.$Message.error(data.info.stateInfo);
          }
        })
        .catch(err => {
          this.$Message.error(err);
        });
    },

    // 分析试卷
    toAnalyzePaper(title, paperID) {
      this.analyzeDialog = true;
      this.analyzePaperTitle = title;

      this.analyzePaper({
        testpaperId: paperID,
        organizationId: this.organization.organizationId
      })
        .then(data => {
          if (data.info.state) {
            this.analyzepaperContent = data.info.data.questions;
            this.averageScore = data.info.data.averageScore;
            switch (data.info.data.testpaperType) {
              case 1:
                this.previewPaperType = "考试";
                break;
              case 2:
                this.previewPaperType = "课前预习";
                break;
              case 3:
                this.previewPaperType = "课后复习题";
                break;
            }

            this.$Message.success(data.info.stateInfo);
          } else {
            this.$Message.error(data.info.stateInfo);
          }
        })
        .catch(err => {
          this.$Message.error(err);
        });
    },

    toShowUpdateDialog(title, paperID) {
      this.updateDialog = true;

      this.testpaperId = paperID;
      this.updatePaperTitle = title;
    },
    
    checkUpdateData() {
      console.log(this.testpaperType);
      if (
        this.updatePaperTitle.trim() === "" ||
        this.updateDate[0] === "" ||
         this.updateDate[1] === "" ||
        this.paperType === null
      ) {
        // alert("试卷信息不能为空");
        this.$Message.error('试卷信息不能为空');
        return false;
      } else return true;
    },
    // 更新试卷信息
    toUpdatePaper() {
      if(this.checkUpdateData()){
      this.updatePaper({
        testpaperId: this.testpaperId,
        testpaperTitle: this.updatePaperTitle,
        testpaperType: parseInt(this.paperType),
        createTime: this.dateFormat("yyyy-MM-dd hh:mm:ss", this.updateDate[0]),
        endingTime: this.dateFormat("yyyy-MM-dd hh:mm:ss", this.updateDate[1])
      })
        .then(data => {
          if (data.info.state) {
            this.$Message.success(data.info.stateInfo);
          } else {
            this.$Message.error(data.info.stateInfo);
          }
        })
        .catch(err => {
          this.$Message.error(err);
        });
    }},

    // 删除试卷
    toDeletePaper(val) {
      this.deletePaper({
        testpaperId: val
      })
        .then(data => {
          if (data.state) {
            this.getPractice();
            this.$Message.success(data.info);
          } else {
            this.$Message.error(data.info);
          }
        })
        .catch(err => {
          this.$Message.error(err);
        });
    }
  },
  watch: {
    organization: function() {
      this.getPractice();
    }
  },
  created() {
    this.toGetChapterList();
    this.getPractice();
  }
};
</script>

<style scoped lang='less'>
section {
  border: 1px solid #dedede;
  margin: 10px 20px;
}

.info-wrap {
  .input {
    width: 250px;
    // margin-left: 5rem
  }
  span {
    display: inline-block;
    padding-right: 1em;
  }
  & > div {
    display: inline-block;
    margin: 5px 10px 5px 0;
  }
  .chapter-wrap {
    width: 314px;

    & > div {
      width: 250px;
    }

    .create-chapter {
      width: 99%;
      margin-top: 4px;
      margin-bottom: -4px;
      margin-left: 0.5%;
    }
  }
}
.question-wrap {
  position: relative;
}

.question-num-wrap {
  margin: 13px;
  span {
    display: inline-block;
    width: 4em;
    font-size: 18px;
    color: green;
    vertical-align: middle;
  }
  .input {
    width: 60px;
  }
}
</style>

<style>
.file-input {
  display: none;
}
.pagepra {
  text-align: center;
  margin: 10px 10px;
}
.answer{
  font-size: 15px;
}

.answer h3 {
  margin-top: 10px;
  margin-bottom: 10px;
  color: #2d8cf0;
}

.answer li {
  list-style: none;
}
.answer .right {
  font-weight: bold;
  color: green;
}
.answer .abc {
  display: inline-block;
  padding-left: 9px;
  margin-bottom: 15px;
  margin-right: 30px;
  height: 30px;
  width: 30px;
  font-size: 16px;
  line-height: 30px;
  border: solid #2d8cf0 1px;
  color: #2d8cf0;
  border-radius: 50%;
}


.question-type{
  display: block;
  margin-top: 20px;
  margin-bottom: 20px;

}
.question-type h3{
  display: inline;
}

.question-type span{
  color: red;
  float: right;
}
</style>