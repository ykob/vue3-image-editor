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
const previewImageSize = 640;
const previewImageParams = reactive({
  ratioH: 1,
  ratioW: 1,
  rotate: 0,
  scale: 1,
  src: "/blank.png",
  translateX: 0,
  translateY: 0,
});
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
    <div class="header">
      <ContentHeader />
    </div>
    <div class="preview-image">
      <PreviewImage
        :previewImageParams="previewImageParams"
        :previewImageSize="previewImageSize"
        @mousedown.prevent="mouseDownForPreview"
        @touchstart.prevent="touchStartForPreview"
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
    </div>
    <div class="submits">
      <DownloadImageButton
        :img="img"
        :previewImageParams="previewImageParams"
        :previewImageSize="previewImageSize"
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
  margin-inline: auto;
}
@media (width >= 1024px) {
  .container {
    width: 768px;
    display: grid;
    grid-template-rows: auto 1fr auto;
    align-items: end;
    margin-block: 80px;
  }
  .header {
    height: 100%;
    grid-column-start: 2;
    grid-row: 1;
    align-items: start;
  }
  .preview-image {
    grid-column-start: 1;
    grid-row-start: 1;
    grid-row-end: 4;
  }
  .controls {
    height: 100%;
    grid-column-start: 2;
    grid-row-start: 2;
    justify-content: center;
  }
  .submits {
    grid-column-start: 2;
    grid-row-start: 3;
  }
}
.controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.submits {
  display: flex;
  justify-content: center;
}
</style>
