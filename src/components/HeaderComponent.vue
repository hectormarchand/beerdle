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
</style>
