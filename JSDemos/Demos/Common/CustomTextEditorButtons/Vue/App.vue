<template>
  <div>
    <div class="dx-fieldset">
      <div class="dx-field">
        <div class="dx-field-label">Password TextBox</div>
        <div class="dx-field-value">
          <DxTextBox
            v-model:mode="passwordMode"
            value="password"
            :input-attr="{ 'aria-label': 'Password' }"
            styling-mode="filled"
            placeholder="password"
          >
            <DxTextBoxButton
              :options="passwordButton"
              name="password"
              location="after"
            />
          </DxTextBox>
        </div>
      </div>

      <div class="dx-field">
        <div class="dx-field-label">Multi-currency NumberBox</div>
        <div class="dx-field-value">
          <DxNumberBox
            v-model:value="currencyValue"
            :format="currencyFormat"
            :show-clear-button="true"
            :show-spin-buttons="true"
            :input-attr="{ 'aria-label': 'Currency Value' }"
          >
            <DxNumberBoxButton
              :options="currencyButton"
              name="currency"
              location="after"
            />
            <DxNumberBoxButton name="clear"/>
            <DxNumberBoxButton name="spins"/>
          </DxNumberBox>
        </div>
      </div>

      <div class="dx-field">
        <div class="dx-field-label">Advanced DateBox</div>
        <div class="dx-field-value">
          <DxDateBox
            v-model:value="dateValue"
            :input-attr="{ 'aria-label': 'Date' }"
            styling-mode="outlined"
          >
            <DxDateBoxButton
              :options="todayButton"
              name="today"
              location="before"
            />
            <DxDateBoxButton
              :options="prevDateButton"
              name="prevDate"
              location="before"
            />
            <DxDateBoxButton
              :options="nextDateButton"
              name="nextDate"
              location="after"
            />
            <DxDateBoxButton name="dropDown"/>
          </DxDateBox>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { DxTextBox, DxButton as DxTextBoxButton } from 'devextreme-vue/text-box';
import { DxNumberBox, DxButton as DxNumberBoxButton } from 'devextreme-vue/number-box';
import { DxDateBox, DxButton as DxDateBoxButton } from 'devextreme-vue/date-box';

const millisecondsInDay = 24 * 60 * 60 * 1000;
const passwordMode = ref('password');
const passwordButton = {
  icon: '../../../../images/icons/eye.png',
  type: 'default',
  onClick: () => {
    passwordMode.value = passwordMode.value === 'text' ? 'password' : 'text';
  },
};
const currencyFormat = ref('$ #.##');
const currencyValue = ref(14500.55);
const currencyButton = {
  text: '€',
  stylingMode: 'text',
  width: 32,
  elementAttr: {
    class: 'currency',
  },
  onClick: (e) => {
    if (e.component.option('text') === '$') {
      e.component.option('text', '€');
      currencyFormat.value = '$ #.##';
      currencyValue.value /= 0.836;
    } else {
      e.component.option('text', '$');
      currencyFormat.value = '€ #.##';
      currencyValue.value *= 0.836;
    }
  },
};
const dateValue = ref(new Date().getTime());
const todayButton = {
  text: 'Today',
  onClick: () => {
    dateValue.value = new Date().getTime();
  },
};
const prevDateButton = {
  icon: 'spinprev',
  stylingMode: 'text',
  onClick: () => {
    dateValue.value -= millisecondsInDay;
  },
};
const nextDateButton = {
  icon: 'spinnext',
  stylingMode: 'text',
  onClick: () => {
    dateValue.value += millisecondsInDay;
  },
};
</script>
<style>
.dx-fieldset {
  min-height: 560px;
  width: 560px;
  margin: 0 auto;
}

.currency {
  min-width: 32px;
}

.dx-button.currency .dx-button-content {
  font-size: 120%;
  padding-left: 5px;
  padding-right: 5px;
}

</style>
