<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ButtonFilled } from "../ui/";
import { degreesToRadians } from "../../utils/";

const SIZE = 1024;
const canvas = ref<HTMLCanvasElement | null>(null);
const props = defineProps({
  img: {
    type: HTMLImageElement,
    required: true,
  },
  previewImageParams: {
    type: Object,
    required: true,
    default: {
      ratioH: 1,
      ratioW: 1,
      rotate: 0,
      scale: 1,
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
let ctx: CanvasRenderingContext2D | null = null;

const drawCanvasImage = (
  { isDrawingImage }: { isDrawingImage: boolean } = { isDrawingImage: true }
) => {
  const { previewImageParams, previewImageSize } = props;
  const { scale, rotate, ratioW, ratioH, translateX, translateY } =
    previewImageParams;
  if (ctx === null) return;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, SIZE, SIZE);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, SIZE, SIZE);
  ctx.closePath();
  if (isDrawingImage === true) {
    ctx.translate(SIZE / 2, SIZE / 2);
    ctx.translate(
      (translateX * SIZE * 2) / previewImageSize,
      (translateY * SIZE * 2) / previewImageSize
    );
    ctx.scale(scale, scale);
    ctx.rotate(degreesToRadians(rotate));
    ctx.drawImage(
      props.img,
      (1 - ratioW) * 0.5 * SIZE - SIZE / 2,
      (1 - ratioH) * 0.5 * SIZE - SIZE / 2,
      ratioW * SIZE,
      ratioH * SIZE
    );
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0);
};

const downloadImage = () => {
  const a = document.createElement("a");

  drawCanvasImage();
  a.href = canvas.value?.toDataURL() ?? "";
  a.download = "image.png";
  a.click();
};

onMounted(async () => {
  ctx = canvas.value?.getContext("2d") ?? null;
});
</script>

<template>
  <div>
    <ButtonFilled @click="downloadImage"> 画像をダウンロードする </ButtonFilled>
    <canvas :width="SIZE" :height="SIZE" ref="canvas"></canvas>
  </div>
</template>

<style scoped>
canvas {
  width: 0;
  height: 0;
}
</style>
