import React from 'react';

import './search-box.styles.scss';

export const SearchBox = props => (
  <div className="has-search col-5 search-box">
    <span className="fa fa-search form-control-feedback"></span>
    <input
      type="text"
      className="form-control"
      placeholder="Search"
      onChange={props.onSearchChange}
    />
  </div>
);
