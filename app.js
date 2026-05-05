'use strict';

// ═══════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════

const GREETINGS = [
  ["Hallo",                     "Hello",                          ""],
  ["Guten Tag",                 "Good day",                       ""],
  ["Wie geht es dir?",          "How are you doing?",             "std."],
  ["Wie geht's?",               "How are you doing?",             "inf."],
  ["Wie geht es Ihnen?",        "How are you doing?",             "form."],
  ["Mir geht es gut.",          "I'm doing well.",                ""],
  ["Mir geht es nicht so gut.", "I'm not doing very well.",       ""],
  ["Und dir?",                  "And you?",                       ""],
  ["Und Ihnen?",                "And you?",                       "form."],
  ["Tschüss!",                  "Bye!",                           ""],
  ["Auf Wiedersehen!",          "Goodbye!",                       ""],
  ["Bis bald!",                 "See you soon!",                  ""],
  ["Bis später!",               "See you later!",                 ""],
];

const YOUR_NAME = [
  ["Ich heisse…",                           "My name is…",                 ""],
  ["Mein Name ist…",                        "My name is…",                 ""],
  ["Und du?",                               "And you?",                    ""],
  ["Und Sie?",                              "And you?",                    "form."],
  ["Wie heisst du?",                        "What is your name?",          ""],
  ["Wie heissen Sie?",                      "What is your name?",          "form."],
  ["Freut mich!",                           "Nice to meet you!",           ""],
  ["Es freut mich, Sie kennenzulernen.",    "Nice to meet you.",           "form."],
];

const WHERE_FROM = [
  ["Ich komme aus…",    "I come from…",             ""],
  ["Ich bin aus…",      "I am from…",               ""],
  ["Woher kommst du?",  "Where are you from?",      ""],
  ["Woher kommen Sie?", "Where are you from?",      "form."],
  ["Ich wohne in…",     "I live in…",               ""],
  ["Wo wohnst du?",     "Where do you live?",       ""],
  ["Wo wohnen Sie?",    "Where do you live?",       "form."],
];

const EXPRESSIONS = [
  ["Ja",                 "Yes",                        ""],
  ["Nein",               "No",                         ""],
  ["Vielleicht",         "Maybe",                      ""],
  ["Bitte",              "Please / You're welcome",    ""],
  ["Danke",              "Thank you",                  ""],
  ["Vielen Dank!",       "Thank you very much!",       ""],
  ["Danke, gleichfalls.","Thanks, you too.",           ""],
  ["Entschuldigung",     "Excuse me / Sorry",          ""],
  ["Es tut mir leid",    "I'm sorry",                  ""],
  ["Kein Problem",       "No problem",                 ""],
  ["Alles gut!",         "All good / It's fine!",      ""],
];

const NUMBERS = [
  [0,"null"],[1,"eins"],[2,"zwei"],[3,"drei"],[4,"vier"],
  [5,"fünf"],[6,"sechs"],[7,"sieben"],[8,"acht"],[9,"neun"],
  [10,"zehn"],[11,"elf"],[12,"zwölf"],[13,"dreizehn"],[14,"vierzehn"],
  [15,"fünfzehn"],[16,"sechzehn"],[17,"siebzehn"],[18,"achtzehn"],
  [19,"neunzehn"],[20,"zwanzig"],
];

const ALPHABET = [
  ["A","[a]"],["B","[be]"],["C","[tze]"],["D","[de]"],["E","[e]"],
  ["F","[ef]"],["G","[ge]"],["H","[ha]"],["I","[i]"],["J","[jott]"],
  ["K","[ka]"],["L","[el]"],["M","[em]"],["N","[en]"],["O","[o]"],
  ["P","[pe]"],["Q","[ku]"],["R","[er]"],["S","[es]"],["T","[te]"],
  ["U","[u]"],["V","[fau]"],["W","[we]"],["X","[ix]"],["Y","[ypsilon]"],["Z","[tzett]"],
];

const UMLAUTS = [["Ä","[ä]"],["Ö","[ö]"],["Ü","[ü]"]];

const DIPHTHONGS = [
  ["eu",  "[oi]",         ""],
  ["sch", "[sh]",         "English pronunciation"],
  ["st",  "[st] / [sht]", "e.g. \"du hast\" → [st], \"der Stein\" → [sht]"],
  ["ie",  "[ii]",         ""],
  ["ei",  "[ai]",         ""],
  ["ch",  "[ch]",         "Hard to describe — you gotta hear it!"],
];

