import types from '../types/user'
import { myAxios } from 'src/utils/interaction'

const state = {
    userName: '',
    email: '',
    phone: '',
    mark: 0,
    userId: undefined,
}

const actions = {
    [types.actions.newPassword]: (context, data) => {
        //context: commit,dispatch,getters,state
        return new Promise((resolve, reject) => {
            myAxios({
                method: 'POST',
                url: 'user/forget/new',
                data: data
            }).then(function(res){
                if(res.data.state == 1){
                    // context.commit(types.mutations.setInfo,res.data.data)
                    resolve({
                        state: true,
                        info: res.data.stateInfo,
                    })
                }else{
                    reject(res)
                }
            }).catch(function(err){
                reject(err)
            })
        })
    },
    // [types.actions.forgetPassword]: (context, data) => {
    //     return new Promise((resolve, reject) => {
    //         myAxios({
    //             method: 'POST',
    //             url: 'utils/forget',
    //             data: data
    //         }).then(function(res){
    //             if(res.data.state.toString()==="1"){
    //                 resolve({
    //                     state: true,
    //                     info: res.data.stateInfo}
    //                 )
    //             }else{
    //                 resolve({
    //                     state: false,
    //                     info: res.data.stateInfo}
    //                 )
    //             }
    //             // context.commit(types.mutations.setInfo,res.data.user)
    //         }).catch(function(err){
    //             reject(err)
    //         })
    //     })
    // }
}

const mutations = {
    [types.mutations.setInfo]: (state, datas) => {
        // Object.assign(state,datas)
    },
}

export default {
  state,
  actions,
  mutations
};
