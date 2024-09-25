<template>
  <NuxtLayout name="admin">
    <div class="space-y-10 divide-y divide-gray-900/10 pt-10">
      <FormBlock
        title="Add single track"
        desc="This song will be added to the database and visible immediately."
        submit_label="Add single track"
        :submit="submit_track_single"
      >
        <FormInput
          class="sm:col-span-3"
          id="track_title"
          label="Track Title"
          type="text"
          :maxlength="100"
          required
        />
        <FormInput
          class="sm:col-span-3"
          id="artist_name"
          label="Track Artist"
          type="text"
          :maxlength="100"
          required
        />
      </FormBlock>
      <FormBlock
        title="Add multiple tracks"
        desc="Add multiple tracks at once by entering the following text in the
            textarea: [Artist] - [Title];[Artist] - [Title];..."
        submit_label="Add multiple tracks"
        :submit="submit_track_multiple"
      >
        <FormInputArea
          class="col-span-full"
          id="tracks"
          placeholder="Artist1 - Title1;Artist2 - Title2;..."
          label="Tracks"
          type="text"
          :maxlength="1000000"
          required
        />
      </FormBlock>
      <FormBlock
        title="Add multiple tracks via upload"
        desc="Upload a folder containing the songs. The files in the subfolder
            should have the following names: [Artist] - [Title]"
        no_submit
      >
        <button
          @click="open()"
          ref="dropZoneRef"
          type="button"
          class="col-span-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <DocumentPlusIcon class="mx-auto h-12 w-12 text-gray-400" />
          <span class="mt-2 block text-sm font-semibold text-gray-900"
            >Add new tracks</span
          >
        </button>
      </FormBlock>
    </div>
  </NuxtLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { alertStore } from '~/store/alert';
import { useDropZone, useFileDialog } from '@vueuse/core';
import { DocumentPlusIcon } from '@heroicons/vue/24/outline';

const query_single_track = gql`
  mutation ($track_input_data: TrackInputModel!) {
    track_create(track_input_data: $track_input_data) {
      title
      artist {
        name
      }
    }
  }
`;

const query_multiple_tracks = gql`
  mutation ($tracks_input_data: [TrackInputModel!]!) {
    track_create_multiple(tracks_input_data: $tracks_input_data) {
      id
    }
  }
`;

export default defineComponent({
  components: {
    DocumentPlusIcon,
  },
  setup() {
    const { open } = useFileDialog({
      multiple: true,
      accept: '*/*',
    });
    const { mutate: mutate_single_track } = useMutation(query_single_track);
    const { mutate: mutate_multiple_tracks } = useMutation(
      query_multiple_tracks,
    );

    const dropZoneRef = ref<HTMLElement>();
    useDropZone(dropZoneRef, (files: File[] | null) => {
      console.log(files);
    });
    return {
      alert: alertStore(),
      dropZoneRef,
      open,
      mutate_single_track,
      mutate_multiple_tracks,
    };
  },
  methods: {
    submit_track_single(e: Event, form_data: FormData) {
      const track_input_data = {
        track_title: form_data.get('track_title') as string,
        artist_name: form_data.get('artist_name') as string,
      };
      console.log(track_input_data);
      this.mutate_single_track({ track_input_data }).then(({ data }) => {
        console.log(data);
        if (data.track_create) {
          this.alert.show(
            `Track ${data.track_create.title} from ${data.track_create.artist.name} added successfully!`,
            'success',
          );
        }
      });
    },
    submit_track_multiple(e: Event, form_data: FormData) {
      const tracks = form_data.get('tracks') as string;
      const tracks_input_data = tracks.split(';').map((track) => {
        const [artist_name, track_title] = track.split(' - ', 2);
        return { artist_name, track_title };
      });
      this.mutate_multiple_tracks({ tracks_input_data }).then(({ data }) => {
        if (data.tracks_create && data.tracks_create.length) {
          this.alert.show(`Tracks added successfully!`, 'success');
        }
      });
    },
  },
});
</script>
