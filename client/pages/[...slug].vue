<template>
  <div class="px-8">
    <div class="-mx-4 pt-8 sm:px-6 lg:px-8">
      <TableStriped v-if="track_data.tracks.length">
        <thead>
          <tr>
            <TableHead first>Info</TableHead>
            <TableHead hidden_on_sm>Artist</TableHead>
            <TableHead>Title</TableHead>
            <TableHead hidden last><span class="sr-only">Edit</span></TableHead>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr
            v-for="track in track_data.tracks"
            :key="track.title"
            class="even:bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <TableCell first>
              <ButtonInfo @click="show_media_info_modal(track.id)" />
            </TableCell>
            <TableCell hidden_on_sm>{{ track.track_artists_names }}</TableCell>
            <TableCell main bold>
              {{ track.title }}
              <dl class="font-normal sm:hidden">
                <dt class="sr-only">Artist</dt>
                <dd class="mt-1 text-gray-700">
                  {{ track.track_artists_names }}
                </dd>
              </dl>
            </TableCell>
            <TableCell last right bold>
              <button
                class="text-indigo-600 hover:text-indigo-900"
                @click="show_report_modal(track.id, track.title)"
              >
                Report
                <span class="sr-only">Edit</span>
              </button>
            </TableCell>
          </tr>
        </tbody>
      </TableStriped>
    </div>
  </div>

  <Modal ref="modal_media_info" />
  <ModalReport ref="modal_report_track" />
</template>

<script setup lang="ts">
import { alertStore } from '~/store/alert';
const alert = alertStore();

type TrackType = [
  {
    id: number;
    title: string;
    track_artists_names: string;
  },
];
const query = gql`
  query get_tracks {
    tracks {
      id
      title
      track_artists_names
    }
  }
`;
const { data: track_data } = await useAsyncQuery<[TrackType]>(query);
if (track_data.value.tracks.length === 0) {
  alert.show('No tracks found!', 'danger');
}
</script>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  methods: {
    show_media_info_modal(track_id: number) {
      this.$refs.modal_media_info.show();
    },
    show_report_modal(track_id: number, track_title: string) {
      this.$refs.modal_report_track.show(track_id, track_title);
    },
  },
});
</script>
