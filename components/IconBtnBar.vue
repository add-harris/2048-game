<template>

  <v-container>

    <v-row>

      <IconBtn :icon-name="btns.restart.name" :tooltip="btns.restart.tooltip" :event="btns.restart.event" v-on:restart="restart"></IconBtn>

      <v-spacer></v-spacer>

      <IconBtn :icon-name="btns.github.name" :tooltip="btns.github.tooltip" :link="btns.github.link" ></IconBtn>

    </v-row>

  </v-container>

</template>

<script>

  import IconBtn from '../components/IconBtn'

  export default {
    components: {
      IconBtn
    },
    data() {
      return {
        likes: 2500,
        btns: {
          restart: {
            name: "mdi-autorenew",
            tooltip: "restart",
            event: "restart"
          },
          github: {
            name: "mdi-github",
            tooltip: "github",
            link: "https://github.com/add-harris/2048-game"
          },
        }
      }
    },
    methods: {

      restart() {
        this.remit('restart')
      },

      remit(value) {
        this.$emit(value)
      },

    }
  }

</script>
