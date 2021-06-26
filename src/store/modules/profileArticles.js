import Vue from 'vue'
import studyServices from '@/services/studyServices'

export default {
  namespaced: true,
  state: {
    username: '',
    articles: [],
    offset: 0,
    limit: 15,
  },
  mutations: {

    set_username: (state, username) => {
      state.username = username;
    },

    append_articles: (state, posts) => {
      let articleIds = state.articles.map(article => article.id);
      let filteredPosts = posts.filter(post => !articleIds.includes(post.id) );
      state.articles.push(...filteredPosts);
      state.offset += filteredPosts.length;
    },

    refresh_articles: (state) => {
      state.articles = [];
      state.offset = 0;
    },

    remove_boost: (state, postId) => {
      let index = state.articles.findIndex(article => article.id == postId);
      state.articles.splice(index, 1);
    },

    update_titles: (state, payload) => {
      let index = state.articles.findIndex(article => article.id == payload.postId);

      let articleCopy = Object.assign({}, state.articles[index]);
      articleCopy.StandaloneTitle = payload.standaloneTitle;
      Vue.set(state.articles, index, articleCopy);
    }
  },
  actions: {

    setUsername: (context, payload) => {
      context.commit('set_username', payload);
    },

    getArticles: (context) => {

      return new Promise((resolve, reject) => {
        studyServices.getAltTitlesFeed({
          limit: context.state.limit,
          offset: context.state.offset
        }, {
          username: context.state.username
        })
        .then(response => {
          resolve(response.data);
        })
        .catch(err => {
          reject(error);
        })
       
      })
    },

    getMorePosts: (context) => {

      context.dispatch('loader/setLoading', true, { root: true });
      return new Promise((resolve, reject) => {

        context.dispatch('getArticles')
        .then(posts => {
           context.commit('append_articles', posts);
           resolve(); })
        .catch(error => {
          console.log("in actions", error);
          reject(error);
        })
        .finally(() => {
          context.dispatch('loader/setLoading', false, { root: true });
        })

      })
    },
    refreshArticles: (context) => {

      context.dispatch('loader/setLoading', true, { root: true });
      context.commit('refresh_articles');
      return new Promise((resolve, reject) => {

        context.dispatch('getMorePosts')
        .then(() => {
          resolve();
        })
        .catch(err => {
          reject(err);
        })
        .finally(() => {
          context.dispatch('loader/setLoading', false, { root: true });
        })
      })
    },

    removeArticle: (context, payload) => {
      context.commit('remove_boost', payload);
    },

    /*
    Called from fetchPostTitles in titles module
    */
    updateTitles: (context, payload) => {
      context.commit('update_titles', payload)
    }
  }
}
