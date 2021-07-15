<template>
  <v-container class="pa-2" >
    <v-row align="center" no-gutters>

      <v-col cols="11">

        <v-card class="pa-1" tile>
          <v-row no-gutters >

            <v-col :cols="$vuetify.breakpoint.smAndDown ? 12 : (defaultView ? 3 : 2)">
              <v-row no-gutters>
                <v-col v-if="defaultView" :cols="$vuetify.breakpoint.smAndDown ? 6  : 12" class="py-1">
                  <v-img v-if="post.image" :src="post.image" contain class="rounded"> </v-img>
                </v-col>

                <v-col :cols="$vuetify.breakpoint.smAndDown ? 6 : 12" :class="[$vuetify.breakpoint.smAndDown ? 'pl-2' : '' ,'py-1']">
                  <initiator-display :userId="post.SourceId" :postDate="post.publishedDate">
                  </initiator-display>
                </v-col>
                </v-row>
            </v-col>

            <v-col :cols="$vuetify.breakpoint.smAndDown ? 12 : (defaultView ? 9 : 10)">
              <v-row no-gutters>
                <v-col cols="12">
                   <div class="px-2">
                     <span v-if="displayedAlternativeTitle" class="mx-1 font-italic font-weight-light interactable title title-custom alt-title"
                     >{{displayedAlternativeTitle}}</span>

                     <p :class="['mr-1', 'interactable', $vuetify.breakpoint.smAndDown ? 'title-custom-small': 'title-custom',
                      { strikethrough: displayedAlternativeTitle, 'title': $vuetify.breakpoint.smAndDown }]"
                     v-html="post.title"></p>

                       <v-tooltip bottom>
                         <template v-slot:activator="{ on }">
                           <v-btn v-on="on" @click.stop="showTitles" class='ml-0' small icon color="lime lighten-1">
                             <v-icon class="xs-icon-font">edit</v-icon>
                           </v-btn>
                         </template>
                         <span>alternative titles</span>
                       </v-tooltip>
                     <p v-if="!$vuetify.breakpoint.xsOnly && defaultView" :class="['mt-1', 'mb-0', 'grey--text', 'text--darken-3', 'body-2', {'caption': $vuetify.breakpoint.smAndDown}]" 
                     v-html="post.description"></p>
                   </div>
                </v-col>
              </v-row>
            </v-col>

          </v-row>

          <v-row no-gutters class="mt-1" justify="center">
            <v-col cols="6">
              <v-btn outlined color="blue darken-1" block small @click="logEvent( { 
                type: 'visit_article', 
                data: { 
                  target: post.url,
                  source: window.location.href
                },
                  client: 'feed-client'
                })"
                :href="post.url" target="_blank">
                 Visit Website</v-btn>
            </v-col>
          </v-row>

        </v-card>
      </v-col>

    </v-row>

  </v-container>
</template>

<script>
  import initiatorDisplay from '@/components/InitiatorDisplay'
  import titleHelpers from '@/mixins/titleHelpers'
  import studyHelpers from '@/mixins/studyHelpers'
  import { mapState } from 'vuex'

  export default {
    components: {
     'initiator-display': initiatorDisplay
    },
    props: {
      filtersNamespace: {
        type: String,
        required: true
      },
      titlesNamespace: {
        type: String,
        required: true
      },
      post: {
        type: Object
      }
    },
    data: () => {
      return {
        displayedAlternativeTitle: null
      }
    },
    computed: {
      defaultView: function() {
        return typeof this.userPreferences.articlePreviewTheme === 'undefined' || this.userPreferences.articlePreviewTheme === 'default';
      },
      ...mapState('preferences', [
        'userPreferences'
      ])

    },
    methods: {

      arrangeTitles: function() {

        return new Promise((resolve, reject) => {

          this.setPostTitleId({ postId: this.post.id, standaloneTitleId: this.post.StandaloneTitle ? this.post.StandaloneTitle.id : null });
          let customTitles = this.post.StandaloneTitle ? this.post.StandaloneTitle.StandaloneCustomTitles : [];

          return this.arrangeCustomTitles(customTitles) //in titleHelpers mixin
          .then(res => {
            if (this.sortedTitles.length) {
              this.displayedAlternativeTitle = this.sortedTitles[0]['lastVersion'].text;
            }
            else {
              this.displayedAlternativeTitle = null;
            }

            resolve();
          })
        })
      },
      showTitles: function() {

        this.logEvent({ type: 'show_titles_for_post', data: this.post.id });
        this.setPostTitleId({ postId: this.post.id, standaloneTitleId: this.post.StandaloneTitle ? this.post.StandaloneTitle.id : null });
        this.populateTitles(this.titleObjects);
        this.setTitlesVisibility(true);
      }, 
      sth: function() {
        console.log('btn clicked')
      }

    },
    created() {
      this.arrangeTitles();
    },
    watch: {
      post: function(newVal) {
        this.arrangeTitles();
        this.populateTitles(this.titleObjects);
      }
    }, 
    mixins: [titleHelpers, studyHelpers]

}
</script>

<style scoped>

.rounded {
  border-radius: 2%;
}

.title-custom {
  line-height: 1.5rem;
  font-size: 0.9rem !important;
  display: inline !important;
}

.title-custom-small {
  line-height: 1em;
  font-size: 0.8em !important;
  display: inline !important;
}

.alt-title {
  font-size: 1.1rem !important;
}
/* 
.assessment-handle {
  max-width: 22px;
} */

.strikethrough {
  text-decoration: line-through
}

</style>
