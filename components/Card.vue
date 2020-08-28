<template>

  <v-card raised class="sliding-card sliding-card-adjust justify-center" :style="computedCardStyles" :ref="cardRef">
    <p :class="computedValueClass">{{value}}</p>
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
      zIndex: Number,
      cardRef: String,
      value: Number
    },
    data() {
      return {
        colors: {
          "2": '#6495ED',
          "4": '#4682B4',
          "8": '#5F9EA0',
          "16": '#8FBC8F',
          "32": '#3CB371',
          "64": '#2E8B57',
          "128": '#FF7F50',
          "256": '#FF8C00',
          "512": '#D2691E',
          "1024": '#CD5C5C',
          "2048": '#B22222',
          "4096": '#8B0000',
        },
        sizes: {
          "4": "value-size-lg",
          "5": "value-size-md",
          "6": "value-size-sm",
          "7": "value-size-xs"
        }
      }
    },
    computed: {
      computedCardStyles() {
        const style = {
          top: (this.initTop * this.viewPortRatio) + 'px',
          left: (this.initLeft * this.viewPortRatio) + 'px',
          // zIndex: this.zIndex,
          "background-color": this.colors[`${this.value}`] || '#483D8B' // return color or default if undefined
        }
        if (!this.transitionEnabled) style.transition = 'none !important'
        return style
      },

      computedValueClass() {

        let valueLength = this.value.toString().length

        let sizeClass = valueLength <= 4 ? 'value-size-lg' : this.sizes[valueLength] || 'value-size-xs'

        return `center ${sizeClass}`

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
    position: absolute !important;
    transition-property: all !important;
    transition: top .4s, left .4s !important;
    z-index: 2;
  }

  @media screen and (max-width: 520px) {
    .sliding-card-adjust {
      height: 72px;
      width: 72px;
      margin: 5px;
    }

    .value-size-lg {
      font-size: 1.3em
    }

    .value-size-md {
      font-size: 1.05em
    }

    .value-size-sm {
      font-size: 0.85em
    }

    .value-size-xs {
      font-size: 0.7em
    }

  }

  @media screen and (min-width: 521px) {
    .sliding-card-adjust {
      height: 110px;
      width: 110px;
      margin: 5px;
    }

    .value-size-lg {
      font-size: 1.9em
    }

    .value-size-md {
      font-size: 1.55em
    }

    .value-size-sm {
      font-size: 1.35em
    }

    .value-size-xs {
      font-size: 1.2em
    }

  }

</style>
