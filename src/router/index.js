import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LevelView from '../views/LevelView.vue'
import ChapterView from '../views/ChapterView.vue'
import AboutView from '../views/AboutView.vue'
import PrivacyView from '../views/PrivacyView.vue'
import ContactView from '../views/ContactView.vue'
import FlashcardsView from '../views/FlashcardsView.vue'
import SettingsView from '../views/SettingsView.vue'
import SwissView from '../views/SwissView.vue'

const LEVEL_RE = 'a1|a2|b1|b2|c1|c2'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/',                                        name: 'home',      component: HomeView },
    { path: '/swiss',                                   name: 'swiss',     component: SwissView },
    { path: '/flashcards',                              name: 'flashcards', component: FlashcardsView },
    { path: '/settings',                                name: 'settings',   component: SettingsView },
    { path: '/about',                                   name: 'about',     component: AboutView },
    { path: '/privacy',                                 name: 'privacy',   component: PrivacyView },
    { path: '/contact',                                 name: 'contact',   component: ContactView },
    { path: `/:level(${LEVEL_RE})`,                     name: 'level',     component: LevelView },
    { path: `/:level(${LEVEL_RE})/ch/:n`,               name: 'chapter',   component: ChapterView },
    { path: `/:level(${LEVEL_RE})/ch/:n/:section`,      name: 'section',   component: ChapterView },
  ],
  scrollBehavior: () => ({ top: 0 }),
})
