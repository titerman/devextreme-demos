<template>
  <div>
    <DxScheduler
      time-zone="America/Los_Angeles"
      :data-source="dataSource"
      :current-date="currentDate"
      :views="views"
      :height="600"
      :start-day-hour="9"
      :first-day-of-week="1"
      current-view="workWeek"
    >
      <DxResource
        :data-source="assignees"
        :use-color-as-default="currentResource === 'Assignee'"
        field-expr="assigneeId"
        label="Assignee"
        :allow-multiple="true"
      />
      <DxResource
        :data-source="rooms"
        :use-color-as-default="currentResource === 'Room'"
        field-expr="roomId"
        label="Room"
      />
      <DxResource
        :data-source="priorities"
        :use-color-as-default="currentResource === 'Priority'"
        field-expr="priorityId"
        label="Priority"
      />
    </DxScheduler>
    <div class="options">
      <div class="caption">Use colors of:</div>
      <div class="option">
        <DxRadioGroup
          :items="resources"
          :value="currentResource"
          :on-value-changed="onRadioGroupValueChanged"
          layout="horizontal"
        />
      </div>
    </div>
  </div>
</template>
<script>

import DxScheduler, { DxResource } from 'devextreme-vue/scheduler';

import DxRadioGroup from 'devextreme-vue/radio-group';

import {
  resourcesList, data, priorities, assignees, rooms,
} from './data.js';

export default {
  components: {
    DxScheduler,
    DxResource,
    DxRadioGroup,
  },
  data() {
    return {
      views: ['workWeek'],
      currentDate: new Date(2021, 3, 27),
      currentResource: 'Assignee',
      dataSource: data,
      resources: resourcesList,
      assignees,
      priorities,
      rooms,
    };
  },
  methods: {
    onRadioGroupValueChanged(e) {
      this.radioGroupValue = e.value;
    },
  },
};
</script>

<style scoped>
  .options {
    padding: 20px;
    background-color: rgba(191, 191, 191, 0.15);
    margin-top: 20px;
  }

  .caption {
    font-size: 18px;
    font-weight: 500;
  }

  .option {
    margin-top: 10px;
    display: inline-block;
  }
</style>
