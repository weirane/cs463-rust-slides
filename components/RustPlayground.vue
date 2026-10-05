<script setup lang="ts">
import { computed, onMounted, onUpdated, ref } from "vue";

const source = ref<HTMLElement>();
const slotCode = ref("");
function readSlotCode() {
  const code = source.value?.querySelector("pre code");
  slotCode.value = (code?.textContent ?? "").trimEnd();
}
onMounted(readSlotCode);
onUpdated(readSlotCode);

const url = computed(() => {
  const code = slotCode.value;
  if (!code) return "";
  const params = new URLSearchParams({
    version: "stable",
    mode: "debug",
    edition: "2024",
    code,
  });
  return `https://play.rust-lang.org/?${params}`;
});
</script>

<template>
  <a
    v-if="url"
    class="playground-link"
    :href="url"
    target="_blank"
    rel="noopener noreferrer"
  >Open in Playground ↗</a>
  <div class="rust-playground">
    <div ref="source" hidden><slot /></div>
    <iframe v-if="url" title="Rust Playground" :src="url" />
  </div>
</template>

<style scoped>
.playground-link {
  position: absolute;
  top: 76px;
  right: 10pt;
  font-size: 12px;
  line-height: 18px;
}

.rust-playground {
  position: absolute;
  top: 100px;
  left: 10pt;
  right: 10pt;
  bottom: 10pt;
  overflow: hidden;
}

iframe {
  display: block;
  width: 160%;
  height: 160%;
  transform: scale(0.625);
  transform-origin: top left;
  border: 0;
}
</style>
