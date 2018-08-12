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

        'getTestsByOrganId',
        'getPracticesByOrganId'
    ],
    mutations: [
        'setInfo',
    ]
})