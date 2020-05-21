<template>

  <v-app light>


<!--    <v-app-bar :fixed="fixed" app src="https://media.giphy.com/media/fe3zisUnJjbqM/giphy.gif">-->
    <v-app-bar  app :src="getImgSrc()" shrink-on-scroll>

      <v-toolbar-title :style="getStylesObject()" light v-text="title" />

    </v-app-bar>

    <v-content>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>

    <v-footer  app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>

</template>

<script>

  import _ from 'lodash'

  export default {
    data () {
      return {
        // fixed: true,
        items: [
        ],
        title: 'VUE GAMES'
      }
    },

    methods: {
      getStylesObject() {
        return {
          fontFamily: "'Bungee Shade', cursive",
          fontSize: '1.8em',
          color: 'black'
        }
      },
      getImgSrc() {
        let images = ["desert-oasis-1.jpg", "desert-sunset-1.jpeg", "desert-sunset-2.jpeg"]

        return _.sample(images)
      }
    }
  }

</script>
