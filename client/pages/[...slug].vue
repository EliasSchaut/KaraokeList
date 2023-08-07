<template>
  <div class="px-8 lg:px-8">
    <div class="-mx-4 mt-8 sm:-mx-0">
      <table class="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th
              scope="col"
              class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
            >
              Info
            </th>
            <th
              scope="col"
              class="table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Title
            </th>
            <th
              scope="col"
              class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
            >
              Artist
            </th>
            <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
          <tr v-for="track in tracks" :key="track.title">
            <td
              class="max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0"
            >
              Info
            </td>
            <td
              class="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0"
            >
              {{ track.title }}
              <dl class="font-normal sm:hidden">
                <dt class="sr-only">Artist</dt>
                <dd class="mt-1 truncate text-gray-700">{{ track.artist }}</dd>
              </dl>
            </td>
            <td class="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
              {{ track.artist }}
            </td>
            <td class="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
              <a href="#" class="text-indigo-600 hover:text-indigo-900">
                Report
                <span class="sr-only">Edit</span>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Index',
  data() {
    return {
      tracks: [
        {
          title: 'In the end',
          artist: 'Linking Park',
        },
        {
          title: 'Burn It Down',
          artist: 'Linking Park',
        },
        {
          title: 'Castle Of Glass',
          artist: 'Linking Park',
        },
      ],
    };
  },
});
</script>
