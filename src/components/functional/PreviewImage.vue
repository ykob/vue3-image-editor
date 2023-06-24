<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";

const previewImage = ref<HTMLImageElement | null>(null);
const props = defineProps({
  previewImageParams: {
    type: Object,
    required: true,
    default: {
      ratioH: 1,
      ratioW: 1,
      rotate: 0,
      scale: 1,
      src: "",
      translateX: 0,
      translateY: 0,
    },
  },
  previewImageSize: {
    type: Number,
    required: true,
    default: 500,
  },
});
const previewImageWrapStyles = computed(() => {
  return {
    width: `${props.previewImageSize * 0.5}px`,
    height: `${props.previewImageSize * 0.5}px`,
  };
});
const previewImageStyles = computed(() => {
  const { scale, rotate, ratioW, ratioH, translateX, translateY } =
    props.previewImageParams;
  const tX = (1 - ratioW) * 0.25 * props.previewImageSize + translateX;
  const tY = (1 - ratioH) * 0.25 * props.previewImageSize + translateY;
  return {
    width: `${ratioW * props.previewImageSize * 0.5}px`,
    height: `${ratioH * props.previewImageSize * 0.5}px`,
    transform: `
    translate(${tX}px, ${tY}px) scale(${scale}) rotate(${rotate}deg)
    `,
  };
});
watchEffect(() => {
  if (previewImage.value === null) return;
  previewImage.value.src = props.previewImageParams.src;
});
</script>

<template>
  <div
    class="preview"
    :style="previewImageWrapStyles"
    @mousedown="$emit('mousedown', $event)"
    @touchstart="$emit('touchstart', $event)"
  >
    <img
      alt=""
      class="preview-img"
      ref="previewImage"
      :style="previewImageStyles"
    />
  </div>
</template>

<style scoped>
.preview {
  position: relative;
  cursor: move;
  overflow: hidden;
  border-radius: 12px;
  background-color: #aeaeae;
}
.preview img {
  max-width: 9999px;
  transform-origin: 50% 50%;
  pointer-events: none;
}
</style>
