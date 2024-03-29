<template>

  <v-layout column justify-center align-center>

    <v-flex xs12 sm12 md12>

      <v-card>

        <v-card-title class="headline" id="game-title">2048 GAME</v-card-title>

        <Score :current-score="scores.currentScore" :best-score="calcHighScore"></Score>

          <v-touch
            class="grey-container grey-container-adjust"
            v-on:swipeleft="runSequence('left')"
            v-on:swiperight="runSequence('right')"
            v-on:swipeup="runSequence('up')"
            v-on:swipedown="runSequence('down')"
          >

              <div class="grid-background grid-background-adjust" ref="card-grid" v-resize="checkResize">

                <transition-group :name="transitionType">
                  <Card v-for="(card, index) in cards"
                        :key="card.ref"
                        :card-ref="card.ref"
                        :init-top="card.top"
                        :init-left="card.left"
                        :view-port-ratio="viewPortRatio"
                        :transition-enabled="card.transitionEnabled"
                        :z-index="card.zIndex"
                        :value="card.value"
                  ></Card>
                </transition-group>

              </div>

        </v-touch>

        <v-card-actions>

          <IconBtnBar v-on:restart="restartGame()"></IconBtnBar>

        </v-card-actions>

      </v-card>

    </v-flex>

  </v-layout>

</template>

