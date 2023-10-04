<script setup>
    import { reactive, ref, h } from 'vue'
    import axios from 'axios';
    import { PlusOutlined } from '@ant-design/icons-vue';
    import Tooltip  from '../components/Tooltip.vue';
    const placement = ref('left');

    const form = reactive({
        projectName: '',
        projectId: '',
        vmChannel: '',
        userInitial: '',
        numberOfAgvs: 0,
        numberOfAgvTypes : 0,
    });

    const response = ref('');

    const rules = {
        projectName: [
            {
                required: true,
                message: 'Please enter project name',
            },
        ],
        projectId: [
            {
                required: true,
                message: 'please enter project number',
            },
        ],
        vmChannel: [
            {
                required: true,
                message: 'Please enter virtual machine channel',
            },
        ],
        userInitial: [
            {
                required: true,
                message: 'Please enter your initial',
            },
        ],
        numberOfAgvs: [
            {
                required: true,
                message: 'Please enter number of AGVs',
            },
        ],
        numberOfAgvTypes: [
            {
                required: true,
                message: 'Please enter number of AGV types',
            },
        ],
    };
    const open = ref(false);
    const showDrawer = () => {
    open.value = true;
    };
    const onClose = () => {
    open.value = false;
    };

    const tooltip = ref({
        projectId: "Go to http://sdfs01/Main.aspx then navigate to Project menu\nand look for the project.",
        vmChannel: "HYPER03-VM(XX)\ne.g (HYPER03-VM12)",
    })

    const createProject = async () => {
        if (
            !form.projectName ||
            !form.projectId ||
            !form.vmChannel ||
            !form.userInitial
            ) {
            return; // Exit the function without making the API request
        }

        try {
            const apiResponse = await axios.post('http://localhost:5000/api/create-project', {
                projectName: form.projectName,
                projectId: form.projectId,
                vmChannel: form.vmChannel,
                userInitial: form.userInitial,
            });
            response.value = apiResponse.data.message;
        } catch (error) {
            console.error('Error creating project:', error);
            response.value = 'Error creating project.';
        }
    };
</script>

<template>
    <a-space wrap>
        <a-button type="link" @click="showDrawer">Create project <template #icon><PlusOutlined /></template></a-button>
    </a-space>
    <a-drawer
        title="Create a new project"
        :placement="placement"
        :width="280"
        :open="open"
        :body-style="{ paddingBottom: '80px' }"
        @close="onClose"
    >
        <a-form :model="form" :rules="rules" layout="vertical">
            <a-form-item label="Project name" name="projectName">
                <a-input v-model:value="form.projectName" placeholder="Please enter project name" />
            </a-form-item>
            <a-form-item label="Project number" name="projectId">
                <template class="form-item">
                    <a-input-number v-model:value="form.projectId" :min="0"/>
                    <Tooltip :tooltipText="tooltip.projectId"/>
                </template>
            </a-form-item>
            <a-form-item label="Virtual machine channel" name="vmChannel">
                <template class="form-item">
                    <a-input-number v-model:value="form.vmChannel" :min="0"/>
                    <Tooltip :tooltipText="tooltip.vmChannel"/>
                </template>
            </a-form-item>
            <a-form-item label="Initial" name="userInitial">
                <template class="form-item">
                    <a-input v-model:value="form.userInitial" />
                    <Tooltip :tooltipText="tooltip.userInitial"/>
                </template>
            </a-form-item>
            <a-form-item>
                <a-space>
                    <!-- <a-input-number id="inputNumber" v-model:value="value" :min="1" :max="10" /> -->
                    <a-button @click="onClose">Cancel</a-button>
                    <a-button type="primary" html-type="submit" @click="createProject">Create project</a-button>
                </a-space>
            </a-form-item>
            <span v-if="response">{{ response }}</span>

        </a-form>
            <div style="width: 170px">
                <a-progress :percent="30" size="small" />
                <a-progress :percent="50" size="small" status="active" />
                <a-progress :percent="70" size="small" status="exception" />
                <a-progress :percent="100" size="small" />
            </div>
    </a-drawer>
</template>

<style scoped>
    .form-item {
        display: flex;
        justify-content: space-between;
        align-items: center; /* Align items vertically in the center */
    }

</style>
