<template>
	<section>
		<div class="info-wrap">
			<div>
				<span>出卷老师</span>
				<Input type="text" class="input" disabled :value="user.userName"></Input>
			</div>
			<div>
				<span>试卷标题</span>
				<Input type="text" class="input" v-model="testpaperTitle"></Input>
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
		<div class="bt-wrap">
			<Select v-model="uploadType" class="select-type" @on-change="changeType">
		        <Option value="byFile">模板出题</Option>
		        <Option value="byLine">在线出题</Option>
		    </Select>
		    <a :href="templateURL" download="template.xlsx">
		    	<Button type="primary">下载模板</Button>
		    </a>
			<!-- <input type="file" ref="fileInput" class="file-input" @change="fileChange"> -->
			<Button type="primary" v-show="uploadType==='byFile'" @click="uploadHandle">上传模板</Button>
			<Button type="primary" @click="create" v-show="canCreate">创建试卷</Button>
		</div>
		<div class="paper-wrap" v-if="canCreate">
			<typetab 
				:tabs="tabs" 
				@tab-select="tabSelect"
			/>
			<div class="question-wrap" v-show="currentTab === 'choose'">
				<div class="question-num-wrap">
					<span>题目数量</span>
					<Input-number class="input" :min="0" v-model="chooseNumber" ></Input-number>
				</div>
				<choose
					v-for="(item, index) in (parseChooseList.length>0 ? parseChooseList : chooseNumber)"
					:index="index"
					:key="'choose-' + index" 
					:question="item"
					@set-question-item = "setQuestion" 
					@delete-question-item = "deleteQuestion" />
			</div>
			<div class="question-wrap" v-show="currentTab === 'pad'">
				<div class="question-num-wrap">
					<span>题目数量</span>
					<Input-number class="input" :min="0" v-model="padNumber" ></Input-number>
				</div>
				<pad v-for="(item, index) in (parsePadList.length>0 ? parsePadList : padNumber)" 
					:index="index" 
					:key="'pad-' + index" 
					:question="item"
					@set-question-item = "setQuestion" 
					@delete-question-item = "deleteQuestion" />
			</div>
			<div class="question-wrap" v-show="currentTab === 'judge'">
				<div class="question-num-wrap">
					<span>题目数量</span>
					<Input-number class="input" :min="0" v-model="judgeNumber" ></Input-number>
				</div>
				<judge v-for="(item, index) in (parseJudgeList.length>0 ? parseJudgeList : judgeNumber)" 
					:index="index" 
					:key="'judeg-' + index" 
					:question="item"
					@set-question-item = "setQuestion" 
					@delete-question-item = "deleteQuestion" />
			</div>
			<div class="question-wrap" v-show="currentTab === 'issue'">
				<div class="question-num-wrap">
					<span>题目数量</span>
					<Input-number class="input" :min="0" v-model="issueNumber" ></Input-number>
				</div>
				<issue v-for="(item, index) in (parseIssueList.length>0 ? parseIssueList : issueNumber)" 
					:index = "index" 
					:key = "'judeg-' + index" 
					:question = "item"
					@set-question-item = "setQuestion" 
					@delete-question-item = "deleteQuestion" />
			</div>
			<div class="question-wrap" v-show="currentTab === 'integrated'">
				<div class="question-num-wrap">
					<span>题目数量</span>
					<Input-number class="input" :min="0" v-model="integratedNumber" ></Input-number>
				</div>
				<integrated v-for="(item, index) in (parseIntegratedList.length>0 ? parseIntegratedList : integratedNumber)" 
					:index="index" 
					:key="'judeg-' + index" 
					:question = "item"
					@set-question-item = "setQuestion" 
					@delete-question-item = "deleteQuestion" />
			</div>
			<div class="question-wrap" v-show="currentTab === 'program'">
				<div class="question-num-wrap">
					<span>题目数量</span>
					<Input-number class="input" :min="0" v-model="programNumber" ></Input-number>
				</div>
				<program v-for="(item, index) in (parseProgramList.length>0 ? parseProgramList : programNumber)" 
					:index="index" 
					:key="'judeg-' + index" 
					:question = "item"
					@set-question-item = "setQuestion" 
					@delete-question-item = "deleteQuestion" />
			</div>
		</div>
	</section>
</template>

