<script setup>
import { computed, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { BookOpen, MessageSquare, PenLine, Lock, Hammer } from '@lucide/vue'
import {
  CHAPTERS, CHAPTER_SECTIONS,
  GREETINGS, YOUR_NAME, WHERE_FROM, EXPRESSIONS, NUMBERS,
  ALPHABET, UMLAUTS, DIPHTHONGS, SEIN, HABEN,
  MC_QS_GREETINGS, TRANSLATIONS_GREETINGS,
  MC_QS_EXPRESSIONS, TRANSLATIONS_EXPRESSIONS,
  MC_QS_NUMBERS, TRANSLATIONS_NUMBERS,
  FILL_GAPS, MC_QS, TRANSLATIONS,
  AGE_PHRASES, MONTHS, NUMBERS_21_100, NATIONALITIES, COUNTRIES, LANGUAGES,
  PROFESSIONS, W_QUESTION_WORDS, FORMING_QUESTIONS, W_QUESTION_TABLE,
  MC_QS_AGE_NUMBERS, TRANSLATIONS_AGE_NUMBERS,
  MC_QS_COUNTRIES_LANGUAGES, TRANSLATIONS_COUNTRIES_LANGUAGES,
  MC_QS_PROFESSIONS, TRANSLATIONS_PROFESSIONS,
  MC_QS_QUESTIONS_VOCAB, TRANSLATIONS_QUESTIONS_VOCAB,
  FILL_GAPS_CH2, MC_QS_CH2, TRANSLATIONS_CH2, DATE_ORDINALS,
} from '../data/index.js'

const sectionIcons = { theory: BookOpen, vocab: MessageSquare, exercises: PenLine }
import DataTable from '../components/DataTable.vue'
import ConjugTable from '../components/ConjugTable.vue'
import FillGaps from '../components/exercises/FillGaps.vue'
import MultipleChoice from '../components/exercises/MultipleChoice.vue'
import Translation from '../components/exercises/Translation.vue'

const QUESTION_STRUCTURE = [
  ['W-question',      'W-word + verb + subject + …', 'Woher kommst du? — Where are you from?'],
  ['Yes/No question', 'Verb + subject + …',           'Bist du Student? — Are you a student?'],
]

const route  = useRoute()
const router = useRouter()

const levelParam     = computed(() => route.params.level   || 'a1')
const n              = computed(() => parseInt(route.params.n))
const section        = computed(() => route.params.section || null)
const topic          = computed(() => route.params.topic   || null)
const chapter        = computed(() => CHAPTERS.find(c => c.n === n.value))
const sections       = computed(() => CHAPTER_SECTIONS[n.value] || [])
const currentSection = computed(() => sections.value.find(s => s.key === section.value))
const currentTopic   = computed(() => currentSection.value?.topics?.find(t => t.key === topic.value))
const multiTopic     = computed(() => (currentSection.value?.topics?.length ?? 0) > 1)

// Auto-skip topic picker when a section has only one topic (handles direct URL access)
watchEffect(() => {
  if (section.value && !topic.value && currentSection.value?.topics?.length === 1) {
    router.replace(`/${levelParam.value}/ch/${n.value}/${section.value}/${currentSection.value.topics[0].key}`)
  }
})

function goToSection(key) {
  const sec = sections.value.find(s => s.key === key)
  if ((sec?.topics?.length ?? 0) === 1) {
    router.push(`/${levelParam.value}/ch/${n.value}/${key}/${sec.topics[0].key}`)
  } else {
    router.push(`/${levelParam.value}/ch/${n.value}/${key}`)
  }
}

function goToTopic(key) {
  router.push(`/${levelParam.value}/ch/${n.value}/${section.value}/${key}`)
}

function backToChapter() {
  router.push(`/${levelParam.value}/ch/${n.value}`)
}

function backToSection() {
  router.push(`/${levelParam.value}/ch/${n.value}/${section.value}`)
}
</script>

<template>
  <template v-if="chapter">

    <!-- ── No section: section picker ── -->
    <template v-if="!section">
      <div class="page-header">
        <div class="chapter-eyebrow">{{ levelParam.toUpperCase() }} · Chapter {{ n }}</div>
        <h1>{{ chapter.title }}</h1>
        <p class="sub">Select a section to study.</p>
      </div>

      <template v-if="chapter.active">
        <div class="section-grid">
          <div v-for="s in sections" :key="s.key" class="section-card" @click="goToSection(s.key)">
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
            <li v-for="t in chapter.topics" :key="t">{{ t }}</li>
          </ul>
        </div>
      </template>
    </template>

    <!-- ── Section, no topic: topic picker ── -->
    <template v-else-if="!topic">
      <div class="page-header">
        <div class="chapter-eyebrow">{{ levelParam.toUpperCase() }} · Chapter {{ n }} · {{ chapter.title }}</div>
        <h1>{{ currentSection?.label }}</h1>
      </div>
      <div class="back-link" @click="backToChapter">← Chapter overview</div>
      <div class="section-grid">
        <div v-for="t in currentSection?.topics" :key="t.key" class="section-card" @click="goToTopic(t.key)">
          <div class="section-card-label">{{ t.label }}</div>
          <div class="section-card-desc">{{ t.desc }}</div>
          <div class="section-card-arrow">→</div>
        </div>
      </div>
    </template>

    <!-- ── Section + topic: content ── -->
    <template v-else>
      <div class="page-header">
        <div class="chapter-eyebrow">{{ levelParam.toUpperCase() }} · Chapter {{ n }} · {{ chapter.title }} · {{ currentSection?.label }}</div>
        <h1>{{ currentTopic?.label }}</h1>
      </div>
      <div class="back-link" @click="multiTopic ? backToSection() : backToChapter()">
        {{ multiTopic ? '← Section overview' : '← Chapter overview' }}
      </div>

      <!-- ── Chapter 1 ── -->
      <template v-if="n === 1">

        <!-- Theory: Alphabet -->
        <template v-if="section === 'theory' && topic === 'alphabet'">
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

        <!-- Theory: sein & haben -->
        <template v-else-if="section === 'theory' && topic === 'sein-haben'">
          <div class="card">
            <div class="card-title">sein — to be</div>
            <ConjugTable :rows="SEIN" verb="sein" />
          </div>
          <div class="card">
            <div class="card-title">haben — to have</div>
            <ConjugTable :rows="HABEN" verb="haben" />
          </div>
        </template>

        <!-- Vocab: Greetings & Introduction -->
        <template v-else-if="section === 'vocab' && topic === 'greetings'">
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
        </template>

        <!-- Vocab: Common Expressions -->
        <template v-else-if="section === 'vocab' && topic === 'expressions'">
          <div class="card">
            <div class="card-title">Häufige Ausdrücke / Common Expressions</div>
            <p class="card-sub">Everyday polite phrases every German speaker needs.</p>
            <DataTable :rows="EXPRESSIONS" :headers="['Phrase', 'Meaning', 'Note']" />
          </div>
        </template>

        <!-- Vocab: Numbers 0-20 -->
        <template v-else-if="section === 'vocab' && topic === 'numbers'">
          <div class="card">
            <div class="card-title">Zahlen 0–20 / Numbers 0–20</div>
            <p class="card-sub">The foundation for counting, giving your age, and telling the time.</p>
            <div class="numbers-grid">
              <div v-for="([num, word]) in NUMBERS" :key="num" class="num-cell">
                <span class="num-n">{{ num }}</span>
                <span class="num-word">{{ word }}</span>
              </div>
            </div>
          </div>
        </template>

        <!-- Exercises: Greetings & Introduction -->
        <template v-else-if="section === 'exercises' && topic === 'greetings'">
          <MultipleChoice :data="MC_QS_GREETINGS" />
          <Translation :data="TRANSLATIONS_GREETINGS" />
        </template>

        <!-- Exercises: Common Expressions -->
        <template v-else-if="section === 'exercises' && topic === 'expressions'">
          <MultipleChoice :data="MC_QS_EXPRESSIONS" />
          <Translation :data="TRANSLATIONS_EXPRESSIONS" />
        </template>

        <!-- Exercises: Numbers 0-20 -->
        <template v-else-if="section === 'exercises' && topic === 'numbers'">
          <MultipleChoice :data="MC_QS_NUMBERS" />
          <Translation :data="TRANSLATIONS_NUMBERS" />
        </template>

        <!-- Exercises: sein & haben -->
        <template v-else-if="section === 'exercises' && topic === 'sein-haben'">
          <FillGaps />
          <MultipleChoice />
        </template>

        <!-- Exercises: Mixed -->
        <template v-else-if="section === 'exercises' && topic === 'mixed'">
          <FillGaps />
          <Translation />
        </template>

      </template>

      <!-- ── Chapter 2 ── -->
      <template v-else-if="n === 2">

        <!-- Theory: Dates & Ordinals -->
        <template v-if="section === 'theory' && topic === 'dates'">
          <div class="card">
            <div class="card-title">Daten sagen / Saying Dates</div>
            <p class="card-sub">Dates use <strong>Am + ordinal number + month</strong>. The ordinal is always in dative form.</p>
            <DataTable
              :rows="[
                ['1.',      'ersten',  'Am ersten Mai'],
                ['2.',      'zweiten', 'Am zweiten Juni'],
                ['3.',      'dritten', 'Am dritten März'],
                ['4. – 19.','+ ten',   'Am vierten, zehnten, achtzehnten …'],
                ['20. +',   '+ sten',  'Am zwanzigsten, dreissigsten …'],
              ]"
              :headers="['Day', 'Ending', 'Example']"
            />
            <p class="card-sub" style="margin-top: 12px;">
              <strong>Exception:</strong> 7. → <strong>siebten</strong> (not <em>siebentten</em> — the <em>-en</em> from <em>sieben</em> is dropped).
            </p>
          </div>
          <div class="card">
            <div class="card-title">Ordinalzahlen 1–31 / Reference Table</div>
            <p class="card-sub">All ordinals in dative form as used after <em>am</em>.</p>
            <DataTable :rows="DATE_ORDINALS" :headers="['Day', 'Am …']" />
          </div>
        </template>

        <!-- Theory: Forming Questions -->
        <template v-else-if="section === 'theory' && topic === 'forming-questions'">
          <div class="card">
            <div class="card-title">Fragen bilden / Forming Questions</div>
            <p class="card-sub">W-questions and yes/no questions in context.</p>
            <DataTable :rows="FORMING_QUESTIONS" :headers="['Question', 'Meaning', 'Type']" />
          </div>
        </template>

        <!-- Theory: Question Formation -->
        <template v-else-if="section === 'theory' && topic === 'question-formation'">
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

        <!-- Vocab: Age, Numbers & Months -->
        <template v-else-if="section === 'vocab' && topic === 'age-numbers'">
          <div class="card">
            <div class="card-title">Alter / Age</div>
            <p class="card-sub">Phrases for talking about age and birthdays.</p>
            <DataTable :rows="AGE_PHRASES" :headers="['Phrase', 'Meaning', 'Note']" />
          </div>
          <div class="card">
            <div class="card-title">Zahlen 21–1'000'000 / Numbers 21–1,000,000</div>
            <p class="card-sub">Tens + units follow the pattern: units + und + tens (e.g. einundzwanzig). Hundreds and thousands stack the same way: hundert, tausend, eine Million.</p>
            <div class="numbers-grid">
              <div v-for="([num, word]) in NUMBERS_21_100" :key="num" class="num-cell">
                <span class="num-n">{{ num }}</span>
                <span class="num-word">{{ word }}</span>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-title">Monate / Months</div>
            <p class="card-sub">Months are always capitalised and masculine: <em>der Monat</em>. Use <em>im</em> + month to say "in January" etc.</p>
            <DataTable :rows="MONTHS" :headers="['Word', 'Meaning', 'Note']" />
          </div>
        </template>

        <!-- Vocab: Countries, Languages & Nationalities -->
        <template v-else-if="section === 'vocab' && topic === 'countries-languages'">
          <div class="card">
            <div class="card-title">Nationalitäten / Nationalities</div>
            <p class="card-sub">Nationality adjectives change depending on gender — most add -in for feminine.</p>
            <DataTable :rows="NATIONALITIES" :headers="['Phrase', 'Meaning']" />
          </div>
          <div class="card">
            <div class="card-title">Länder / Countries</div>
            <p class="card-sub">Country names have no article unless marked (die Schweiz, die Türkei, die USA).</p>
            <DataTable :rows="COUNTRIES" :headers="['Word', 'Meaning']" />
          </div>
          <div class="card">
            <div class="card-title">Sprachen / Languages</div>
            <p class="card-sub">Language names are always capitalised in German. Use <em>sprechen</em> (to speak) to say which languages you know.</p>
            <DataTable :rows="LANGUAGES" :headers="['Word', 'Meaning']" />
          </div>
        </template>

        <!-- Vocab: Professions -->
        <template v-else-if="section === 'vocab' && topic === 'professions'">
          <div class="card">
            <div class="card-title">Berufe / Professions</div>
            <p class="card-sub">In German you say "Ich bin Arzt" (no article!) — not "Ich bin ein Arzt".</p>
            <DataTable :rows="PROFESSIONS" :headers="['Word', 'Meaning']" />
          </div>
        </template>

        <!-- Vocab: W-Question Words -->
        <template v-else-if="section === 'vocab' && topic === 'questions'">
          <div class="card">
            <div class="card-title">W-Fragen / W-Question Words</div>
            <p class="card-sub">These are the building blocks of every question in German.</p>
            <DataTable :rows="W_QUESTION_WORDS" :headers="['Word', 'Meaning', 'Example']" />
          </div>
        </template>

        <!-- Exercises: Age, Numbers & Months -->
        <template v-else-if="section === 'exercises' && topic === 'age-numbers'">
          <MultipleChoice :data="MC_QS_AGE_NUMBERS" />
          <Translation :data="TRANSLATIONS_AGE_NUMBERS" />
        </template>

        <!-- Exercises: Countries, Languages & Nationalities -->
        <template v-else-if="section === 'exercises' && topic === 'countries-languages'">
          <MultipleChoice :data="MC_QS_COUNTRIES_LANGUAGES" />
          <Translation :data="TRANSLATIONS_COUNTRIES_LANGUAGES" />
        </template>

        <!-- Exercises: Professions -->
        <template v-else-if="section === 'exercises' && topic === 'professions'">
          <MultipleChoice :data="MC_QS_PROFESSIONS" />
          <Translation :data="TRANSLATIONS_PROFESSIONS" />
        </template>

        <!-- Exercises: W-Question Words -->
        <template v-else-if="section === 'exercises' && topic === 'questions'">
          <MultipleChoice :data="MC_QS_QUESTIONS_VOCAB" />
          <Translation :data="TRANSLATIONS_QUESTIONS_VOCAB" />
        </template>

        <!-- Exercises: Mixed -->
        <template v-else-if="section === 'exercises' && topic === 'mixed'">
          <FillGaps
            :data="FILL_GAPS_CH2"
            instruction="Fill each blank with the correct W-question word or verb form."
          />
          <MultipleChoice :data="MC_QS_CH2" />
          <Translation :data="TRANSLATIONS_CH2" />
        </template>

      </template>

      <!-- ── Other chapters ── -->
      <template v-else>
        <div class="card coming-soon-card">
          <div class="coming-soon-icon"><Hammer :size="36" /></div>
          <h2>Content Coming Soon</h2>
          <p>The content for this chapter is being prepared.</p>
        </div>
      </template>

    </template>

  </template>

  <!-- Chapter not found -->
  <template v-else>
    <div class="page-header">
      <h1>Chapter not found</h1>
      <p class="sub">This chapter doesn't exist.</p>
    </div>
  </template>
</template>
