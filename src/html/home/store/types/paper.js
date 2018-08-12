import namespace from 'src/utils/namespace'

export default namespace('paper', {
    actions: [
        'getAllTestPapers',
        'getAllPracticePapers',
        'getPracticeListByChapter',
        'getChapterList',
        'getPaperInfo',
        'setPaperInfo',
        'submitPaper',
        'getPaperAnswerById',
        'getMyTestPaper',
        'getMyPracticePaper'
    ],
    mutations: [
        'setInfo',
    ]
})