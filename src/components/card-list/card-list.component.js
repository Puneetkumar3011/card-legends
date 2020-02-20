import React from 'react';

import { Card } from '../card/card.component';

import './card-list.styles.scss';

export const CardList = props => (
  <div className="row card-list">
    {props.legends.map(legend => (
      <div
        className="col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3"
        key={legend.id}
      >
        <Card legend={legend} />
      </div>
    ))}
  </div>
);
