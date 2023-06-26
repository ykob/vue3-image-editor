<script setup lang="ts">
import { mdiGithub, mdiTwitter } from "@mdi/js";
import { ButtonFilled, IconBase } from "../ui/";
</script>

<template>
  <div class="content-header">
    <div class="content-header-in">
      <h1>Vue3 Image Editor</h1>
      <div class="buttons">
        <ButtonFilled
          circle
          href="https://github.com/ykob/vue3-image-editor"
          target="_blank"
          size="sm"
          tag="a"
        >
          <IconBase :path="mdiGithub" name="GitHub" size="sm" />
        </ButtonFilled>
        <ButtonFilled
          circle
          href="https://twitter.com/ykob0123"
          target="_blank"
          size="sm"
          tag="a"
        >
          <IconBase :path="mdiTwitter" name="Twitter" size="sm" />
        </ButtonFilled>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content-header {
  container-type: inline-size;
}
.content-header-in {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
}
@container (width <= 415px) {
  .content-header-in {
    flex-direction: column;
  }
}
h1 {
  line-height: 1;
  margin-block: 0;
  font-size: 32px;
  letter-spacing: 0.06em;
}
.buttons {
  display: flex;
  gap: 8px;
}
</style>
