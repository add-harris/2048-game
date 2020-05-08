<template>

    <v-card class="sliding-card sliding-card-adjust" v-bind:style="computedStyles" ref="cardRef">{{initTop}}, {{initLeft}}, {{viewPortRatio}}</v-card>

</template>

<script>

  // TODO remove cardRef & transitionEnabled from props as no longer used

  export default {
    props: {
      initTop: Number,
      initLeft: Number,
      viewPortRatio: Number,
      transitionEnabled: Boolean,
      cardRef: String
    },
    data() {
      return {
        //
      }
    },
    computed: {
      computedStyles() {
        // let transitionEnabled = this.transitionEnabled ? 'top 700ms, left 700ms' : 'none'
        return {
          top: (this.initTop * this.viewPortRatio) + 'px',
          left: (this.initLeft * this.viewPortRatio) + 'px',
          // transition: transitionEnabled
        }
      }
    }
  }

</script>

<style>

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
  }

  @media screen and (min-width: 521px) {
    .sliding-card-adjust {
      height: 110px;
      width: 110px;
      margin: 5px;
    }
  }

</style>
