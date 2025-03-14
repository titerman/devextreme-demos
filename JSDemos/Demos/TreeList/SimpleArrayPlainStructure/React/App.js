import React from 'react';
import { TreeList, Column } from 'devextreme-react/tree-list';
import { employees } from './data.js';

const expandedRowKeys = [1];

const App = () => (
  <TreeList
    id="employees"
    dataSource={employees}
    rootValue={-1}
    defaultExpandedRowKeys={expandedRowKeys}
    showRowLines={true}
    showBorders={true}
    columnAutoWidth={true}
    keyExpr="ID"
    parentIdExpr="Head_ID"
  >
    <Column
      dataField="Title"
      caption="Position" />
    <Column
      dataField="Full_Name" />
    <Column
      dataField="City" />
    <Column
      dataField="State" />
    <Column
      dataField="Mobile_Phone" />
    <Column
      dataField="Hire_Date"
      dataType="date" />
  </TreeList>
);

export default App;
