import namespace from 'src/utils/namespace'

export default namespace('paper', {
    actions: [
        'getPracticeListByChapter',
        'getPaperInfo',
        'setPaperInfo',
        'submitPaper',

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
        'downloadPaper'
    ],
    mutations: [
        'setInfo',
    ]
})