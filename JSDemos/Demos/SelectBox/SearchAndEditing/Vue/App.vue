<template>
  <div id="selectbox-demo">
    <div class="widget-container">
      <div class="dx-fieldset">
        <div class="dx-fieldset-header">SearchBox</div>
        <div class="dx-field">
          <div class="dx-field-label">Product</div>
          <div class="dx-field-value">
            <DxSelectBox
              :search-enabled="true"
              :data-source="products"
              :input-attr="{ 'aria-label': 'Product' }"
              :search-mode="searchModeOption"
              :search-expr="searchExprOption"
              :search-timeout="searchTimeoutOption"
              :min-search-length="minSearchLengthOption"
              :show-data-before-search="showDataBeforeSearchOption"
              display-expr="Name"
              value-expr="ID"
            />
          </div>
        </div>
      </div>
      <div class="dx-fieldset">
        <div class="dx-fieldset-header">EditBox</div>
        <div class="dx-field">
          <div class="dx-field-label">Product</div>
          <div class="dx-field-value">
            <DxSelectBox
              v-model:selectedItem="editBoxValue"
              :value="product"
              :input-attr="{ 'aria-label': 'Simple Product' }"
              :accept-custom-value="true"
              :data-source="productsDataSource"
              display-expr="Name"
              value-expr="ID"
              @customItemCreating="customItemCreating($event)"
            />
          </div>
        </div>
        <div class="dx-field current-product">
          Current product:
          <span
            v-if="editBoxValue"
            class="current-value"
          >
            {{ editBoxValue.Name }} (ID: {{ editBoxValue.ID }})
          </span>
          <span
            v-else
            class="current-value"
          > Not selected </span>
        </div>
      </div>
    </div>
    <div class="options">
      <div class="caption">SearchBox Options</div>
      <div class="option">
        <div>Search Mode</div>
        <DxSelectBox
          v-model:value="searchModeOption"
          :input-attr="{ 'aria-label': 'Search Mode' }"
          :items="['contains', 'startswith']"
        />
      </div>
      <div class="option">
        <div>Search Expression</div>
        <DxSelectBox
          v-model:value="searchExprOption"
          :items="searchExprItems"
          :input-attr="{ 'aria-label': 'Search Expression' }"
          display-expr="name"
          value-expr="value"
        />
      </div>
      <div class="option">
        <div>Search Timeout</div>
        <DxNumberBox
          v-model:value="searchTimeoutOption"
          :min="0"
          :max="5000"
          :show-spin-buttons="true"
          :step="100"
          :input-attr="{ 'aria-label': 'Search Timeout' }"
        />
      </div>
      <div class="option">
        <div>Minimum Search Length</div>
        <DxNumberBox
          v-model:value="minSearchLengthOption"
          :min="0"
          :max="5"
          :show-spin-buttons="true"
          :input-attr="{ 'aria-label': 'Minimum Search Length' }"
        />
      </div>
      <div class="option">
        <DxCheckBox
          v-model:value="showDataBeforeSearchOption"
          text="Show Data Before Search"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { DxSelectBox } from 'devextreme-vue/select-box';
import { DxNumberBox } from 'devextreme-vue/number-box';
import { DxCheckBox } from 'devextreme-vue/check-box';
import DataSource from 'devextreme/data/data_source';
import { products, simpleProducts } from './data.js';

const productsDataSource = new DataSource({
  store: {
    data: simpleProducts,
    type: 'array',
    key: 'ID',
  },
});
const editBoxValue = ref(simpleProducts[0]);
const product = ref(simpleProducts[0].ID);
const searchModeOption = ref('contains');
const searchExprOption = ref('Name');
const searchTimeoutOption = ref(200);
const minSearchLengthOption = ref(0);
const showDataBeforeSearchOption = ref(false);
const searchExprItems = [
  {
    name: "'Name'",
    value: 'Name',
  },
  {
    name: "['Name', 'Category']",
    value: ['Name', 'Category'],
  },
];

function customItemCreating(data) {
  if (!data.text) {
    data.customItem = null;
    return;
  }

  const productIds = simpleProducts.map((item) => item.ID);
  const incrementedId = Math.max.apply(null, productIds) + 1;
  const newItem = {
    Name: data.text,
    ID: incrementedId,
  };

  data.customItem = productsDataSource
    .store()
    .insert(newItem)
    .then(() => productsDataSource.load())
    .then(() => newItem)
    .catch((error) => {
      throw error;
    });
}
</script>
<style scoped>
.widget-container {
  margin-right: 320px;
}

.current-product {
  padding-top: 11px;
}

.current-value {
  font-weight: bold;
}

.options {
  padding: 20px;
  background-color: rgba(191, 191, 191, 0.15);
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 260px;
}

.caption {
  font-weight: 500;
  font-size: 18px;
}

.option {
  margin-top: 10px;
}
</style>
