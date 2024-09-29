<template>
  <div class="flex flex-col gap-x-4 gap-y-2 sm:flex-row">
    <FormInput
      id="track_title"
      class="w-full"
      type="text"
      @input="input_track"
      :icon="MusicalNoteIcon"
      placeholder="Search by track title..."
    />
    <FormInput
      id="artist_name"
      class="w-full"
      type="text"
      @input="input_artist"
      :icon="UserIcon"
      placeholder="Search by artist name..."
    />
  </div>
</template>

<script lang="ts">
import { MusicalNoteIcon, UserIcon } from '@heroicons/vue/24/outline';

export default defineComponent({
  setup() {
    return {
      artist_name: ref<string>(''),
      track_title: ref<string>(''),
    };
  },
  emits: ['search_query'],
  methods: {
    MusicalNoteIcon,
    UserIcon,
    emit_search_query() {
      this.$emit('search_query', {
        artist_name: this.artist_name.length >= 3 ? this.artist_name : '',
        track_title: this.track_title.length >= 3 ? this.track_title : '',
      });
    },
    input_track(event: InputEvent) {
      this.track_title = event.target?.value;
      this.emit_search_query();
    },
    input_artist(event: InputEvent) {
      this.artist_name = event.target?.value;
      this.emit_search_query();
    },
  },
});
</script>
