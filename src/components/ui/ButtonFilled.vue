<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  circle: {
    type: Boolean,
    required: false,
    default: false,
  },
  size: {
    type: String,
    required: false,
    default: "md",
    validator: (value: string) => {
      return ["sm", "md", "lg"].includes(value);
    },
  },
});

const classes = computed(() => {
  return [
    "button-filled",
    `button-filled--${props.size}`,
    props.circle ? "button-filled--circle" : "button-filled--basic",
  ]
});

defineEmits(["click"]);
</script>

<template>
  <button :class="classes" @click="$emit('click', $event)">
    <slot />
  </button>
</template>

<style scoped>
.button-filled {
  appearance: none;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: #fff;
  background-color: #00c;
  border: 0;
  border-radius: 9999px;
}
.button-filled--sm {
  height: 32px;
}
.button-filled--md {
  height: 44px;
}
.button-filled--lg {
  height: 56px;
}
.button-filled--basic {
  letter-spacing: 0.12em;
}
.button-filled--basic.button-filled--sm {
  padding-inline: 12px;
}
.button-filled--basic.button-filled--md {
  padding-inline: 20px;
}
.button-filled--basic.button-filled--lg {
  padding-inline: 28px;
}
.button-filled--circle.button-filled--sm {
  width: 32px;
}
.button-filled--circle.button-filled--md {
  width: 44px;
}
.button-filled--circle.button-filled--lg {
  width: 56px;
}
</style>
