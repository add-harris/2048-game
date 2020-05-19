<template>

  <v-card class="sliding-card sliding-card-adjust justify-center" v-bind:style="computedStyles" ref="cardRef">
    <p class="center">{{value}}</p>
  </v-card>

</template>

<script>

  // TODO review props as some no longer used

  export default {
    props: {
      initTop: Number,
      initLeft: Number,
      viewPortRatio: Number,
      transitionEnabled: Boolean,
      cardRef: String,
      value: Number
    },
    data() {
      return {
        colors: {
          "2": '#ADD8E6',
          "4": '#6495ED',
          "8": '#5F9EA0',
          "16": '#FF7F50',
          "32": '#FF8C00',
          "64": '#8FBC8F',
          "128": '#483D8B',
          "256": '#3CB371',
          "512": '#32CD32',
          "1024": '#D2691E',
          "2048": '#CD5C5C',
          "4096": '#B22222',
        }
      }
    },
    computed: {
      computedStyles() {
        const style = {
          top: (this.initTop * this.viewPortRatio) + 'px',
          left: (this.initLeft * this.viewPortRatio) + 'px',
          "background-color": this.colors[`${this.value}`] || '#8B0000' // return color or default
        }
        if (!this.transitionEnabled) style.transition = 'none'
        return style
      }
    }

  }

</script>

<style>

  .center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: 'Orbitron', sans-serif;
  }

  .sliding-card {
    position: absolute;
    transition: top 500ms, left 500ms;
  }

  @media screen and (max-width: 520px) {
    .sliding-card-adjust {
      height: 72px;
      width: 72px;
      margin: 5px;
    }

    .center {
      font-size: 1.3em
    }
  }

  @media screen and (min-width: 521px) {
    .sliding-card-adjust {
      height: 110px;
      width: 110px;
      margin: 5px;
    }

    .center {
      font-size: 2em
    }
  }

</style>
