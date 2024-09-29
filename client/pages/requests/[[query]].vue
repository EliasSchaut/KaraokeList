<template>
  <div class="px-8">
    <div class="-mx-4 pt-8 sm:px-6 lg:px-8">
      <button
        @click="$refs.modal_request.show()"
        type="button"
        class="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <PlusCircleIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
        {{ $t('request.add_button') }}
      </button>
      <Search
        class="mt-4"
        v-if="requests.length"
        @input="search = $event.target.value"
        :value="route.params.query ?? ''"
      />
      <TableStriped v-if="requests.length">
        <thead>
          <tr>
            <TableHead>{{ $t('tracks.table.head.artist') }}</TableHead>
            <TableHead last>{{ $t('tracks.table.head.title') }}</TableHead>
          </tr>
        </thead>
        <tbody>
          <template v-for="report of requests" :key="report.id">
            <TableRow
              v-if="
                search === '' ||
                report.artist_name
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                report.track_title.toLowerCase().includes(search.toLowerCase())
              "
            >
              <TableCell first>
                {{ report.artist_name }}
              </TableCell>
              <TableCell main last>
                {{ report.track_title }}
              </TableCell>
            </TableRow>
          </template>
        </tbody>
      </TableStriped>
      <TableEmpty v-else> ${{ $t('request.table.empty') }} </TableEmpty>
    </div>
  </div>

  <ModalRequest @request="refetch_query" ref="modal_request" />
</template>

<script lang="ts">
import { PlusCircleIcon } from '@heroicons/vue/20/solid';

type RequestType = Array<{
  id: number;
  artist_name: string;
  track_title: string;
}>;

const requests_query = gql`
  query {
    requests {
      id
      artist_name
      track_title
    }
  }
`;

export default defineComponent({
  components: {
    PlusCircleIcon,
  },
  setup() {
    const route = useRoute();
    const search = ref<string>(route.params.query ?? '');
    const requests = ref<RequestType>([]);

    useAsyncQuery<RequestType>(requests_query).then(({ data }) => {
      requests.value = data?.value?.requests ?? [];
    });

    return {
      route,
      search,
      requests,
    };
  },
  methods: {
    refetch_query() {
      useAsyncQuery<RequestType>(requests_query).then(({ data }) => {
        this.requests = data?.value?.requests ?? [];
      });
    },
  },
});
</script>
