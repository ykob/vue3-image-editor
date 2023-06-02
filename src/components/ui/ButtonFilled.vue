<script setup lang="ts">
defineEmits(["click"]);
</script>

<template>
  <button class="button-filled" @click="$emit('click', $event)">
    <slot />
  </button>
</template>

<style scoped>
.button-filled {
  border-radius: 9999px;
  color: #fff;
  background-color: #000;
}
</style>
