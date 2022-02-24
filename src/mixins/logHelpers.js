import studyServices from '@/services/studyServices'

export default {
  data: () => {
    return {
    }
  },
  methods: {
    logEvent: function(log) {
        studyServices.logUserInteraction({...log, client: 'reheadline-feed-client'})
        .then(res => {
            // console.log(res);
        })
    }
  }

}
