import namespace from 'src/utils/namespace'

export default namespace('organization', {
    actions: [
    	'getAllOrganizations',
    	'getMyOrganizations',
    	'searchOrganizations',
    	'getNoJoinOrganizations',
    	'joinOrganization',
        'setOrganizationInfo',
        'exitOrganization'
    ],
    mutations: [
        'setInfo',
    ]
})