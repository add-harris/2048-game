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
        count: 1
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
        setPositionIsEmpty: 'grid/setPositionIsEmpty',
        setPositionId: 'grid/setPositionId'
      }),

      printGrid() {
        this.calculateMovement("right")
      },

      getEmpty(arr) {
        return arr.filter(position => position.isEmpty === true)
      },

      getRandomEmpty() {
        return _.sample(this.getEmpty(this.getAll()))
      },

      createElement() {

        let emptyPosition = this.getRandomEmpty()

        if(emptyPosition) {

          let element = document.getElementById("grid-background");
          let card = document.createElement("DIV");
          card.classList.add(
            "lighten-2",
            "sliding-card",
            "v-card",
            "v-sheet"
          )

          card.style.top = emptyPosition.top + "px"
          card.style.left = emptyPosition.left + "px"
          let generatedId = "sliding-card-" + this.count
          card.id = generatedId
          element.appendChild(card)

          this.setPositionIsEmpty({"name": emptyPosition.name, "bool": false});
          this.setPositionId({"name": emptyPosition.name, "id": generatedId});
          this.count++
        }
      },

      slide(cardId, top, left) {
        let card = document.getElementById(cardId);
        card.style.top = top + 'px'
        card.style.left = left + 'px'
      },

      calculateMovement(direction) {

        var row;
        if (direction === "right") {
          row = this.getFirstRow().slice().reverse()
        } else {
          row = this.getFirstRow().slice()
        }

        row.forEach(position => {
          // do a canMove check
          // if canMove, find first empty, then shuffle up (?)
          if (!position.isEmpty) {
            let canActuallyMove = this.canMove(position, row, direction)

            if (canActuallyMove) {
              this.shuffleUp(position, row, direction)
            }

          }

        })
      },

      canMove(position, row, direction) {

        if (position.edge.includes(direction)) {
          return false;
        }

        let nextPostion = row[ row.indexOf(position) - 1 ]

        if (nextPostion === undefined) {
          return false;
        }

        if (nextPostion.isEmpty) {
          return true
        } else {
          return false
        }
      },

      shuffleUp(position, row) {

        let firstEmpty = this.getEmpty(row)[0]
        let cardId = position.id

        this.slide(cardId, firstEmpty.top, firstEmpty.left)

        this.setPositionIsEmpty({"name": position.name, "bool": true});
        this.setPositionIsEmpty({"name": firstEmpty.name, "bool": false});
        this.setPositionId({"name": position.name, "id": null});
        this.setPositionId({"name": firstEmpty.name, "id": cardId});

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
