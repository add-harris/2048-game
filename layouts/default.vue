<template>

  <v-app light>


    <v-app-bar :fixed="fixed" app src="https://media.giphy.com/media/fe3zisUnJjbqM/giphy.gif">

      <v-toolbar-title :style="getStylesObject()" light v-text="title" />

    </v-app-bar>

    <v-content>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>

    <v-footer :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>

</template>

<script>
export default {
  data () {
    return {
      fixed: true,
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
    }
  }
}
</script>
