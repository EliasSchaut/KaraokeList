<template>
  <div class="px-8">
    <div class="-mx-4 pt-8 sm:px-6 lg:px-8">
      <Search
        @input="search = $event.target.value"
        :value="route.params.query ?? ''"
      />
      <TableStriped v-if="report_data.reports.length">
        <thead>
          <tr>
            <TableHead>Artist - Title</TableHead>
            <TableHead last>Description</TableHead>
          </tr>
        </thead>
        <tbody>
          <template v-for="report of report_data.reports" :key="report.id">
            <TableRow
              v-if="
                search === '' ||
                report.report_track.title
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                report.report_track.track_artists_names
                  .toLowerCase()
                  .includes(search.toLowerCase())
              "
            >
              <TableCell first bold>
                {{ report.report_track.track_artists_names }} -
                {{ report.report_track.title }}
              </TableCell>
              <TableCell main last>
                {{ report.desc }}
              </TableCell>
            </TableRow>
          </template>
        </tbody>
      </TableStriped>
    </div>
  </div>
</template>

<script setup lang="ts">
import { alertStore } from '~/store/alert';
const alert = alertStore();
const route = useRoute();
const search = ref<string>(route.params.query ?? '');

type ReportType = Array<{
  id: number;
  desc: string;
  report_track: { id: number; title: string; track_artists_names: string };
}>;

const query = gql`
  query {
    reports {
      id
      desc
      report_track {
        id
        title
        track_artists_names
      }
    }
  }
`;
const { data: report_data } = await useAsyncQuery<ReportType>(query);
if (report_data.value.reports.length === 0) {
  alert.show('No reports submitted!', 'info');
}
</script>
