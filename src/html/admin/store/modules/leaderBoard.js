import types from '../types/leaderBoard'
import {
  myAxios,
  IP
} from 'src/utils/interaction'


const state = {
  leaderBoardList: [],
  testOrganList: [],
  testPaperList: [],
  testOrganId: ''
}

// const getters = {
//   studentPhoto(state) {
//     return IP + 'picture/' + state.studentId + '.jpg?' + state.refresh
//   }
// }

const actions = {
  [types.actions.getTotalLeaderBoard]: (context, data) => {
    //context: commit,dispatch,getters,state
    return new Promise((resolve, reject) => {
      myAxios({
        method: 'POST',
        url: '/leaderboard/teacher/show',
      }).then(function (res) {
        if (res.data.state.toString() === "1") {
          context.commit(types.mutations.setInfo, {
            testOrganList: res.data.data.organizations,
            leaderBoardList: res.data.data.leaderboards
          })
          resolve({
            state: true,
            info: res.data.stateInfo
          })
        } else {
          resolve({
            state: false,
            info: res.data.stateInfo
          })
        }
      }).catch(function (err) {
        reject(err)
      })
    })
  },

  [types.actions.getOrganLeaderBoard]: (context, data) => {
    //context: commit,dispatch,getters,state
    return new Promise((resolve, reject) => {
      myAxios({
        method: 'POST',
        url: '/leaderboard/teacher/show/' + testOrganId,
      }).then(function (res) {
        if (res.data.state.toString() === "1") {
          context.commit(types.mutations.setInfo, {
            leaderBoardList: res.data.data
          })
          resolve({
            state: true,
            info: res.data.stateInfo
          })
        } else {
          resolve({
            state: false,
            info: res.data.stateInfo
          })
        }
      }).catch(function (err) {
        reject(err)
      })
    })
  },

  [types.actions.getMyPaper]: (context, data) => {
    //context: commit,dispatch,getters,state
    return new Promise((resolve, reject) => {
      myAxios({
        method: 'POST',
        url: '/leaderboard/teacher/show',
      }).then(function (res) {
        if (res.data.state.toString() === "1") {
          context.commit(types.mutations.setInfo, {
            testOrganList: res.data.data.organizations,
            leaderBoardList: res.data.data.leaderboards
          })
          resolve({
            state: true,
            info: res.data.stateInfo
          })
        } else {
          resolve({
            state: false,
            info: res.data.stateInfo
          })
        }
      }).catch(function (err) {
        reject(err)
      })
    })
  },
}

const mutations = {
  [types.mutations.setInfo]: (state, datas) => {
    Object.assign(state, datas)
  },
}

export default {
  state,
  getters,
  actions,
  mutations
};