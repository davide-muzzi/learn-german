export const GREETINGS = [
  ['Hallo', 'Hello', ''],
  ['Guten Tag', 'Good day', ''],
  ['Wie geht es dir?', 'How are you doing?', 'std.'],
  ["Wie geht's?", 'How are you doing?', 'inf.'],
  ['Wie geht es Ihnen?', 'How are you doing?', 'form.'],
  ['Mir geht es gut.', "I'm doing well.", ''],
  ['Mir geht es nicht so gut.', "I'm not doing very well.", ''],
  ['Und dir?', 'And you?', ''],
  ['Und Ihnen?', 'And you?', 'form.'],
  ['Tschüss!', 'Bye!', ''],
  ['Auf Wiedersehen!', 'Goodbye!', ''],
  ['Bis bald!', 'See you soon!', ''],
  ['Bis später!', 'See you later!', ''],
]

export const YOUR_NAME = [
  ['Ich heisse…', 'My name is…', ''],
  ['Mein Name ist…', 'My name is…', ''],
  ['Und du?', 'And you?', ''],
  ['Und Sie?', 'And you?', 'form.'],
  ['Wie heisst du?', 'What is your name?', ''],
  ['Wie heissen Sie?', 'What is your name?', 'form.'],
  ['Freut mich!', 'Nice to meet you!', ''],
  ['Es freut mich, Sie kennenzulernen.', 'Nice to meet you.', 'form.'],
]

export const WHERE_FROM = [
  ['Ich komme aus…', 'I come from…', ''],
  ['Ich bin aus…', 'I am from…', ''],
  ['Woher kommst du?', 'Where are you from?', ''],
  ['Woher kommen Sie?', 'Where are you from?', 'form.'],
  ['Ich wohne in…', 'I live in…', ''],
  ['Wo wohnst du?', 'Where do you live?', ''],
  ['Wo wohnen Sie?', 'Where do you live?', 'form.'],
]

export const EXPRESSIONS = [
  ['Ja', 'Yes', ''],
  ['Nein', 'No', ''],
  ['Vielleicht', 'Maybe', ''],
  ['Bitte', "Please / You're welcome", ''],
  ['Danke', 'Thank you', ''],
  ['Vielen Dank!', 'Thank you very much!', ''],
  ['Danke, gleichfalls.', 'Thanks, you too.', ''],
  ['Entschuldigung', 'Excuse me / Sorry', ''],
  ['Es tut mir leid', "I'm sorry", ''],
  ['Kein Problem', 'No problem', ''],
  ['Alles gut!', "All good / It's fine!", ''],
]

export const NUMBERS = [
  [0, 'null'], [1, 'eins'], [2, 'zwei'], [3, 'drei'], [4, 'vier'],
  [5, 'fünf'], [6, 'sechs'], [7, 'sieben'], [8, 'acht'], [9, 'neun'],
  [10, 'zehn'], [11, 'elf'], [12, 'zwölf'], [13, 'dreizehn'], [14, 'vierzehn'],
  [15, 'fünfzehn'], [16, 'sechzehn'], [17, 'siebzehn'], [18, 'achtzehn'],
  [19, 'neunzehn'], [20, 'zwanzig'],
]

export const ALPHABET = [
  ['A', '[a]'], ['B', '[be]'], ['C', '[tze]'], ['D', '[de]'], ['E', '[e]'],
  ['F', '[ef]'], ['G', '[ge]'], ['H', '[ha]'], ['I', '[i]'], ['J', '[jott]'],
  ['K', '[ka]'], ['L', '[el]'], ['M', '[em]'], ['N', '[en]'], ['O', '[o]'],
  ['P', '[pe]'], ['Q', '[ku]'], ['R', '[er]'], ['S', '[es]'], ['T', '[te]'],
  ['U', '[u]'], ['V', '[fau]'], ['W', '[we]'], ['X', '[ix]'], ['Y', '[ypsilon]'], ['Z', '[tzett]'],
]

export const UMLAUTS = [['Ä', '[ä]'], ['Ö', '[ö]'], ['Ü', '[ü]']]

export const DIPHTHONGS = [
  ['eu', '[oi]', ''],
  ['sch', '[sh]', 'English pronunciation'],
  ['st', '[st] / [sht]', 'e.g. "du hast" → [st], "der Stein" → [sht]'],
  ['ie', '[ii]', ''],
  ['ei', '[ai]', ''],
  ['ch', '[ch]', 'Hard to describe — you gotta hear it!'],
]

export const SEIN = [
  ['ich', 'bin', 'I am'],
  ['du', 'bist', 'you are (sg.)'],
  ['er / sie / es', 'ist', 'he / she / it is'],
  ['wir', 'sind', 'we are'],
  ['ihr', 'seid', 'you are (pl.)'],
  ['sie', 'sind', 'they are'],
  ['Sie (form.)', 'sind', 'you are (form.)'],
]

export const HABEN = [
  ['ich', 'habe', 'I have'],
  ['du', 'hast', 'you have (sg.)'],
  ['er / sie / es', 'hat', 'he / she / it has'],
  ['wir', 'haben', 'we have'],
  ['ihr', 'habt', 'you have (pl.)'],
  ['sie', 'haben', 'they have'],
  ['Sie (form.)', 'haben', 'you have (form.)'],
]

