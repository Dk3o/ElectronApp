<script setup>
    import { reactive, ref, h, watch, computed } from 'vue'
    import axios from 'axios';
    import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
    import Tooltip  from '../components/Tooltip.vue';
    const placement = ref('left');
    const isLoading = ref(false)
    const form = reactive({
        projectName: '',
        projectId: '',
        vmChannel: '',
        userInitial: '',
        numberOfAgvs: '',
        numberOfAgvTypes: '',
    });
    const drawerWidth = ref(280)
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
        form.projectName = ''
        form.projectId = ''
        form.vmChannel = ''
        form.userInitial = ''
        form.numberOfAgvs = ''
        form.numberOfAgvTypes = ''
    };

    const tooltip = ref({
        projectId: "Go to http://sdfs01/Main.aspx then navigate to Project menu\nand look for the project.",
        vmChannel: "HYPER03-VM(XX)\ne.g (HYPER03-VM12)",
    })

    const createProject = async () => {
        response.value = ''
        if (
            !form.projectName ||
            !form.projectId ||
            !form.vmChannel ||
            !form.numberOfAgvs ||
            !form.numberOfAgvTypes ||
            !form.userInitial
            ) {
            return; // Exit the function without making the API request
        }

        try {
            isLoading.value = true
            const apiResponse = await axios.post('http://localhost:5000/api/create-project', {
                projectName: form.projectName,
                projectId: form.projectId,
                vmChannel: form.vmChannel,
                userInitial: form.userInitial,
                numberOfAgvs: form.numberOfAgvs,
                userInitial: form.userInitial,
            });
            response.value = apiResponse.data.message;
        } catch (error) {
            console.error('Error creating project:', error);
            response.value = 'Error creating project.';
        }
        finally {
            isLoading.value = false
        }
    };

    const indicator = h(LoadingOutlined, {
        style: {
            fontSize: '24px',
        },
        spin: true,
    });

    const childrenDrawer = ref(false);
    // if(from.projectName && form.numberOfAgvTypes) {
    //     childrenDrawer.value = true;
    // }

    // Watch for changes in form.numberOfAgvTypes
    watch(() => form.numberOfAgvTypes, (newValue) => {
        multiLevelOpen.value = newValue >= 2;
    });

    const multiLevelOpen = ref(false)

    const closeMultiLevel = () => {
        multiLevelOpen.value = false
        form.numberOfAgvTypes = ''
    }

    const agvTypes = computed(() => {
        const items = [];
        for (let i = 0; i < form.numberOfAgvTypes -1; i++) {
            items.push(i + 1);
        }
        return items;
    });
</script>

<template>
    <a-space wrap>
        <a-button type="link" @click="showDrawer">Create project <template #icon><PlusOutlined /></template></a-button>
    </a-space>
    <a-drawer
        title="Create a new project"
        :placement="placement"
        :width="drawerWidth"
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
            <a-form-item label="Initials" name="userInitial">
                <template class="form-item">
                    <a-input v-model:value="form.userInitial" style="width: 60px" />
                    <Tooltip :tooltipText="tooltip.userInitial"/>
                </template>
            </a-form-item>
            <a-divider />
                <a-form-item label="Number of AGVs" name="numberOfAgvs">
                    <template class="form-item">
                        <a-input-number v-model:value="form.numberOfAgvs" :min="0" />
                        <Tooltip :tooltipText="tooltip.numberOfAgvs"/>
                    </template>
                </a-form-item>
                <a-form-item label="Number of AGV types" name="numberOfAgvTypes">
                    <template class="form-item">
                        <a-input-number v-model:value="form.numberOfAgvTypes" :min="0"/>
                        <Tooltip :tooltipText="tooltip.numberOfAgvTypes"/>
                    </template>
                </a-form-item>
            <a-divider />
            <a-form-item>
                <a-space>
                    <!-- <a-input-number id="inputNumber" v-model:value="value" :min="1" :max="10" /> -->
                    <a-button @click="onClose">Cancel</a-button>
                    <template v-if="!isLoading">
                        <a-button type="primary" html-type="submit" @click="createProject">Create project</a-button>
                    </template>
                    <template v-else>
                        <a-button type="primary" disabled>Create project</a-button>
                    </template>
                </a-space>
            </a-form-item>
        </a-form>

        <template v-if="isLoading">
            <a-spin :indicator="indicator" />
        </template>

        <template v-if="response">
            <span>{{ response }}</span>
        </template>
            
        <template v-if="multiLevelOpen">
        <div class="multi-level">
                <div class="multi-level-wrapper">
                    <div class="multi-level-wrapper-body">
                        <div class="multi-level-header">
                            <div class="multi-level-header-title">
                                <button aria-label="Close" class="multi-level-close" @click="closeMultiLevel">
                                    <span role="img" aria-label="close" class="anticon anticon-close">
                                        <svg focusable="false" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true" fill-rule="evenodd" viewBox="64 64 896 896"><path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path></svg>
                                    </span>
                                </button>
                                <div class="multi-level-title">AGV types</div>
                            </div>
                        </div>
                        <div class="multi-level-body" style="padding-bottom: 80px;">
                            <a-form :model="form" :rules="rules" layout="vertical">
                                <a-form-item v-for="(i, index) in agvTypes"
                                    :key="index"
                                    :label="`AGVs of type ${i}`" 
                                    :name="`agvType${i}`"
                                >
                                    <template class="form-item">
                                        <a-input-number v-model:value="form.agvTypes" :min="0"/>
                                        <Tooltip v-if="index === 0" :tooltipText="tooltip.agvTypes"/>
                                    </template>
                                </a-form-item>
                            </a-form>
                        </div>
                    </div>
                </div>
            </div>  
        </template>
    </a-drawer>

</template>

<style scoped>
    .form-item {
        display: flex;
        justify-content: space-between;
        align-items: center; /* Align items vertically in the center */
    }

    .multi-level {
        position: fixed;
        inset: 0;
        z-index: 1000;
        pointer-events: none;
        left: 280px;
    }

    .multi-level-wrapper {
        width: 100%;
        height: 100%;
        overflow: auto;
        background: #ffffff;
        pointer-events: auto;
        width: 280px;
        box-shadow: -2px 0px 4px -1px #aaaaaa;
    }

    .multi-level-body {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }

    .multi-level .multi-level-header {
        display: flex;
        flex: 0;
        align-items: center;
        padding: 16px 24px;
        font-size: 16px;
        line-height: 1.5;
        border-bottom: 1px solid rgba(5, 5, 5, 0.06);
    }

    .multi-level .multi-level-header-title {
        display: flex;
        flex: 1;
        align-items: center;
        min-width: 0;
        min-height: 0;
    }

    .multi-level .multi-level-close {
        display: inline-block;
        margin-inline-end: 12px;
        color: rgba(0, 0, 0, 0.45);
        font-weight: 600;
        font-size: 16px;
        font-style: normal;
        line-height: 1;
        text-align: center;
        text-transform: none;
        text-decoration: none;
        background: transparent;
        border: 0;
        outline: 0;
        cursor: pointer;
        transition: color 0.2s;
        text-rendering: auto;
    }

    .multi-level .multi-level-title {
        flex: 1;
        margin: 0;
        color: rgba(0, 0, 0, 0.88);
        font-weight: 600;
        font-size: 16px;
        line-height: 1.5;
    }

    .multi-level .multi-level-body {
        flex: 1;
        min-width: 0;
        min-height: 0;
        padding: 24px;
        overflow: auto;
    }
</style>
