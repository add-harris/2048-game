<template>

  <v-tooltip top>
    <template v-slot:activator="{ on }">
      <v-btn color="whitesmoke" icon large outlined v-on="on" @click="emitEvent()" :href="link">
        <v-icon>{{iconName}}</v-icon>
      </v-btn>
    </template>
    <span>{{tooltip}}</span>
  </v-tooltip>

</template>

<script>

  export default {
    props: {
      iconName: String,
      tooltip: String,
      event: {
        type: String,
        default: null
      },
      link: String
    },
    methods: {
      emitEvent() {
        if (this.event) {
          this.$emit(this.event)
        }
      }
    }
  }

</script>
