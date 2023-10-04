<script setup>
import { ref, computed } from 'vue';
import { InfoCircleOutlined } from '@ant-design/icons-vue';

const { tooltipText } = defineProps(['tooltipText']);
const open = ref(false);

const toggleTooltip = () => {
    open.value = !open.value;
};

const formattedTooltipText = computed(() => {
  // Replace URLs with clickable links
  if (tooltipText) {
    return tooltipText.replace(/(http[s]?:\/\/\S+)/g, '<a class="tooltip-link" href="$1" target="_blank">$1</a>');
  }
  return '';
});
</script>

<template>
    <a-popover v-model:open="open" trigger="click">
      <template #content>
        <div class="popover-content-text" v-html="formattedTooltipText"></div>
      </template>
      <InfoCircleOutlined class="tooltip-icon" @click="toggleTooltip" />
    </a-popover>
  </template>

<style scoped>
    .popover-content-text {
        color: #fff;
        font-size: 0.8em;
    }
    .tooltip-icon {
        cursor: pointer;
        margin-left: 8px;
        font-size: 16px;
    }
    .popover-content-text {
        white-space: pre-line;
    }
    .tooltip-link {
        color: #8c8c8c !important; /* Lighter color for the links */
        text-decoration: underline !important; /* Add underline to the links */
    }
</style>