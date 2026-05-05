<script setup>
import { NUMBERS } from '../data/index.js'

const col1 = NUMBERS.slice(0, 11)
const col2 = NUMBERS.slice(11)
</script>

<template>
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
            <tr v-for="([n, de]) in col1" :key="n">
              <td style="color:var(--muted);font-size:13px;">{{ n }}</td>
              <td class="de">{{ de }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style="border-left:1px solid var(--border);">
        <table>
          <thead><tr><th>#</th><th>Deutsch</th></tr></thead>
          <tbody>
            <tr v-for="([n, de]) in col2" :key="n">
              <td style="color:var(--muted);font-size:13px;">{{ n }}</td>
              <td class="de">{{ de }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
