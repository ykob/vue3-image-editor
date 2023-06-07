<script setup lang="ts">
import { reactive } from "vue";
import {
  ControlButtons,
  DownloadImageButton,
  SelectFileButton,
} from "./components/functional/";

const img = new Image();

const previewImageParams = reactive({
  ratioH: 1,
  ratioW: 1,
  rotate: 0,
  scale: 1,
  translateX: 0,
  translateY: 0,
});
</script>

<template>
  <div>
    <SelectFileButton />
    <ControlButtons />
    <DownloadImageButton :img="img" :previewImageParams="previewImageParams" />
  </div>
</template>

<style scoped></style>
