<script setup>
import { Languages } from '@lucide/vue'
</script>

<template>
  <footer class="app-footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <Languages :size="15" />
        <span>Learn German (CH)</span>
      </div>
      <nav class="footer-nav">
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/privacy">Privacy</RouterLink>
        <RouterLink to="/contact">Contact</RouterLink>
      </nav>
    </div>
    <p class="footer-copy">A free, open-source app for learning German. No account required.</p>
  </footer>
</template>
