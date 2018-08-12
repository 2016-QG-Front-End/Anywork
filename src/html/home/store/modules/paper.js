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
	allTestPaperList: [],
    allPracticePaperList: [],
    paperQuestionList: [],     
    questionAnswerInfo: {},
    testChapterList: [],
    myPracticeList: [],
    myTestList: []
}

const actions = {
	[types.actions.getAllTestPapers]: (context, data) => {
		return new Promise((resolve, reject) => {
			myAxios({
				method: 'POST',
				url: '/test/testList',
				data: data
			}).then(function(res){
                 if(res.data.state.toString()==="1"){
                    context.commit(types.mutations.setInfo,{
                    	allTestPaperList: res.data.data,
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
    
    [types.actions.getAllPracticePapers]: (context, data) => {
        return new Promise((resolve, reject) => {
            myAxios({
                method: 'POST',
                url: '/test/practiceList',
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

    [types.actions.getChapterList]: (context, data) => {
        return new Promise( (resolve, reject) => {
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
    
    [types.actions.setPaperInfo]: (context, data) => {
        return new Promise((resolve, reject) => {
            context.commit(types.mutations.setInfo, data)
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

    [types.actions.getMyTestPaper]: (context, data) => {
        return new Promise((resolve, reject) => {
            myAxios({
                method: 'POST',
                url: '/test/getMyTest',
                data: data
            }).then(function(res){
                 if(res.data.state.toString()==="1"){
                    context.commit(types.mutations.setInfo,{
                        myTestList: res.data.data,
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

    [types.actions.getMyPracticePaper]: (context, data) => {
        return new Promise((resolve, reject) => {
            myAxios({
                method: 'POST',
                url: '/test/getMyPractice',
                data: data
            }).then(function(res){
                 if(res.data.state.toString()==="1"){
                    context.commit(types.mutations.setInfo,{
                        myPracticeList: res.data.data,
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