const SEIN = [
  ["ich",          "bin",  "I am"],
  ["du",           "bist", "you are (sg.)"],
  ["er / sie / es","ist",  "he / she / it is"],
  ["wir",          "sind", "we are"],
  ["ihr",          "seid", "you are (pl.)"],
  ["sie",          "sind", "they are"],
  ["Sie (form.)",  "sind", "you are (form.)"],
];

const HABEN = [
  ["ich",          "habe",  "I have"],
  ["du",           "hast",  "you have (sg.)"],
  ["er / sie / es","hat",   "he / she / it has"],
  ["wir",          "haben", "we have"],
  ["ihr",          "habt",  "you have (pl.)"],
  ["sie",          "haben", "they have"],
  ["Sie (form.)",  "haben", "you have (form.)"],
];

const ROADMAP = [
  { n:1, title:"Basics",                active:true,  topics:["Greetings","Names & origin","Numbers 0-20","sein &amp; haben","Pronouns","Basic sentence structure"] },
  { n:2, title:"Personal Info &amp; Questions", active:false, topics:["Age","Nationalities","Countries &amp; languages","Professions","W-questions","Forming questions"] },
  { n:3, title:"Daily Life",            active:false, topics:["Hobbies","Daily routine","Time","Days of the week","Months","Modal verbs"] },
  { n:4, title:"Family &amp; Relationships", active:false, topics:["Family members","Describing people","Possessives","Plural nouns","Negations"] },
  { n:5, title:"Food &amp; Ordering",   active:false, topics:["Food &amp; drinks","Restaurant phrases","Shopping","haben im Konjunktiv"] },
  { n:6, title:"Places &amp; Directions",active:false,topics:["City places","Transport","Asking directions","Prepositions","Accusative"] },
  { n:7, title:"Future Plans",          active:false, topics:["Plans &amp; invitations","Weekend activities","Modal verbs (review)","Futur 1"] },
  { n:8, title:"Exam Prep",             active:false, topics:["Review Ch. 1-7","Goethe A1 exam format"] },
];

// ── EXERCISE DATA ──

// Parts array: strings are literal text, arrays are [answer] blanks
const FILL_GAPS = [
  { parts:["Hallo! Ich ", ["bin"], " Dave."] },
  { parts:["Ich ", ["bin"], " neunzehn Jahre alt."] },
  { parts:["Ich ", ["habe"], " eine Schwester, sie ", ["ist"], " achtzehn Jahre alt."] },
  { parts:["Wir ", ["haben"], " einen Hund, er ", ["ist"], " vier Jahre alt."] },
  { parts:["Ich wohne in Luzern und ich ", ["habe"], " eine Freundin."] },
  { parts:["Ihr ", ["seid"], " aus Deutschland."] },
  { parts:["Wir ", ["haben"], " heute (today) Zeit (time) und wir ", ["sind"], " glücklich (happy)."] },
];

const MC_QS = [
  { text:"Ich ___ 19 Jahre alt.",   opts:["bin","habe"],   ans:["bin"] },
  { text:"Wir ___ aus Deutschland.",opts:["sind","haben"], ans:["sind"] },
  { text:"Ich ___ Zeit.",           opts:["bin","habe"],   ans:["habe"] },
  { text:"Du ___ mein Freund.",     opts:["bist","hast"],  ans:["bist"] },
  { text:"Sie ___ eine Katze.",     opts:["ist","hat"],    ans:["ist","hat"], note:"Both are correct — different meaning! (She is a cat / She has a cat)" },
  { text:"Ich ___ aus Finnland.",   opts:["bin","bist"],   ans:["bin"] },
  { text:"Du ___ Zeit.",            opts:["habe","hast"],  ans:["hast"] },
  { text:"Wir ___ Freunde.",        opts:["sind","seid"],  ans:["sind"] },
  { text:"Sie ___ eine Katze.",     opts:["haben","hat"],  ans:["hat"] },
  { text:"Ihr ___ aus Luzern.",     opts:["seid","sind"],  ans:["seid"] },
];

const TRANSLATIONS = [
  { en:"Hello! My name is Max.",                          de:"Hallo! Ich heisse Max. / Mein Name ist Max." },
  { en:"Where are you from? — I come from Finland.",        de:"Woher kommst du? — Ich komme aus Finnland." },
  { en:"How are you? — I'm doing well, thanks.",            de:"Wie geht es dir? / Wie geht's? — Mir geht es gut, danke." },
  { en:"I live in Lucerne. Nice to meet you.",              de:"Ich wohne in Luzern. Freut mich. / Freut mich, dich kennenzulernen." },
  { en:"We are from Germany.",                              de:"Wir sind aus Deutschland." },
];

