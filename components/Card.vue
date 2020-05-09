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
        //
      }
    },
    computed: {
      computedStyles() {
        // let transitionEnabled = this.transitionEnabled ? 'top 700ms, left 700ms' : 'none'
        const style = {
          top: (this.initTop * this.viewPortRatio) + 'px',
          left: (this.initLeft * this.viewPortRatio) + 'px',
          // transition: transitionEnabled
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
    font-family: 'Varela Round', sans-serif;
  }

  .sliding-card {
    position: absolute;
    background-color: lightgrey !important;
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
