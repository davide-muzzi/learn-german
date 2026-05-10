<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { BookOpen, MessageSquare, Type, PenLine, Lock, Hammer } from '@lucide/vue'
import {
  CHAPTERS, CHAPTER_SECTIONS,
  GREETINGS, YOUR_NAME, WHERE_FROM, EXPRESSIONS, NUMBERS,
  ALPHABET, UMLAUTS, DIPHTHONGS, SEIN, HABEN,
  AGE_PHRASES, NUMBERS_21_100, NATIONALITIES, COUNTRIES_LANGUAGES,
  PROFESSIONS, W_QUESTION_WORDS, FORMING_QUESTIONS, W_QUESTION_TABLE,
  FILL_GAPS_CH2, MC_QS_CH2, TRANSLATIONS_CH2,
} from '../data/index.js'

const sectionIcons = { theory: BookOpen, vocab: MessageSquare, grammar: Type, exercises: PenLine }
import DataTable from '../components/DataTable.vue'
import ConjugTable from '../components/ConjugTable.vue'
import FillGaps from '../components/exercises/FillGaps.vue'
import MultipleChoice from '../components/exercises/MultipleChoice.vue'
import Translation from '../components/exercises/Translation.vue'

const QUESTION_STRUCTURE = [
  ['W-question',    'W-word + verb + subject + …', 'Woher kommst du? — Where are you from?'],
  ['Yes/No question', 'Verb + subject + …',          'Bist du Student? — Are you a student?'],
]

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
            <p class="card-sub">The German alphabet has 26 letters plus 3 umlauts. Swiss German always writes <strong>ss</strong> — the ß (Eszett) is used in Germany and Austria but not in Switzerland.</p>
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
            <DataTable :rows="DIPHTHONGS" :headers="['Combo', 'Pronunciation', 'Note']" />
          </div>
        </template>

        <template v-else-if="section === 'vocab'">
          <div class="card">
            <div class="card-title">Begrüssungen / Greetings</div>
            <p class="card-sub">Essential phrases for saying hello and goodbye.</p>
            <DataTable :rows="GREETINGS" :headers="['Phrase', 'Meaning', 'Note']" />
          </div>
          <div class="card">
            <div class="card-title">Deinen Namen sagen / Saying Your Name</div>
            <p class="card-sub">Introduce yourself and ask others their name.</p>
            <DataTable :rows="YOUR_NAME" :headers="['Phrase', 'Meaning', 'Note']" />
          </div>
          <div class="card">
            <div class="card-title">Woher kommst du? / Where You're From</div>
            <p class="card-sub">Talk about your origin and where you live.</p>
            <DataTable :rows="WHERE_FROM" :headers="['Phrase', 'Meaning', 'Note']" />
          </div>
          <div class="card">
            <div class="card-title">Häufige Ausdrücke / Common Expressions</div>
            <p class="card-sub">Everyday polite phrases every German speaker needs.</p>
            <DataTable :rows="EXPRESSIONS" :headers="['Phrase', 'Meaning', 'Note']" />
          </div>
          <div class="card">
            <div class="card-title">Zahlen 0-20 / Numbers 0-20</div>
            <p class="card-sub">The foundation for counting, giving your age, and telling the time.</p>
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

      <!-- Chapter 2 sections -->
      <template v-else-if="n === 2">

        <template v-if="section === 'vocab'">
          <div class="card">
            <div class="card-title">Alter / Age</div>
            <p class="card-sub">Phrases for talking about age and birthdays.</p>
            <DataTable :rows="AGE_PHRASES" :headers="['Phrase', 'Meaning', 'Note']" />
          </div>
          <div class="card">
            <div class="card-title">Zahlen 21-100 / Numbers 21-100</div>
            <p class="card-sub">Building on 0-20 from Chapter 1 — notice the pattern: units + und + tens.</p>
            <div class="numbers-grid">
              <div v-for="([num, word]) in NUMBERS_21_100" :key="num" class="num-cell">
                <span class="num-n">{{ num }}</span>
                <span class="num-word">{{ word }}</span>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-title">Nationalitäten / Nationalities</div>
            <p class="card-sub">Nationality adjectives change depending on gender — most add -in for feminine.</p>
            <DataTable :rows="NATIONALITIES" :headers="['Phrase', 'Meaning']" />
          </div>
          <div class="card">
            <div class="card-title">Länder & Sprachen / Countries & Languages</div>
            <p class="card-sub">Country names and their languages. Note: country names have no article unless marked (die Schweiz, die Türkei, die USA).</p>
            <DataTable :rows="COUNTRIES_LANGUAGES" :headers="['Word', 'Meaning', 'Type']" />
          </div>
          <div class="card">
            <div class="card-title">Berufe / Professions</div>
            <p class="card-sub">In German you say "Ich bin Arzt" (no article!) — not "Ich bin ein Arzt".</p>
            <DataTable :rows="PROFESSIONS" :headers="['Word', 'Meaning']" />
          </div>
          <div class="card">
            <div class="card-title">W-Fragen / W-Question Words</div>
            <p class="card-sub">These are the building blocks of every question in German.</p>
            <DataTable :rows="W_QUESTION_WORDS" :headers="['Word', 'Meaning', 'Example']" />
          </div>
          <div class="card">
            <div class="card-title">Fragen bilden / Forming Questions</div>
            <p class="card-sub">W-questions and yes/no questions in context.</p>
            <DataTable :rows="FORMING_QUESTIONS" :headers="['Question', 'Meaning', 'Type']" />
          </div>
        </template>

        <template v-else-if="section === 'grammar'">
          <div class="card">
            <div class="card-title">W-Fragen — Question Words</div>
            <p class="card-sub">W-question words always come first, followed by the verb, then the subject.</p>
            <DataTable :rows="W_QUESTION_TABLE" :headers="['Word', 'Meaning', 'Example']" />
          </div>
          <div class="card">
            <div class="card-title">Fragestruktur / Question Structure <span class="tag">Word order</span></div>
            <p class="card-sub">German questions follow two patterns:</p>
            <DataTable :rows="QUESTION_STRUCTURE" :headers="['Type', 'Structure', 'Example']" />
          </div>
        </template>

        <template v-else-if="section === 'exercises'">
          <FillGaps
            :data="FILL_GAPS_CH2"
            instruction="Fill each blank with the correct W-question word or verb form."
          />
          <MultipleChoice :data="MC_QS_CH2" />
          <Translation :data="TRANSLATIONS_CH2" />
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
