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
        'previewPaper',
        'analyzePaper',
        'updatePaper',
        'checkProgress',
        'testDetail',
        'checkSubject',
        'submitSubjectScore',
        'downloadPaper',
        'getExPracticeList'
    ],
    mutations: [
        'setInfo',
    ]
})