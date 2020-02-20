import React from 'react';

import './card.styles.scss';

export const Card = ({ legend }) => (
  <div className="menu-item">
    <div className="image-parent">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${legend.imageUrl})`
        }}
      ></div>
    </div>
    <div className="content">
      <div className="row">
        <span className="label">Name:</span>
        <span className="text">{legend.name}</span>
      </div>
      <div className="row">
        <span className="label">Text:</span>
        <span className="text" title={legend.text}>
          {legend.text}
        </span>
      </div>
      <div className="row">
        <span className="label">Type:</span>
        <span className="text">{legend.type}</span>
      </div>
    </div>
  </div>
);
