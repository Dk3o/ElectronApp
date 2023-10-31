<template>
    <a-menu theme="dark" mode="vertical" class="sub-menu">
      <a-menu-item v-for="(item, index) in submenu" :key="index">
        <router-link :to="item.route">{{ item.label }}</router-link>
      </a-menu-item>
    </a-menu>
  </template>

<script setup>
const { defineProps, defineEmits } = require('vue');

const props = defineProps({
  submenu: Array,
});

const emits = defineEmits();

// When submenu item is clicked, emit an event to parent
const handleMenuItemClick = (route) => {
  emits('menuItemClick', route);
};
</script>

<style scoped>
.sub-menu {
  width: 200px;
  float: left;
  position: relative;
  left: -40px;
  top: -24px;
}
</style>