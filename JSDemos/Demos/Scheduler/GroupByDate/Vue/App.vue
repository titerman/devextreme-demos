<template>
  <div id="scheduler">
    <DxScheduler
      time-zone="America/Los_Angeles"
      :data-source="dataSource"
      :groups="groups"
      :group-by-date="groupByDate"
      :current-date="currentDate"
      :height="730"
      :start-day-hour="9"
      :end-day-hour="19"
      :cross-scrolling-enabled="true"
      current-view="week"
    >
      <DxView
        type="week"
        name="Week"
      />
      <DxView
        type="month"
        name="Month"
      />
      <DxResource
        :allow-multiple="false"
        :data-source="priorityData"
        field-expr="priorityId"
        label="Priority"
      />
    </DxScheduler>

    <div class="options">
      <div class="caption">Group by Date First</div>
      <div class="option">
        <DxSwitch
          v-model:value="groupByDate"
        />
      </div>
    </div>
  </div>
</template>
<script>

import { DxScheduler, DxResource, DxView } from 'devextreme-vue/scheduler';
import DxSwitch from 'devextreme-vue/switch';

import { data, priorityData } from './data.js';

export default {
  components: {
    DxScheduler,
    DxResource,
    DxSwitch,
    DxView,
  },
  data() {
    return {
      groupByDate: true,
      groups: ['priorityId'],
      currentDate: new Date(2021, 3, 21),
      dataSource: data,
      priorityData,
    };
  },
};
</script>

<style scoped>
#scheduler {
  display: flex;
  flex-direction: column;
}

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

.dx-scheduler-work-space-group-by-date .dx-scheduler-group-header-content {
  font-size: 11px;
}
</style>
