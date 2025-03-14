<template>
  <div>
    <DxDataGrid
      id="gridContainer"
      :data-source="dataSource"
      :show-borders="true"
      :focused-row-enabled="true"
      :auto-navigate-to-focused-row="autoNavigateToFocusedRow"
      v-model:focused-row-key="focusedRowKey"
      @focused-row-changing="onFocusedRowChanging"
      @focused-row-changed="onFocusedRowChanged"
    >
      <DxColumn
        data-field="Task_ID"
        :width="80"
      />
      <DxColumn
        caption="Start Date"
        data-field="Task_Start_Date"
        data-type="date"
      />
      <DxColumn
        caption="Assigned To"
        data-field="ResponsibleEmployee.Employee_Full_Name"
        data-type="date"
        :allow-sorting="false"
      />
      <DxColumn
        caption="Subject"
        data-field="Task_Subject"
        :width="350"
      />
      <DxColumn
        caption="Status"
        data-field="Task_Status"
      />

      <DxPaging :page-size="10"/>
    </DxDataGrid>

    <div class="task-info">
      <div class="info">
        <div id="taskSubject">{{ taskSubject }}</div>
        <p
          id="taskDetails"
          v-html="taskDetails"
        />
      </div>
      <div class="progress">
        <span id="taskStatus">{{ taskStatus }}</span>
        <span id="taskProgress">{{ taskProgress }}</span>
      </div>
    </div>

    <div class="options">
      <div class="caption">Options</div>
      <div class="options-container">
        <div class="option">
          <span>Focused Row Key </span>
          <DxNumberBox
            id="taskId"
            :min="1"
            :max="183"
            :step="0"
            v-model:value="focusedRowKey"
            :input-attr="{ 'aria-label': 'Focused Row Key' }"
          />
        </div>
        <div class="option">
          <DxCheckBox
            :text="'Auto Navigate To Focused Row'"
            v-model:value="autoNavigateToFocusedRow"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { DxDataGrid, DxColumn, DxPaging } from 'devextreme-vue/data-grid';
import DxNumberBox from 'devextreme-vue/number-box';
import DxCheckBox from 'devextreme-vue/check-box';

import { Options as DataSourceOptions } from 'devextreme/data/data_source';
import { FocusedRowChangedEvent, FocusedRowChangingEvent } from 'devextreme/ui/data_grid';

import 'devextreme/data/odata/store';
import { Task } from './data.ts';

const taskSubject = ref('');
const taskDetails = ref('');
const taskStatus = ref('');
const taskProgress = ref('');

const focusedRowKey = ref(117);
const autoNavigateToFocusedRow = ref(true);

const dataSource: DataSourceOptions = {
  store: {
    type: 'odata',
    key: 'Task_ID',
    url: 'https://js.devexpress.com/Demos/DevAV/odata/Tasks',
  },
  expand: 'ResponsibleEmployee',
  select: [
    'Task_ID',
    'Task_Subject',
    'Task_Start_Date',
    'Task_Status',
    'Task_Description',
    'Task_Completion',
    'ResponsibleEmployee/Employee_Full_Name',
  ],
};

const onFocusedRowChanging = (e: FocusedRowChangingEvent) => {
  const rowsCount = e.component.getVisibleRows().length;
  const pageCount = e.component.pageCount();
  const pageIndex = e.component.pageIndex();
  const key = e.event?.key;

  if (key && e.prevRowIndex === e.newRowIndex) {
    if (e.newRowIndex === rowsCount - 1 && pageIndex < pageCount - 1) {
      e.component.pageIndex(pageIndex + 1).then(() => {
        e.component.option('focusedRowIndex', 0);
      });
    } else if (e.newRowIndex === 0 && pageIndex > 0) {
      e.component.pageIndex(pageIndex - 1).then(() => {
        e.component.option('focusedRowIndex', rowsCount - 1);
      });
    }
  }
};

const onFocusedRowChanged = (e: FocusedRowChangedEvent<Task>) => {
  const data = e.row!.data!;

  taskSubject.value = data.Task_Subject;
  taskDetails.value = data.Task_Description;
  taskStatus.value = data.Task_Status;
  taskProgress.value = data.Task_Completion ? `${data.Task_Completion}%` : '';
};
</script>
