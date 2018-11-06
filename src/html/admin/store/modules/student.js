import types from '../types/student'
import { myAxios, IP } from 'src/utils/interaction'


const state = {
   	studentName: '',
    studentId: undefined,
    refresh: new Date().getTime(),
    studentImg: ''
}

const getters = {
    // studentPhoto (state) {
    //     return   IP + 'picture/' + state.studentId +'.jpg?' + state.refresh
    // }
    studentPhoto(state) {
        return IP + state.studentImg
    }
}

const actions = {
    [types.actions.setStudentInfo]: (context, data) => {
        //context: commit,dispatch,getters,state
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