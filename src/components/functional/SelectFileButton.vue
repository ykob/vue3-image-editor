<script setup lang="ts">
import { ref } from "vue";
import { mdiImageOutline } from "@mdi/js";
import { ButtonFilled, IconBase } from "../ui/";

defineEmits(["changeFile"]);

const input = ref<HTMLInputElement | null>(null);
const clickButton = () => {
  input.value?.click();
};
</script>

<template>
  <div class="file-button">
    <input
      accept="image/*"
      ref="input"
      type="file"
      @change="$emit('changeFile', $event)"
    />
    <ButtonFilled
      buttonType="secondary"
      class="btn-outline"
      @click="clickButton"
    >
      <IconBase :path="mdiImageOutline" name="" />
      ベースとなる画像を選択する
    </ButtonFilled>
  </div>
</template>

<style scoped>
input {
  visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
