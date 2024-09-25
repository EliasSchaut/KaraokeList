<template>
  <Body class="bg-white dark:bg-secondary-800" />
  <div class="flex h-screen flex-col justify-between">
    <LayoutNav />
    <main class="mb-auto dark:bg-secondary-900 dark:text-white">
      <Alert />
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>
