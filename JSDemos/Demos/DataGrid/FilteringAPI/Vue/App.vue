<template>
  <div>
    <div class="left-side">
      <div class="logo">
        <img :src="'../../../../images/logo-devav.png'">
        <img :src="'../../../../images/logo-tasks.png'">
      </div>
    </div>
    <div class="right-side">
      <DxSelectBox
        :items="statuses"
        :value="statuses[0]"
        :input-attr="{ 'aria-label': 'Status' }"
        @value-changed="onValueChanged"
      />
    </div>

    <DxDataGrid
      id="gridContainer"
      ref="dataGridRef"
      :data-source="dataSource"
      :column-auto-width="true"
      :show-borders="true"
    >
      <DxColumn
        :width="80"
        data-field="Task_ID"
      />
      <DxColumn
        data-field="Task_Start_Date"
        data-type="date"
        caption="Start Date"
      />
      <DxColumn
        :allow-sorting="false"
        data-field="ResponsibleEmployee.Employee_Full_Name"
        css-class="employee"
        caption="Assigned To"
      />
      <DxColumn
        :width="350"
        data-field="Task_Subject"
        caption="Subject"
      />
      <DxColumn
        data-field="Task_Status"
        caption="Status"
      />
    </DxDataGrid>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import {
  DxColumn,
  DxDataGrid,
} from 'devextreme-vue/data-grid';
import DxSelectBox from 'devextreme-vue/select-box';
import 'devextreme/data/odata/store';
import { ValueChangedEvent } from 'devextreme/ui/select_box';
import { Options as DataSourceOptions } from 'devextreme/data/data_source';

const dataSource: DataSourceOptions = {
  store: {
    type: 'odata',
    url: 'https://js.devexpress.com/Demos/DevAV/odata/Tasks',
    key: 'Task_ID',
  },
  expand: 'ResponsibleEmployee',
  select: [
    'Task_ID',
    'Task_Subject',
    'Task_Start_Date',
    'Task_Status',
    'ResponsibleEmployee/Employee_Full_Name',
  ],
};
const statuses = ['All', 'Not Started', 'In Progress', 'Need Assistance', 'Deferred', 'Completed'];
const dataGridRef = ref<DxDataGrid | null>(null);

const onValueChanged = ({ value }: ValueChangedEvent) => {
  const dataGrid = dataGridRef.value!.instance!;

  if (value === 'All') {
    dataGrid.clearFilter();
  } else {
    dataGrid.filter(['Task_Status', '=', value]);
  }
};
</script>
<style scoped>
.right-side {
  position: absolute;
  right: 1px;
  top: 6px;
}

.logo {
  line-height: 48px;
}

.logo img {
  vertical-align: middle;
  margin: 0 5px;
}

.logo img:first-child {
  margin-right: 9px;
}

.dx-row.dx-data-row .employee {
  color: #bf4e6a;
  font-weight: bold;
}

#gridContainer {
  margin: 20px 0;
  height: 400px;
}
</style>
