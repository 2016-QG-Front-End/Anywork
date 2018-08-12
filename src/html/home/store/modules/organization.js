import types from '../types/organization'
import { myAxios } from 'src/utils/interaction'

const state = {
	organizationId: undefined,
	organName: '',
	teacherId: undefined,   /*no info*/
	teacherName: '',
	description: '',
	count: undefined,       /*no info*/
	isJoin: undefined,
	allOrganizationList: [],
	myOrganizationList: [],
	searchResultList: [],
    noJoinOrganizationList: []
}

const actions = {
	[types.actions.getAllOrganizations]: (context) => {
		return new Promise((resolve, reject) => {
			myAxios({
				method: 'POST',
				url: '/organization/search',
				data: {
					organizationName: ""
				}
			}).then(function(res){
                 if(res.data.state.toString()==="1"){
                    context.commit(types.mutations.setInfo,{
                    	allOrganizationList: res.data.data,
                    })
                    resolve({
                        state: true,
                        info: res.data.stateInfo}
                    )
                }else{
                    resolve({
                        state: false,
                        info: res.data.stateInfo}
                    )
                }
            }).catch(function(err){
                reject(err)
            })
		})
	},

	[types.actions.getMyOrganizations]: (context) => {
		return new Promise((resolve, reject) => {
			myAxios({
				method: 'POST',
				url: '/organization/me',
			}).then(function(res){
                 if(res.data.state.toString()==="1"){
                    context.commit(types.mutations.setInfo,{
                    	myOrganizationList: res.data.data,
                    })
                    resolve({
                        state: true,
                        info: res.data.stateInfo}
                    )
                }else{
                    resolve({
                        state: false,
                        info: res.data.stateInfo}
                    )
                }
            }).catch(function(err){
                reject(err)
            })
		})
	},

	[types.actions.searchOrganizations]: (context, data) => {
		return new Promise((resolve, reject) => {
			myAxios({
				method: 'POST',
				url: '/organization/search',
				data: data
			}).then(function(res){
                 if(res.data.state.toString()==="1"){
                    context.commit(types.mutations.setInfo,{
                    	searchResultList: res.data.data,
                    })
                    resolve({
                        state: true,
                        info: res.data.stateInfo}
                    )
                }else{
                    resolve({
                        state: false,
                        info: res.data.stateInfo}
                    )
                }
            }).catch(function(err){
                reject(err)
            })
		})
	},

    [types.actions.getNoJoinOrganizations]: (context) => {
        return new Promise((resolve, reject) => {
            myAxios({
                method: 'POST',
                url: '/organization/search',
                data: {
                    organizationName: ""
                }
            }).then(function(res){
                 if(res.data.state.toString()==="1"){
                    let organs = []
                    res.data.data.forEach(item => {
                        if(item.isJoin.toString()==='0'){
                            organs.push(item)
                        }
                    })
                    context.commit(types.mutations.setInfo,{
                        noJoinOrganizationList: organs,
                    })
                    resolve({
                        state: true,
                        info: res.data.stateInfo}
                    )
                }else{
                    resolve({
                        state: false,
                        info: res.data.stateInfo}
                    )
                }
            }).catch(function(err){
                reject(err)
            })
        })
    },

    [types.actions.joinOrganization]: (context, data) => {
        return new Promise((resolve, reject) => {
            myAxios({
                method: 'POST',
                url: '/organization/join',
                data: data
            }).then(function(res){
                 if(res.data.state.toString()==="1"){
                    context.commit(types.mutations.setInfo, res.data.data)
                    resolve({
                        state: true,
                        info: res.data.stateInfo}
                    )
                }else{
                    resolve({
                        state: false,
                        info: res.data.stateInfo}
                    )
                }
            }).catch(function(err){
                reject(err)
            })
        })
    },

    [types.actions.setOrganizationInfo]: (context, data) => {
        context.commit(types.mutations.setInfo, data)
    },

    [types.actions.exitOrganization]: (content, data) =>{
        return new Promise((resolve, reject) => {
            myAxios({
                method: 'POST',
                url: '/organization/leave',
                data: data
            }).then(function(res){
                if(res.data.state.toString()==="1"){
                    resolve({
                        state: true,
                        info: res.data.stateInfo}
                    )
                }else{
                    resolve({
                        state: false,
                        info: res.data.stateInfo}
                    )
                }
            }).catch(function(err){
                reject(err)
            })
        })
    }
}

const mutations = {
	[types.mutations.setInfo]: (state, datas) => {
        Object.assign(state,datas)
	}
}

export default {
	state,
	actions,
	mutations
}