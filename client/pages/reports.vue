<template></template>

<script lang="ts">
import { defineComponent } from 'vue';

type ReportType = Array<{
  id: number;
  desc: string;
  report_track: { id: number; title: string };
}>;

export default defineComponent({
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
