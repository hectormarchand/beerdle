<script setup lang="ts">
import GameComponent from "@/components/GameComponent.vue";
import { Analytics } from "@vercel/analytics/vue";
import HeaderComponent from "./components/HeaderComponent.vue";
</script>

<template>
  <Analytics />
  <HeaderComponent />
  <main>
    <GameComponent />
  </main>
</template>

<style scoped>
main {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  place-items: center;
  max-width: 20rem;
}
</style>
