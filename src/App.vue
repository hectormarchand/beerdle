<script setup lang="ts">
import GameComponent from "@/components/GameComponent.vue";
import BeerIcon from "./components/icons/BeerIcon.vue";
</script>

<template>
  <header>
    <BeerIcon class="beer-icon" />
    <h1>Beerdle !</h1>
    <BeerIcon class="beer-icon" />
  </header>
  <main>
    <GameComponent />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
  display: flex;
  justify-content: center;
}

.beer-icon {
  width: 1.8rem;
  margin: 0 1rem;
}

main {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  max-width: 15rem;
}
</style>
