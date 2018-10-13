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
      
		</div>
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
      templateURL: IP + "excel/template.xlsx",
      showModel: false,
      chapterName: "",

      uploadType: "byFile",
      canCreate: true,
      fileInput: null,
      upfile: null,
      choosedFile: false,
      choosedFileName: ""
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
            // this.canCreate = false;
            this.testpaperTitle = "";
            this.paperType = null;
            this.date = [];
            this.chapterId = null;
            this.upfile=null;
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
        fmt = fmt.replace(RegExp.$1,(date.getFullYear() + "").substr(4 - RegExp.$1.length));

      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1? o[k]:("00" + o[k]).substr((""+o[k]).length)
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
      ){
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
    }
  },
  created() {
    this.toGetChapterList();
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
</style>