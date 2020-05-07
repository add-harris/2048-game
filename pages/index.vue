<template>

  <v-layout column justify-center align-center>

    <v-flex xs12 sm12 md12>

      <v-card>

        <v-card-title class="headline">Slide</v-card-title>

        <div class="grey-container grey-container-adjust">


              <div class="grid-background grid-background-adjust" ref="card-grid">
                <transition-group name="fade">
                  <Card v-for="(card, index) in cards"
                        :key="card.ref"
                        :card-ref="card.ref"
                        :init-top="card.top"
                        :init-left="card.left"
                        :view-port-ratio="viewPortRatio"
                        :transition-enabled="card.transitionEnabled"
                  ></Card>
                </transition-group>
              </div>


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

<!--                  unable to get vue html based event listeners to work so used traditional js-->
<!--                  <input value="input" type="button" :keyup.space="print()" >-->
<!--                  <input value="input" type="button" :keyup.enter="print()" >-->

                </div>
              </v-row>
              <v-row>
                <div style="margin: 10px">

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
  import Card from '../components/Card'
  import { mapState, mapGetters, mapMutations} from 'vuex'
  import _ from 'lodash'


  export default {

    components: {
      Card
    },

    data() {
      return {
        count: 1,
        viewPortRatio: 1.5,
        cards: {
          // props pattern :
          // cardRef1: { top: 0, left:0, transitionEnabled: true, ref: 'cardRef1},
          // cardRef2: { top: 0, left:80 },
          // cardRef3: { top: 0, left:160 },
          // cardRef4: { top: 0, left:240 },
        }

      }
    },

    computed: mapState({
      grid: state => state.grid,
      // can access whole state with this.grid, though may not be a good idea

      // to store state across multiple pages
      // this does work & load cards when the exist in the store, but then breaks further cards being made
      // is also a hacky way of updating cards data (should use $set)
      // if used a flag should be set in the store to run it once when returning to the page, reload tiles, then turn it back off
      // mapCards: async function (state) {
      //   this.cards = state.grid.storedCards
      //   await this.$nextTick()
      // }
    }),

    mounted() {
      this.setUp()
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
        getAll:           'grid/getAll',
        // getStoredCards:   'grid/getStoredCards'
      }),

      ...mapMutations({
        setPositionIsEmpty: 'grid/setPositionIsEmpty',
        setPositionRef: 'grid/setPositionRef',
        // setCardData: 'grid/setCardData'
      }),

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

      setUp() {
        this.addListeners()
        this.setViewPortRatio()
      },

      setViewPortRatio() {
        this.viewPortRatio = window.innerWidth <= 520 ? 1 : 1.5
      },

      addListeners() {
        window.addEventListener('resize', this.checkResize);
        window.addEventListener('keyup', this.checkKeyPress);
      },

      checkResize() {
        if (window.innerWidth <= 520 && this.viewPortRatio === 1.5) {
          this.resize(1)
        }
        if (window.innerWidth > 520 && this.viewPortRatio === 1) {
          this.resize(1.5)
        }
      },

      resize(ratio) {
        this.setCardTransitions(false)
        this.viewPortRatio = ratio
        // creates a small delay to allow element resizing to complete before restoring css transitions
        setTimeout(() => this.setCardTransitions(true), 300)
      },

      checkKeyPress(e) {
        switch (e.key) {
          case 'ArrowLeft':
            this.calculateMovement('left')
            break;
          case 'ArrowUp':
            this.calculateMovement('up')
            break;
          case 'ArrowRight':
            this.calculateMovement('right')
            break;
          case 'ArrowDown':
            this.calculateMovement('down')
            break;
        }
      },

      // TODO needs test
      setCardTransitions(boolean) {
        for (let card in this.cards) {
          this.$set(this.cards[card], 'transitionEnabled', boolean)
        }
      },

      generateCard() {

        let emptyPosition = this.getRandomEmpty()

        if(emptyPosition) {

          let cardRef = "cardRef" + this.count

          let cardProps = {
            top: emptyPosition.top,
            left: emptyPosition.left,
            transitionEnabled: true,
            ref: cardRef,
          }

          // update local data
          this.$set(this.cards, cardRef, cardProps)

          this.setPositionIsEmpty({"name": emptyPosition.name, "bool": false});
          this.setPositionRef({"name": emptyPosition.name, "ref": cardRef});
          this.count++
        }
      },

      // TODO move cards to store instead of data
      // vue is very data driven, just the act of changing the data triggers the card to move -
      // data flow should always be one way, down from parent to child
      slide(cardRef, top, left) {
        this.$set(this.cards[cardRef], 'top', top)
        this.$set(this.cards[cardRef], 'left', left)
      },

      // the logic is to pull tiles in the selected direction
      // rows must be returned in the correct order depending on the direction
      // i.e if direction is 'left' row1 should be as: pos1, 2, 3, 4 - pulling from left to right
      // if direction is 'right' row1 should be reversed: pos4, 3, 2, 1 - pulling from right to left
      getRowsByDirection(direction) {
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

      canMove(position, row, direction) {

        if (position.edge.includes(direction)) {
          return false;
        }
        let nextPosition = row[ row.indexOf(position) - 1 ]

        return nextPosition.isEmpty

      },

      shuffleUp(position, row) {

        let firstEmpty = this.getEmpty(row)[0]
        let cardRef = position.ref

        this.slide(cardRef, firstEmpty.top, firstEmpty.left)

        this.setPositionIsEmpty({"name": position.name, "bool": true});
        this.setPositionIsEmpty({"name": firstEmpty.name, "bool": false});
        this.setPositionRef({"name": position.name, "ref": null});
        this.setPositionRef({"name": firstEmpty.name, "ref": cardRef});

      },


      // position merges into next position i.e. position disappears
      mergePositions(position, nextPosition) {
        // deletes card from data by ref
        // if position value = nextPosition value
        this.$delete(this.cards, position.ref)
        // removes from the store
        this.setPositionIsEmpty({"name": position.name, "bool": true});
        this.setPositionRef({"name": position.name, "ref": null});
      },

      calulateMerges(direction) {

        let rows = this.getRowsByDirection(direction)

        rows.forEach( row => {
          row.forEach( (position, index) => {
            // if it is not empty or an edge piece
            if (!position.isEmpty && !position.edge.includes(direction)) {
              let nextPosition = row[index - 1]
              console.log(`can merger ${position.name} & ${nextPosition.name}`)
              this.mergePositions(position, nextPosition)

            }
          })
        })

      },

      calculateMovement(direction) {

        let rows = this.getRowsByDirection(direction)

        rows.forEach( row => {
          row.forEach( position => {
            // do a canMove check
            // if canMove, find first empty, then shuffle up
            if (!position.isEmpty) {
              let canActuallyMove = this.canMove(position, row, direction)

              if (canActuallyMove) {
                this.shuffleUp(position, row)
              }
            }
          })
        })
        setTimeout(() => this.calulateMerges(direction), 200)
      }

    }

  }

</script>

<style>

  :root {
    --fade-width: 0;
  }

  .fade-enter-active {
    transition: width .3s, height .3s !important;
  }

  .fade-leave-active {
    transition: width .3s, height .5s !important;
    /*height: 0;*/
  }

  .fade-enter {
    /*width: 0;*/
    height: 0;
  }

  .fade-leave-to {
    width: var(--fade-width);
    /*height: 0;*/
  }

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
  }






</style>
