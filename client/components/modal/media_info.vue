<template>
  <Modal ref="modal" class="sm:max-w-xl" own_buttons close_x>
    <Spinner v-if="loading" class="m-auto" />
    <div class="flex-col space-y-5 break-keep" v-else>
      <div
        class="row flex w-full flex-col items-center space-x-1 space-y-2 text-center sm:flex-row sm:space-x-5 sm:text-left"
      >
        <div>
          <img
            class="rounded-md"
            v-if="metadata.cover_url"
            :src="metadata.cover_url"
            height="200"
            width="200"
            alt="cover img"
          />
          <img
            v-else
            class="rounded-md"
            src="/img/no_cover.svg"
            alt="no cover"
          />
        </div>
        <div>
          <h1 class="inline-flex text-lg font-bold">
            {{ metadata.track_title }}
            <IconExplicit
              v-if="metadata.explicit"
              class="ml-2 h-5 w-5 min-w-max self-center text-secondary-400 dark:text-secondary-600"
            />
          </h1>
          <h4 class="text-sm italic">
            {{ metadata.artists_names?.join(' x ') ?? '??' }} •
            {{ metadata.album_title ?? '??' }}
          </h4>
          <h4 class="text-sm">
            {{ metadata.release_date }} •
            {{ metadata.duration }}
          </h4>
          <audio
            class="mt-2 max-w-full fill-secondary-600"
            controls
            volume="0.5"
          >
            <source :src="metadata.preview_url" type="audio/mpeg" />
          </audio>
        </div>
      </div>
      <Divider
        v-if="metadata.external_link"
        :content="$t('tracks.metadata.listen_on')"
      />
      <ButtonSpotify
        v-if="metadata.external_link"
        :href="metadata.external_link"
      />
    </div>
  </Modal>
</template>

<script lang="ts">
type MediaInfoType = {
  track_title: string;
  duration: string | null;
  album_title: string | null;
  artists_names: string[] | null;
  cover_url: string | null;
  explicit: boolean | null;
  release_date: string | null;
  preview_url: string | null;
  external_link: string | null;
};

const query = gql`
  query get_media_info($track_id: Int!) {
    track(track_id: $track_id) {
      metadata {
        track_title
        album_title
        artists_names
        cover_url
        duration_ms
        explicit
        release_date
        preview_url
        external_link
      }
    }
  }
`;

export default defineComponent({
  setup() {
    const metadata = ref<MediaInfoType>({});

    return {
      loading: ref<boolean>(false),
      metadata,
      dayjs: useDayjs(),
    };
  },
  methods: {
    show(track_id: number) {
      this.loading = true;
      this.$refs.modal.show();
      useAsyncQuery(query, { track_id }).then(({ data }) => {
        const duration = this.dayjs
          .duration(data.value.track.metadata.duration_ms)
          .format('m:ss');
        this.metadata = { ...data.value.track.metadata, duration };
        this.loading = false;
      });
    },
  },
});
</script>
