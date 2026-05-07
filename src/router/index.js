import { createRouter, createWebHashHistory } from 'vue-router'
import LevelView from '../views/LevelView.vue'
import ChapterView from '../views/ChapterView.vue'
import AboutView from '../views/AboutView.vue'
import PrivacyView from '../views/PrivacyView.vue'
import ContactView from '../views/ContactView.vue'
import FlashcardsView from '../views/FlashcardsView.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/',                    redirect: '/a1' },
    { path: '/a1',                  name: 'level-a1',    component: LevelView },
    { path: '/a1/ch/:n',            name: 'chapter',     component: ChapterView },
    { path: '/a1/ch/:n/:section',   name: 'section',     component: ChapterView },
    { path: '/flashcards',          name: 'flashcards',  component: FlashcardsView },
    { path: '/about',               name: 'about',       component: AboutView },
    { path: '/privacy',             name: 'privacy',     component: PrivacyView },
    { path: '/contact',             name: 'contact',     component: ContactView },
  ],
  scrollBehavior: () => ({ top: 0 }),
})
