import React from 'react';
import withPrefix from 'with-prefix';
import './ColorItem.css';

export const ColorItem = ({ colorCode, displayName }) => (
  <div className="ColorItem" style={{ backgroundColor: colorCode }}>
    <div>{withPrefix(colorCode, '#')}</div>

    {displayName && <div>{displayName}</div>}
  </div>
);
