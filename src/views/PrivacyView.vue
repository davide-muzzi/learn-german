<script setup>
import { Cookie, ChartNoAxesColumn, UserX, Server, ShieldCheck } from '@lucide/vue'
</script>

<template>
  <div class="page-header">
    <h1>Privacy</h1>
    <p class="sub">Short version: we collect nothing. At all.</p>
  </div>

  <div class="card privacy-hero">
    <ShieldCheck :size="36" class="privacy-hero-icon" />
    <div>
      <div class="card-title" style="margin-bottom: 6px;">This app does not collect any data</div>
      <p>No personal information, no usage statistics, no identifiers of any kind are ever collected,
      stored, or transmitted — not even anonymously.</p>
    </div>
  </div>

  <div class="card">
    <div class="privacy-row">
      <Cookie :size="20" class="privacy-icon" />
      <div>
        <div class="privacy-row-title">No cookies</div>
        <p>Zero cookies are set in your browser — not session cookies, not preference cookies, not tracking cookies. Nothing.</p>
      </div>
    </div>

    <div class="privacy-divider"></div>

    <div class="privacy-row">
      <ChartNoAxesColumn :size="20" class="privacy-icon" />
      <div>
        <div class="privacy-row-title">No analytics or tracking</div>
        <p>There are no analytics scripts, no tracking pixels, no heatmaps, and no third-party monitoring tools of any kind.</p>
      </div>
    </div>

    <div class="privacy-divider"></div>

    <div class="privacy-row">
      <UserX :size="20" class="privacy-icon" />
      <div>
        <div class="privacy-row-title">No accounts</div>
        <p>No login, registration, or account is required. Your identity is never known to this app.</p>
      </div>
    </div>

    <div class="privacy-divider"></div>

    <div class="privacy-row">
      <Server :size="20" class="privacy-icon" />
      <div>
        <div class="privacy-row-title">No backend — fully client-side</div>
        <p>This app runs entirely in your browser. There is no backend server and no database.
        Your answers and interactions never leave your device, and are gone when you close the tab.</p>
      </div>
    </div>
  </div>
</template>
