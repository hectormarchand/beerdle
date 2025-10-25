import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import VueConfetti from "vue-confetti"
import { createI18n } from 'vue-i18n'
import fr from "./i18n/fr.json"
import en from "./i18n/en.json"

const i18n = createI18n({
    locale: "en",
    fallbackLocale: "en",
    messages: {
        fr: fr,
        en: en
    }
});

createApp(App).use(i18n).use(VueConfetti).mount('#app')