<script>


  import { Position } from '../utils/Position'
  import Card from '../components/Card'
  import Score from '../components/Score'
  import IconBtnBar from '../components/IconBtnBar'
  import { mapState, mapGetters, mapMutations} from 'vuex'
  import _ from 'lodash'


  export default {

    components: {
      Card,
      Score,
      IconBtnBar
    },

    data() {
      return {
        count: 1,
        viewPortRatio: 1.5,
        transitionType: "shrink",
        cards: {
          // props pattern :
          // cardRef1: { top: 0, left:0, transitionEnabled: true, ref: 'cardRef1', value: 5},
        },
        scores: {
          currentScore: 0,
          bestScore: 0
        }
      }
    },

    computed: {

      ...mapState({
                 grid: state => state.grid,
      }),

      calcHighScore() {
        if (this.scores.currentScore > this.scores.bestScore) {
          this.scores.bestScore = this.scores.currentScore
        }
        return this.scores.bestScore
      }

    },

    mounted() {
      this.setUp()
      this.setStartingPos()
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
        getAllColumns:    'grid/getAllColumns',
        getAllRows:       'grid/getAllRows'
      }),

      ...mapMutations({
        setPositionIsEmpty: 'grid/setPositionIsEmpty',
        setPositionRef: 'grid/setPositionRef',
      }),

      // store related methods

      getEmpty(arr) {
        return arr.filter(position => position.isEmpty === true)
      },

      getRandomEmpty() {
        return _.sample(this.getEmpty(this.getAll()))
      },

      // setup - key & viewport listeners

      // checked
      setUp() {
        this.addListeners()
        this.setViewPortRatio()
      },

      // checked
      setViewPortRatio() {
        this.viewPortRatio = window.innerWidth <= 520 ? 1 : 1.5
      },

      // checked
      addListeners() {
        window.addEventListener('keyup', this.checkKeyPress);
      },

      // checked
      checkResize() {
        if (window.innerWidth <= 520 && this.viewPortRatio === 1.5) {
          this.resize(1)
        }
        if (window.innerWidth > 520 && this.viewPortRatio === 1) {
          this.resize(1.5)
        }
      },

      // checked
      resize(ratio) {
        this.setCardTransitions(false)
        this.viewPortRatio = ratio
        // creates a small delay to allow element resizing to complete before restoring css transitions
        setTimeout(() => this.setCardTransitions(true), 400)
      },

      // checked
      setCardTransitions(boolean) {
        for (let card in this.cards) {
          this.$set(this.cards[card], 'transitionEnabled', boolean)
        }
      },

      // checked
      checkKeyPress(e) {
        switch (e.key) {
          case 'ArrowLeft':
            this.runSequence('left')
            break;
          case 'ArrowUp':
            this.runSequence('up')
            break;
          case 'ArrowRight':
            this.runSequence('right')
            break;
          case 'ArrowDown':
            this.runSequence('down')
            break;
        }
      },

      // main methods

      setStartingPos() {
        this.cardBuilder(this.getRandomEmpty(), 2)
        this.cardBuilder(this.getRandomEmpty(), 2)
        this.cardBuilder(this.getRandomEmpty(), 4)
      },

      runSequence(direction) {
        this.calculateTransitionType(direction)
        this.calculateMovement(direction)
        setTimeout(() => this.calculateMerges(direction, this.calculateMovement), 400)
      },

      calculateTransitionType(direction) {
        switch (direction) {
          case "left":
            this.transitionType = "collapse-x"
            break;
          case "right":
            this.transitionType = "collapse-x"
            break;
          case "up":
            this.transitionType = "collapse-y"
            break;
          case "down":
            this.transitionType = "collapse-y"
            break;
        }
      },

      calculateMovement(direction, generateCard) {

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

        if (generateCard) {
          setTimeout(() => generateCard(), 100)
        }
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

      // vue is very data driven, just the act of changing the data triggers the card to move -
      // data flow should always be one way, down from parent to child
      slide(cardRef, top, left) {
        this.$set(this.cards[cardRef], 'top', top)
        this.$set(this.cards[cardRef], 'left', left)
      },

      calculateMerges(direction, callback) {

        let allRows = this.getRowsByDirection(direction)

        let calculatedMerges = allRows.reduce( (allMerges, row) => {

          let skipNext = false

          allMerges.push(row.reduce( (merges, position, index) => {

            if (skipNext) {
              skipNext = false
              return merges
            }

            if (!position.isEmpty && !position.edge.includes(direction)) {

              let nextPosition = row[index - 1]
              let value1 = this.cards[position.ref].value
              let value2 = this.cards[nextPosition.ref].value

              if (value1 === value2) {
                merges.push({
                  firstPosition: position,
                  secondPosition: nextPosition,
                  value: (value1 + value2)
                })
                skipNext = true
              }
            }

            return merges

          }, []))

          return allMerges

        }, [])

        calculatedMerges.flat().map( merge => {
          this.mergePositions(merge.firstPosition, merge.secondPosition, merge.value)
        })

        callback(direction, this.generateCard())
      },

      mergePositions(position, nextPosition, newValue) {
        // deletes first card from data by ref
        this.$delete(this.cards, position.ref)
        // update value of second card
        this.$set(this.cards[nextPosition.ref], 'value', newValue)
        // removes first card from the store
        this.setPositionIsEmpty({"name": position.name, "bool": true});
        this.setPositionRef({"name": position.name, "ref": null});

        // TODO needs test
        // increment score
        this.$set(this.scores, 'currentScore', this.scores.currentScore + newValue)
      },

      generateCard() {

        let emptyPosition = this.getRandomEmpty()

        if(emptyPosition) {
          this.cardBuilder(emptyPosition, _.sample(this.getCardValues()))
        }
      },


      cardBuilder(position, value) {
        let cardRef = "cardRef" + this.count

        let cardProps = {
          top: position.top,
          left: position.left,
          transitionEnabled: true,
          zIndex: 1,
          ref: cardRef,
          value: value
        }

        // update local data
        this.$set(this.cards, cardRef, cardProps)

        this.setPositionIsEmpty({"name": position.name, "bool": false});
        this.setPositionRef({"name": position.name, "ref": cardRef});
        this.count++
      },

      // uses a set to stop weighted probability of most common values
      getCardValues() {
        return Array.from(Object.keys(this.cards).reduce( (values, key) => {
          values.add(this.cards[key].value)
          return values
        }, new Set()))
      },

      restartGame() {

        this.transitionType = "shrink"

        for (let card in this.cards) {
          this.$delete(this.cards, card)
        }

        this.getAll().forEach( position => {
          this.setPositionIsEmpty({"name": position.name, "bool": true});
          this.setPositionRef({"name": position.name, "ref": null});
        })

        this.count = 0
        this.$set(this.scores, 'currentScore', 0)

        setTimeout(() => this.setStartingPos(), 300)
      }

    }

  }

</script>

<style>

  /* common for all transitions */
  .shrink-enter-active, .shrink-leave-active,
  .collapse-x-enter-active, .collapse-y-enter-active
  {
    transition: width .4s, height .4s , transform .4s !important;
    z-index: 2 !important;
  }

  .collapse-y-leave-active, .collapse-x-leave-active
  {
    transition: width .4s, height .4s , transform .4s !important;
    z-index: 1 !important;
  }

  /* default appear disappear from centre transition */
  .shrink-enter, .collapse-x-enter, .collapse-y-enter, .shrink-leave-to
  {
    transform: scale(0, 0);
    z-index: 2 !important;
  }

  .collapse-y-leave-to {
    transform: scale(0, 0);
    /*transform: scaleY(0);*/
    z-index: 1 !important;
  }

  .collapse-x-leave-to {
    transform: scale(0, 0);
    /*transform: scaleX(0);*/
    z-index: 1 !important;
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
      linear-gradient(to right, dimgray 1px, transparent 1px),
      linear-gradient(to bottom, dimgray 1px, transparent 1px);
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

  #game-title {
    font-family: 'Russo One', sans-serif !important;
  }






</style>
