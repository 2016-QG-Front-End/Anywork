const routes = [
  { 
    path: '*/', 
    redirect: {
      name: 'organizations',
    } 
  },
  { 
    path: '*/homePage', 
    redirect: {
      name: 'organizations',
    } 
  },
  {
    path: '/homePage',
    name: 'homePage',
    meta: {
      title: 'Home PAGE'
    },
    props: {
      name: {
        homePage: '首页',
        organizations: '我的组织',
        students: '组织中的学生',
        tests: '组织中的试卷',
        completeStatus: '试卷完成情况',
        practices: '组织中的练习',
        createTest: '出考卷',
        createPractice: '出练习',
        createChapter:'章节',
        sendNotice: '发通知',
        noticeHistory: '通知记录',
        score: '评分',
        studentDownPaper: '学生做过试卷'
      },
      path: {
        homePage: '/homePage',
        organizations: '/homePage/organizations',
        students: '/homePage/students',
        tests: '/homePage/tests',
        completeStatus: '/homePage/tests/completeStatus',
        practices: '/homePage/practices',
        createTest: '/homePage/createTest',
        createPractice: '/homePage/createPractice',
        createChapter:'/homePage/createChapter',
        sendNotice: '/homePage/sendNotice',
        noticeHistory: '/homePage/noticeHistory',
        score: '/homePage/tests/completeStatus/score',
        studentDownPaper: '/homePage/students/studentDownPaper'
      }
    },
    component: require('../components/homePage.vue'),  
    children: [
      {
        path: 'organizations',
        name: 'organizations',
        component: require('../components/homePage/organizations.vue')
      },
      {
        path: 'students',
        name: 'students',
        component: require('../components/homePage/students.vue')
      },
      {
        path: 'students/studentDownPaper',
        name: 'studentDownPaper',
        component: require('../components/homePage/student/studentDownPaper.vue'),
      },
      {
        path: 'tests',
        name: 'tests',
        component: require('../components/homePage/tests.vue'),
      },
      {
        path: 'tests/completeStatus',
        name: 'completeStatus',
        component: require('../components/homePage/paper/completeStatus.vue')
      },
      {
        path: 'tests/completeStatus/score',
        name: 'score',
        component: require('../components/homePage/paper/score.vue')
      },
      {
        path: 'practices',
        name: 'practices',
        component: require('../components/homePage/practices.vue')
      },
      {
        path: 'createPractice',
        name: 'createPractice',
        component: require('../components/homePage/createPractice.vue'),
      },
      {
        path: 'createChapter',
        name: 'createChapter',
        component: require('../components/homePage/createChapter.vue'),
      },
      {
        path: 'createTest',
        name: 'createTest',
        component: require('../components/homePage/createTest.vue'),
      },
      {
        path: 'sendNotice',
        name: 'sendNotice',
        component: require('../components/homePage/sendNotice.vue')
      },
      {
        path: 'noticeHistory',
        name: 'noticeHistory',
        component: require('../components/homePage/noticeHistory.vue')
      }
    ]
  },
]

module.exports = routes