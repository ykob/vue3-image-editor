<script setup lang="ts">
import { reactive } from "vue";
import {
  ContentHeader,
  ControlButtons,
  DownloadImageButton,
  PreviewImage,
  SelectFileButton,
} from "./components/functional/";

const img = new Image();
const previewImageParams = reactive({
  isLoaded: false,
  ratioH: 1,
  ratioW: 1,
  rotate: 0,
  scale: 1,
  src: "",
  translateX: 0,
  translateY: 0,
});
const previewImageSize = 640;
let diffXPreview = 0;
let diffYPreview = 0;
let touchStartX = 0;
let touchStartY = 0;
let isDraggingForPreview = false;

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

      previewImageParams.isLoaded = true;
      previewImageParams.ratioH = Math.max(1, h / w);
      previewImageParams.ratioW = Math.max(1, w / h);
      previewImageParams.rotate = 0;
      previewImageParams.scale = 1;
      previewImageParams.src = img.src;
      previewImageParams.translateX = 0;
      previewImageParams.translateY = 0;
      diffXPreview = 0;
      diffYPreview = 0;
    };
  };
};
const translate = (x: number, y: number) => {
  previewImageParams.translateX = x + diffXPreview;
  previewImageParams.translateY = y + diffYPreview;
};
const scaleUp = () => {
  previewImageParams.scale += 0.1;
};
const scaleDown = () => {
  previewImageParams.scale -= 0.1;
};
const rotateLeft = () => {
  previewImageParams.rotate -= 10;
};
const rotateRight = () => {
  previewImageParams.rotate += 10;
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

document.body.addEventListener("mousemove", mouseMoveForPreview);
document.body.addEventListener("mouseup", mouseUpForPreview);
document.body.addEventListener("touchmove", touchMoveForPreview);
document.body.addEventListener("touchend", touchEndForPreview);
</script>

<template>
  <div class="container" ref="root">
    <div class="container-in">
      <div class="grid-header">
        <ContentHeader />
      </div>
      <div class="grid-preview">
        <PreviewImage
          :previewImageParams="previewImageParams"
          :previewImageSize="previewImageSize"
          @mousedown.prevent="mouseDownForPreview"
          @touchstart.prevent="touchStartForPreview"
        />
      </div>
      <div class="grid-controls">
        <SelectFileButton @change-file="changeFile" />
        <ControlButtons
          :disabled="!previewImageParams.isLoaded"
          @scale-up="scaleUp"
          @scale-down="scaleDown"
          @rotate-right="rotateRight"
          @rotate-left="rotateLeft"
        />
      </div>
      <div class="grid-submits">
        <DownloadImageButton
          :disabled="!previewImageParams.isLoaded"
          :img="img"
          :previewImageParams="previewImageParams"
          :previewImageSize="previewImageSize"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container-in {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  margin-inline: auto;
  padding-block: 40px;
}
.grid-header {
  width: 100%;
}
.grid-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.grid-submits {
  display: flex;
  justify-content: center;
}
@media (width >= 1024px) {
  .container {
    min-height: 100vh;
    display: grid;
    place-items: center;
  }
  .container-in {
    width: 768px;
    display: grid;
    grid-template-columns: 320px auto;
    grid-template-rows: auto 1fr auto;
    align-items: end;
    padding-block: 80px;
  }
  .grid-header {
    height: 100%;
    grid-column-start: 2;
    grid-row: 1;
    align-items: start;
  }
  .grid-preview {
    grid-column-start: 1;
    grid-row-start: 1;
    grid-row-end: 4;
  }
  .grid-controls {
    height: 100%;
    grid-column-start: 2;
    grid-row-start: 2;
    justify-content: center;
  }
  .grid-submits {
    grid-column-start: 2;
    grid-row-start: 3;
  }
}
</style>
