<script setup lang="ts">
import BeerGlassComponent from "@/components/BeerGlassComponent.vue";
import { ref, type Ref } from "vue";
import UpArrowIcon from "./icons/UpArrowIcon.vue";
import EqualIcon from "./icons/EqualIcon.vue";
import { useConfetti } from "@/composables/useConfetti";

const MAX_ATTEMPTS = 4;

type HistoryEntryType = {
  attempt: `${number} CL`,
  icon: "lower" | "greater" | "guessed_right",
  clue: "Freezing" | "Cold" | "Getting hot" | "Hot" | "Boiling" | "Yeeeeah"
}

function getCentilitersOfTheDay(): number {
  const today = new Date();
  let hash = today.getFullYear() * 19 + today.getMonth() * 43 + today.getDay() * 71;
  hash = Math.cos(hash) + 1; // [0-2]

  const HASH_MAX = 2;
  const CENTILITERS_MAX = 50;
  const CENTILITERS_MIN = 10;
  const centiliters = CENTILITERS_MIN + hash * (CENTILITERS_MAX - CENTILITERS_MIN) / 2; // [10-50]

  return Math.floor(centiliters);
}

function doAttempt(): void {
  if (!attempt.value) {
    return;
  }
  if (attemptCounts.value >= MAX_ATTEMPTS) {
    return;
  }
  attempt.value  = +attempt.value;

  const guessedRight = centiliters.value === attempt.value;
  attemptCounts.value = attemptCounts.value + 1;

  // Update history
  const icon = getIcon(attempt.value);
  const clue = getClue(attempt.value);
  history.value.push({
    attempt: `${attempt.value} CL`,
    icon: icon,
    clue: clue
  });

  attempt.value = undefined;

  if (guessedRight) {
    confetti?.start();
  }
}

function getIcon(attempt: number): HistoryEntryType["icon"] {
  if (centiliters.value === attempt) {
    return "guessed_right";
  }
  return centiliters.value > attempt ? "greater" : "lower";
}

function getClue(attempt: number): HistoryEntryType["clue"] {
  const difference = Math.abs(centiliters.value - attempt);

  if (difference === 0) {
    return "Yeeeeah";
  } else if (difference <= 3) {
    return "Boiling";
  } else if (difference <= 10) {
    return "Hot";
  } else if (difference <= 20) {
    return "Getting hot";
  } else if (difference <= 30) {
    return "Cold";
  } else {
    return "Freezing";
  }
}

const centiliters: Ref<number> = import.meta.env.DEV ? ref(Math.floor(Math.random() * 40 + 10)) : ref(getCentilitersOfTheDay());
const attemptCounts: Ref<number> = ref(0);
const attempt: Ref<number | undefined> = ref();
const history: Ref<HistoryEntryType[]> = ref([]);

const confetti = useConfetti();
</script>

<template>
  <div>
    <p class="info">Guess the centiliters of a glass of beer in the 0-50 CL range</p>
    <BeerGlassComponent :beer-c-l="centiliters" />

    <div class="attempts">
      <span>Attempts : {{ attemptCounts }}/{{ MAX_ATTEMPTS }}</span>
    </div>

    <form @submit.prevent="doAttempt()" class="guess">
      <input v-model="attempt" type="number" class="input-field" />
      <button type="submit">Guess</button>
    </form>

    <div class="history">
      <div class="history-entry" v-for="(historyEntry, index) in history" :key="index">
        <span>{{ historyEntry.attempt }}</span>
        <span v-if="historyEntry.icon === 'lower'">
          <UpArrowIcon class="icon rotate-180" />
        </span>
        <span v-else-if="historyEntry.icon === 'guessed_right'">
          <EqualIcon class="icon" />
        </span>
        <span v-else-if="historyEntry.icon === 'greater'">
          <UpArrowIcon class="icon" />
        </span>
        <span>{{ historyEntry.clue }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.info {
  margin-bottom: 2rem;
  text-align: center;
}
.attempts {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  font-size: 1.1rem;
}

.guess {
  margin-top: 2rem;
  display: flex;
  justify-content: space-evenly;
}

.guess button {
  padding: 10px;
  border-radius: 10px;
  border-width: 0px;
}

.history {
  margin-top: 2rem;
}

/* From Uiverse.io by Allyhere */
.input-field {
  max-width: 7rem;
  background-color: transparent;
  border: 0px;
  outline: 1px solid #f7a900;
  outline-offset: 1px;
  padding: 0.5em 0.75em;
  border-radius: 0.2em;
  font-size: 1rem;
  letter-spacing: 0.1ch;
  width: 100%;
  color: var(--vt-c-white-mute);
}

.history-entry {
  display: grid;
  grid-template-columns: 1.5fr 1fr 2fr;
  gap: 0.5rem;
  margin: 1rem 0;
}

.history-entry span {
  background-color: #4d4d4d;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon {
  width: 1.2rem;
  height: 1.2rem;
}

.rotate-180 {
  transform: rotate(180deg);
}
</style>
