<template>
  <div class="widget-container">
    <DxHtmlEditor
      v-model:value="value"
    >
      <DxToolbar>
        <DxItem name="undo"/>
        <DxItem name="redo"/>
        <DxItem name="separator"/>
        <DxItem
          name="header"
          :accepted-values="headerValues"
          :options="headerOptions"
        />
        <DxItem name="separator"/>
        <DxItem name="bold"/>
        <DxItem name="italic"/>
        <DxItem name="strike"/>
        <DxItem name="underline"/>
        <DxItem name="separator"/>
        <DxItem name="alignLeft"/>
        <DxItem name="alignCenter"/>
        <DxItem name="alignRight"/>
        <DxItem name="alignJustify"/>
        <DxItem name="separator"/>
        <DxItem
          :options="toolbarButtonOptions"
          widget="dxButton"
        />
      </DxToolbar>
    </DxHtmlEditor>
    <DxPopup
      :show-title="true"
      v-model:visible="popupVisible"
      title="Markup"
    >
      {{ value }}
    </DxPopup>
  </div>
</template>
<script>

import {
  DxHtmlEditor,
  DxToolbar,
  DxItem,
} from 'devextreme-vue/html-editor';
import { DxPopup } from 'devextreme-vue/popup';
import { markup } from './data.js';

export default {
  components: {
    DxHtmlEditor,
    DxToolbar,
    DxItem,
    DxPopup,
  },
  data() {
    return {
      value: markup,
      popupVisible: false,
      sizeValues: ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt'],
      fontValues: ['Arial', 'Courier New', 'Georgia', 'Impact', 'Lucida Console', 'Tahoma', 'Times New Roman', 'Verdana'],
      headerValues: [false, 1, 2, 3, 4, 5],
      headerOptions: { inputAttr: { 'aria-label': 'Header' } },
      toolbarButtonOptions: {
        text: 'Show markup',
        stylingMode: 'text',
        onClick: () => {
          this.popupVisible = true;
        },
      },
    };
  },
};
</script>
<style>
.dx-htmleditor-content img {
  vertical-align: middle;
  padding-right: 10px;
}
</style>
