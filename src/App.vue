<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import {
  ControlButtons,
  DownloadImageButton,
  SelectFileButton,
} from "./components/functional/";

const img = new Image();
const previewImage = ref<HTMLImageElement | null>(null);
const previewImageParams = reactive({
  ratioH: 1,
  ratioW: 1,
  rotate: 0,
  scale: 1,
  translateX: 0,
  translateY: 0,
});
let diffXPreview = 0;
let diffYPreview = 0;
let touchStartX = 0;
let touchStartY = 0;
let isDraggingForPreview = false;

const previewImageStyle = computed(() => {
  const { scale, rotate, ratioW, ratioH, translateX, translateY } =
    previewImageParams;
  const tX = (1 - ratioW) * 0.25 * 500 + translateX;
  const tY = (1 - ratioH) * 0.25 * 500 + translateY;
  return {
    width: `${ratioW * 500 * 0.5}px`,
    height: `${ratioH * 500 * 0.5}px`,
    transform: `
    translate(${tX}px, ${tY}px) scale(${scale}) rotate(${rotate}deg)
    `,
  };
});
const changeFile = (e: any) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  if (!file) return;

  reader.readAsDataURL(file);
  reader.onload = () => {
    img.src = reader.result as string;
    img.onload = () => {
      const w = img.width;
      const h = img.height;

      previewImageParams.ratioH = Math.max(1, h / w);
      previewImageParams.ratioW = Math.max(1, w / h);
      previewImageParams.scale = 1;

      setPreviewImage();
    };
  };
};
const translate = (x: number, y: number) => {
  previewImageParams.translateX = x + diffXPreview;
  previewImageParams.translateY = y + diffYPreview;
};
const scaleUp = () => {
  previewImageParams.scale += 0.1;
  setPreviewImage();
};
const scaleDown = () => {
  previewImageParams.scale -= 0.1;
  setPreviewImage();
};
const rotateLeft = () => {
  previewImageParams.rotate -= 10;
  setPreviewImage();
};
const rotateRight = () => {
  previewImageParams.rotate += 10;
  setPreviewImage();
};
const mouseDownForPreview = (e: MouseEvent) => {
  const { clientX, clientY } = e;
  touchStartX = clientX;
  touchStartY = clientY;
  isDraggingForPreview = true;
};
const mouseMoveForPreview = (e: MouseEvent) => {
  const { clientX, clientY } = e;
  const diffX = clientX - touchStartX;
  const diffY = clientY - touchStartY;
  if (isDraggingForPreview === true) {
    translate(diffX, diffY);
  }
};
const mouseUpForPreview = () => {
  const { translateX, translateY } = previewImageParams;
  isDraggingForPreview = false;
  diffXPreview = translateX;
  diffYPreview = translateY;
};
const touchStartForPreview = (e: TouchEvent) => {
  const touch = e.touches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
  isDraggingForPreview = true;
};
const touchMoveForPreview = (e: TouchEvent) => {
  const touch = e.touches[0];
  const diffX = touch.clientX - touchStartX;
  const diffY = touch.clientY - touchStartY;
  if (isDraggingForPreview === true) {
    translate(diffX, diffY);
  }
};
const touchEndForPreview = () => {
  const { translateX, translateY } = previewImageParams;
  diffXPreview = translateX;
  diffYPreview = translateY;
  isDraggingForPreview = false;
};
const setPreviewImage = () => {
  if (previewImage.value === null) return;
  previewImage.value.src = img.src;
};
</script>

<template>
  <div
    class="container"
    ref="root"
    @mousemove.prevent="mouseMoveForPreview"
    @mouseup.prevent="mouseUpForPreview"
    @touchmove="touchMoveForPreview"
    @touchend="touchEndForPreview"
  >
    <div
      class="preview"
      @mousedown.prevent="mouseDownForPreview"
      @touchstart.prevent="touchStartForPreview"
    >
      <img
        alt=""
        class="preview-img"
        ref="previewImage"
        src="./assets/blank.png"
        :style="previewImageStyle"
      />
    </div>
    <div class="controls">
      <SelectFileButton @change-file="changeFile" />
      <ControlButtons
        @scale-up="scaleUp"
        @scale-down="scaleDown"
        @rotate-right="rotateRight"
        @rotate-left="rotateLeft"
      />
      <DownloadImageButton
        :img="img"
        :previewImageParams="previewImageParams"
      />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  margin-block: 40px;
}
.preview {
  position: relative;
  width: 250px;
  height: 250px;
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
.controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
</style>
