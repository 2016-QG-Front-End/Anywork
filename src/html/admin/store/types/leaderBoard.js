import namespace from 'src/utils/namespace'

export default namespace('rank', {
  actions: [
    'getTotalLeaderBoard',
    'getOrganLeaderBoard',
    'setLeaderBoardInfo'
  ],
  mutations: [
    'setInfo',
  ]
})