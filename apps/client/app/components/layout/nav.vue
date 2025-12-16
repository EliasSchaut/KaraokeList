<script setup lang="ts"></script>
<template>
  <header class="font-fredoka z-10 select-none">
    <div>
      <nav class="flex w-full items-center justify-between gap-x-12 p-6">
        <div class="flex gap-x-12">
          <a
            class="group flex items-center justify-center gap-x-4 text-3xl font-bold"
            href="/"
          >
            <span class="text-prime-500 font-bold"> KaraokeList </span>
          </a>
        </div>
        <div class="flex items-center gap-x-6">
          <SettingTheme />
          <SettingLang />
        </div>
      </nav>
    </div>
  </header>
</template>
