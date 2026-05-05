<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="sidebar">
    <div class="sidebar-logo">
      <h1>🇩🇪 Deutsch A1</h1>
      <p>Interactive Lesson Book</p>
    </div>
    <div class="sidebar-body">

      <div class="nav-section">
        <RouterLink to="/roadmap" custom v-slot="{ navigate, isExactActive }">
          <div class="nav-item top" :class="{ active: isExactActive }" @click="navigate" role="link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
            A1 Roadmap
          </div>
        </RouterLink>
      </div>

      <div class="nav-section">
        <div class="nav-section-label">Chapter 1: Basics</div>

        <div class="nav-group-label">Theory</div>
        <RouterLink to="/alphabet" custom v-slot="{ navigate, isExactActive }">
          <div class="nav-item sub" :class="{ active: isExactActive }" @click="navigate" role="link">
            <span class="nav-dot"></span> Alphabet
          </div>
        </RouterLink>

        <div class="nav-group-label">Vocabulary</div>
        <RouterLink to="/v-greetings" custom v-slot="{ navigate, isExactActive }">
          <div class="nav-item sub" :class="{ active: isExactActive }" @click="navigate" role="link">
            <span class="nav-dot"></span> Greetings
          </div>
        </RouterLink>
        <RouterLink to="/v-name" custom v-slot="{ navigate, isExactActive }">
          <div class="nav-item sub" :class="{ active: isExactActive }" @click="navigate" role="link">
            <span class="nav-dot"></span> Saying Your Name
          </div>
        </RouterLink>
        <RouterLink to="/v-from" custom v-slot="{ navigate, isExactActive }">
          <div class="nav-item sub" :class="{ active: isExactActive }" @click="navigate" role="link">
            <span class="nav-dot"></span> Where You're From
          </div>
        </RouterLink>
        <RouterLink to="/v-expr" custom v-slot="{ navigate, isExactActive }">
          <div class="nav-item sub" :class="{ active: isExactActive }" @click="navigate" role="link">
            <span class="nav-dot"></span> Common Expressions
          </div>
        </RouterLink>
        <RouterLink to="/v-numbers" custom v-slot="{ navigate, isExactActive }">
          <div class="nav-item sub" :class="{ active: isExactActive }" @click="navigate" role="link">
            <span class="nav-dot"></span> Numbers 0–20
          </div>
        </RouterLink>

        <div class="nav-group-label">Grammar</div>
        <RouterLink to="/g-sein" custom v-slot="{ navigate, isExactActive }">
          <div class="nav-item sub" :class="{ active: isExactActive }" @click="navigate" role="link">
            <span class="nav-dot"></span> sein — to be
          </div>
        </RouterLink>
        <RouterLink to="/g-haben" custom v-slot="{ navigate, isExactActive }">
          <div class="nav-item sub" :class="{ active: isExactActive }" @click="navigate" role="link">
            <span class="nav-dot"></span> haben — to have
          </div>
        </RouterLink>

        <div class="nav-group-label">Exercises</div>
        <RouterLink to="/ex-fill" custom v-slot="{ navigate, isExactActive }">
          <div class="nav-item sub" :class="{ active: isExactActive }" @click="navigate" role="link">
            <span class="nav-dot"></span> Fill in the Gaps
          </div>
        </RouterLink>
        <RouterLink to="/ex-mc" custom v-slot="{ navigate, isExactActive }">
          <div class="nav-item sub" :class="{ active: isExactActive }" @click="navigate" role="link">
            <span class="nav-dot"></span> Multiple Choice
          </div>
        </RouterLink>
        <RouterLink to="/ex-translate" custom v-slot="{ navigate, isExactActive }">
          <div class="nav-item sub" :class="{ active: isExactActive }" @click="navigate" role="link">
            <span class="nav-dot"></span> Translation
          </div>
        </RouterLink>
      </div>

    </div>
  </nav>
</template>
