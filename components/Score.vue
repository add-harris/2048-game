<template>

  <v-container>

    <v-row>

      <v-col cols="4" md="2" ><p class="score-label">Score</p></v-col>

      <v-col cols="8" md="4">
        <v-card light class="score-card"><p class="score-digits">{{currentScore}}</p></v-card>
      </v-col>

      <v-col cols="4" md="2" ><p class="score-label">Best</p></v-col>

      <v-col cols="8" md="4">
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
    font-family: 'Orbitron', sans-serif;
  }

  .score-card {
    background-color: dimgray !important;
    color: whitesmoke !important;
  }

  .score-digits {
    text-align: right;
    font-size: 1.5em;
    font-family: 'Orbitron', sans-serif;
  }

</style>
