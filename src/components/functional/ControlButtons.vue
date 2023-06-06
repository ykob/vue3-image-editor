<script setup lang="ts">
import { ButtonFilled } from "../ui/";

defineEmits(["rotateLeft", "rotateRight", "scaleDown", "scaleUp"]);
</script>

<template>
  <div class="control-buttons">
    <ButtonFilled circle @click="$emit('scaleDown')"> 縮小 </ButtonFilled>
    <ButtonFilled circle @click="$emit('scaleUp')"> 拡大 </ButtonFilled>
    <ButtonFilled circle @click="$emit('rotateLeft')"> 左回転 </ButtonFilled>
    <ButtonFilled circle @click="$emit('rotateRight')"> 右回転 </ButtonFilled>
  </div>
</template>

<style scoped></style>
