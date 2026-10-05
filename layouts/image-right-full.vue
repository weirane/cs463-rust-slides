<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
    image: {
        type: String,
        required: true,
    },
    alt: {
        type: String,
        default: "",
    },
    class: {
        type: String,
    },
    margin: {
        type: String,
        default: "0",
    },
    marginColor: {
        type: String,
        default: "transparent",
    },
});

const mediaStyle = computed(() => ({
    padding: `${props.margin} ${props.margin} ${props.margin} 0`,
    backgroundColor: props.marginColor,
}));

const imageSrc = computed(() => {
    if (!props.image.startsWith("/")) return props.image;

    const base = import.meta.env.BASE_URL ?? "/";
    return `${base.replace(/\/?$/, "/")}${props.image.slice(1)}`;
});
</script>

<template>
    <div class="image-right-full h-full w-full">
        <div
            class="slidev-layout default image-right-full__content"
            :class="props.class"
        >
            <slot />
        </div>
        <div class="image-right-full__media" :style="mediaStyle">
            <img
                class="image-right-full__image"
                :src="imageSrc"
                :alt="props.alt"
            />
        </div>
    </div>
</template>

<style scoped>
.image-right-full {
    display: flex;
    height: 100%;
    width: 100%;
    align-items: stretch;
}

.image-right-full__content {
    min-width: 0;
    flex: 1 1 auto;
}

.image-right-full__media {
    flex: 0 0 auto;
    display: flex;
    justify-content: flex-end;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
}

.image-right-full__image {
    display: block;
    height: 100%;
    width: auto;
    max-width: none;
    object-fit: contain;
    object-position: right center;
}
</style>
