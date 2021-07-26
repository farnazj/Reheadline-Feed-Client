import studyServices from '@/services/studyServices'

export default {
  data: () => {
    return {
    }
  },
  methods: {
    logEvent: function(log) {
        console.log(log)
        studyServices.logUserInteraction({...log, client: 'feed-client'})
        .then(res => {
            // console.log(res);
        })
    }
  }

}
