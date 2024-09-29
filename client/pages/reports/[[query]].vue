<template>
  <div class="px-8">
    <div class="-mx-4 pt-8 sm:px-6 lg:px-8">
      <Search
        v-if="reports.length"
        @input="search = $event.target.value"
        :value="route.params.query ?? ''"
      />
      <TableStriped v-if="reports.length">
        <thead>
          <tr>
            <TableHead
              >{{ $t('tracks.table.head.artist') }} -
              {{ $t('tracks.table.head.title') }}</TableHead
            >
            <TableHead last>{{ $t('report.reason') }}</TableHead>
          </tr>
        </thead>
        <tbody>
          <template v-for="report of reports" :key="report.id">
            <TableRow
              v-if="
                search === '' ||
                report.track.title
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                report.track.artist.name
                  .toLowerCase()
                  .includes(search.toLowerCase())
              "
            >
              <TableCell first bold>
                {{ report.track.artist.name }} -
                {{ report.track.title }}
              </TableCell>
              <TableCell main last>
                {{ report.desc }}
              </TableCell>
            </TableRow>
          </template>
        </tbody>
      </TableStriped>
      <TableEmpty v-else>
        {{ $t('report.table.empty') }}
      </TableEmpty>
    </div>
  </div>
</template>

<script lang="ts">
type ReportType = Array<{
  id: number;
  desc: string;
  track: { id: number; title: string; artist: { name: string } };
}>;

const report_query = gql`
  query {
    reports {
      id
      desc
      track {
        id
        title
        artist {
          name
        }
      }
    }
  }
`;

export default defineComponent({
  setup() {
    const route = useRoute();
    const search = ref<string>(route.params.query ?? '');
    const reports = ref<ReportType>([]);

    useAsyncQuery<ReportType>(report_query).then(({ data }) => {
      reports.value = data?.value?.reports ?? [];
    });

    return {
      route,
      search,
      reports,
    };
  },
});
</script>
