<template>
  <Modal ref="modal" class="sm:max-w-xl" own_buttons close_x>
    <Spinner v-if="loading" class="m-auto" />
    <div class="flex-col space-y-5 break-keep" v-else>
      <div
        class="row flex w-full flex-col items-center space-x-1 space-y-2 sm:flex-row sm:space-x-5"
      >
        <div>
          <img
            v-if="media_info.cover"
            :src="media_info.cover"
            height="200"
            width="200"
            alt="cover img"
          />
          <img v-else src="/img/no_cover.svg" alt="no cover" />
        </div>
        <div>
          <h1 class="inline-flex text-lg font-bold">
            {{ media_info.name }}
            <IconExplicit
              v-if="media_info.explicit"
              class="ml-2 h-5 w-5 min-w-max self-center text-gray-400"
            />
          </h1>
          <h4 class="text-sm italic">
            {{ media_info.artists ?? '??' }} • {{ media_info.album ?? '??' }}
          </h4>
          <h4 class="text-sm">
            {{ media_info.release_date }} •
            {{ media_info.duration }}
          </h4>
          <audio class="mt-2 max-w-full" controls volume="0.5">
            <source :src="media_info.spotify_preview" type="audio/mpeg" />
          </audio>
        </div>
      </div>
      <Divider v-if="media_info.spotify_link" content="Listen on:" />
      <ButtonSpotify
        v-if="media_info.spotify_link"
        :href="media_info.spotify_link"
      />
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Divider from '~/components/divider.vue';

type MediaInfoType = {
  name?: string;
  artists?: string;
  cover?: string;
  album?: string;
  release_date?: string;
  duration?: string;
  explicit?: boolean;
  spotify_preview?: string;
  spotify_link?: string;
};

const query = gql`
  query get_media_info($track_id: Int!) {
    track(track_id: $track_id) {
      metadata {
        name
        artists
        cover
        album
        duration
        explicit
        release_date
        spotify_preview
        spotify_link
      }
    }
  }
`;

export default defineComponent({
  name: 'Index',
  components: { Divider },
  setup() {
    return {
      loading: ref<boolean>(false),
      media_info: ref<MediaInfoType>({}),
      dayjs: useDayjs(),
    };
  },
  methods: {
    show(track_id: number) {
      this.loading = true;
      this.$refs.modal.show();
      useAsyncQuery(query, { track_id }).then(({ data }) => {
        const duration = this.dayjs
          .duration(data.value.track.metadata.duration)
          .format('m:ss');
        this.media_info = { ...data.value.track.metadata, duration };
        this.loading = false;
      });
    },
  },
});
</script>
