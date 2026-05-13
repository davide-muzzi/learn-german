import {
  GREETINGS, YOUR_NAME, WHERE_FROM, EXPRESSIONS, NUMBERS, SEIN, HABEN,
} from './a1/chapter1.js'
import {
  AGE_PHRASES, NATIONALITIES, COUNTRIES, LANGUAGES, PROFESSIONS,
  W_QUESTION_WORDS, FORMING_QUESTIONS,
} from './a1/chapter2.js'

export const LEVELS = [
  { code: 'A1', name: 'Beginner',           desc: 'Greetings, numbers, introductions — the very first steps.',          active: true,  path: '/a1' },
  { code: 'A2', name: 'Elementary',         desc: 'Everyday life — shopping, family, simple conversations.',             active: false, path: '/a2' },
  { code: 'B1', name: 'Intermediate',       desc: 'Independent communication — travel, work, expressing opinions.',      active: false, path: '/b1' },
  { code: 'B2', name: 'Upper Intermediate', desc: 'Complex texts and spontaneous interaction on a range of topics.',     active: false, path: '/b2' },
  { code: 'C1', name: 'Advanced',           desc: 'Fluent and flexible — academic and professional communication.',      active: false, path: '/c1' },
  { code: 'C2', name: 'Mastery',            desc: 'Near-native precision — any topic, any register, with ease.',         active: false, path: '/c2' },
]

export const CHAPTERS = [
  { n: 1, title: 'Basics', active: true, topics: ['Greetings', 'Names & origin', 'Numbers 0-20', 'sein & haben', 'Pronouns', 'Basic sentence structure'] },
  { n: 2, title: 'Personal Info & Questions', active: true, topics: ['Age', 'Nationalities', 'Countries & languages', 'Professions', 'W-questions', 'Forming questions'] },
  { n: 3, title: 'Daily Life', active: false, topics: ['Hobbies', 'Daily routine', 'Time', 'Days of the week', 'Months', 'Modal verbs'] },
  { n: 4, title: 'Family & Relationships', active: false, topics: ['Family members', 'Describing people', 'Possessives', 'Plural nouns', 'Negations'] },
  { n: 5, title: 'Food & Ordering', active: false, topics: ['Food & drinks', 'Restaurant phrases', 'Shopping', 'haben im Konjunktiv'] },
  { n: 6, title: 'Places & Directions', active: false, topics: ['City places', 'Transport', 'Asking directions', 'Prepositions', 'Accusative'] },
  { n: 7, title: 'Future Plans', active: false, topics: ['Plans & invitations', 'Weekend activities', 'Modal verbs (review)', 'Futur 1'] },
  { n: 8, title: 'Exam Prep', active: false, topics: ['Review Ch. 1-7', 'Goethe A1 exam format'] },
]

export const CHAPTER_SECTIONS = {
  1: [
    { key: 'theory',    label: 'Theory',     desc: 'Alphabet, special characters & sein / haben', topics: [
      { key: 'alphabet',   label: 'Alphabet & Special Characters', desc: 'Letters, umlauts, and sound combinations' },
      { key: 'sein-haben', label: 'sein & haben',                  desc: 'The two most essential German verbs' },
    ]},
    { key: 'vocab',     label: 'Vocabulary', desc: 'Greetings, names, expressions & numbers', topics: [
      { key: 'greetings',   label: 'Greetings & Introduction', desc: 'Greetings, names, and where you\'re from' },
      { key: 'expressions', label: 'Common Expressions',        desc: 'Everyday polite phrases' },
      { key: 'numbers',     label: 'Numbers 0–20',              desc: 'The foundation for counting' },
    ]},
    { key: 'exercises', label: 'Exercises',  desc: 'Fill the gaps, multiple choice, translation', topics: [
      { key: 'practice', label: 'Practice', desc: 'Fill the gaps, multiple choice, and translation' },
    ]},
  ],
  2: [
    { key: 'theory',    label: 'Theory',     desc: 'Dates, ordinals & question formation', topics: [
      { key: 'dates',              label: 'Dates & Ordinals',     desc: 'How to say and write dates in German' },
      { key: 'forming-questions',  label: 'Forming Questions',    desc: 'W-questions and yes/no questions in context' },
      { key: 'question-formation', label: 'Question Formation',   desc: 'Structure of W-questions and yes/no questions' },
    ]},
    { key: 'vocab',     label: 'Vocabulary', desc: 'Age, nationalities, countries & languages, professions, questions', topics: [
      { key: 'age-numbers',         label: 'Age, Numbers & Months',              desc: 'Age phrases, numbers 21–1,000,000, and months' },
      { key: 'countries-languages', label: 'Countries, Languages & Nationalities', desc: 'Where people are from and what they speak' },
      { key: 'professions',         label: 'Professions',                         desc: 'Jobs and how to talk about what you do' },
      { key: 'questions',           label: 'W-Question Words',                    desc: 'The building blocks of every German question' },
    ]},
    { key: 'exercises', label: 'Exercises',  desc: 'Fill the gaps, multiple choice, translation', topics: [
      { key: 'practice', label: 'Practice', desc: 'Fill the gaps, multiple choice, and translation' },
    ]},
  ],
}

export const FLASHCARD_SETS = [
  { id: 'greetings',   title: 'Begrüssungen / Greetings',                data: GREETINGS,   type: 'vocab',   level: 'A1', chapter: 1 },
  { id: 'your-name',   title: 'Deinen Namen sagen / Saying Your Name',    data: YOUR_NAME,   type: 'vocab',   level: 'A1', chapter: 1 },
  { id: 'where-from',  title: "Woher kommst du? / Where You're From",     data: WHERE_FROM,  type: 'vocab',   level: 'A1', chapter: 1 },
  { id: 'expressions', title: 'Häufige Ausdrücke / Common Expressions',   data: EXPRESSIONS, type: 'vocab',   level: 'A1', chapter: 1 },
  { id: 'numbers',     title: 'Zahlen 0-20 / Numbers 0-20',              data: NUMBERS,     type: 'numbers', level: 'A1', chapter: 1 },
  { id: 'sein',                title: 'sein — to be',                                       data: SEIN,                type: 'conjug', level: 'A1', chapter: 1 },
  { id: 'haben',               title: 'haben — to have',                                     data: HABEN,               type: 'conjug', level: 'A1', chapter: 1 },
  { id: 'age',                 title: 'Alter / Age',                                          data: AGE_PHRASES,         type: 'vocab',  level: 'A1', chapter: 2 },
  { id: 'nationalities',       title: 'Nationalitäten / Nationalities',                       data: NATIONALITIES,       type: 'vocab',  level: 'A1', chapter: 2 },
  { id: 'countries',           title: 'Länder / Countries',                                   data: COUNTRIES,           type: 'vocab',  level: 'A1', chapter: 2 },
  { id: 'languages',           title: 'Sprachen / Languages',                                 data: LANGUAGES,           type: 'vocab',  level: 'A1', chapter: 2 },
  { id: 'professions',         title: 'Berufe / Professions',                                 data: PROFESSIONS,         type: 'vocab',  level: 'A1', chapter: 2 },
  { id: 'w-questions',         title: 'W-Fragen / W-Question Words',                          data: W_QUESTION_WORDS,    type: 'vocab',  level: 'A1', chapter: 2 },
  { id: 'forming-questions',   title: 'Fragen bilden / Forming Questions',                    data: FORMING_QUESTIONS,   type: 'vocab',  level: 'A1', chapter: 2 },
]
