import React from 'react';
import { TextBox, Button as TextBoxButton } from 'devextreme-react/text-box';
import { NumberBox, Button as NumberBoxButton } from 'devextreme-react/number-box';
import { DateBox, Button as DateBoxButton } from 'devextreme-react/date-box';

const millisecondsInDay = 24 * 60 * 60 * 1000;
const currencyLabel = { 'aria-label': 'Multi Currency' };
const dateBoxLabel = { 'aria-label': 'Date' };
const passwordLabel = { 'aria-label': 'Password' };
function App() {
  const [passwordMode, setPasswordMode] = React.useState('password');
  const [currencyFormat, setCurrencyFormat] = React.useState('$ #.##');
  const [currencyValue, setCurrencyValue] = React.useState(14500.55);
  const [dateValue, setDateValue] = React.useState(new Date().getTime());
  const passwordButton = React.useMemo(
    () => ({
      icon: '../../../../images/icons/eye.png',
      type: 'default',
      onClick: () => {
        setPasswordMode((prevPasswordMode) => (prevPasswordMode === 'text' ? 'password' : 'text'));
      },
    }),
    [setPasswordMode],
  );
  const currencyButton = React.useMemo(
    () => ({
      text: '€',
      stylingMode: 'text',
      width: 32,
      elementAttr: {
        class: 'currency',
      },
      onClick: (e) => {
        if (e.component.option('text') === '$') {
          e.component.option('text', '€');
          setCurrencyFormat('$ #.##');
          setCurrencyValue((prevCurrencyValue) => prevCurrencyValue / 0.836);
        } else {
          e.component.option('text', '$');
          setCurrencyFormat('€ #.##');
          setCurrencyValue((prevCurrencyValue) => prevCurrencyValue * 0.836);
        }
      },
    }),
    [setCurrencyFormat, setCurrencyValue],
  );
  const todayButton = React.useMemo(
    () => ({
      text: 'Today',
      onClick: () => {
        setDateValue(new Date().getTime());
      },
    }),
    [setDateValue],
  );
  const prevDateButton = React.useMemo(
    () => ({
      icon: 'spinprev',
      stylingMode: 'text',
      onClick: () => {
        setDateValue((prevDateValue) => prevDateValue - millisecondsInDay);
      },
    }),
    [setDateValue],
  );
  const nextDateButton = React.useMemo(
    () => ({
      icon: 'spinnext',
      stylingMode: 'text',
      onClick: () => {
        setDateValue((prevDateValue) => prevDateValue + millisecondsInDay);
      },
    }),
    [setDateValue],
  );
  const onDateChanged = React.useCallback(
    (e) => {
      setDateValue(e.value);
    },
    [setDateValue],
  );
  const changeCurrency = React.useCallback(
    (data) => {
      setCurrencyValue(data.value);
    },
    [setCurrencyValue],
  );
  return (
    <React.Fragment>
      <div className="dx-fieldset">
        <div className="dx-field">
          <div className="dx-field-label">Password TextBox</div>
          <div className="dx-field-value">
            <TextBox
              placeholder="password"
              stylingMode="filled"
              defaultValue="password"
              inputAttr={passwordLabel}
              mode={passwordMode}
            >
              <TextBoxButton
                name="password"
                location="after"
                options={passwordButton}
              />
            </TextBox>
          </div>
        </div>
        <div className="dx-field">
          <div className="dx-field-label">Multi-currency NumberBox</div>
          <div className="dx-field-value">
            <NumberBox
              showClearButton={true}
              showSpinButtons={true}
              format={currencyFormat}
              value={currencyValue}
              inputAttr={currencyLabel}
              onValueChanged={changeCurrency}
            >
              <NumberBoxButton
                name="currency"
                location="after"
                options={currencyButton}
              />
              <NumberBoxButton name="clear" />
              <NumberBoxButton name="spins" />
            </NumberBox>
          </div>
        </div>
        <div className="dx-field">
          <div className="dx-field-label">Advanced DateBox</div>
          <div className="dx-field-value">
            <DateBox
              value={dateValue}
              stylingMode="outlined"
              inputAttr={dateBoxLabel}
              onValueChanged={onDateChanged}
            >
              <DateBoxButton
                name="today"
                location="before"
                options={todayButton}
              />
              <DateBoxButton
                name="prevDate"
                location="before"
                options={prevDateButton}
              />
              <DateBoxButton
                name="nextDate"
                location="after"
                options={nextDateButton}
              />
              <DateBoxButton name="dropDown" />
            </DateBox>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default App;
