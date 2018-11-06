import types from '../types/user'
import { myAxios, IP } from 'src/utils/interaction'


const state = {
   	userName: '',
   	email: '',
   	phone: '',
    mark: 0,
    userId: undefined,
    refresh: new Date().getTime(),
    photo: '/undefined.jpg',
    imagePath: '',
    imagePP: ''
}

const getters = {
    userPhoto (state) {
        return state.imagePP ? state.imagePP : '/anywork' + state.imagePath
        // return state.imagePP ? state.imagePP : '' + state.imagePath
    }
}

const actions = {
    [types.actions.setPhoto]: (context, data) => {
        return new Promise((resolve, reject) => {
            myAxios({
                method: 'GET',
                url: '/picture/' + context.state.userId +'.jpg?' + context.state.refresh,
            }).then((res) => {
                context.commit(types.mutations.setInfo, { photo: state.userId +'.jpg'})  
            }).catch((err) => {
                context.commit(types.mutations.setInfo, { photo: 'undefined.jpg'})
            })
        })
    },

    [types.actions.getMyInfo]: (context, data) => {
        //context: commit,dispatch,getters,state
        return new Promise((resolve, reject) => {
            myAxios({
                method: 'POST',
                url: '/user/info',
            }).then(function(res){
                 if(res.data.state.toString()==="1"){
                     if (!res.data.data.imagePath) {
                        res.data.data.imagePath = '../../../../assets/images/noimage.png'
                     }
                    context.commit(types.mutations.setInfo,res.data.data)
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
    [types.actions.getRank]: (context, data) => {
        //context: commit,dispatch,getters,state
        return new Promise((resolve, reject) => {
            myAxios({
                method: 'POST',
                url: '/leaderboard/show',
                data: data
            }).then(function(res){
                 if(res.data.state.toString()==="1"){
                    // context.commit(types.mutations.setInfo,res.data.data)
                    resolve(res.data.data)
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
    [types.actions.getNews]: (context, data) => {
        //context: commit,dispatch,getters,state
        return new Promise((resolve, reject) => {
            myAxios({
                method: 'POST',
                url: '/message/show',
                data: data
            }).then(function(res){
                 if(res.data.state.toString()==="1"){
                    // context.commit(types.mutations.setInfo,res.data.data)
                    resolve(res.data.data)
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
    [types.actions.readMessage]: (context, data) => {
        //context: commit,dispatch,getters,state
        return new Promise((resolve, reject) => {
            myAxios({
                method: 'POST',
                url: '/message/change',
                data: data
            }).then(function(res){
                 if(res.data.state.toString()==="1"){
                    // context.commit(types.mutations.setInfo,res.data.data)
                    resolve(res.data.data)
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
    [types.actions.noticed]: (context, data) => {
        //context: commit,dispatch,getters,state
        return new Promise((resolve, reject) => {
            myAxios({
                method: 'POST',
                url: '/message/change',
                data: data
            }).then(function(res){
                 if(res.data.state.toString()==="1"){
                    // context.commit(types.mutations.setInfo,res.data.data)
                    resolve()
                }else{
                    reject('出现错误')
                }
            }).catch(function(err){
                reject('服务器出现错误' + err)
            })
        })
    },
    [types.actions.updateInfo]: (context, data) => {
        //context: commit,dispatch,getters,state
        return new Promise((resolve, reject) => {
           myAxios({
                method: 'POST',
                url: '/user/update',
                data: data
            }).then(function(res){
                 if(res.data.state.toString()==="1"){
                    context.commit(types.mutations.setInfo,res.data.data)
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
    [types.actions.updatePassword]: (context, data) => {
        //context: commit,dispatch,getters,state
        return new Promise((resolve, reject) => {
            myAxios({
                method: 'POST',
                url: '/user/password/change',
                data: data
            }).then(function(res){
                 if(res.data.state.toString()==="1"){
                    context.commit(types.mutations.setInfo,res.data.data)
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
    [types.actions.submitSuggestion]: (context, data) => {
         return new Promise((resolve, reject) => {
            myAxios({
                method: 'POST',
                url: '/suggest/add',
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
    [types.actions.refresh]: (context, imageP) => {
        let time = new Date().getTime()
        context.commit(types.mutations.refresh, {
            time: time, 
            imageP: imageP})
    },
    [types.actions.exit]: (context) => {
         return new Promise((resolve, reject) => {
            myAxios({
                method: 'POST',
                url: '/user/exit',
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
}

const mutations = {
    [types.mutations.setInfo]: (state, datas) => {
        Object.assign(state,datas)
    },
    [types.mutations.refresh]: (state, data) => {
        console.log(arguments)
        state.refresh = data.time
        state.imagePP = URL.createObjectURL(data.imageP)
    }
}

export default {
  state,
  getters,
  actions,
  mutations
};