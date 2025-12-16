<template>
  <Body class="dark:bg-secondary-800 font-nunito bg-white" />
  <div class="flex h-screen flex-col justify-between">
    <LayoutNav />
    <main class="dark:bg-secondary-900 mb-auto dark:text-white">
      <Alert />
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>
