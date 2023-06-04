<script setup lang="ts">
import { PropType } from "vue";
import { ButtonFilled } from "../ui/";

const props = defineProps({
  canvas: {
    type: Object as PropType<HTMLCanvasElement | null>,
    required: true,
  },
});

const downloadImage = () => {
  const a = document.createElement("a");
  a.href = props.canvas?.toDataURL() ?? "";
  a.download = "image.png";
  a.click();
};
</script>

<template>
  <ButtonFilled @click="downloadImage">
    画像をダウンロード
  </ButtonFilled>
</template>

<style scoped></style>
