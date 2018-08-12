import types from '../types/user'
import { myAxios, IP } from 'src/utils/interaction'


const state = {
   	userName: '',
   	email: '',
   	phone: '',
    mark: 0,
    userId: undefined,
    refresh: new Date().getTime(),
    photo: 'undefined.jpg'
}

const getters = {
    userPhoto (state) {
        return IP + 'picture/' + state.photo +'?'+ + state.refresh
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
                url: '/user/myinfo',
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
                url: '/user/change',
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
    [types.actions.refresh]: (context) => {
        let time = new Date().getTime()
        context.commit(types.mutations.refresh, time)
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
        state.refresh = data
    }
}

export default {
  state,
  getters,
  actions,
  mutations
};