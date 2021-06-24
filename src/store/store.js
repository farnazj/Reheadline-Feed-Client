import Vue from 'vue'
import Vuex from 'vuex'
import homeArticles from './modules/homeArticles'
import titles from './modules/titles'
import auth from './modules/auth'
import relatedSources from './modules/relatedSources'
import profileArticles from './modules/profileArticles'
import preferences from './modules/preferences'
import loader from './modules/loader'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {

  },
  getters: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    auth,
    homeArticles,
    relatedSources,
    profileArticles, //articles on a profile
    loader,
    preferences
  }
})

store.registerModule('homeTitles', titles);
store.registerModule('profileTitles', titles);

export default store;
