<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  ControlButtons,
  DownloadImageButton,
  SelectFileButton,
} from "./components/functional/";

const canvas = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;

onMounted(async () => {
  ctx = canvas.value?.getContext("2d") ?? null;
});
</script>

<template>
  <div>
    <SelectFileButton />
    <ControlButtons />
    <DownloadImageButton :canvas="canvas" />
    <canvas width="640" height="640" ref="canvas"></canvas>
  </div>
</template>

<style scoped></style>
