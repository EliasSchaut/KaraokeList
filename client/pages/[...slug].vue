<template>
  <div class="px-8">
    <div class="-mx-4 mt-8 sm:px-6 lg:px-8">
      <table v-if="tracks.length" class="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th
              scope="col"
              class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
            >
              Info
            </th>
            <th
              scope="col"
              class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
            >
              Artist
            </th>
            <th
              scope="col"
              class="table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Title
            </th>
            <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-3">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr
            v-for="track in tracks"
            :key="track.title"
            class="even:bg-gray-50"
          >
            <td
              class="max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-3"
            >
              <ButtonInfo @click="show_media_info(track.id)" />
            </td>
            <td class="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
              {{ track.track_artists_names }}
            </td>
            <td
              class="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none"
            >
              {{ track.title }}
              <dl class="font-normal sm:hidden">
                <dt class="sr-only">Artist</dt>
                <dd class="mt-1 truncate text-gray-700">
                  {{ track.track_artists_names }}
                </dd>
              </dl>
            </td>
            <td class="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
              <a href="#" class="text-indigo-600 hover:text-indigo-900">
                Report
                <span class="sr-only">Edit</span>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <Spinner v-else class="mx-auto" />
    </div>
  </div>

  <Modal ref="modal_media_info" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Modal from '~/components/modal.vue';
import Spinner from '~/components/spinner.vue';

type track_type = Array<{
  id: number;
  title: string;
  track_artists_names: string;
}>;

export default defineComponent({
  name: 'Index',
  components: { Spinner, Modal },
  methods: {
    show_media_info(track_id: number) {
      this.$refs.modal_media_info.show();
    },
  },
  setup() {
    const tracks = ref<track_type>([]);
    const query = gql`
      query get_tracks {
        tracks {
          id
          title
          track_artists_names
        }
      }
    `;

    const { result } = useQuery<Array<track_type>>(query);
    tracks.value = result.value?.tracks || [];
    return { tracks };
  },
});
</script>
