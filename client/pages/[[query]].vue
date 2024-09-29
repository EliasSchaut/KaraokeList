<template>
  <div class="px-8">
    <div class="-mx-4 pt-8 sm:px-6 lg:px-8">
      <SearchArtistTitle @search_query="search_query" class="mb-4 w-full" />
      <TableStriped v-if="!table_empty">
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
          <template
            v-for="track in is_searching ? tracks_searched : tracks"
            :key="track.title"
          >
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
                  <dd class="mt-1 text-secondary-700 dark:text-secondary-400">
                    {{ track.artist.name }}
                  </dd>
                </dl>
              </TableCell>
              <TableCell small class="hidden w-8 sm:table-cell">
                <NuxtLink :to="`/reports/${track.title}`" v-if="track.reported">
                  <BadgeYellow>{{ $t('tracks.table.reported') }}</BadgeYellow>
                </NuxtLink>
              </TableCell>
              <TableCell last right bold small class="w-8">
                <button
                  class="text-primary-600 hover:text-primary-900 dark:hover:text-primary-400"
                  :class="{
                    'text-yellow-600 dark:text-yellow-500 sm:text-primary-600 sm:dark:text-primary-500':
                      track.reported,
                    'text-primary-600 dark:text-primary-500': !track.reported,
                  }"
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
        v-if="tracks.length && !is_searching"
        @update:current_page="change_page"
        :total_pages="total_pages"
        :current_page="current_page"
      />
      <TableEmpty v-if="table_empty">
        {{ $t('tracks.table.empty') }}
      </TableEmpty>
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

const search_query = gql`
  query search_tracks($search_query: SearchInputModel!) {
    tracks_search(search_query: $search_query) {
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
    const page_size = useRuntimeConfig().public.page_size;
    const search = ref<string>(route.params.query ?? '');
    let tracks = ref<TrackType>([]);
    let tracks_searched = ref<TrackType>([]);
    const tracks_total = ref<TrackType>([]);
    const is_searching = ref<boolean>(false);
    let search_input_timeout: number | null = null;
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
      tracks_searched,
      total_pages,
      current_page,
      fetched_pages,
      page_size,
      is_searching,
      search_input_timeout,
    };
  },
  computed: {
    table_empty() {
      return this.is_searching && this.tracks_searched.length === 0;
    },
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
    async search_query(query: { artist_name?: string; track_title?: string }) {
      clearTimeout(this.search_input_timeout);
      if (query.artist_name || query.track_title) {
        this.search_input_timeout = setTimeout(async () => {
          const { data } = await useAsyncQuery<[TrackType]>(search_query, {
            search_query: {
              artist_name: query.artist_name,
              track_title: query.track_title,
            },
          });
          this.tracks_searched = data?.value?.tracks_search ?? [];
          this.is_searching = true;
        }, 500);
      } else {
        this.is_searching = false;
        this.tracks_searched = [];
      }
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
