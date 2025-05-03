<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from "vue";

const props = defineProps<{
  beerCL: number; // [0-50]
}>();

const beerLiquid = useTemplateRef("beer-liquid");

onMounted(() => {
  setTimeout(() => {
    if (beerLiquid.value) {
      const CENTILITERS_MAX = 50;
      const PIXEL_HEIGHT = 235;
      const pixels = Math.floor((props.beerCL * PIXEL_HEIGHT) / CENTILITERS_MAX);
      beerLiquid.value.setAttribute("style", `height: ${pixels}px;`);
    }
  }, 50);
});

const bubbles = ref([
  { top: 216, left: 65, duration: 4050, delay: 150 },
  { top: 125, left: 116, duration: 3500, delay: 151 },
  { top: 69, left: 173, duration: 1950, delay: 152 },
  { top: 43, left: 189, duration: 1950, delay: 153 },
  { top: 21, left: 11, duration: 2950, delay: 154 },
  { top: 260, left: 13, duration: 3950, delay: 155 },
  { top: 196, left: 23, duration: 4950, delay: 156 },
  { top: 91, left: 50, duration: 5950, delay: 157 },
  { top: 178, left: 163, duration: 6950, delay: 158 },
  { top: 90, left: 160, duration: 7950, delay: 159 },
  { top: 235, left: 149, duration: 8950, delay: 160 },
  { top: 255, left: 198, duration: 9950, delay: 161 },
  { top: 221, left: 28, duration: 10950, delay: 162 },
]);
</script>

<template>
  <div class="container">
    <div class="beer-borderbox">
      <div class="beer-glass">
        <div class="beer-inner" ref="beer-liquid">
          <div
            v-for="(bubble, index) in bubbles"
            :key="index"
            class="bubble"
            :style="{
              top: bubble.top + 'px',
              left: bubble.left + 'px',
              animationDuration: bubble.duration + 'ms',
              animationDelay: bubble.delay + 'ms',
            }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  color: #505050;
}
.beer-borderbox {
  position: relative;
}
/** The glass handle */
.beer-borderbox:before {
  content: "";
  position: absolute;
  top: 25px;
  right: -50px;
  width: 80px;
  height: 150px;
  border: 20px solid lightgray;
  border-radius: 25px;
}
.beer-glass {
  position: relative;
  width: 180px;
  height: 245px;
  background-color: #969696;
  border-radius: 5px;
  border: 10px solid lightgray;
  border-top: none;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: end;
}
/** The three lines on the glass */
.beer-glass:before {
  content: "";
  position: absolute;
  width: 30px;
  height: 130px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  z-index: 99;
  margin: auto;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  box-shadow: 50px 0 0 0 rgba(0, 0, 0, 0.2), -50px 0 0 0 rgba(0, 0, 0, 0.2);
}
.beer-inner {
  position: absolute;
  width: 100%;
  height: 0px;
  transition: ease-out;
  transition-duration: 1s;
  border-top: 20px solid white;
  background: linear-gradient(to bottom, #bc7012 0%, #efd002 100%);
  background-color: #f7a900;
  box-sizing: border-box;
}

.bubble {
  position: absolute;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.4);
  width: 10px;
  height: 10px;
  animation-name: bubbles;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

@keyframes bubbles {
  100% {
    top: -10px;
  }
}
</style>
