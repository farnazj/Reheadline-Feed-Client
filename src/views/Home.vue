<template>
  <v-container fluid class="pt-12 px-0">
    <custom-toolbar></custom-toolbar>

    <v-row no-gutters justify="center">
      <custom-titles titlesNamespace="homeTitles" filtersNamespace="homeArticles"></custom-titles>

      <v-col md="7" cols="11">
        <article-holder detailsNamespace="homeArticleDetails" filtersNamespace="homeArticles"
           titlesNamespace="homeTitles" :class="{'pt-5': !$vuetify.breakpoint.smAndDown}">
       </article-holder>
      </v-col>

    </v-row>

  </v-container>
</template>

<script>
import customToolbar from '@/components/CustomToolbar'
import articleHolder from '@/components/ArticleHolder'
import customTitles from '@/components/CustomTitles'

import { mapActions } from 'vuex'

export default {
  components: {
    'custom-toolbar': customToolbar,
    'article-holder': articleHolder,
    'custom-titles': customTitles
  },
  props: ['postid'],
  data () {
    return {
    }
  },
  computed: {
  },
  beforeRouteLeave (to, from, next) {
    this.setTitlesVisibility(false);
    next();
  },
  created() {
      
    if (!Object.keys(this.getUserPreferences).length)
      this.getUserPreferences();
  },
  methods: {
      ...mapActions('homeTitles', [
        'setTitlesVisibility'
      ]),
      ...mapActions('preferences', [
        'getUserPreferences'
      ])
  }
}
</script>


<style scoped>
.grippy-container {
  background-color: #424242;
  height: 14vh;
  width: calc(1% + 0.4em);
  border-radius: 0 80% 80% 0;
  cursor: pointer;
}
span.grippy {
  min-height: 30%;
  min-width: 50%;
  text-align: center;
  display: inline-block;
  overflow: hidden;
  line-height: 1vh;
  vertical-align: middle;
  font-size: calc(1vh + 0.7em);
  font-family: sans-serif;
  letter-spacing: 2px;
  color: #BDBDBD;
  text-shadow: 1px 0 1px black;
}

</style>
