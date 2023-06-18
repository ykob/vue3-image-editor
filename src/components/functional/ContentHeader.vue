<script setup lang="ts">
import { mdiGithub, mdiTwitter } from "@mdi/js";
import { ButtonFilled, IconBase } from "../ui/";
</script>

<template>
  <div class="content-header">
    <h1>Vue3 Image Editor</h1>
    <div class="buttons">
      <ButtonFilled circle href="" target="_blank" size="sm">
        <IconBase :path="mdiGithub" name="GitHub" size="sm" />
      </ButtonFilled>
      <ButtonFilled circle href="" target="_blank" size="sm">
        <IconBase :path="mdiTwitter" name="Twitter" size="sm" />
      </ButtonFilled>
    </div>
  </div>
</template>

<style scoped>
.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
}
h1 {
  margin-block: 0;
  letter-spacing: 0.06em;
}
.buttons {
  display: flex;
  gap: 8px;
}
</style>
