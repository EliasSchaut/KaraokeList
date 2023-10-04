<template>
  <Modal ref="modal" own_buttons>
    <div>
      <div
        class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100"
      >
        <MusicalNoteIcon class="h-6 w-6 text-green-600" aria-hidden="true" />
      </div>
      <div class="my-3 text-center sm:mt-5">
        <DialogTitle
          as="h3"
          class="text-base font-semibold leading-6 text-gray-900"
          >Request a new Track
        </DialogTitle>
      </div>
      <Form :submit="request">
        <div class="space-y-2">
          <FormInput
            id="artist_name"
            type="text"
            label="Artist Name"
            maxlength="100"
            required
          />
          <FormInput
            id="track_title"
            type="text"
            label="Track Title"
            maxlength="100"
            required
          />
        </div>

        <div
          class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3"
        >
          <button
            type="submit"
            class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
          >
            Request
          </button>
          <button
            type="button"
            class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
            @click="hide()"
          >
            Cancel
          </button>
        </div>
      </Form>
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { DialogTitle } from '@headlessui/vue';
import { MusicalNoteIcon } from '@heroicons/vue/24/outline';
import { alertStore } from '~/store/alert';
import FormInput from '~/components/form/input/index.vue';

export default defineComponent({
  name: 'Index',
  components: {
    FormInput,
    DialogTitle,
    MusicalNoteIcon,
  },
  methods: {
    show(track_id: number, track_title: string) {
      this.track = {
        id: track_id,
        title: track_title,
      };
      this.$refs.modal.show();
    },
    hide() {
      this.$refs.modal.hide();
    },
    request(e: Event, form_data: FormData) {
      const track_input_data = {
        artist_name: form_data.get('artist_name'),
        track_title: form_data.get('track_title'),
      };
      this.mutate_request({ track_input_data })
        .then(() => {
          this.alert.show(
            `Successfully requested ${track_input_data.track_title}!`,
            'success',
          );
          this.$emit('request');
        })
        .catch(() => {
          this.alert.show(`Failed to request!`, 'danger');
        });
      this.hide();
    },
  },
  setup() {
    const query_mutate_request = gql`
      mutation request_create($track_input_data: TrackInputModel!) {
        request_create(track_input_data: $track_input_data) {
          id
        }
      }
    `;
    const { mutate: mutate_request } = useMutation(query_mutate_request);

    return {
      mutate_request,
      alert: alertStore(),
    };
  },
  emits: ['request'],
});
</script>
