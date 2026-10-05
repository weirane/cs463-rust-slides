<script setup lang="ts">
import { computed, onMounted, onUpdated, ref } from "vue";

const props = defineProps({
  top: { type: String, default: "100px" },
});

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
    :style="{ top: `calc(${props.top} - 18px)` }"
    :href="url"
    target="_blank"
    rel="noopener noreferrer"
  >Open in Playground ↗</a>
  <div class="rust-playground" :style="{ top: props.top }">
    <div ref="source" hidden><slot /></div>
    <iframe v-if="url" title="Rust Playground" :src="url" />
  </div>
</template>

<style scoped>
.playground-link {
  position: absolute;
  right: 10px;
  font-size: 10px;
  line-height: 14px;
}

.rust-playground {
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 10px;
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
