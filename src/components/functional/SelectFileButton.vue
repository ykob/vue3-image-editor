<script setup lang="ts">
import { ref } from "vue";
import { ButtonFilled } from "../ui/";

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
    <ButtonFilled class="btn-outline" @click="clickButton">
      画像をアップロードする
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
