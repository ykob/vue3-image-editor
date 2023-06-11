<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ButtonFilled } from "../ui/";
import { degreesToRadians } from "../../utils/";

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
    }
  },
});
let ctx: CanvasRenderingContext2D | null = null;

const drawCanvasImage = (
  { isDrawingImage }: { isDrawingImage: boolean } = { isDrawingImage: true }
) => {
  const { scale, rotate, ratioW, ratioH, translateX, translateY } =
    props.previewImageParams;
  if (ctx === null) return;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, 640, 640);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, 640, 640);
  ctx.closePath();
  if (isDrawingImage === true) {
    ctx.translate(320, 320);
    ctx.translate(translateX * 2.56, translateY * 2.56);
    ctx.scale(scale, scale);
    ctx.rotate(degreesToRadians(rotate));
    ctx.drawImage(
      props.img,
      (1 - ratioW) * 0.5 * 640 - 320,
      (1 - ratioH) * 0.5 * 640 - 320,
      ratioW * 640,
      ratioH * 640
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
    <canvas width="640" height="640" ref="canvas"></canvas>
  </div>
</template>

<style scoped>
canvas {
  width: 0;
  height: 0;
}
</style>
