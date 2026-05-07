<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { BookOpen, MessageSquare, Type, PenLine, Lock, Hammer } from '@lucide/vue'
import {
  CHAPTERS, CHAPTER_SECTIONS,
  GREETINGS, YOUR_NAME, WHERE_FROM, EXPRESSIONS, NUMBERS,
  ALPHABET, UMLAUTS, DIPHTHONGS, SEIN, HABEN,
} from '../data/index.js'

const sectionIcons = { theory: BookOpen, vocab: MessageSquare, grammar: Type, exercises: PenLine }
import VocabTable from '../components/VocabTable.vue'
import ConjugTable from '../components/ConjugTable.vue'
import FillGaps from '../components/exercises/FillGaps.vue'
import MultipleChoice from '../components/exercises/MultipleChoice.vue'
import Translation from '../components/exercises/Translation.vue'

const route = useRoute()
const router = useRouter()

const levelParam = computed(() => route.params.level || 'a1')
const n = computed(() => parseInt(route.params.n))
const section = computed(() => route.params.section || null)
const chapter = computed(() => CHAPTERS.find(c => c.n === n.value))
const sections = computed(() => CHAPTER_SECTIONS[n.value] || [])
const currentSection = computed(() => sections.value.find(s => s.key === section.value))

function goToSection(key) {
  router.push(`/${levelParam.value}/ch/${n.value}/${key}`)
}
function backToChapter() {
  router.push(`/${levelParam.value}/ch/${n.value}`)
}
</script>

<template>
  <template v-if="chapter">

    <!-- ── No section selected: show section picker ── -->
    <template v-if="!section">
      <div class="page-header">
        <div class="chapter-eyebrow">{{ levelParam.toUpperCase() }} · Chapter {{ n }}</div>
        <h1>{{ chapter.title }}</h1>
        <p class="sub">Select a section to study.</p>
      </div>

      <template v-if="chapter.active">
        <div class="section-grid">
          <div
            v-for="s in sections"
            :key="s.key"
            class="section-card"
            @click="goToSection(s.key)"
          >
            <div class="section-card-icon"><component :is="sectionIcons[s.key]" :size="22" /></div>
            <div class="section-card-label">{{ s.label }}</div>
            <div class="section-card-desc">{{ s.desc }}</div>
            <div class="section-card-arrow">→</div>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="card coming-soon-card">
          <div class="coming-soon-icon"><Lock :size="36" /></div>
          <h2>Coming Soon</h2>
          <p>Chapter {{ n }} · <strong>{{ chapter.title }}</strong> is not yet available.</p>
          <ul v-if="chapter.topics?.length">
            <li v-for="topic in chapter.topics" :key="topic">{{ topic }}</li>
          </ul>
        </div>
      </template>
    </template>

    <!-- ── Section selected: show content ── -->
    <template v-else>
      <div class="page-header">
        <div class="chapter-eyebrow">{{ levelParam.toUpperCase() }} · Chapter {{ n }} · {{ chapter.title }}</div>
        <h1>{{ currentSection?.label || section }}</h1>
      </div>
      <div class="back-link" @click="backToChapter">← Chapter overview</div>

      <!-- Chapter 1 sections -->
      <template v-if="n === 1">

        <template v-if="section === 'theory'">
          <div class="card">
            <div class="card-title">Alphabet &amp; Special Characters</div>
            <p class="card-sub">The German alphabet shares 26 letters with English, plus 3 umlauts and the ß (Eszett).</p>
            <div class="alpha-grid">
              <div v-for="([l, p]) in ALPHABET" :key="l" class="alpha-card">
                <div class="alpha-letter">{{ l }}</div>
                <div class="alpha-pron">{{ p }}</div>
              </div>
            </div>
            <hr class="section-divider">
            <div class="card-title">Umlauts <span class="tag">Special to German</span></div>
            <div class="alpha-grid" style="grid-template-columns: repeat(3, minmax(66px,1fr)); max-width: 240px;">
              <div v-for="([l, p]) in UMLAUTS" :key="l" class="alpha-card umlaut">
                <div class="alpha-letter">{{ l }}</div>
                <div class="alpha-pron">{{ p }}</div>
              </div>
            </div>
            <hr class="section-divider">
            <div class="card-title">Special Sound Combinations</div>
            <table class="special-table">
              <thead><tr><th>Combo</th><th>Sounds like</th><th>Note</th></tr></thead>
              <tbody>
                <tr v-for="([c, p, note]) in DIPHTHONGS" :key="c">
                  <td class="de" style="font-size:16px;">{{ c }}</td>
                  <td style="font-weight:600;color:#1d4ed8;">{{ p }}</td>
                  <td class="en-col">{{ note }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>

        <template v-else-if="section === 'vocab'">
          <div class="card">
            <div class="card-title">Begrüssungen / Greetings</div>
            <p class="card-sub">Essential phrases for saying hello and goodbye.</p>
            <VocabTable :rows="GREETINGS" />
          </div>
          <div class="card">
            <div class="card-title">Deinen Namen sagen / Saying Your Name</div>
            <p class="card-sub">Introduce yourself and ask others their name.</p>
            <VocabTable :rows="YOUR_NAME" />
          </div>
          <div class="card">
            <div class="card-title">Woher kommst du? / Where You're From</div>
            <p class="card-sub">Talk about your origin and where you live.</p>
            <VocabTable :rows="WHERE_FROM" />
          </div>
          <div class="card">
            <div class="card-title">Häufige Ausdrücke / Common Expressions</div>
            <p class="card-sub">Everyday polite phrases every German speaker needs.</p>
            <VocabTable :rows="EXPRESSIONS" />
          </div>
          <div class="card">
            <div class="card-title">Zahlen 0–20 / Numbers 0–20</div>
            <div class="numbers-grid">
              <div v-for="([num, word]) in NUMBERS" :key="num" class="num-cell">
                <span class="num-n">{{ num }}</span>
                <span class="num-word">{{ word }}</span>
              </div>
            </div>
          </div>
        </template>

        <template v-else-if="section === 'grammar'">
          <div class="card">
            <div class="card-title">sein — to be</div>
            <ConjugTable :rows="SEIN" verb="sein" />
          </div>
          <div class="card">
            <div class="card-title">haben — to have</div>
            <ConjugTable :rows="HABEN" verb="haben" />
          </div>
        </template>

        <template v-else-if="section === 'exercises'">
          <FillGaps />
          <MultipleChoice />
          <Translation />
        </template>

        <template v-else>
          <div class="card"><p>Section "{{ section }}" not found.</p></div>
        </template>

      </template>

      <!-- Other chapters not yet implemented -->
      <template v-else>
        <div class="card coming-soon-card">
          <div class="coming-soon-icon"><Hammer :size="36" /></div>
          <h2>Content Coming Soon</h2>
          <p>The content for this chapter is being prepared.</p>
        </div>
      </template>

    </template>

  </template>

  <!-- Chapter number not in data -->
  <template v-else>
    <div class="page-header">
      <h1>Chapter not found</h1>
      <p class="sub">This chapter doesn't exist.</p>
    </div>
  </template>
</template>