export const CHAPTERS = [
  { n: 1, title: 'Basics', active: true, topics: ['Greetings', 'Names & origin', 'Numbers 0-20', 'sein & haben', 'Pronouns', 'Basic sentence structure'] },
  { n: 2, title: 'Personal Info & Questions', active: false, topics: ['Age', 'Nationalities', 'Countries & languages', 'Professions', 'W-questions', 'Forming questions'] },
  { n: 3, title: 'Daily Life', active: false, topics: ['Hobbies', 'Daily routine', 'Time', 'Days of the week', 'Months', 'Modal verbs'] },
  { n: 4, title: 'Family & Relationships', active: false, topics: ['Family members', 'Describing people', 'Possessives', 'Plural nouns', 'Negations'] },
  { n: 5, title: 'Food & Ordering', active: false, topics: ['Food & drinks', 'Restaurant phrases', 'Shopping', 'haben im Konjunktiv'] },
  { n: 6, title: 'Places & Directions', active: false, topics: ['City places', 'Transport', 'Asking directions', 'Prepositions', 'Accusative'] },
  { n: 7, title: 'Future Plans', active: false, topics: ['Plans & invitations', 'Weekend activities', 'Modal verbs (review)', 'Futur 1'] },
  { n: 8, title: 'Exam Prep', active: false, topics: ['Review Ch. 1-7', 'Goethe A1 exam format'] },
]

export const CHAPTER_SECTIONS = {
  1: [
    { key: 'theory',    label: 'Theory',     desc: 'Alphabet & special characters' },
    { key: 'vocab',     label: 'Vocabulary', desc: 'Greetings, names, expressions & numbers' },
    { key: 'grammar',   label: 'Grammar',    desc: 'sein & haben conjugations' },
    { key: 'exercises', label: 'Exercises',  desc: 'Fill the gaps, multiple choice, translation' },
  ],
}

export const FLASHCARD_SETS = [
  { id: 'greetings',   title: 'Begrüssungen / Greetings',                data: GREETINGS,   type: 'vocab'  },
  { id: 'your-name',   title: 'Deinen Namen sagen / Saying Your Name',    data: YOUR_NAME,   type: 'vocab'  },
  { id: 'where-from',  title: "Woher kommst du? / Where You're From",     data: WHERE_FROM,  type: 'vocab'  },
  { id: 'expressions', title: 'Häufige Ausdrücke / Common Expressions',   data: EXPRESSIONS, type: 'vocab'  },
  { id: 'numbers',     title: 'Zahlen 0–20 / Numbers 0–20',              data: NUMBERS,     type: 'numbers'},
  { id: 'sein',        title: 'sein — to be',                             data: SEIN,        type: 'conjug' },
  { id: 'haben',       title: 'haben — to have',                          data: HABEN,       type: 'conjug' },
]

export const FILL_GAPS = [
  { parts: ['Hallo! Ich ', ['bin'], ' Dave.'] },
  { parts: ['Ich ', ['bin'], ' neunzehn Jahre alt.'] },
  { parts: ['Ich ', ['habe'], ' eine Schwester, sie ', ['ist'], ' achtzehn Jahre alt.'] },
  { parts: ['Wir ', ['haben'], ' einen Hund, er ', ['ist'], ' vier Jahre alt.'] },
  { parts: ['Ich wohne in Luzern und ich ', ['habe'], ' eine Freundin.'] },
  { parts: ['Ihr ', ['seid'], ' aus Deutschland.'] },
  { parts: ['Wir ', ['haben'], ' heute (today) Zeit (time) und wir ', ['sind'], ' glücklich (happy).'] },
]

export const MC_QS = [
  { text: 'Ich ___ 19 Jahre alt.', opts: ['bin', 'habe'], ans: ['bin'] },
  { text: 'Wir ___ aus Deutschland.', opts: ['sind', 'haben'], ans: ['sind'] },
  { text: 'Ich ___ Zeit.', opts: ['bin', 'habe'], ans: ['habe'] },
  { text: 'Du ___ mein Freund.', opts: ['bist', 'hast'], ans: ['bist'] },
  { text: 'Sie ___ eine Katze.', opts: ['ist', 'hat'], ans: ['ist', 'hat'], note: 'Both are correct — different meaning! (She is a cat / She has a cat)' },
  { text: 'Ich ___ aus Finnland.', opts: ['bin', 'bist'], ans: ['bin'] },
  { text: 'Du ___ Zeit.', opts: ['habe', 'hast'], ans: ['hast'] },
  { text: 'Wir ___ Freunde.', opts: ['sind', 'seid'], ans: ['sind'] },
  { text: 'Sie ___ eine Katze.', opts: ['haben', 'hat'], ans: ['hat'] },
  { text: 'Ihr ___ aus Luzern.', opts: ['seid', 'sind'], ans: ['seid'] },
]

export const TRANSLATIONS = [
  { en: 'Hello! My name is Max.', de: 'Hallo! Ich heisse Max. / Mein Name ist Max.' },
  { en: 'Where are you from? — I come from Finland.', de: 'Woher kommst du? — Ich komme aus Finnland.' },
  { en: "How are you? — I'm doing well, thanks.", de: "Wie geht es dir? / Wie geht's? — Mir geht es gut, danke." },
  { en: 'I live in Lucerne. Nice to meet you.', de: 'Ich wohne in Luzern. Freut mich. / Freut mich, dich kennenzulernen.' },
  { en: 'We are from Germany.', de: 'Wir sind aus Deutschland.' },
]
