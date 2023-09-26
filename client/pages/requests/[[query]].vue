<template>
  <div class="px-8">
    <div class="-mx-4 pt-8 sm:px-6 lg:px-8">
      <button
        @click="$refs.modal_request.show()"
        type="button"
        class="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <PlusCircleIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
        Request new track
      </button>
      <Search
        class="mt-4"
        v-if="requests_data.requests.length"
        @input="search = $event.target.value"
        :value="route.params.query ?? ''"
      />
      <TableStriped v-if="requests_data.requests.length">
        <thead>
          <tr>
            <TableHead>Artist</TableHead>
            <TableHead last>Title</TableHead>
          </tr>
        </thead>
        <tbody>
          <template v-for="report of requests_data.requests" :key="report.id">
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
    </div>
  </div>

  <ModalRequest
    @request="
      useAsyncQuery<RequestType>(query).then((data) => (requests_data = data))
    "
    ref="modal_request"
  />
</template>

<script setup lang="ts">
import { PlusCircleIcon } from '@heroicons/vue/20/solid';
import { alertStore } from '~/store/alert';
const alert = alertStore();
const route = useRoute();
const search = ref<string>(route.params.query ?? '');

type RequestType = Array<{
  id: number;
  artist_name: string;
  track_title: string;
}>;

const query = gql`
  query {
    requests {
      id
      artist_name
      track_title
    }
  }
`;
const { data: requests_data } = await useAsyncQuery<RequestType>(query);
if (requests_data.value.requests.length === 0) {
  alert.show('No requests submitted!', 'info');
}
</script>
