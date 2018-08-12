import namespace from 'src/utils/namespace'

export default namespace('user', {
    actions: [
    	'getMyInfo',
        'exit'
    ],
    mutations: [
        'setInfo',
    ]
})