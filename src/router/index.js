import { createRouter, createWebHashHistory } from 'vue-router'
import RoadmapView from '../views/RoadmapView.vue'
import AlphabetView from '../views/AlphabetView.vue'
import VocabView from '../views/VocabView.vue'
import NumbersView from '../views/NumbersView.vue'
import ConjugView from '../views/ConjugView.vue'
import FillGapsView from '../views/FillGapsView.vue'
import MultipleChoiceView from '../views/MultipleChoiceView.vue'
import TranslationView from '../views/TranslationView.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/roadmap' },
    { path: '/roadmap',      name: 'roadmap',      component: RoadmapView },
    { path: '/alphabet',     name: 'alphabet',     component: AlphabetView },
    { path: '/v-greetings',  name: 'v-greetings',  component: VocabView },
    { path: '/v-name',       name: 'v-name',       component: VocabView },
    { path: '/v-from',       name: 'v-from',       component: VocabView },
    { path: '/v-expr',       name: 'v-expr',       component: VocabView },
    { path: '/v-numbers',    name: 'v-numbers',    component: NumbersView },
    { path: '/g-sein',       name: 'g-sein',       component: ConjugView },
    { path: '/g-haben',      name: 'g-haben',      component: ConjugView },
    { path: '/ex-fill',      name: 'ex-fill',      component: FillGapsView },
    { path: '/ex-mc',        name: 'ex-mc',        component: MultipleChoiceView },
    { path: '/ex-translate', name: 'ex-translate', component: TranslationView },
  ],
  scrollBehavior: () => ({ top: 0 }),
})
