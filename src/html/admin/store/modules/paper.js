import types from '../types/paper'
import { myAxios } from 'src/utils/interaction'

const state = {
	testpaperId: undefined,
	testpaperTitle: '',
	chapterId: undefined,   /*no info*/  //因需求原因将 -1 表示未做过试卷，0表示做过试卷
    hasDown: 0,    //因为在代码里面一直用chapterId感觉怪怪的，所以设置了一个hasDown，其值跟chapterId一样
	chapterName: '',
    createTime: undefined,       /*no info*/
    endingTime: undefined,
	testpaperScore: undefined,
    organizationId: undefined,
    authorId: undefined,
    paperQuestionList: [],     
    questionAnswerInfo: {},
    testChapterList: [],
    studentList: [],
    myOrganizationList: []
}

const actions = {

    [types.actions.getPracticeListByChapter]: (context, data) => {
        return new Promise((resolve, reject) => {
            myAxios({
                method: 'POST',
                url: '/test/practiceListByChapter',
                data: data
            }).then(function(res){
                 if(res.data.state.toString()==="1"){
                    context.commit(types.mutations.setInfo,{
                        allPracticePaperList: res.data.data,
                    })
                    resolve({
                        state: true,
                        info: res.data.stateInfo}
                    )
                }else{
                    resolve({
                        state: false,
                        info: res.data.stateInfo}
                    )
                }
            }).catch(function(err){
                reject(err)
            })
        })
    },

    [types.actions.getPaperInfo]: (context, data) => {
        return new Promise((resolve, reject) => {
            myAxios({
                method: 'POST',
                url: '/test',
                data: data
            }).then(function(res){
                 if(res.data.state.toString()==="1"){
                    context.commit(types.mutations.setInfo,{
                        paperQuestionList: res.data.data || [],
                    })
                    resolve({
                        state: true,
                        info: res.data.stateInfo}
                    )
                }else{
                    context.commit(types.mutations.setInfo,{
                        paperQuestionList: [],
                    })
                    resolve({
                        state: false,
                        info: res.data.stateInfo}
                    )
                }
            }).catch(function(err){
                reject(err)
            })
        })
    },
    
    [types.actions.submitPaper]: (context, data) => {
        return new Promise((resolve, reject) => {
            myAxios({
                method: 'POST',
                url: '/test/submit',
                data: data,
                headers: { 'Content-Type': 'multipart/form-data' },
            }).then(function(res){
                 if(res.data.state.toString()==="1"){
                    context.commit(types.mutations.setInfo,{
                        questionAnswerInfo: res.data.data,
                    })
                    resolve({
                        state: true,
                        info: res.data.stateInfo}
                    )
                }else{
                    resolve({
                        state: false,
                        info: res.data.stateInfo}
                    )
                }
            }).catch(function(err){
                reject(err)
            })
        })
    },
    
    [types.actions.setPaperInfo]: (context, data) => {
        return new Promise((resolve, reject) => {
            try{
                context.commit(types.mutations.setInfo, data)
                resolve({
                    state: true,
                    info: '设置数据成功'
                })
            }catch(err){
                resolve({
                    state: false,
                    info: err.toString()
                })
            }
        })
    },

    [types.actions.getChapterList]: (context, data) => {
        return new Promise((resolve, reject) => {
            myAxios({
                method: 'POST',
                url: '/test/chapter',
                data: data
            }).then(function(res){
                if(res.data.state.toString()==="1"){
                    context.commit(types.mutations.setInfo,{
                        testChapterList: res.data.data,
                    })
                    resolve({
                        state: true,
                        info: res.data.stateInfo}
                    )
                }else{
                    resolve({
                        state: false,
                        info: res.data.stateInfo}
                    )
                }
            }).catch(function(err){
                reject(err)
            })
        })
    },

    [types.actions.addChapter]: (context, data) => {
        return new Promise((resolve, reject) => {
            myAxios({
                method: 'POST',
                url: '/test/addChapter',
                data: data
            }).then(function(res){
                if(res.data.state.toString()==="1"){
                    var arr = context.state.testChapterList
                    arr.push(res.data.data)
                    context.commit(types.mutations.setInfo,{
                        testChapterList: arr
                    })
                    resolve({
                        state: true,
                        info: res.data.stateInfo,
                        chapterId: res.data.data.chapterId
                    })
                }else{
                    resolve({
                        state: false,
                        info: res.data.stateInfo}
                    )
                }
            }).catch(function(err){
                reject(err)
            })
        })
    },
    [types.actions.updateChapter]: (context, data) => {
        return new Promise((resolve, reject) => {
            myAxios({
                method: 'POST',
                url: '/test/chapter/update',
                data: data
            }).then(function (res) {
                if (res.data.state.toString() === "1") {
                    resolve({
                        state: true,
                        info: res.data.stateInfo,
                        chapterId: res.data.data.chapterId
                    })
                    // [types.actions.getChapterList]();
                } else {
                    resolve({
                        state: false,
                        info: res.data.stateInfo
                    }
                    )
                }
            }).catch(function (err) {
                reject(err)
            })
        })
    },
    [types.actions.deleteChapter]: (context, data) => {
        return new Promise((resolve, reject) => {
            myAxios({
                method: 'POST',
                url: '/test/deleteChapter',
                data: data
            }).then(function (res) {
                if (res.data.state.toString() === "1") {
                    resolve({
                        state: true,
                        info: res.data.stateInfo,
                    })
                } else {
                    resolve({
                        state: false,
                        info: res.data.stateInfo
                    }
                    )
                }
            }).catch(function (err) {
                reject(err)
            })
        })
    },
    [types.actions.getPaperAnswerById]: (context, data) => {
        return new Promise((resolve, reject) => {
            myAxios({
                method: 'POST',
                url: '/organization/studentTestDetail',
                data: data
            }).then(function(res){
                 if(res.data.state.toString()==="1"){
                    context.commit(types.mutations.setInfo,{
                        questionAnswerInfo: res.data.data,
                    })
                    resolve({
                        state: true,
                        info: res.data.stateInfo}
                    )
                }else{
                    resolve({
                        state: false,
                        info: res.data.stateInfo}
                    )
                }
            }).catch(function(err){
                reject(err)
            })
        })
    },

    [types.actions.getStudentsByTest]: (context, data) => {
        return new Promise((resolve, reject) => {
            myAxios({
                method: 'POST',
                url: '/teacher/lookTest',
                data: data
            }).then(function(res){
                 if(res.data.state.toString()==="1"){
                    context.commit(types.mutations.setInfo,{
                        studentList: res.data.data,
                    })
                    resolve({
                        state: true,
                        info: res.data.stateInfo}
                    )
                }else{
                    resolve({
                        state: false,
                        info: res.data.stateInfo}
                    )
                }
            }).catch(function(err){
                reject(err)
            })
        })
    },

    [types.actions.submitJudge]: (context, data) => {
        return new Promise((resolve, reject) => {
            myAxios({
                method: 'POST',
                url: '/teacher/judge',
                data: data
            }).then(function(res){
                 if(res.data.state.toString()==="1"){
                    resolve({
                        state: true,
                        info: res.data.stateInfo}
                    )
                }else{
                    resolve({
                        state: false,
                        info: res.data.stateInfo}
                    )
                }
            }).catch(function(err){
                reject(err)
            })
        })
    },
    [types.actions.createPaper]: (context, data) => {
        return new Promise((resolve, reject) => {
            myAxios({
                method: 'POST',
                url: 'paper/publish',
                data: data,
            }).then(function(res){
                 if(res.data.state.toString()==="1"){
                    context.commit(types.mutations.setInfo,{
                        paperQuestionList: data.questionsList || [],
                    })
                    resolve({
                        state: true,
                        info: res.data.stateInfo}
                    )
                }else{
                    context.commit(types.mutations.setInfo,{
                        paperQuestionList: [],
                    })
                    resolve({
                        state: false,
                        info: res.data.stateInfo}
                    )
                }
            }).catch(function(err){
                reject(err)
            })
        })
    },

    [types.actions.deletePaper]: (context, data) => {
        return new Promise((resolve, reject) => {
            myAxios({
                method: 'GET',
                url: 'quest/'+ data.testpaperId +'/delete',
            }).then(function(res){
                 if(res.data.state.toString()==="1"){
                    resolve({
                        state: true,
                        info: res.data.stateInfo}
                    )
                }else{
                    resolve({
                        state: false,
                        info: res.data.stateInfo}
                    )
                }
            }).catch(function(err){
                reject(err)
            })
        })
    },

    [types.actions.downloadPaper]: (context, data) => {
        return new Promise((resolve, reject) => {
            myAxios({
                method: 'GET',
                url: 'quest/'+ data.organizationId +'/export/' + data.testpaperId,
            }).then(function(res){
                 if(res.data.state.toString()==="1"){
                    resolve({
                        state: true,
                        info: res.data.stateInfo}
                    )
                }else{
                    resolve({
                        state: false,
                        info: res.data.stateInfo}
                    )
                }
            }).catch(function(err){
                reject(err)
            })
        })
    }, 
    [types.actions.getMyOrganizations]: (context) => {
        return new Promise((resolve, reject) => {
            myAxios({
                method: 'POST',
                url: '/organization/myOrganization',
            }).then(function (res) {
                if (res.data.state.toString() === "1") {
                    resolve(res.data)
                } else {
                    resolve({
                        state: false,
                        info: res.data.stateInfo
                    }
                    )
                }
            }).catch(function (err) {
                reject(err)
            })
        })
    },

}

const mutations = {
	[types.mutations.setInfo]: (state, datas) => {
        Object.assign(state,datas)
	}
}

export default {
	state,
	actions,
	mutations
}