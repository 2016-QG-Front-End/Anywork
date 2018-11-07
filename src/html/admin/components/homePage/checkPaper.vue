<template>
<section>


    <!-- 某套试卷的完成情况 -->
    <Modal :title="previewPaperTitle +'('+ previewPaperType+')的完成情况'" width="900" v-model="showPreviewDialog" @on-ok="clear('preview')">
      <Table :columns="columns1" :data="studentList"></Table>
    </Modal>

    <!-- 某个学生完成某套试卷的详情 -->
    <Modal width="700" :title="studentName+ '的做题情况'"
    v-model="shwoDetailDialog"
    @on-ok="clear('detail')"
    @on-cancel="shwoDetailDialog=false">

    <div class="answer" v-for="item in detail" v-bind:key="item.question.studentId">
              <h3 class="question-type" v-if="item.question.type==1">选择题</h3>
              <h3 class="question-type" v-if="item.question.type==2">判断题</h3>
              <h3 class="question-type" v-if="item.question.type==3">填空题</h3>
              <h3 class="question-type" v-if="item.question.type==4">问答题</h3>

          <h3>{{item.question.content}}</h3>

          <!-- 选择题 -->
            <ul v-if="item.question.type==1" class="unselect">
            <li><span class="abc">A</span>{{item.question.a}}</li>
            <li><span class="abc">B</span>{{item.question.b}}</li>
            <li><span class="abc">C</span>{{item.question.c}}</li>
            <li><span class="abc">D</span>{{item.question.d}}</li>
            </ul>

    <p>标准答案:{{item.question.key}}</p>   
    <p>学生答案:{{item.studentAnswer}}</p>
    <i>解析:{{item.question.analysis}}</i>
    <p style="color:red">得分:{{item.socre}}</p>
    </div>
    </Modal>

<!-- 老师评卷 -->
    <Modal width="700" :title="'给' + studentName + '的简答题评卷'"
    v-model="showCheckDialog"
   >

      <div class-name="subjectAnswer" v-for="item in subject" v-bind:key="item.question.questionId">
      <h2>题目:{{item.question.content}}({{item.question.socre}}分)</h2>
      <p><span>正确答案:</span>{{item.question.key}}</p>
      <p><span>学生答案:</span>{{item.studentAnswer}}</p>
      <Input-number :max="item.question.socre" :min="1" :value="1" v-model="subjectScore"></Input-number>分
      <Button type="success" @click="toSubmitSubjectScore(item.studentId,item.question.testpaperId,item.question.questionId,subjectScore)">提交</Button>
      <hr>
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

