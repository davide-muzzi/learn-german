<script setup>
import { ALPHABET, UMLAUTS, DIPHTHONGS } from '../data/index.js'
</script>

<template>
  <div class="page-header">
    <h1>Alphabet &amp; Special Characters</h1>
    <p class="sub">The German alphabet shares 26 letters with English, plus 3 umlauts and the ß (Eszett).</p>
  </div>
  <div class="card">
    <div class="card-title">Standard Letters</div>
    <div class="alpha-grid">
      <div v-for="([l, p]) in ALPHABET" :key="l" class="alpha-card">
        <div class="alpha-letter">{{ l }}</div>
        <div class="alpha-pron">{{ p }}</div>
      </div>
    </div>

    <hr class="section-divider">

    <div class="card-title">
      Umlauts <span class="tag">Special to German</span>
    </div>
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
        <tr v-for="([c, p, n]) in DIPHTHONGS" :key="c">
          <td class="de" style="font-size:16px;">{{ c }}</td>
          <td style="font-weight:600;color:#1d4ed8;">{{ p }}</td>
          <td class="en-col">{{ n }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
