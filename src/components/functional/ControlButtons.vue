<script setup lang="ts">
import {
  mdiArrowCollapse,
  mdiArrowExpand,
  mdiRotateLeft,
  mdiRotateRight,
} from "@mdi/js";
import { ButtonFilled, IconBase } from "../ui/";

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["rotateLeft", "rotateRight", "scaleDown", "scaleUp"]);
</script>

<template>
  <div class="control-buttons">
    <ButtonFilled
      buttonType="secondary"
      circle
      :disabled="props.disabled"
      @click="$emit('scaleDown')"
    >
      <IconBase :path="mdiArrowCollapse" name="縮小" />
    </ButtonFilled>
    <ButtonFilled
      buttonType="secondary"
      circle
      :disabled="props.disabled"
      @click="$emit('scaleUp')"
    >
      <IconBase :path="mdiArrowExpand" name="拡大" />
    </ButtonFilled>
    <ButtonFilled
      buttonType="secondary"
      circle
      :disabled="props.disabled"
      @click="$emit('rotateLeft')"
    >
      <IconBase :path="mdiRotateLeft" name="左回転" />
    </ButtonFilled>
    <ButtonFilled
      buttonType="secondary"
      circle
      :disabled="props.disabled"
      @click="$emit('rotateRight')"
    >
      <IconBase :path="mdiRotateRight" name="右回転" />
    </ButtonFilled>
  </div>
</template>

<style scoped>
.control-buttons {
  display: flex;
  gap: 12px;
}
</style>
