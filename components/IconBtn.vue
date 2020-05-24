<template>

  <v-tooltip top>
    <template v-slot:activator="{ on }">
      <v-btn color="primary" icon large outlined v-on="on" @click="emitEvent()">
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
      }
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
