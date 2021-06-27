<template>
  <v-container fluid class="pt-12 px-5">
    <custom-toolbar></custom-toolbar>

    <v-row no-gutters class="pt-12">
      <h5 class="headline">About {{siteName}}</h5>
    </v-row>

    <v-row no-gutters justify="center">
      <v-col sm="12" md="7">
        <v-row no-gutters justify="center">
            <about-card categoryType="general">
              <template v-slot:category>
                General
              </template>
              <template v-slot:title>
                What's cool about {{siteName}}?
              </template>
              <template v-slot:body>
                <p>
                  {{siteName}} is a complement to a browser extension with the same name that that helps you write better, more informative news headlines as you read news articles. Your posted headlines can help other users who are running the extension obtain a more accurate picture of a news story and enables you to see the headlines that the others write wherever you encounter those articles, even in your Facebook or Twitter feed.
                </p>

                <p>
                  This platform presents a feed of the articles for which you or the users you follow have submitted alternative headlines. In addition, it allows you to follow the users you would like to see alternative headlines from, or unfollow users in whose submited headlines you are not interested.
                </p>

              </template>
            </about-card>

            <about-card categoryType="sources">
              <template v-slot:category>
                <v-icon>account_circle</v-icon> Users
              </template>
              <template v-slot:title>
                What information can I see about other Users?
              </template>
              <template v-slot:body>
                <p>
                  You can see the headlines that a user has submitted by going to their account (by clicking on their avatar) and visiting Activity History.
                </p>

                <p>
                  In addition, you can see the followers of each user.
                </p>
              </template>
            </about-card>

            <about-card categoryType="sources">
              <template v-slot:category>
                <v-icon>account_circle</v-icon> Users
              </template>
              <template v-slot:title>
                How can I manage my relationship with other users?
              </template>
              <template v-slot:body>
                <p>
                  You can click on <v-icon>fas fa-users</v-icon> at the
                  righthand side of the toolbar to go to the Users page.
                  There, you can discover other users that you might want to follow or go to Following to unfollow the users in whose headlines you are not interested.
                </p>

              </template>
            </about-card>

        </v-row>
      </v-col>

    </v-row>

  </v-container>
</template>

<script>
import customToolbar from '@/components/CustomToolbar'
import aboutCard from '@/components/AboutCard'
import consts from '@/services/constants'

export default {
  components: {
    'custom-toolbar': customToolbar,
    'about-card': aboutCard
  },
  data(){
    return {
    }
  },
  computed: {
    siteName: function() {
      return consts.SITE_NAME;
    }
  }
}
</script>
