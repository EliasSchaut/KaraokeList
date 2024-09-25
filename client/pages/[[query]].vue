<template>
  <div class="px-8">
    <div class="-mx-4 pt-8 sm:px-6 lg:px-8">
      <Search
        @input="search = $event.target.value"
        :value="route.params.query ?? ''"
      />
      <TableStriped v-if="tracks.length">
        <thead>
          <tr>
            <TableHead first>{{ $t('tracks.table.head.info') }}</TableHead>
            <TableHead hidden_on_sm
              >{{ $t('tracks.table.head.artist') }}
            </TableHead>
            <TableHead>{{ $t('tracks.table.head.title') }}</TableHead>
            <TableHead hidden last
              ><span class="sr-only">{{
                $t('tracks.table.head.report')
              }}</span></TableHead
            >
          </tr>
        </thead>
        <tbody class="bg-white">
          <template v-for="track in tracks" :key="track.title">
            <TableRow
              v-if="
                search === '' ||
                track.title.toLowerCase().includes(search.toLowerCase()) ||
                track.artist.name.toLowerCase().includes(search.toLowerCase())
              "
            >
              <TableCell first>
                <ButtonInfo @click="show_media_info_modal(track.id)" />
              </TableCell>
              <TableCell hidden_on_sm>{{ track.artist.name }}</TableCell>
              <TableCell main bold>
                <span
                  class="space-y-1 sm:flex sm:flex-row sm:items-center sm:justify-between"
                >
                  <span class="mr-1">{{ track.title }}</span>
                </span>
                <dl class="font-normal sm:hidden">
                  <dt class="sr-only">Artist</dt>
                  <dd class="mt-1 text-secondary-700">
                    {{ track.artist.name }}
                  </dd>
                </dl>
              </TableCell>
              <TableCell small class="w-8">
                <NuxtLink :to="`/reports/${track.title}`" v-if="track.reported">
                  <BadgeYellow>{{ $t('tracks.table.reported') }}</BadgeYellow>
                </NuxtLink>
              </TableCell>
              <TableCell last right bold small class="w-8">
                <button
                  class="text-primary-600 hover:text-primary-900 dark:text-primary-500 dark:hover:text-primary-400"
                  @click="show_report_modal(track.id, track.title)"
                >
                  {{ $t('tracks.table.head.report') }}
                  <span class="sr-only">{{
                    $t('tracks.table.head.report')
                  }}</span>
                </button>
              </TableCell>
            </TableRow>
          </template>
        </tbody>
      </TableStriped>
    </div>
  </div>

  <ModalReport ref="modal_report_track" @report="report_track" />
  <ModalMediaInfo ref="modal_media_info" />
</template>

<script lang="ts">
type TrackType = [
  {
    id: number;
    title: string;
    artist: { name: string };
    reported: boolean;
  },
];

const track_query = gql`
  query get_tracks {
    tracks {
      id
      title
      artist {
        name
      }
      reported
    }
  }
`;

export default defineComponent({
  setup() {
    const route = useRoute();
    const search = ref<string>(route.params.query ?? '');
    const tracks = ref<TrackType>([]);

    useAsyncQuery<[TrackType]>(track_query).then(({ data }) => {
      tracks.value = data?.value?.tracks ?? [];
    });

    return {
      route,
      search,
      tracks,
    };
  },
  methods: {
    report_track(track_id: number) {
      this.tracks[this.tracks.findIndex((t) => t.id === track_id)].reported =
        true;
    },
    show_media_info_modal(track_id: number) {
      this.$refs.modal_media_info.show(track_id);
    },
    show_report_modal(track_id: number, track_title: string) {
      this.$refs.modal_report_track.show(track_id, track_title);
    },
  },
});
</script>
