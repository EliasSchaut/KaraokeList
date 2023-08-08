<template>
  <Body class="bg-white dark:bg-gray-800" />
  <LayoutHeader />
  <div class="bg-white pb-10 dark:bg-gray-900 dark:text-white">
    <Alert />
    <slot />
  </div>
  <LayoutFooter />
</template>
