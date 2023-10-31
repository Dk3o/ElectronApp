<script setup>
    import { reactive, ref, h, watch, computed, watchEffect, onMounted } from 'vue'
    import axios from 'axios';
    import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';

    import Tooltip  from '../components/Tooltip.vue';

    const placement = ref('left');
    const isLoading = ref(false)
    const agvTypesInputs = ref([])
    const form = reactive({
        projectName: '',
        projectId: '',
        vmChannel: '',
        userInitial: '',
        numberOfAgvs: '',
        numberOfAgvTypes: '',
        agvTypes: Array(agvTypesInputs.value.length).fill(null),
        zipProject: false
    });
 
    const drawerWidth = ref(280)
    const response = ref('');
    const projects = ref([]);

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
        agvTypes: [
            {
            required: true,
            message: 'Please enter number of AGVs',
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

        closeMultiLevel()
    };

    const tooltip = ref({
        projectId: "Go to http://sdfs01/Main.aspx then navigate to Project menu\nand look for the project.",
        vmChannel: "HYPER03-VM(XX)\ne.g (HYPER03-VM12)",
    })

    onMounted(async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/get-projects');
            projects.value = response.data.projects;
            console.log(response)
            console.log(response.data)
            console.log(response.data.projects)
            console.log(projects.value)
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    });

    const createProject = async () => {
        response.value = ''
        const sum = [...form.agvTypes].reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        const lastAgvType = form.numberOfAgvs - sum;
        if (form.numberOfAgvs > sum) {
            form.agvTypes = [...form.agvTypes, lastAgvType];
        }

        if (form.numberOfAgvs === form.numberOfAgvTypes) {
            form.agvTypes = Array.from({ length: form.numberOfAgvTypes }, (_, index) => index + 1);
        }

        if(sum > form.numberOfAgvs)
        {
            console.log("not enough AGVs")
        }

        if (
            !form.projectName ||
            !form.projectId ||
            !form.vmChannel ||
            !form.userInitial ||
            !form.numberOfAgvs ||
            !form.numberOfAgvTypes ||
            form.agvTypes.some(value => value === null || value === undefined || value === '') ||
            form.agvTypes.length !== form.numberOfAgvTypes ||
            sum > form.numberOfAgvs
            ) {
            form.agvTypes = []
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
                agvTypes: form.agvTypes,
                numberOfAgvTypes: form.numberOfAgvTypes,
                zipProject: form.zipProject,
            });
            response.value = apiResponse.data.message;
            const newProject = { name: form.projectName };
            projects.value.push(newProject);
        } catch (error) {
            console.error('Error creating project:', error);
            response.value = 'Error creating project.';
        }
        finally {
            isLoading.value = false
            form.agvTypes = []
        }
    };

    const deleteProject = async (record) => {
        console.log(record)
        try {
            const apiResponse = await axios.post('http://localhost:5000/api/delete-project', {
                name: record.name,
            });
            response.value = apiResponse.data.message;
        } catch (error) {
            console.error('Error deleting project:', error);
            response.value = 'Error deleting project.';
        }
        finally {
            return
        }
    }

    const indicator = h(LoadingOutlined, {
        style: {
            fontSize: '24px',
        },
        spin: true,
    });

    // Watch for changes in form.numberOfAgvTypes
    watch(() => form.numberOfAgvTypes, (newValue) => {

        if (newValue >= 2 && newValue < form.numberOfAgvs) {
            multiLevelOpen.value = true;
        } else {
            multiLevelOpen.value = false;
            form.agvTypes = [];
        }
        // multiLevelOpen.value = newValue >= 2;
        // // if(form.numberOfAgvTypes == null || form.numberOfAgvTypes === form.numberOfAgvs) {
        // //     multiLevelOpen.value = false
        // //     form.agvTypes = []
        // // }
    });
    watch(() => form.numberOfAgvs, (newValue) => {

        if (newValue > form.numberOfAgvTypes && form.numberOfAgvTypes >= 2 ) {
            multiLevelOpen.value = true;
        } else {
            multiLevelOpen.value = false;
            form.agvTypes = [];
        }
        // multiLevelOpen.value = newValue >= 2;
        // // if(form.numberOfAgvTypes == null || form.numberOfAgvTypes === form.numberOfAgvs) {
        // //     multiLevelOpen.value = false
        // //     form.agvTypes = []
        // // }
        });

    const multiLevelOpen = ref(false)

    const closeMultiLevel = () => {
        multiLevelOpen.value = false
        form.numberOfAgvTypes = ''
        form.agvTypes = []
    }

    const agvTypes = computed(() => {
        const items = [];
        for (let i = 0; i < form.numberOfAgvTypes -1; i++) {
            items.push(i);
        }
        return items;
    });

//     const data = [
//   {
//     key: '1',
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//     tags: ['nice', 'developer'],
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//     tags: ['loser'],
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sidney No. 1 Lake Park',
//     tags: ['cool', 'teacher'],
//   },
// ];
const columns = ref([
  {
    title: 'Project',
    dataIndex: 'Project',
    key: 'project',
    resizable: false,

  },
  {
    key: 'action',
    width: 150,
  },
]);

</script>

<template>
    <h1>Project setup</h1>
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
                <span style="display: flex; padding-bottom: 8px">Zip project</span>
                <a-switch v-model:checked="form.zipProject" />
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
                                <a-form-item v-for="(item, index) in agvTypes"
                                    :key="index"
                                    :label="`AGVs of type ${index + 1}`"
                                    name="agvTypes"
                                >
                                    <template class="form-item">
                                        <a-input-number v-model:value="form.agvTypes[index]" :min="0" :id="index.toString()"/>
                                        <Tooltip v-if="index === 0" :tooltipText="tooltip.agvTypes"/>
                                    </template>
                                </a-form-item>
                            </div>
                        </div>
                    </div>
                </div>  
            </template>
                
        </a-form>

        <template v-if="isLoading">
            <div class="in-process">
                <a-spin :indicator="indicator" style="margin: 10px 0"/>
                <span>In progress</span>
                <span>Please wait it can take a while...</span>
            </div>
        </template>

        <template v-if="response">
            <span>{{ response }}</span>
        </template>
    </a-drawer>
    <a-table :columns="columns" :data-source="projects">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'project'">
                <a>
                {{ record.name }}
                </a>
            </template>
            
            <template v-if="column.key === 'action'">
                <a-divider type="vertical" />
                <span>
                <a @click="deleteProject(record)">Delete</a>
                <!-- <a class="ant-dropdown-link">
                    More actions
                    <down-outlined />
                </a> -->
                </span>
            </template>
        </template>
    </a-table>
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

    .in-process {
        display: flex;
        flex-direction: column;
        align-items: center;
    }


</style>
