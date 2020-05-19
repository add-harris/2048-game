<template>

  <v-container>

    <v-row>
      <v-col cols="4" md="2" >Score</v-col>
      <v-col cols="8" md="4">
        <v-card><p class="score-digits">1000</p></v-card>
      </v-col>
      <v-col cols="4" md="2">Best</v-col>
      <v-col cols="8" md="4">
        <v-card><p class="score-digits">1000</p></v-card>
      </v-col>
    </v-row>

  </v-container>

</template>

<script>

</script>

<style>

  .score-digits {
    text-align: right;
    /*font-family: 'Audiowide', cursive;*/
    /*font-family: 'Orbitron', sans-serif;*/
    /*font-family: 'Press Start 2P', cursive;*/
    /*font-family: 'Russo One', sans-serif;*/
    font-family: 'Teko', sans-serif;
  }

</style>
