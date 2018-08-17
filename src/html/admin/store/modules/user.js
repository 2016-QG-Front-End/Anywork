import types from '../types/user'
import { myAxios, IP } from 'src/utils/interaction'


const state = {
   	userName: '',
   	email: '',
   	phone: '',
    mark: 0,
    userId: undefined,
    refresh: new Date().getTime(),
    imagePP: '',
    imagePath: ''
}

const getters = {
    userPhoto (state) {
        // return   IP + 'picture/' + state.userId +'.jpg?' + state.refresh
        return state.imagePP ? state.imagePP : '/anywork' + state.imagePath
        // return state.imagePP ? state.imagePP : '' + state.imagePath
    }
}

const actions = {
    [types.actions.getMyInfo]: (context, data) => {
        //context: commit,dispatch,getters,state
        return new Promise((resolve, reject) => {
            myAxios({
                method: 'POST',
                url: '/user/info',
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
}

export default {
  state,
  getters,
  actions,
  mutations
};