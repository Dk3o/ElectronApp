<script setup>
    import {ref, watch} from 'vue'
    import { useRoute } from 'vue-router';
    // import {Menu, MenuItem, SubMenu} from 'ant-design-vue'
    import logo from '../assets/images/max-agv_logo_medium.png'
    import {
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    TeamOutlined,
    FileOutlined,
    } from '@ant-design/icons-vue';
    const collapsed = ref(false);
    const selectedKeys = ref(['0']);

    const route = useRoute();
    const menuItems = ['/maxsystem', '/test']; // Paths of your menu items

  watch(route, () => {
    const currentPath = route.path;
    selectedKeys.value = menuItems.includes(currentPath) ? [currentPath] : [];
  });

</script>
<template>
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <router-link to="/">
        <div class="logo">
          <img :src="logo" />
        </div>
      </router-link>
      
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <router-link to="/maxsystem">
            <pie-chart-outlined />
            <span>Max System</span>
          </router-link>
        </a-menu-item>
        
        <a-menu-item key="2">
          <router-link to="/test">
            <pie-chart-outlined />
            <span>Test</span>
          </router-link>
        </a-menu-item>

      </a-menu>
    </a-layout-sider>
</template>

<style scoped>
    .logo {
        padding-left: 12px;
        height: 32px;
        margin: 16px;
        width: auto;
    }

    .logo img {
      height: 32px;
    }

    ul > li {
      background-color: transparent !important;
    }
</style>