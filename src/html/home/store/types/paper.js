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
        'getMyPracticePaper',
        'getFinishedPaperAnswerById',
        'changePaperShows',
        'getCollections',
        'upLoadCollection',
        'deleteCollection',
        'setCFalse',
        'detailCollection'
    ],
    mutations: [
        'setInfo',
        'setInfos',
        'setPaperList',
        'showPaper',
        'setToCollection'
    ]
})