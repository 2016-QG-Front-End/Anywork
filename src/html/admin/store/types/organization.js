import namespace from 'src/utils/namespace'

export default namespace('organization', {
    actions: [
        'getMyOrganizations',
        'searchOrganizations',
        'setOrganizationInfo',

        'createOrganization',
        'alterOrganization',
        'deleteOrganization',

        'getStudentsByOrganId',
        'getStudentTestsById',
        'getStudentPracticesById',

        'sendNotice',
        'getNotice',
        'deleteNotice',
        
        'getTestsByOrganId',
        'getPracticesByOrganId',

        'getOrganationNostice',

        'getMyPapers',
        'setTestId'
    ],
    mutations: [
        'setInfo',
    ]
})