import Api from './api'

export default {
    finishStudySignup(params) {
        return Api().post(`/finish-alt-title-signup/${params.token}`, {}, {
            withCredentials: true
        })
    },
    getAltTitlesFeed(params, headers) {
        return Api().get(`/alt-titles-feed?limit=${params.limit}&offset=${params.offset}`, {
            withCredentials: true,
            headers: headers
        })
    },
    getStudyUsers(params, headers) {
        return Api().get(`/study-users?limit=${params.limit}&offset=${params.offset}`, {
            withCredentials: true,
            headers: headers
        })
    },
    logUserInteraction(reqBody) {
        return Api().post('/log-interaction', reqBody, {
            withCredentials: true
        })
    }

}