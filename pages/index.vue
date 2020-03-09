<template>

  <v-layout column justify-center align-center>

    <v-flex xs12 sm8 md6>

      <v-card>

        <v-card-title class="headline">Slide</v-card-title>

        <div id="grey-container">

          <v-card-text>


              <div class="grid-box" id="grid-background">
<!--                <v-card class="lighten-2 sliding-card"></v-card>-->
              </div>


          </v-card-text>
        </div>

          <v-card-actions>

          <!-- example nuxt link -->
          <!-- <v-btn color="primary" nuxt to="/inspire">Continue</v-btn>-->



            <v-container>
              <v-row>
                <div style="margin: 10px">

                  <v-btn color="primary" @click="slideLeft()">Slide Left</v-btn>
                  <v-btn color="primary" @click="slideUp()">Slide Up</v-btn>
                  <v-btn color="primary" @click="slideRight()">Slide Right</v-btn>
                  <v-btn color="primary" @click="slideDown()">Slide Down</v-btn>


                </div>
              </v-row>
              <v-row>
                <div style="margin: 10px">

                  <v-btn color="primary" @click="printGrid()">print</v-btn>
                  <v-btn color="primary" @click="createElement()">create</v-btn>

                </div>
              </v-row>
            </v-container>

          </v-card-actions>


      </v-card>

    </v-flex>

  </v-layout>

</template>

<script>


  import { Position } from '../utils/Position'
  import { mapState, mapGetters, mapMutations} from 'vuex'
  import _ from 'lodash'


  export default {

    data() {
      return {
        count: 0
      }
    },

    computed: mapState({
      grid: state => state.grid
    }),

    methods: {
      ...mapGetters({
        getFirstRow: 'grid/getFirstRow',
        getSecondRow: 'grid/getSecondRow',
        getThirdRow: 'grid/getThirdRow',
        getForthRow: 'grid/getForthRow',
        getAll: 'grid/getAll'
      }),
      ...mapMutations({
        setPositionIsEmpty: 'grid/setPositionIsEmpty'
      }),
      printGrid() {
        console.log(_.sample([]))
      },
      getAllEmpty() {
        return this.getAll().filter(position => position.isEmpty === true)
      },
      getRandomEmpty() {
        return _.sample(this.getAllEmpty())
      },
      createElement() {

        let emptyPosition = this.getRandomEmpty()

        if(emptyPosition) {

          var element = document.getElementById("grid-background")
          var card = document.createElement("DIV")
          card.classList.add(
            "lighten-2",
            "sliding-card",
            "v-card",
            "v-sheet"
          )

          card.style.top = emptyPosition.top + "px"
          card.style.left = emptyPosition.left + "px"
          element.appendChild(card)
          this.count++
          this.setPositionIsEmpty(emptyPosition.name, false)
        }
      },
      slideLeft() {
        let slidingCards = document.getElementsByClassName("sliding-card");
        for (let card of slidingCards) {
          card.style.left = Math.max( 0, parseFloat(getComputedStyle(card).left) - 300 ) + 'px'
        }
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

  #grey-container {
    margin: 10px;
    padding: 10px;
    height: 450px;
    width: 450px;
    background-color: lightgrey;
  }

  #grid-background {
    position: absolute;
    height: 400px !important;
    width: 400px;
    background-repeat: repeat;
    background-size: 100px 100px;
    background-image:
      linear-gradient(to right, grey 1px, transparent 1px),
      linear-gradient(to bottom, grey 1px, transparent 1px);
  }

  .sliding-card {
    position: absolute;
    height: 90px;
    width: 90px;
    margin: 5px;
    left: 0px;
    top: 0px;
    background-color: lightgrey !important;
    transition: all 700ms;
  }


</style>
