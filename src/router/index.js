import { createRouter, createWebHashHistory } from 'vue-router'
import LevelView from '../views/LevelView.vue'
import ChapterView from '../views/ChapterView.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/',           redirect: '/a1' },
    { path: '/a1',         name: 'level-a1', component: LevelView },
    { path: '/a1/ch/:n',           name: 'chapter', component: ChapterView },
    { path: '/a1/ch/:n/:section', name: 'section', component: ChapterView },
  ],
  scrollBehavior: () => ({ top: 0 }),
})
