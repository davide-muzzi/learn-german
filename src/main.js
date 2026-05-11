import { createApp } from 'vue'
import './style.css'
import './styles/exercises.css'
import './styles/flashcards.css'
import './styles/settings.css'
import './styles/notes.css'
import App from './App.vue'
import router from './router/index.js'

createApp(App).use(router).mount('#app')
