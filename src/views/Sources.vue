<template>
  <v-container fluid class="pa-0 full-height" >
    <custom-toolbar></custom-toolbar>

    <v-row class="pt-12 parent-height" >
      <v-col cols="12">

        <v-tabs centered dark background-color="grey darken-3" height=36
          slider-color="lime lighten-4" v-model="tabs" @change="tabChanged">
          <v-tab href="#manage" >
            Following
          </v-tab>

          <v-tab href="#discover">
            Discover users
          </v-tab>

        </v-tabs>

        <v-tabs-items v-model="tabs" class="parent-height light-grey-background">
          <v-tab-item value="manage">
            <manage-sources ref="manage">
            </manage-sources>
          </v-tab-item>

          <v-tab-item value="discover">
            <discover-sources ref="discover">
            </discover-sources>
          </v-tab-item>

        </v-tabs-items>

      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import CustomToolbar from '@/components/CustomToolbar'
import ManageSources from '@/components/ManageSources'
import DiscoverSources from '@/components/DiscoverSources'
// import Loading from '@/components/Loading'

import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    'custom-toolbar': CustomToolbar,
    'manage-sources': ManageSources,
    'discover-sources': DiscoverSources
    // 'loading': Loading,
  },
  data () {
    return {
      tabs: null,
      addedSources: [],
      showAddedFeed: false
    }
  },
  created() {
    Promise.all([this.fetchFollows(),this.fetchTrusteds()])
    .then(()=> {
      this.presetTab();
    });
  },
  computed: {
    ...mapGetters('relatedSources', [
     'followedOrTrusteds'
    ])
  },
  methods: {
    presetTab: function() {
      if (!this.followedOrTrusteds.length)
        this.tabs = 'discover';
    },
    tabChanged: function(val) {
      if (this.$refs[val])
        this.$refs[val].initiateSearch();
    },
    showFeed: function(returnedSource) {
      let addedSourcesIds = this.addedSources.map(el => el.id);
      if (!addedSourcesIds.includes(returnedSource.id)) {
        this.addedSources.push(returnedSource);

      this.showAddedFeed = true;
      }

    },
    ...mapActions('relatedSources', [
      'fetchFollows',
      'fetchTrusteds'
    ]),
    ...mapActions('loader', [
      'setLoading',
    ])
  }
}
</script>