// ═══════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════

function badge(tag) {
  if (!tag) return '';
  const map = { 'form.':'b-form', 'inf.':'b-inf', 'std.':'b-std' };
  return `<span class="badge ${map[tag]||''}">${tag}</span>`;
}

function vocabTable(rows) {
  return `<table>
    <thead><tr><th>Deutsch</th><th>English</th></tr></thead>
    <tbody>
      ${rows.map(([de,en,tag]) =>
        `<tr><td class="de">${de}</td><td>${en}${badge(tag)}</td></tr>`
      ).join('')}
    </tbody>
  </table>`;
}

function conjugTable(rows, verb) {
  return `<table>
    <thead><tr><th>Pronoun</th><th>${verb}</th><th>English</th></tr></thead>
    <tbody>
      ${rows.map(([pron, conj, en]) =>
        `<tr>
          <td class="pron-col">${pron}</td>
          <td class="bold-conj">${conj}</td>
          <td class="en-col">${en}</td>
        </tr>`
      ).join('')}
    </tbody>
  </table>`;
}

// ═══════════════════════════════════════════════════════
// PAGE RENDERERS
// ═══════════════════════════════════════════════════════

function renderRoadmap() {
  return `
    <div class="page-header">
      <h1>A1 Roadmap</h1>
      <p class="sub">8 chapters from absolute beginner to Goethe A1 exam readiness.</p>
    </div>
    <div class="card">
      <div class="roadmap-grid">
        ${ROADMAP.map(ch => `
          <div class="ch-card ${ch.active ? 'ch-active' : ''}">
            <div class="ch-num">Chapter ${ch.n}</div>
            <span class="ch-status ${ch.active ? 'st-active' : 'st-soon'}">${ch.active ? '● In Progress' : 'Coming Soon'}</span>
            <h3>${ch.title}</h3>
            <ul>${ch.topics.map(t => `<li>${t}</li>`).join('')}</ul>
          </div>
        `).join('')}
      </div>
    </div>`;
}

function renderAlphabet() {
  return `
    <div class="page-header">
      <h1>Alphabet &amp; Special Characters</h1>
      <p class="sub">The German alphabet shares 26 letters with English, plus 3 umlauts and the ß (Eszett).</p>
    </div>
    <div class="card">
      <div class="card-title">Standard Letters</div>
      <div class="alpha-grid">
        ${ALPHABET.map(([l,p]) => `
          <div class="alpha-card">
            <div class="alpha-letter">${l}</div>
            <div class="alpha-pron">${p}</div>
          </div>`).join('')}
      </div>
      <hr class="section-divider">
      <div class="card-title">Umlauts <span class="tag">Special to German</span></div>
      <div class="alpha-grid" style="grid-template-columns: repeat(3, minmax(66px,1fr)); max-width: 240px;">
        ${UMLAUTS.map(([l,p]) => `
          <div class="alpha-card umlaut">
            <div class="alpha-letter">${l}</div>
            <div class="alpha-pron">${p}</div>
          </div>`).join('')}
      </div>
      <hr class="section-divider">
      <div class="card-title">Special Sound Combinations</div>
      <table class="special-table">
        <thead><tr><th>Combo</th><th>Sounds like</th><th>Note</th></tr></thead>
        <tbody>
          ${DIPHTHONGS.map(([c,p,n]) => `
            <tr>
              <td class="de" style="font-size:16px;">${c}</td>
              <td style="font-weight:600;color:#1d4ed8;">${p}</td>
              <td class="en-col">${n}</td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
}

function renderVocab(title, subtitle, rows) {
  return `
    <div class="page-header">
      <h1>${title}</h1>
      <p class="sub">${subtitle}</p>
    </div>
    <div class="card">${vocabTable(rows)}</div>`;
}

