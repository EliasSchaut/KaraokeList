<template>
  <Modal ref="modal" own_buttons>
    <div>
      <div
        class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100"
      >
        <FlagIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
      </div>
      <div class="my-3 text-center sm:mt-5">
        <DialogTitle
          as="h3"
          class="text-base font-semibold leading-6 text-gray-900"
          >Report {{ track.title }}
        </DialogTitle>
      </div>
      <Form :submit="report">
        <FormInputArea
          id="desc"
          label="Reason of report"
          :minlength="10"
          placeholder="This track has issues because..."
          required
        />

        <div
          class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3"
        >
          <button
            type="submit"
            class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
          >
            Report
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
import { defineComponent, ref } from 'vue';
import { DialogTitle } from '@headlessui/vue';
import { FlagIcon } from '@heroicons/vue/24/outline';
import { alertStore } from '~/store/alert';

export default defineComponent({
  name: 'Index',
  components: {
    DialogTitle,
    FlagIcon,
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
    report(e: Event, form_data: FormData) {
      const report_input_data = {
        track_id: this.track.id,
        desc: form_data.get('desc'),
      };
      this.mutate_report({ report_input_data })
        .then(() => {
          this.alert.show(
            `Successfully reported ${this.track.title}`,
            'success',
          );
        })
        .catch(() => {
          this.alert.show(`Failed to report ${this.track.title}`, 'danger');
        });
      this.hide();
    },
  },
  setup() {
    const track = ref<{ id: number; title: string }>({
      id: -1,
      title: '&nbsp;',
    });

    const query_mutate_report = gql`
      mutation report($report_input_data: ReportInputModel!) {
        report_create(report: $report_input_data) {
          id
        }
      }
    `;
    const { mutate: mutate_report } = useMutation(query_mutate_report);

    return {
      track,
      mutate_report,
      alert: alertStore(),
    };
  },
});
</script>
