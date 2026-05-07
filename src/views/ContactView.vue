<script setup>
import { Mail, GitBranch } from '@lucide/vue'
</script>

<template>
  <div class="page-header">
    <h1>Contact</h1>
    <p class="sub">Found a bug, have a suggestion, or just want to say hi?</p>
  </div>

  <div class="card contact-card">
    <div class="contact-row">
      <div class="contact-icon-wrap"><Mail :size="20" /></div>
      <div>
        <div class="contact-row-title">Email</div>
        <a class="contact-link" href="mailto:your@email.com">davidemax.muzzi@gmail.com</a>
      </div>
    </div>

    <div class="privacy-divider"></div>

    <div class="contact-row">
      <div class="contact-icon-wrap"><GitBranch :size="20" /></div>
      <div>
        <div class="contact-row-title">GitHub</div>
        <a class="contact-link" href="https://github.com/davide-muzzi/learn-german" target="_blank" rel="noopener">
          github.com/davide-muzzi/learn-german
        </a>
        <p class="contact-sub">Open an issue for bug reports or feature requests.</p>
      </div>
    </div>
  </div>
</template>