function renderNumbers() {
  const col1 = NUMBERS.slice(0,11);
  const col2 = NUMBERS.slice(11);
  return `
    <div class="page-header">
      <h1>Zahlen 0–20 / Numbers 0–20</h1>
      <p class="sub">Essential numbers for everyday German.</p>
    </div>
    <div class="card">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:0;">
        <div>
          <table>
            <thead><tr><th>#</th><th>Deutsch</th></tr></thead>
            <tbody>
              ${col1.map(([n,de]) => `<tr><td style="color:var(--muted);font-size:13px;">${n}</td><td class="de">${de}</td></tr>`).join('')}
            </tbody>
          </table>
        </div>
        <div style="border-left:1px solid var(--border);">
          <table>
            <thead><tr><th>#</th><th>Deutsch</th></tr></thead>
            <tbody>
              ${col2.map(([n,de]) => `<tr><td style="color:var(--muted);font-size:13px;">${n}</td><td class="de">${de}</td></tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>`;
}

function renderConjug(verb, translation, rows, note) {
  return `
    <div class="page-header">
      <h1>${verb} <span style="color:var(--muted);font-weight:400;font-size:18px;">/ ${translation}</span></h1>
      <p class="sub">${note}</p>
    </div>
    <div class="card">${conjugTable(rows, verb)}</div>`;
}

// ── EXERCISES ──

function renderFillGaps() {
  let items = FILL_GAPS.map((q, qi) => {
    let bi = 0;
    const sentence = q.parts.map(part => {
      if (Array.isArray(part)) {
        const ans = part[0];
        const id = `fi-${qi}-${bi++}`;
        return `<span class="blank-wrap"><input class="blank-input" id="${id}" type="text" data-ans="${ans}" autocomplete="off" spellcheck="false" placeholder="___"></span>`;
      }
      return part;
    }).join('');
    return `<div class="q-block" id="qb-${qi}">
      <span class="q-label">Satz ${qi+1}</span>
      <div>${sentence}</div>
    </div>`;
  }).join('');

  return `
    <div class="page-header">
      <h1>Fill in the Gaps</h1>
      <p class="sub">Exercise 1 of 3 — sein &amp; haben conjugations</p>
    </div>
    <div class="card">
      <div class="ex-instruction">
        Fill each blank with the correct conjugation of <strong>sein</strong> (to be) or <strong>haben</strong> (to have).<br>
        <span style="font-size:12px;opacity:.8;">Tip: answers are case-insensitive.</span>
      </div>
      ${items}
      <div>
        <button class="check-btn" onclick="checkFill()">✓ Check Answers</button>
        <button class="reset-btn" onclick="resetFill()">↺ Reset</button>
      </div>
      <div id="fill-score"></div>
    </div>`;
}

function renderMC() {
  const items = MC_QS.map((q, qi) => `
    <div class="q-block" id="qb-mc-${qi}">
      <span class="q-label">Frage ${qi+1}</span>
      <div style="font-weight:500;margin-bottom:6px;">${q.text}</div>
      <div class="mc-opts">
        ${q.opts.map(o => `<button class="mc-btn" onclick="pickMC(${qi},'${o}',this)" data-q="${qi}">${o}</button>`).join('')}
      </div>
      ${q.note ? `<div class="mc-note">💡 ${q.note}</div>` : ''}
    </div>`).join('');

  return `
    <div class="page-header">
      <h1>Multiple Choice</h1>
      <p class="sub">Exercise 2 of 3 — Choose the correct form of sein or haben</p>
    </div>
    <div class="card">
      <div class="ex-instruction">
        Click the correct option to fill each gap. You'll get instant feedback.
      </div>
      ${items}
      <div id="mc-score"></div>
    </div>`;
}

function renderTranslate() {
  const items = TRANSLATIONS.map((q, qi) => `
    <div class="tr-block">
      <span class="q-label">Sentence ${qi+1}</span>
      <div class="tr-en">${q.en}</div>
      <button class="reveal-btn" id="rbtn-${qi}" onclick="toggleReveal(${qi})">Reveal Answer</button>
      <div class="tr-answer" id="ra-${qi}">🇩🇪 ${q.de}</div>
    </div>`).join('');

  return `
    <div class="page-header">
      <h1>Translation</h1>
      <p class="sub">Exercise 3 of 3 — Translate from English to German</p>
    </div>
    <div class="card">
      <div class="ex-instruction">
        Translate each sentence into German mentally (or jot it down), then reveal the answer to check.
      </div>
      ${items}
    </div>`;
}

// ═══════════════════════════════════════════════════════
// EXERCISE LOGIC
// ═══════════════════════════════════════════════════════

function checkFill() {
  const inputs = document.querySelectorAll('.blank-input');
  let correct = 0;
  inputs.forEach(inp => {
    const old = inp.parentElement.querySelector('.blank-correction');
    if (old) old.remove();

    const val = inp.value.trim().toLowerCase();
    const ans = inp.dataset.ans.toLowerCase();

    inp.classList.remove('b-correct','b-wrong');
    if (val === ans) {
      inp.classList.add('b-correct');
      correct++;
    } else {
      inp.classList.add('b-wrong');
      const span = document.createElement('span');
      span.className = 'blank-correction';
      span.textContent = '→ ' + inp.dataset.ans;
      inp.parentElement.appendChild(span);
    }
  });

  const total = inputs.length;
  const pct   = Math.round(correct / total * 100);
  const cls   = pct >= 80 ? 'sc-great' : pct >= 50 ? 'sc-ok' : 'sc-poor';
  const emoji = pct === 100 ? '🎉 Perfect!' : pct >= 80 ? '✅ Great job!' : pct >= 50 ? '📝 Keep practicing!' : '❌ Review the material and try again.';
  document.getElementById('fill-score').innerHTML =
    `<div class="score-bar ${cls}">${emoji} &nbsp; ${correct}/${total} correct (${pct}%)</div>`;
}

function resetFill() {
  document.querySelectorAll('.blank-input').forEach(inp => {
    inp.value = '';
    inp.classList.remove('b-correct','b-wrong');
    const corr = inp.parentElement.querySelector('.blank-correction');
    if (corr) corr.remove();
  });
  document.getElementById('fill-score').innerHTML = '';
}

// MC state
let mcDone = {};
let mcCorrect = 0;

function initMC() { mcDone = {}; mcCorrect = 0; }

function pickMC(qi, chosen, btn) {
  if (mcDone[qi] !== undefined) return;
  const q = MC_QS[qi];
  const isCorrect = q.ans.includes(chosen);
  mcDone[qi] = isCorrect;
  if (isCorrect) mcCorrect++;

  btn.classList.add(isCorrect ? 'mc-correct' : 'mc-wrong');
  document.querySelectorAll(`.mc-btn[data-q="${qi}"]`).forEach(b => {
    b.disabled = true;
    if (q.ans.includes(b.textContent)) b.classList.add('mc-correct');
  });

  if (Object.keys(mcDone).length === MC_QS.length) showMCScore();
}

function showMCScore() {
  const total = MC_QS.length;
  const pct   = Math.round(mcCorrect / total * 100);
  const cls   = pct >= 80 ? 'sc-great' : pct >= 50 ? 'sc-ok' : 'sc-poor';
  const emoji = pct === 100 ? '🎉 Perfect!' : pct >= 80 ? '✅ Great job!' : pct >= 50 ? '📝 Keep practicing!' : '❌ Try again after reviewing.';
  document.getElementById('mc-score').innerHTML =
    `<div class="score-bar ${cls}" style="margin-top:8px;">${emoji} &nbsp; ${mcCorrect}/${total} correct (${pct}%)</div>`;
}

function toggleReveal(qi) {
  const el  = document.getElementById(`ra-${qi}`);
  const btn = document.getElementById(`rbtn-${qi}`);
  const show = !el.classList.contains('visible');
  el.classList.toggle('visible', show);
  btn.textContent = show ? 'Hide Answer' : 'Reveal Answer';
}

// ═══════════════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════════════

const PAGES = {
  'roadmap':      renderRoadmap,
  'alphabet':     renderAlphabet,
  'v-greetings':  () => renderVocab('Begrüssungen / Greetings',             'Essential phrases for saying hello and goodbye.',              GREETINGS),
  'v-name':       () => renderVocab('Deinen Namen sagen / Saying Your Name', 'Introduce yourself and ask others their name.',               YOUR_NAME),
  'v-from':       () => renderVocab("Woher kommst du? / Where You're From",  'Talk about your origin and where you live.',                  WHERE_FROM),
  'v-expr':       () => renderVocab('Häufige Ausdrücke / Common Expressions','Everyday polite phrases every German speaker needs.',         EXPRESSIONS),
  'v-numbers':    renderNumbers,
  'g-sein':       () => renderConjug('sein','to be',   SEIN,  'One of the most important verbs in German. Irregular — memorize it!'),
  'g-haben':      () => renderConjug('haben','to have',HABEN, 'The second essential verb. Used for possession and as an auxiliary verb.'),
  'ex-fill':      renderFillGaps,
  'ex-mc':        renderMC,
  'ex-translate': renderTranslate,
};

let current = '';

function go(page) {
  if (!PAGES[page]) return;

  if (page === 'ex-mc') initMC();

  current = page;

  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  const navEl = document.getElementById('n-' + page);
  if (navEl) navEl.classList.add('active');

  document.getElementById('content').innerHTML = PAGES[page]();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Boot
go('roadmap');
