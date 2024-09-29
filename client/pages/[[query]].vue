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
              <TableCell @click="show_media_info_modal(track.id)" first>
                <ButtonInfo />
              </TableCell>
              <TableCell @click="show_media_info_modal(track.id)" hidden_on_sm
                >{{ track.artist.name }}
              </TableCell>
              <TableCell @click="show_media_info_modal(track.id)" main bold>
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
      <Pagination
        v-if="tracks.length"
        @update:current_page="change_page"
        :total_pages="total_pages"
        :current_page="current_page"
      />
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
  query get_tracks($cursor: CursorInputModel!) {
    tracks(cursor: $cursor) {
      id
      title
      artist {
        name
      }
      reported
    }
  }
`;

const count_query = gql`
  query get_tracks_count($page_size: Int!) {
    tracks_count(page_size: $page_size) {
      count
      total_pages
    }
  }
`;

export default defineComponent({
  setup() {
    const route = useRoute();
    const page_size = useRuntimeConfig().public.page_size;
    const search = ref<string>(route.params.query ?? '');
    const tracks_total = ref<TrackType>([]);
    let tracks = ref<TrackType>([]);
    const total_pages = ref<number>(1);
    const fetched_pages = ref<number>(1);
    const current_page = ref<number>(1);

    Promise.all([
      useAsyncQuery<[TrackType]>(track_query, {
        cursor: { first: page_size },
      }),
      useAsyncQuery(count_query, { page_size }),
    ]).then(([{ data }, { data: count_data }]) => {
      tracks_total.value = data?.value?.tracks ?? [];
      tracks.value = tracks_total.value.slice(0, page_size);
      total_pages.value = count_data?.value?.tracks_count?.total_pages ?? 1;
    });

    return {
      route,
      search,
      tracks,
      tracks_total,
      total_pages,
      current_page,
      fetched_pages,
      page_size,
    };
  },
  methods: {
    async get_new_tracks() {
      const { data } = await useAsyncQuery<[TrackType]>(track_query, {
        cursor: {
          first: this.page_size,
          after: this.tracks_total.slice(-1)[0].id,
        },
      });
      this.tracks_total.push(...(data?.value?.tracks ?? []));
      this.fetched_pages++;
    },
    async change_page(page: number) {
      if (page > this.total_pages || page < 1) return;
      while (this.fetched_pages < page) {
        await this.get_new_tracks();
      }
      this.tracks = this.tracks_total.slice(
        (page - 1) * this.page_size,
        page * this.page_size,
      );
      this.current_page = page;
    },
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
