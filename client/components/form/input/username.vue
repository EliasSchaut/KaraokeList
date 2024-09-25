<template>
  <FormInput
    :id="id"
    type="text"
    label="Username"
    placeholder="max_mustermann"
    :required="true"
    pattern="^[a-z]+(_[a-z]+)*$"
    :minlength="2"
    :maxlength="20"
    invalid_pattern_feedback="Verwende nur englische Kleinbuchstaben und Unterstriche. Der Benutzername muss zudem mit einem Kleinbuchstaben beginnen."
  />
</template>

<script setup lang="ts">
defineProps({
  id: {
    type: String,
    required: true,
  },
});
</script>
