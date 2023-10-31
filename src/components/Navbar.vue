
<script setup>
    import { h, ref } from 'vue';
    import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue';
    const current = ref([]);
    const items = ref([
        {
            key: 'mail',
            icon: () => h(MailOutlined),
            label: 'Navigation One',
            title: 'Navigation One',
        },
        {
            key: 'app',
            icon: () => h(AppstoreOutlined),
            label: 'Navigation Two',
            title: 'Navigation Two',
        },
        {
            key: 'sub1',
            icon: () => h(SettingOutlined),
            label: 'Navigation Three - Submenu',
            title: 'Navigation Three - Submenu',
            children: [
            {
                type: 'group',
                label: 'Item 1',
                children: [
                {
                    label: 'Option 1',
                    key: 'setting:1',
                },
                {
                    label: 'Option 2',
                    key: 'setting:2',
                },
                ],
            },
            {
                type: 'group',
                label: 'Item 2',
                children: [
                {
                    label: 'Option 3',
                    key: 'setting:3',
                },
                {
                    label: 'Option 4',
                    key: 'setting:4',
                },
                ],
            },
            ],
        },
    ]);
</script>

<template>
    <a-menu v-model:selectedKeys="current" theme="dark" mode="horizontal" :items="items" style="border-bottom: 1px solid #fff;"/>
</template>