import React from 'react';
import HtmlEditor, {
  TableContextMenu,
  TableResizing,
  Toolbar,
  Item,
} from 'devextreme-react/html-editor';
import { CheckBox } from 'devextreme-react/check-box';
import { markup } from './data.js';

export default function App() {
  const [allowResizing, setAllowResizing] = React.useState(true);
  const [contextMenuEnabled, setContextMenuEnabled] = React.useState(true);

  const tableResizingChanged = React.useCallback((e) => {
    setAllowResizing(e.value);
  }, [setAllowResizing]);

  const tableContextMenuChanged = React.useCallback((e) => {
    setContextMenuEnabled(e.value);
  }, [setContextMenuEnabled]);

  return (
    <div className="widget-container">
      <HtmlEditor height="750px" defaultValue={markup}>
        <TableContextMenu enabled={contextMenuEnabled} />
        <TableResizing enabled={allowResizing} />
        <Toolbar>
          <Item name="bold" />
          <Item name="color" />
          <Item name="separator" />
          <Item name="alignLeft" />
          <Item name="alignCenter" />
          <Item name="alignRight" />
          <Item name="separator" />
          <Item name="insertTable" />
          <Item name="insertHeaderRow" />
          <Item name="insertRowAbove" />
          <Item name="insertRowBelow" />
          <Item name="separator" />
          <Item name="insertColumnLeft" />
          <Item name="insertColumnRight" />
          <Item name="separator" />
          <Item name="deleteColumn" />
          <Item name="deleteRow" />
          <Item name="deleteTable" />
          <Item name="separator" />
          <Item name="cellProperties" />
          <Item name="tableProperties" />
        </Toolbar>
      </HtmlEditor>
      <div className="options">
        <div className="caption">Options</div>
        <div className="option">
          <CheckBox
            text="Allow Table Resizing"
            value={allowResizing}
            onValueChanged={tableResizingChanged}
          />
        </div>
        <div className="option">
          <CheckBox
            text="Enable Table Context Menu"
            value={contextMenuEnabled}
            onValueChanged={tableContextMenuChanged}
          />
        </div>
      </div>
    </div>
  );
}
