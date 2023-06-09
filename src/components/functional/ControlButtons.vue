<script setup lang="ts">
import {
  mdiArrowCollapse,
  mdiArrowExpand,
  mdiRotateLeft,
  mdiRotateRight,
} from "@mdi/js";
import { ButtonFilled, IconBase } from "../ui/";

defineEmits(["rotateLeft", "rotateRight", "scaleDown", "scaleUp"]);
</script>

<template>
  <div class="control-buttons">
    <ButtonFilled circle @click="$emit('scaleDown')">
      <IconBase :path="mdiArrowCollapse" name="縮小" />
    </ButtonFilled>
    <ButtonFilled circle @click="$emit('scaleUp')">
      <IconBase :path="mdiArrowExpand" name="拡大" />
    </ButtonFilled>
    <ButtonFilled circle @click="$emit('rotateLeft')">
      <IconBase :path="mdiRotateLeft" name="左回転" />
    </ButtonFilled>
    <ButtonFilled circle @click="$emit('rotateRight')">
      <IconBase :path="mdiRotateRight" name="右回転" />
    </ButtonFilled>
  </div>
</template>

<style scoped></style>
