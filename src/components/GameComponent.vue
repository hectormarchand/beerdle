<script setup lang="ts">
import BeerGlassComponent from "@/components/BeerGlassComponent.vue";
import { computed, ref, type Ref } from "vue";
import UpArrowIcon from "./icons/UpArrowIcon.vue";
import EqualIcon from "./icons/EqualIcon.vue";
import { useConfetti } from "@/composables/useConfetti";

const MAX_ATTEMPTS = 4;

type HistoryEntryType = {
  attempt: `${number} CL`,
  icon: "lower" | "greater" | "guessed_right",
  clue: "freezing" | "cold" | "getting_hot" | "hot" | "boiling" | "yeah"
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
  if (!attempt.value && attempt.value !== 0) {
    return;
  }
  if (attemptCounts.value >= MAX_ATTEMPTS) {
    return;
  }
  attempt.value  = +attempt.value;

  guessedRight.value = centiliters.value === attempt.value;
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

  if (guessedRight.value) {
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
    return "yeah";
  } else if (difference <= 3) {
    return "boiling";
  } else if (difference <= 10) {
    return "hot";
  } else if (difference <= 20) {
    return "getting_hot";
  } else if (difference <= 30) {
    return "cold";
  } else {
    return "freezing";
  }
}

const centiliters: Ref<number> = import.meta.env.DEV ? ref(Math.floor(Math.random() * 40 + 10)) : ref(getCentilitersOfTheDay());
const attemptCounts: Ref<number> = ref(0);
const attempt: Ref<number | undefined> = ref();
const guessedRight: Ref<boolean> = ref(false);
const history: Ref<HistoryEntryType[]> = ref([]);
const gameEnd: Ref<boolean> = computed(() => {
  return attemptCounts.value >= MAX_ATTEMPTS || guessedRight.value;
});

const confetti = useConfetti();
</script>

<template>
  <p class="info bold text-yellow" v-if="gameEnd">
    {{ $t("game.end-phrase") }}
  </p>
  <p class="info">{{ $t("game.tutorial-phrase") }}</p>
  <BeerGlassComponent :beer-c-l="centiliters" />
  <div class="answer" v-if="gameEnd">{{ centiliters }}CL</div>

  <div class="attempts">
    <span>{{ $t("game.attempts") }} : {{ attemptCounts }}/{{ MAX_ATTEMPTS }}</span>
  </div>

  <form @submit.prevent="doAttempt()" class="guess-form">
    <input v-model="attempt" type="number" class="input-field" />
    <button type="submit">{{ $t("game.buttons.guess") }}</button>
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
      <span>{{ $t("game.clues." + historyEntry.clue) }}</span>
    </div>
  </div>
</template>

<style scoped>
.info {
  margin-bottom: 2rem;
  text-align: center;
}

.bold {
  font-size: 1.2rem;
  font-weight: bold;
}

.text-yellow {
  color: #efd002;
}

.attempts {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  font-size: 1.1rem;
}

.guess-form {
  margin-top: 2rem;
  display: flex;
  justify-content: space-evenly;
  width: 75%;
}

.guess-form button {
  padding: 10px;
  border-radius: 10px;
  border-width: 0px;
}

.history {
  margin-top: 2rem;
  width: 90%;
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
  grid-template-columns: 1fr 1fr 2fr;
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

.answer {
  position: absolute;
  top: 2.9em;
  left: 50%;
  font-size: 100px;
  font-weight: bold;
  color: rgb(245, 194, 17);
  animation: pulse 1.5s ease-in-out infinite;
  z-index: 10;
}

@keyframes pulse {
  0%,
  100% {
    transform: translateX(-50%) scale(1);
  }
  50% {
    transform: translateX(-50%) scale(1.5);
  }
}
</style>
