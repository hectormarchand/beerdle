<script setup lang="ts">
import { useI18n } from "vue-i18n";
import BeerIcon from "./icons/BeerIcon.vue";

const i18n = useI18n();

const localeToLabelMap: { [key: string]: string } = {
  fr: "Français",
  en: "English",
};

function buildLocaleOptions(): { label: string; value: string }[] {
  return i18n.availableLocales.map((locale) => ({
    label: localeToLabelMap[locale] || locale,
    value: locale,
  }));
}
</script>

<template>
  <header>
    <div class="title">
      <BeerIcon class="beer-icon" />
      <h1>{{ $t("title") }}</h1>
      <BeerIcon class="beer-icon" />
    </div>

    <div class="select-i18n">
      <div
        v-for="locale in $i18n.availableLocales"
        :key="`locale-${locale}`"
        class="locale"
        :class="{ 'locale-active': locale === $i18n.locale }"
        @click="$i18n.locale = locale"
      >
        <span>{{ locale.toLocaleUpperCase() }}</span>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  display: flex;
  flex-direction: column;
  place-items: center;
}

.title {
  line-height: 1.5;
  display: flex;
  justify-content: center;
}

.beer-icon {
  width: 1.8rem;
  margin: 0 1rem;
}

.select-i18n {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  margin-top: 0.5rem;
}

.locale {
  cursor: pointer;
}

.locale-active {
  border-bottom: 3px solid #f7a900;
}
</style>
