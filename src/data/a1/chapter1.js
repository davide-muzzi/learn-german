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

export const MC_QS_GREETINGS = [
  { text: 'Guten ___! — used during the daytime.', opts: ['Tag', 'Abend'], ans: ['Tag'] },
  { text: 'Wie ___ du? — What is your name?', opts: ['heisst', 'bist'], ans: ['heisst'] },
  { text: '"Freut mich!" means:', opts: ['Nice to meet you!', 'How are you?'], ans: ['Nice to meet you!'] },
  { text: '___ geht es dir? — How are you doing?', opts: ['Wie', 'Was'], ans: ['Wie'] },
  { text: 'Ich ___ aus Italien. (origin)', opts: ['komme', 'bin'], ans: ['komme'] },
  { text: '"Bis bald!" means:', opts: ['See you soon!', 'Good day!'], ans: ['See you soon!'] },
]

export const TRANSLATIONS_GREETINGS = [
  { en: 'Hello! My name is Nina. Nice to meet you!', de: 'Hallo! Ich heisse Nina. Freut mich!' },
  { en: 'Good day! How are you? — I\'m doing well, thank you.', de: 'Guten Tag! Wie geht es Ihnen? — Mir geht es gut, danke.' },
  { en: 'Where are you from? — I come from Germany. And you?', de: 'Woher kommst du? — Ich komme aus Deutschland. Und du?' },
  { en: 'I live in Bern. See you later!', de: 'Ich wohne in Bern. Bis später!' },
]

export const MC_QS_EXPRESSIONS = [
  { text: 'To say "You\'re welcome" after being thanked:', opts: ['Bitte', 'Danke'], ans: ['Bitte'] },
  { text: '"Es tut mir leid" means:', opts: ['I\'m sorry', 'No problem'], ans: ['I\'m sorry'] },
  { text: 'You accidentally bump into someone. You say:', opts: ['Entschuldigung!', 'Vielleicht!'], ans: ['Entschuldigung!'] },
  { text: '"Kein Problem" means:', opts: ['No problem', 'Maybe'], ans: ['No problem'] },
  { text: 'How do you say "Thank you very much"?', opts: ['Vielen Dank!', 'Danke, gleichfalls.'], ans: ['Vielen Dank!'] },
]

export const TRANSLATIONS_EXPRESSIONS = [
  { en: 'Excuse me! — No problem, all good!', de: 'Entschuldigung! — Kein Problem, alles gut!' },
  { en: 'Thank you very much! — You\'re welcome.', de: 'Vielen Dank! — Bitte.' },
  { en: 'I\'m sorry. — It\'s fine!', de: 'Es tut mir leid. — Alles gut!' },
]

export const MC_QS_NUMBERS = [
  { text: '"Sieben" is the German word for:', opts: ['7', '17'], ans: ['7'] },
  { text: 'How do you say 12 in German?', opts: ['zwölf', 'zwanzig'], ans: ['zwölf'] },
  { text: '"Fünfzehn" means:', opts: ['15', '50'], ans: ['15'] },
  { text: 'How do you say 0?', opts: ['null', 'neun'], ans: ['null'] },
  { text: '"Neunzehn" is:', opts: ['19', '9'], ans: ['19'] },
  { text: 'How do you say 20?', opts: ['zwanzig', 'dreizehn'], ans: ['zwanzig'] },
]

export const TRANSLATIONS_NUMBERS = [
  { en: 'I am seventeen years old.', de: 'Ich bin siebzehn Jahre alt.' },
  { en: 'She has three brothers and two sisters.', de: 'Sie hat drei Brüder und zwei Schwestern.' },
  { en: 'We have eleven students in our class.', de: 'Wir haben elf Schüler in unserer Klasse.' },
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
