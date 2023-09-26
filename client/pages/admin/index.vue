<template>
  <NuxtLayout name="admin">
    <div class="space-y-10 divide-y divide-gray-900/10 pt-10">
      <!-- Server settings -->
      <FormBlock
        title="General"
        desc="General server settings for the full website.
         WARNING: The subdomain represents the server name!
         If you change the server name the subdomain will change too!"
      >
        <FormInput
          class="col-span-3"
          id="Server title"
          placeholder="KaraokeList"
          label="Title"
          type="text"
          :side_label="{ label: 'visible', href: null }"
          required
        />
        <FormInput
          class="col-span-3"
          id="name"
          placeholder="karaoke-list"
          label="Server name"
          type="text"
          :side_label="{ label: 'internal', href: null }"
          required
        />
        <FormInputArea
          class="col-span-full"
          id="desc"
          placeholder="My desc ..."
          label="Description"
          type="text"
          :maxlength="10000"
          :side_label="{ label: 'Optional', href: null }"
        />
      </FormBlock>
    </div>
  </NuxtLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FormInput from '~/components/form/input/index.vue';

export default defineComponent({
  components: { FormInput },
});
</script>