export default {
  data() {
    return {
      chapterId: null,
      paperType: null,
      testpaperType: null,
      templateURL: IP + "excel/template.xlsx",

      showPreviewDialog: false,
      previewPaperTitle: "",
      previewPaperType: "",

      shwoDetailDialog: false,
      studentName: "",
      detail: [],

      showCheckDialog: false,
      subject: [],
      subjectScore: 1,

      haveSubject: null,

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
                      this.toPreviewPaper(
                        params.row.testpaperId,
                        params.row.testpaperTitle,
                        params.row.testpaperType,
                        params.row.haveSubject
                      );
                    }
                  }
                },
                "完成情况"
              )
            ]);
          }
        }
      ],
      pratiseLists: [],
      pageNum: 1,

      columns1: [
        {
          title: "学生ID",
          key: "studentId"
        },
        {
          title: "学生姓名",
          key: "studentName"
        },
        {
          title: "是否评",
          key: "ifCheck",
          render: (h, params) => {
            if (params.row.ifCheck == 0) {
              return h("div", [h("span", "否")]);
            } else {
              return h("div", [h("span", "是")]);
            }
          }
        },
        {
          title: "客观题分数",
          key: "object"
        },
        {
          title: "主观题分数",
          key: "subject"
        },
        {
          title: "是否参加考试",
          key: "ifAttend",
             render: (h, params) => {
            if (params.row.ifAttend == 0) {
              return h("div", [h("span", "否")]);
            } else {
              return h("div", [h("span", "是")]);
            }
          }
        },
        {
          title: "考试总分",
          key: "testpaper",
          render: (h, params) => {
            return h("div", [h("span", params.row.testpaper.testpaperScore)]);
          }
        },
        {
          title: "操作",
          key: "action",
          width: 200,
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
                      if (params.row.ifAttend) {
                        this.toTestDeatil(
                          params.row.testpaper.testpaperId,
                          params.row.studentId,
                          params.row.studentName
                        );
                      } else {
                        this.$Message.error("该学生没有参加考试!");
                      }
                    }
                  }
                },
                "查看"
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
                      let that = this;
                      if (that.haveSubject == 0) {
                        this.$Message.error("该试卷没有主观题可以评！");
                      } else if (params.row.ifAttend == 0) {
                        this.$Message.error("该学生没有参加考试!");
                      } else {
                        this.toCheckSubject(
                          params.row.testpaper.testpaperId,
                          params.row.studentId,
                          params.row.studentName
                        );
                      }
                    }
                  }
                },
                "评卷"
              )
            ]);
          }
        }
      ],
      studentList: []
    };
  },

  computed: {
    ...mapState({
      user: state => state.user,
      organization: state => state.organization,
      paperQuestionList: state => state.paper.paperQuestionList
    })
  },
  methods: {
    ...mapActions(paper.actions),
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
    toPreviewPaper(paperID, paperTITLE, paperTYPE, haveSUBJECT) {
      this.previewPaperTitle = paperTITLE;
      this.paperType = paperTYPE;

      this.haveSubject = haveSUBJECT;

      this.checkProgress({
        testpaperId: paperID,
        organizationId: this.organization.organizationId
      })
        .then(data => {
          if (data.info.state) {
            switch (this.paperType) {
              case 1:
                this.previewPaperType = "考试";
                break;
              case 2:
                this.previewPaperType = "预习题";
                break;
              case 3:
                this.previewPaperType = "课后复习题";
                break;
            }
            this.studentList = data.info.data;
            this.showPreviewDialog = true;
            this.$Message.success(data.info.stateInfo);
          } else {
            this.$Message.error(data.info.stateInfo);
          }
        })
        .catch(err => {
          this.$Message.error(err);
        });
    },

    //查看某个学生完成某套试题
    toTestDeatil(paperID, studentID, studentNAME) {
      this.studentName = studentNAME;

      this.testDetail({
        testpaperId: paperID,
        studentId: studentID
      })
        .then(data => {
          if (data.info.state) {
            this.detail = data.info.data.studentAnswerAnalysis;
            this.$Message.success(data.info.stateInfo);
            this.shwoDetailDialog = true;
          } else {
            this.$Message.error(data.info.stateInfo);
          }
        })
        .catch(err => {
          this.$Message.error(err);
        });
    },
    toCheckSubject(paperID, studentID, studentNAME) {
      this.studentName = studentNAME;

      this.checkSubject({
        testpaperId: paperID,
        studentId: studentID
      })
        .then(data => {
          if (data.info.state) {
            this.subject = data.info.data.studentAnswerAnalysis;
            this.$Message.success(data.info.stateInfo);
            this.showCheckDialog = true;
          } else {
            this.$Message.error(data.info.stateInfo);
          }
        })
        .catch(err => {
          this.$Message.error(err);
        });
    },
    clear(param) {
      if (param == "preview") {
        this.showPreviewDialog = false;
        this.studentList = [];
        this.haveSubject = null;
      } else if (param == "detail") {
        this.shwoDetailDialog = false;
        this.detail = [];
      } else {
        this.toSubmitCheck();
        this.showCheckDialog = false;
        this.subject = [];
      }
    },
    toSubmitSubjectScore(sId, pId, qId, scr) {
      console.log(sId, pId, qId, scr);
      this.submitSubjectScore({
        studentId: sId, //int
        testpaperId: pId, //int
        teacherJudge: [
          //老师评分数组
          {
            questionId: qId, //int
            socre: scr //double
          }
        ]
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
    },
    changeNum(value) {
      this.pageNum = value;
    }
  },
  watch: {
    organization: function() {
      this.getPractice();
    }
  },
  created() {
    this.getPractice();
  }
};
</script>

<style>
.pagepra {
  text-align: center;
  margin: 10px 10px;
}
.unselect {
  -moz-user-select: none;
  -ms-touch-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}

.answer p,
li,
i {
  font-size: 15px;
}
.answer span {
  font-weight: bold;
}
.answer .question-type {
  color: #2d8cf0;
  margin-top: 20px;
}

.answer li {
  list-style: none;
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
.subjectAnswer span {
  font-weight: bold;
}
hr{
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
