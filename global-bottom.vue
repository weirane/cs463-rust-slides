<script setup lang="ts">
import { computed } from "vue";
import { useNav } from "@slidev/client";

const { currentSlideRoute } = useNav();

const references = computed(() => {
  const slide = currentSlideRoute.value.meta?.slide;
  const value = slide?.frontmatter?.references;

  if (Array.isArray(value)) {
    return value.filter(
      (entry): entry is string =>
        typeof entry === "string" && entry.trim().length > 0,
    );
  }

  if (typeof value === "string" && value.trim().length > 0) {
    return [value];
  }

  return [];
});
</script>

<template>
  <div
    v-if="references.length > 0"
    class="slide-references absolute bottom-4 left-16 text-[0.6rem] leading-tight opacity-70"
  >
    <div
      v-for="(reference, index) in references"
      :key="`${index}-${reference}`"
      class="slide-references__item"
    >
      {{ reference }}
    </div>
  </div>
</template>

