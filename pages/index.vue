<template>

  <v-layout column justify-center align-center>

    <v-flex xs12 sm12 md12>

      <v-card>

        <v-card-title class="headline">Slide</v-card-title>

        <div class="grey-container grey-container-adjust">

<!--          <v-card-text>-->


              <div class="grid-background grid-background-adjust" id="card-grid">
<!--                <v-card class="lighten-2 sliding-card"></v-card>-->
              </div>


<!--          </v-card-text>-->
        </div>

          <v-card-actions>

          <!-- example nuxt link -->
          <!-- <v-btn color="primary" nuxt to="/inspire">Continue</v-btn>-->



            <v-container>
              <v-row>
                <div style="margin: 10px">

                  <v-btn color="primary" @click="calculateMovement('left')">Slide Left</v-btn>
                  <v-btn color="primary" @click="calculateMovement('up')">Slide Up</v-btn>
                  <v-btn color="primary" @click="calculateMovement('right')">Slide Right</v-btn>
                  <v-btn color="primary" @click="calculateMovement('down')">Slide Down</v-btn>


                </div>
              </v-row>
              <v-row>
                <div style="margin: 10px">

                  <v-btn color="primary" @click="printGrid()">print</v-btn>
                  <v-btn color="primary" @click="generateCard()">create</v-btn>

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
        count: 1,
        viewFactor: 1.5
      }
    },

    computed: mapState({
      grid: state => state.grid
    }),

    mounted() {
      this.addListeners()
    },

    methods: {

      ...mapGetters({
        getFirstRow:      'grid/getFirstRow',
        getSecondRow:     'grid/getSecondRow',
        getThirdRow:      'grid/getThirdRow',
        getForthRow:      'grid/getForthRow',
        getFirstColumn:   'grid/getFirstColumn',
        getSecondColumn:  'grid/getSecondColumn',
        getThirdColumn:   'grid/getThirdColumn',
        getForthColumn:   'grid/getForthColumn',
        getAll:           'grid/getAll'
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

      getAllRows() {
        return [this.getFirstRow(), this.getSecondRow(), this.getThirdRow(), this.getForthRow()]
      },

      getAllColumns() {
        return [this.getFirstColumn(), this.getSecondColumn(), this.getThirdColumn(), this.getForthColumn()]
      },

      addListeners() {
        window.addEventListener('resize', this.resize);
        window.addEventListener('resize', this.resize);
        // add key press listeners here

      },

      resize() {
        console.log("resize!!")
        console.log("resize!!")
        console.log("resize!!")
        // get window width
        // if width less than 521 pixels resize all sliding cards
        // and set viewFactor to 1
      },

      generateCard() {

        let emptyPosition = this.getRandomEmpty()

        if(emptyPosition) {

          let gridBackground = document.getElementById("card-grid");
          let generatedId = "sliding-card-" + this.count
          let card = document.createElement("DIV");
          card.classList.add(
            "lighten-2",
            "sliding-card",
            "sliding-card-adjust",
            "v-card",
            "v-sheet"
          )

          // scale all pixel sizes by viewFactor depending on viewport size
          card.style.top = (emptyPosition.top * this.viewFactor) + "px"
          card.style.left = (emptyPosition.left * this.viewFactor) + "px"
          card.id = generatedId
          gridBackground.appendChild(card)
          // card.style.height = (parseFloat(getComputedStyle(card).height) * this.viewFactor) + "px"
          // card.style.width = (parseFloat(getComputedStyle(card).width) * this.viewFactor) + "px"

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

      canMove(position, row, direction) {

        if (position.edge.includes(direction)) {
          return false;
        }
        let nextPostion = row[ row.indexOf(position) - 1 ]

        return nextPostion.isEmpty

      },

      shuffleUp(position, row) {

        let firstEmpty = this.getEmpty(row)[0]
        let cardId = position.id

        this.slide(cardId, (firstEmpty.top * this.viewFactor), (firstEmpty.left * this.viewFactor))

        this.setPositionIsEmpty({"name": position.name, "bool": true});
        this.setPositionIsEmpty({"name": firstEmpty.name, "bool": false});
        this.setPositionId({"name": position.name, "id": null});
        this.setPositionId({"name": firstEmpty.name, "id": cardId});

      },

      getRowsToMove(direction) {
        switch (direction) {
          case "left":
            return this.getAllRows()
          case "right":
            return this.getAllRows().map(row => row.slice().reverse())
          case "up":
            return this.getAllColumns()
          case "down":
            return this.getAllColumns().map(row => row.slice().reverse())
        }
      },

      calculateMovement(direction) {

        // get all rows or columns based on direction
        let rows = this.getRowsToMove(direction)

        rows.forEach( row => {
          row.forEach( position => {
            // do a canMove check
            // if canMove, find first empty, then shuffle up (?)
            if (!position.isEmpty) {
              let canActuallyMove = this.canMove(position, row, direction)

              if (canActuallyMove) {
                this.shuffleUp(position, row, direction)
              }
            }
          })
        })
      }

    }

  }

</script>

<style>

  .grey-container {
    margin: auto;
    padding: 5px;
    border-radius: 2px;
    background-color: lightgrey !important;
  }

  .grid-background {
    position: absolute;
    background-repeat: repeat;
    background-color: whitesmoke;
    background-image:
      linear-gradient(to right, grey 1px, transparent 1px),
      linear-gradient(to bottom, grey 1px, transparent 1px);
  }

  .sliding-card {
    position: absolute;
    left: 0px;
    top: 0px;
    background-color: lightgrey !important;
    transition: top 700ms, left 700ms;
  }

  @media screen and (max-width: 520px) {
    .grid-background-adjust {
      height: 320px;
      width: 320px;
      background-size: 80px 80px;
    }

    .grey-container-adjust {
      height: 330px;
      width: 330px;
    }

    .sliding-card-adjust {
      height: 72px;
      width: 72px;
      margin: 5px;
    }
  }

  @media screen and (min-width: 521px) {
    .grid-background-adjust {
      height: 480px;
      width: 480px;
      background-size: 120px 120px;
    }

    .grey-container-adjust {
      height: 490px;
      width: 490px;
    }

    .sliding-card-adjust {
      height: 110px;
      width: 110px;
      margin: 5px;
    }
  }






</style>
