<template>

  <v-layout column justify-center align-center>

    <v-flex xs12 sm8 md6>

      <v-card>

        <v-card-title class="headline">Slide</v-card-title>

        <v-card-text>

          <v-container class="grey">

            <v-row no-gutters>


              <div class="grid-box" id="grid-background">
                <v-card class="lighten-2 sliding-card"></v-card>
                <v-card class="lighten-2 sliding-card"></v-card>
              </div>

            </v-row>

          </v-container>

        </v-card-text>

        <v-card-actions>

          <v-spacer />

          <!-- example nuxt link -->
          <!-- <v-btn color="primary" nuxt to="/inspire">Continue</v-btn>-->

          <v-btn color="primary" @click="slideLeft()">Slide Left</v-btn>
          <v-btn color="primary" @click="slideUp()">Slide Up</v-btn>
          <v-btn color="primary" @click="slideRight()">Slide Right</v-btn>
          <v-btn color="primary" @click="slideDown()">Slide Down</v-btn>
          <v-btn color="primary" @click="printGrid()">print</v-btn>

        </v-card-actions>

      </v-card>

    </v-flex>

  </v-layout>

</template>

<script>


  // import { Grid, Position } from '../utils/Grid'
  import { mapGetters } from 'vuex'

  export default {

    data() {
      return {
        // grid: new Grid()
      }
    },

    methods: {
      ...mapGetters({
        getFirstRow: 'grid/getFirstRow'
      }),
      printGrid() {
        console.log(this.$store.state.grid.text)
        console.log(this.$store.getters['grid/getFirstRow'])
        console.log(this.getFirstRow())
      },
      slideLeft() {
        let slidingCards = document.getElementsByClassName("sliding-card");
        for (let card of slidingCards) {
          card.style.left = Math.max( 0, parseFloat(getComputedStyle(card).left) - 300 ) + 'px'
        }
        return 2
      },
      slideRight() {
        let slidingCards = document.getElementsByClassName("sliding-card");
        for (let card of slidingCards) {
          card.style.left = Math.min(300, parseFloat(getComputedStyle(card).left) + 300 ) + 'px'
        }
      },
      slideUp() {
        let slidingCards = document.getElementsByClassName("sliding-card");
        for (let card of slidingCards) {
          card.style.top = Math.max(0, parseFloat(getComputedStyle(card).top) - 300 ) + 'px'
        }
      },
      slideDown() {
        let slidingCards = document.getElementsByClassName("sliding-card");
        for (let card of slidingCards) {
          card.style.top = Math.min(300, parseFloat(getComputedStyle(card).top) + 300 ) + 'px'
        }
      }
    }
  }

</script>

<style>

  .grid-box {

    height: 400px;
    width: 400px;
    border-color: #35495e !important;
    border-width: 2px !important;
    background-color: whitesmoke !important;
  }

  #grid-background {
    /*position: fixed;*/
    background-repeat: repeat;
    background-size: 100px 100px;
    background-image:
      linear-gradient(to right, grey 1px, transparent 1px),
      linear-gradient(to bottom, grey 1px, transparent 1px);
  }

  .sliding-card {
    position: relative;
    height: 90px;
    width: 90px;
    margin: 5px;
    left: 0px;
    top: 0px;
    background-color: lightgrey !important;
    transition: all 700ms;
  }

  @keyframes slide {
    from {left: 0px;}
    to {left: 228px;}
  }


</style>