<script>
	// "type": "题目类型" , //1‐选择题 2‐判断题 3‐填空题 4‐问答题 5‐编程题 6‐综合题
	import { mapState, mapActions } from 'vuex'
	import user from '../../store/types/user'
	import paper from '../../store/types/paper'
	import organization from '../../store/types/organization'
	import { IP } from 'src/utils/interaction'

	import typetab from './paper/questionTypeTab'
	import choose from './paper/create/choose'
	import pad from './paper/create/pad'
	import judge from './paper/create/judge'
	import issue from './paper/create/issue'
	import integrated from './paper/create/integrated'
	import program from './paper/create/program'

	export default {
		data() {
			return {
				chapterId: 1,
				testpaperType: 0,
				testpaperTitle: '',
				date: [],
				templateURL: IP + 'excel/template.xlsx',
				tabs: {
					choose: '选择题',
					pad: "填空题",
					judge: "判断题",
					issue: "问答题",
					integrated: "综合题",
					program: "编程题",
				},
				showModel: false,
				chapterName: '',

				currentTab: 'choose',
				chooseNumber: 0,
				padNumber: 0,
				judgeNumber: 0,
				issueNumber: 0,
				integratedNumber: 0,
				programNumber: 0,

				parseChooseList: [],
				parsePadList: [],
				parseJudgeList: [],
				parseIssueList: [],
				parseIntegratedList: [],
				parseProgramList: [],

				questionsObject: {},
				uploadType: 'byFile',
				canCreate: false,
				fileInput: null
			}
		},
		components: {
			typetab,
			choose,
			pad,
			judge,
			issue,
			integrated,
			program,
		},
		computed: {
			...mapState({
				'user' : (state) => state.user,
				'organization' : (state) => state.organization,
				'paperQuestionList': state => state.paper.paperQuestionList,
				'testChapterList': state => state.paper.testChapterList
			})
		},
		methods: {
			...mapActions(paper.actions),

			toGetChapterList () {
				this.getChapterList({
					organizationId: this.organization.organizationId
				}).then((data) => {
					if(data.state){
					}else{
						this.$Message.error(data.info)
					}
				}).catch((err) => {
					this.$Message.error(err)
				})
			},
			handelModel(){
				this.showModel = true
			},
			toCreatechapter() {
				this.addChapter({
					organizationId: this.organization.organizationId,
					chapterName: this.chapterName
				}).then((data) => {
					if(data.state){
						this.$Message.success(data.info)
						this.chapterId = data.chapterId;
					}else{
						this.$Message.error(data.info)
					}
				}).catch((err) => {
					this.$Message.error(err)
				})
			},
			tabSelect(name) {
				this.currentTab = name
			},
			chooseChapter(val) {
				console.log(val)
			},
			setQuestion(info) {
				this.questionsObject[info.questionId] = info 
				// console.log( this.questionsObject)
			},
			deleteQuestion(questionId) {
				delete this.questionsObject[questionId]
				// console.log( this.questionsObject)
			},
			toCreatePaper(data) {
				this.createPaper(data).then((data) => {
                    if(data.state){
                        this.$Message.success(data.info )
                        this.canCreate = false;
                        this.testpaperTitle = '';
                        this.date = [];
                    }else{
                        this.$Message.error(data.info )
                    }
                }).catch((err) => {
                    this.$Message.error(err)
                })
			},
			create() {
				var questionList = [];
				var obj = this.questionsObject
				for(var name in obj) {
					var item = obj[name]
					item.questionId = 0
					questionList.push(item)
				}
				if(this.check()){
					var data = {
						testpaperId: 0,
						testpaperScore: 0,
						authorId: 0,
						testpaperTitle: this.testpaperTitle, //string 标题
						organizationId: this.organization.organizationId,
						createTime: new Date(this.date[0]).valueOf(), //int 开始时间
						endingTime: new Date(this.date[1]).valueOf(), //int 结束时间
						chapterId: this.chapterId,
						testpaperType: this.testpaperType,
						questions: questionList
					}
					this.toCreatePaper(data)
				}
			},
			check() {
				if(this.testpaperTitle.trim()==='' || this.date.length===0){
					alert('试卷信息不能为空')
					return false
				}
				return true
			},
			changeType(type) {
				console.log(this.testpaperType)
				if(type === 'byLine') {
					this.canCreate = true;
					this.parseChooseList = [];
					this.parsePadList = [];
					this.parseJudgeList = [];
					this.parseIssueList = [];
					this.parseIntegratedList = [];
					this.parseProgramList = [];
					this.chooseNumber = 0;
					this.padNumber = 0;
					this.judgeNumber = 0;
					this.issueNumber = 0;
					this.integratedNumber = 0;
					this.programNumber = 0;
				}else{
					this.canCreate = false;
				}
			},
			uploadHandle() {
				this.canCreate = false
				// var fileInput = this.$refs.fileInput
				// fileInput.click()
			    var el = document.createElement('input');
			    el.setAttribute('type', 'file')
			    el.setAttribute('class', 'file-input')
			    el.onchange = this.fileChange
				document.body.appendChild(el)
				this.fileInput = el;
				this.fileInput.click()
			},
			fileChange() {
				var fileInput = this.fileInput
				if(!fileInput.files) {
					alert('该浏览器不支持上传模板生成试卷，请升级浏览器或使用其他浏览器或使用在线出卷功能生成试卷')
					return
				}
				if(fileInput.files.length <= 0) {
					return
				}
				var file = fileInput.files[0]
				var reg = /^.*\.(?:xls|xlsx)$/i;//文件名可以带空格
                if (!reg.test(file.name)) {//校验不通过
                    alert("请上传excel格式的文件!");
                    return;
                }else{
					var data = new FormData()
					data.append('file', file)
					console.log(data)
                	this.toParseFile(data)
                }
			},
			toParseFile(data) {
				this.parseFile(data).then((data) => {
                    if(data.state){
                        this.canCreate = true;
                        this.handelParseQuestionInfo()
    					this.fileInput.parentNode.removeChild(this.fileInput);
                        this.$Message.success(data.info)
                    }else{
                        this.$Message.error(data.info )
                    }
                }).catch((err) => {
                    this.$Message.error(err)
                })
			},
			handelParseQuestionInfo() {
				var questionList = this.paperQuestionList;
				this.parseChooseList = [];
				this.parsePadList = [];
				this.parseJudgeList = [];
				this.parseIssueList = [];
				this.parseIntegratedList = [];
				this.parseProgramList = [];
				questionList.forEach((item) => {
					switch (Number(item.type)) {
						case 1:
							this.parseChooseList.push(item);
							this.chooseNumber = this.parseChooseList.length;
							break;
						case 2:
							this.parseJudgeList.push(item);
							this.judgeNumber = this.parseJudgeList.length;
							break;
						case 3:
							this.parsePadList.push(item);
							this.padNumber = this.parsePadList.length;
							break;
						case 4:
							this.parseIssueList.push(item);
							this.issueNumber = this.parseIssueList.length;
							break;
						case 5:
							this.parseProgramList.push(item);
							this.programNumber = this.parseProgramList.length;
							break;
						case 6:
							this.parseIntegratedList.push(item);
							this.integratedNumber = this.parseIntegratedList.length;
							break;
					}
				})
			}
		},
		watch: {
			chooseNumber: function(newVal, oldVal) {
				if(this.uploadType === 'byFile') {
					var val = newVal - this.parseChooseList.length
					if(val >= 0) {
						for(var i=0; i<val; i++) {
							this.parseChooseList.push({})
						}
					}else {
						for(var i=0; i<-val; i++){
							this.parseChooseList.pop()
						}
					}
				}
			},
			padNumber: function(newVal, oldVal) {
				if(this.uploadType === 'byFile') {
					var val = newVal - this.parsePadList.length
					if(val >= 0) {
						for(var i=0; i<val; i++) {
							this.parsePadList.push({})
						}
					}else {
						for(var i=0; i<-val; i++){
							this.parsePadList.pop()
						}
					}
				}
			},
			judgeNumber: function(newVal, oldVal) {
				if(this.uploadType === 'byFile') {
					var val = newVal - this.parseJudgeList.length
					if(val >= 0) {
						for(var i=0; i<val; i++) {
							this.parseJudgeList.push({})
						}
					}else {
						for(var i=0; i<-val; i++){
							this.parseJudgeList.pop()
						}
					}
				}
			},
			issueNumber: function(newVal, oldVal) {
				if(this.uploadType === 'byFile') {
					var val = newVal - this.parseIssueList.length
					if(val >= 0) {
						for(var i=0; i<val; i++) {
							this.parseIssueList.push({})
						}
					}else {
						for(var i=0; i<-val; i++){
							this.parseIssueList.pop()
						}
					}
				}
			},
			integratedNumber: function(newVal, oldVal) {
				if(this.uploadType === 'byFile') {
					var val = newVal - this.parseIntegratedList.length
					if(val >= 0) {
						for(var i=0; i<val; i++) {
							this.parseIntegratedList.push({})
						}
					}else {
						for(var i=0; i<-val; i++){
							this.parseIntegratedList.pop()
						}
					}
				}
			},
			programNumber: function(newVal, oldVal) {
				if(this.uploadType === 'byFile') {
					var val = newVal - this.parseProgramList.length
					if(val >= 0) {
						for(var i=0; i<val; i++) {
							this.parseProgramList.push({})
						}
					}else {
						for(var i=0; i<-val; i++){
							this.parseProgramList.pop()
						}
					}
				}
			}
		},
		created () {
			this.toGetChapterList()
		},
	}
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
		&>div {
			display: inline-block;
			margin: 5px  10px 5px 0;
		}
		.chapter-wrap {
			width: 314px;

			&>div {
				width: 250px;
			}

			.create-chapter {
			    width: 99%;
			    margin-top: 4px;
			    margin-bottom: -4px;
			    margin-left: .5%;
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
	.bt-wrap {
		padding: 10px 1em 10px;
		margin-bottom: 10px;
		text-align: right;
		border-bottom: 1px solid #dedede;
		
		.select-type {
	    	text-align: left;
	    	width: 120px;
		}
	}
</style>

<style>
	.file-input {
		display: none;
	}
</style>