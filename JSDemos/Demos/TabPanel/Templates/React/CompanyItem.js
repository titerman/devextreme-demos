import React from 'react';

function CompanyItem({ data }) {
  const company = data;
  return (
    <div>
      <div className="tabpanel-item">
        <div>
          <p>
            <b>{ company.City } </b>
            (<span>{ company.State }</span>)
          </p>
          <p>
            <span>{ company.Zipcode } </span>
            <span>{ company.Address }</span>
          </p>
        </div>
        <div>
          <p>
            Phone: <b>{ company.Phone }</b>
          </p>
          <p>
            Fax: <b>{ company.Fax }</b>
          </p>
          <p>
            Website: <a
              href={company.Website}
              rel="noreferrer"
              target="_blank">
              { company.Website }
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CompanyItem;
