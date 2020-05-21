<template>

  <v-container>

    <v-row>

<!--      <v-col cols="6">-->

<!--        <v-card color="grey">-->

<!--          <v-card-title>-->
<!--            <p class="score-label">Score</p>-->
<!--          </v-card-title>-->

<!--            <v-card light class="score-card"><p class="score-digits">{{currentScore}}</p></v-card>-->

<!--        </v-card>-->

<!--      </v-col>-->

<!--      <v-col cols="6">-->

<!--        <v-card>-->

<!--          <v-card-title>-->
<!--            <p class="score-label">Best</p>-->
<!--          </v-card-title>-->

<!--          <v-card light class="score-card"><p class="score-digits">{{bestScore}}</p></v-card>-->

<!--        </v-card>-->

<!--      </v-col>-->

      <v-col cols="4" ><p class="score-label text-right">Score</p></v-col>

      <v-col cols="8" >
        <v-card light class="score-card"><p class="score-digits">{{currentScore}}</p></v-card>
      </v-col>

      <v-col cols="4" ><p class="score-label text-right">Best</p></v-col>

      <v-col cols="8" >
        <v-card light class="score-card"><p class="score-digits">{{bestScore}}</p></v-card>
      </v-col>

    </v-row>

  </v-container>

</template>

<script>

  export default {
    props: {
      currentScore: Number,
      bestScore: Number
    }
  }

</script>

<style>

  .score-label {
    font-size: 1em;
    font-family: 'Russo One', sans-serif;
  }

  .score-card {
    box-shadow: inset 0px 1px 1px 1px #000000;
    background-color: dimgray !important;
    color: whitesmoke !important;
  }

  .score-digits {
    padding-right: 5px;
    text-align: right;
    font-size: 1.5em;
    font-family: 'Orbitron', sans-serif;
  }

</style>
