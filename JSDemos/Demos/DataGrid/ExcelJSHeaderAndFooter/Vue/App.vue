<template>
  <DxDataGrid
    id="grid"
    :data-source="countries"
    key-expr="ID"
    :show-borders="true"
    @exporting="onExporting"
  >
    <DxExport :enabled="true"/>
    <DxColumn data-field="Country"/>
    <DxColumn data-field="Area"/>
    <DxColumn caption="Population">
      <DxColumn
        caption="Total"
        data-field="Population_Total"
        format="fixedPoint"
      />
      <DxColumn
        caption="Urban"
        data-field="Population_Urban"
        format="percent"
      />
    </DxColumn>
    <DxColumn caption="Nominal GDP">
      <DxColumn
        caption="Total, mln $"
        data-field="GDP_Total"
        format="fixedPoint"
        sort-order="desc"
      />
      <DxColumn caption="By Sector">
        <DxColumn
          :width="95"
          :format="gdpFormat"
          caption="Agriculture"
          data-field="GDP_Agriculture"
        />
        <DxColumn
          :width="80"
          :format="gdpFormat"
          caption="Industry"
          data-field="GDP_Industry"
        />
        <DxColumn
          :width="85"
          :format="gdpFormat"
          caption="Services"
          data-field="GDP_Services"
        />
      </DxColumn>
    </DxColumn>
  </DxDataGrid>
</template>

<script setup lang="ts">
import DxDataGrid, { DxColumn, DxExport } from 'devextreme-vue/data-grid';

import { Workbook } from 'exceljs';
// Our demo infrastructure requires us to use 'file-saver-es'.
// We recommend that you use the official 'file-saver' package in your applications.
import { saveAs } from 'file-saver-es';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { ExportingEvent } from 'devextreme/ui/data_grid';

import { countries } from './data.ts';

const gdpFormat = {
  type: 'percent',
  precision: 1,
};

const onExporting = (e: ExportingEvent) => {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet('CountriesPopulation');

  exportDataGrid({
    component: e.component,
    worksheet,
    topLeftCell: { row: 4, column: 1 },
  }).then((cellRange) => {
    // header
    const headerRow = worksheet.getRow(2);
    headerRow.height = 30;
    worksheet.mergeCells(2, 1, 2, 8);

    headerRow.getCell(1).value = 'Country Area, Population, and GDP Structure';
    headerRow.getCell(1).font = { name: 'Segoe UI Light', size: 22 };
    headerRow.getCell(1).alignment = { horizontal: 'center' };

    // footer
    const footerRowIndex = cellRange.to.row + 2;
    const footerRow = worksheet.getRow(footerRowIndex);
    worksheet.mergeCells(footerRowIndex, 1, footerRowIndex, 8);

    footerRow.getCell(1).value = 'www.wikipedia.org';
    footerRow.getCell(1).font = { color: { argb: 'BFBFBF' }, italic: true };
    footerRow.getCell(1).alignment = { horizontal: 'right' };
  }).then(() => {
    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'CountriesPopulation.xlsx');
    });
  });

  e.cancel = true;
};
</script>

<style>
#grid sup {
  font-size: 0.8em;
  vertical-align: super;
  line-height: 0;
}

.long-title h3 {
  font-family:
    'Segoe UI Light',
    'Helvetica Neue Light',
    'Segoe UI',
    'Helvetica Neue',
    'Trebuchet MS',
    Verdana;
  font-weight: 200;
  font-size: 28px;
  text-align: center;
  margin-bottom: 20px;
}
</style>
