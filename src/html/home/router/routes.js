const routes = [
  { 
    path: '*/homepage', 
    redirect: {
      name: 'homepage'
    } 
  },
  {
    path: '/homepage',
    name: 'homepage',
    meta: {
      title: 'HOMEPAGE'
    },
    component: require('../components/homepage.vue'),
    props: {
      name: {
        homePage: '首页',
      },
      path: {
        homePage: '/homePage',
      }
    },
  },
  {
    name: 'organizationPage',
    path: '/organizationPage',
    meta: {
      title: 'ORGANIZATION'
    },
    component: require('../components/organizationPage.vue')
  },
  {
    name: 'feedback',
    path: '/feedback',
    meta: {
      title: 'FeedBack'
    },
    component: require('../components/feedback.vue')
  },
  {
    name: 'personPage',
    path: '/personPage',
    meta: {
      title: 'PERSON PAGE'
    },
    component: require('../components/personPage.vue'),
    children: [
      {
        path: 'myOrganization',
        name: 'myOrganization',
        component: require('../components/personPage/myOrganization.vue')
      },
      {
        path: 'myPractice',
        name: 'myPractice',
        component: require('../components/personPage/myPractice.vue')
      },
      {
        path: 'myTest',
        name: 'myTest',
        component: require('../components/personPage/myTest.vue')
      },
      {
        path: 'baseInfo',
        name: 'baseInfo',
        component: require('../components/personPage/baseInfo.vue')
      },
      {
        path: 'changePassword',
        name: 'changePassword',
        component: require('../components/personPage/changePassword.vue')
      },
    ]
  },
  {
    name: 'paperPage',
    path: '/paperPage',
    meta: {
      title: 'PAPERPAGE'
    },
    component: require('../components/paperPage.vue'),
    children: [
      {
        path: 'answerPaper',
        name: 'answerPaper',
        component: require('../components/paperPage/answerPaper.vue')
      },
      {
        path: 'lookAnswer',
        name: 'lookAnswer',
        component: require('../components/paperPage/lookAnswer.vue')
      },
    ]
  }
]

module.exports = routes