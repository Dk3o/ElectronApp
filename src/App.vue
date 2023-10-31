<script setup>
  import Sidebar from './components/Sidebar.vue'
  import Navbar from './components/Navbar.vue'
</script>

<template>
  <a-layout style="min-height: 100vh">
    <Sidebar />
    <a-layout style="height: 100vh">
      <Navbar />
      <a-layout-content style="margin: 0 16px; overflow: hidden;">
        <div :style="{ padding: '24px', minHeight: '360px' }">
          <RouterView />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}

.sub-menu {
    width: 200px;
    float: left;
    position: relative;
    left: -40px;
    top: -24px;
  }
</style>
