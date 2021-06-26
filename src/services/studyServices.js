import Api from './api'

export default {
    finishStudySignup(params) {
        return Api().post(`/finish-alt-title-signup/${params.token}`, {}, {
            withCredentials: true
        })
    },
    getAltTitlesFeed(params) {
        return Api().get(`/alt-titles-feed/?limit=${params.limit}&offset=${params.offset}`, {
            withCredentials: true
        })
    },
    getStudyUsers(params) {
        return Api().get(`/study-users/?limit=${params.limit}&offset=${params.offset}`, {
            withCredentials: true
        })
    },
    logUserInteraction(reqBody) {
        return Api().post('/headline-study-log', reqBody, {
            withCredentials: true
        })
    }

}