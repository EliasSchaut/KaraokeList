<template>
  <div class="px-8">
    <div class="-mx-4 mt-8 sm:px-6 lg:px-8">
      <div class="pb-5">
        <h3 class="text-xl font-semibold leading-6 text-gray-900">Reports</h3>
      </div>
      <TableStriped v-if="reports.length">
        <thead>
          <tr>
            <TableHead first>Info</TableHead>
            <TableHead>Title</TableHead>
            <TableHead last>Description</TableHead>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="report of reports"
            :key="report.id"
            class="even:bg-gray-50"
          >
            <TableCell first>
              <ButtonInfo />
            </TableCell>
            <TableCell bold>
              {{ report.report_track.title }}
            </TableCell>
            <TableCell main last>
              {{ report.desc }}
            </TableCell>
          </tr>
        </tbody>
      </TableStriped>
      <Spinner v-else class="mx-auto" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Spinner from '~/components/spinner.vue';

type ReportType = Array<{
  id: number;
  desc: string;
  report_track: { id: number; title: string };
}>;

export default defineComponent({
  components: { Spinner },
  setup() {
    const reports = ref<ReportType>([]);
    const query = gql`
      query {
        reports {
          id
          desc
          report_track {
            id
            title
          }
        }
      }
    `;

    const { result } = useQuery<ReportType>(query);
    reports.value = result.value?.reports || [];
    return { reports };
  },
});
</script>
