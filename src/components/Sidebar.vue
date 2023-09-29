<script setup>
    import {ref} from 'vue'
    // import {Menu, MenuItem, SubMenu} from 'ant-design-vue'
    import {
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    TeamOutlined,
    FileOutlined,
    } from '@ant-design/icons-vue';
    const collapsed = ref(false);
const selectedKeys = ref(['1']);
</script>
<template>
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <pie-chart-outlined />
          <span>Option 1</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
</template>

<style scoped>
    .logo {
        height: 32px;
        margin: 16px;
        background: rgba(255, 255, 255, 0.3);
    }
</style>