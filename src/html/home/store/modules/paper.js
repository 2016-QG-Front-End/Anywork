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
    myTestList: [],
    isToCollections: false
}

const actions = {
	[types.actions.getAllTestPapers]: (context, data) => {
		return new Promise((resolve, reject) => {
			myAxios({
				method: 'POST',
				url: '/test/list',
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
                url: '/test/list',
                data: data
            }).then(function(res){
                 if(res.data.state.toString()==="1"){
                    context.commit(types.mutations.setInfo,{
                        allPracticePaperList: res.data.data,
                    })
                    context.commit(types.mutations.setPaperList,{
                        allPracticePaperList: res.data.data,
                        data: data
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
                    for (let i = 0; i < res.data.data.length; i++) {
                        res.data.data[i].paperList = []
                        res.data.data[i].isShow = false
                    }
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
    [types.actions.changePaperShows]: (context, data) => {
        context.commit(types.mutations.showPaper,{
            index: data,
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
                url: '/test/none/detail',
                data: data
            }).then(function(res){
                 if(res.data.state.toString()==="1"){
                    context.commit(types.mutations.setInfos,{
                        questionAnswerInfo: res.data.data,
                    })
                    resolve({
                        state: true,
                        data: res.data.data}
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
    [types.actions.getFinishedPaperAnswerById]: (context, data) => {
        return new Promise((resolve, reject) => {
            myAxios({
                method: 'POST',
                url: '/test/done/detail',
                data: data
            }).then(function(res){
                 if(res.data.state.toString()==="1"){
                    context.commit(types.mutations.setInfo,{
                        questionAnswerInfo: res.data.data,
                    })
                    resolve({
                        state: true,
                        info: res.data.stateInfo,
                        data: res.data.data}
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
    [types.actions.upLoadCollection]: (context, data) => {
        return new Promise((resolve, reject) => {
            myAxios({
                method: 'POST',
                url: '/quest/collect',
                data: data
            }).then(function(res){
                 if(res.data.state.toString()==="1"){
                    // context.commit(types.mutations.setInfo,{
                    //     questionAnswerInfo: res.data.data,
                    // })
                    resolve({
                        state: true,
                        info: res.data.stateInfo,
                        data: res.data.data}
                    )
                }else{
                    reject({
                        state: false,
                        info: res.data.stateInfo}
                    )
                }
            }).catch(function(err){
                reject({
                    info: err
                })
            })
        })
    },
    [types.actions.deleteCollection]: (context, data) => {
        return new Promise((resolve, reject) => {
            myAxios({
                method: 'POST',
                url: '/quest/collect/delete',
                data: data
            }).then(function(res){
                 if(res.data.state.toString()==="1"){
                    // context.commit(types.mutations.setInfo,{
                    //     questionAnswerInfo: res.data.data,
                    // })
                    resolve({
                        state: true,
                        info: res.data.stateInfo,
                        data: res.data.data}
                    )
                }else{
                    reject({
                        state: false,
                        info: res.data.stateInfo}
                    )
                }
            }).catch(function(err){
                reject({
                    info: err
                })
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
                        data: res.data.data}
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
    [types.actions.getCollections]: (context, data) => {
        return new Promise((resolve, reject) => {
            myAxios({
                method: 'POST',
                url: '/quest/collect/list',
                // data: data
            }).then(function(res){
                 if(res.data.state.toString()==="1"){
                    context.commit(types.mutations.setToCollection,{
                        myTestList: true,
                    })
                    resolve({
                        state: true,
                        data: res.data.data}
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
    [types.actions.setCFalse]: (context, data) => {
            context.commit(types.mutations.setToCollection,{
                myTestList: false,
            })
    },
    [types.actions.detailCollection]: (context, data) => {
        return new Promise((resolve, reject) => {
            myAxios({
                method: 'POST',
                url: '/test/detail',
                data: data
            }).then(function(res){
                 if(res.data.state.toString()==="1"){
                    // context.commit(types.mutations.setInfo,{
                    //     myTestList: res.data.data,
                    // })
                    resolve({
                        state: true,
                        data: res.data.data}
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
        // console.log(datas)
        Object.assign(state,datas)
        if (datas.questionAnswerInfo) {
            state.paperQuestionList = datas.questionAnswerInfo
        }

    },
    [types.mutations.setInfos]: (state, datas) => {
        // console.log(datas)
        if (datas.questionAnswerInfo) {
            state.paperQuestionList = datas.questionAnswerInfo
        }

    },
    [types.mutations.setPaperList]: (state, datas) => {
        // console.log(datas)
        
        for (let i = 0; i < state.testChapterList.length; i++) {
            if (state.testChapterList[i].chapterId == datas.data.chapter) {
                state.testChapterList[i].paperList = datas.allPracticePaperList
            }
        }
        
        

    },
    [types.mutations.showPaper]: (state, datas) => {
        // console.log(datas)
        console.log (state.testChapterList[datas.index].paperList)
        state.testChapterList[datas.index].isShow = !state.testChapterList[datas.index].isShow
    },
    [types.mutations.setToCollection]: (state, datas) => {
        // console.log(datas)
        state.isToCollections = datas.myTestList
    },
}

export default {
	state,
	actions,
	mutations
}