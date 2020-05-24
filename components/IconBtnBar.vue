<template>

  <v-container>

    <v-row>

      <IconBtn :icon-name="btns.restart.name" :tooltip="btns.restart.tooltip" :event="btns.restart.event" v-on:restart="restart"></IconBtn>

      <v-spacer></v-spacer>

      <IconBtn :icon-name="btns.github.name" :tooltip="btns.github.tooltip" ></IconBtn>

      <v-badge color="green" :content="likes" >
        <IconBtn :icon-name="btns.like.name" :tooltip="btns.like.tooltip" :event="btns.like.event" v-on:like="upLike"></IconBtn>
      </v-badge>

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
            tooltip: "source code"
          },
          like: {
            name: "mdi-thumb-up",
            tooltip: "like",
            event: "like"
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

      upLike() {
        this.likes++
      }
    }
  }

</script>
