import namespace from 'src/utils/namespace'

export default namespace('paper', {
    actions: [
        'getPracticeListByChapter',
        'getPaperInfo',
        'setPaperInfo',
        'submitPaper',
        'getMyOrganizations',
        
        'getChapterList',
        'addChapter',
        'updateChapter',
        'deleteChapter',
        'getPaperAnswerById',

        'getStudentsByTest',

        'submitJudge',

        'parseFile',
        'createPaper',
        'deletePaper',
        'downloadPaper',
        'getExPracticeList'
    ],
    mutations: [
        'setInfo',
    ]
})