import namespace from 'src/utils/namespace'

export default namespace('user', {
    actions: [
    	'getMyInfo',
    	'updatePassword',
        'updateInfo',
        'submitSuggestion',
        'refresh',
        'setPhoto',
        'exit',
        'getRank'
    ],
    mutations: [
        'setInfo',
        'refresh',
    ]
})