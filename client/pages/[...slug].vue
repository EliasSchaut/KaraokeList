<template>
  <div class="px-8">
    <div class="-mx-4 mt-8 sm:px-6 lg:px-8">
      <TableStriped v-if="tracks.length">
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
            v-for="track in tracks"
            :key="track.title"
            class="even:bg-gray-50"
          >
            <TableCell first>
              <ButtonInfo @click="show_media_info(track.id)" />
            </TableCell>
            <TableCell hidden_on_sm>{{ track.track_artists_names }}</TableCell>
            <TableCell main bold>
              {{ track.title }}
              <dl class="font-normal sm:hidden">
                <dt class="sr-only">Artist</dt>
                <dd class="mt-1 truncate text-gray-700">
                  {{ track.track_artists_names }}
                </dd>
              </dl>
            </TableCell>
            <TableCell last bold>
              <a href="#" class="text-indigo-600 hover:text-indigo-900">
                Report
                <span class="sr-only">Edit</span>
              </a>
            </TableCell>
          </tr>
        </tbody>
      </TableStriped>
      <Spinner v-else class="mx-auto" />
    </div>
  </div>

  <Modal ref="modal_media_info" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Modal from '~/components/modal.vue';
import Spinner from '~/components/spinner.vue';

type TrackType = Array<{
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
    const tracks = ref<TrackType>([]);
    const query = gql`
      query get_tracks {
        tracks {
          id
          title
          track_artists_names
        }
      }
    `;

    const { result } = useQuery<Array<TrackType>>(query);
    tracks.value = result.value?.tracks || [];
    return { tracks };
  },
});
</script>
