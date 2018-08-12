import namespace from '@/utils/namespace'

export default namespace('user', {
    actions: [
    	'login',
    	'register',
        'updateInfo',
        'forgetPassword'
    ],
    mutations: [
        'setInfo',
    ]
})