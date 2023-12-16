// SizeSelector.js

import React from 'react';

const SizeSelector = ({ sizes, selectedSize, onSizeChange }) => {
  return (
    <div className="d-flex gap-2">
      {sizes.map((size) => (
        <label key={size}>
          <input
            type="radio"
            name="size"
            value={size}
            checked={selectedSize === size}
            onChange={() => onSizeChange(size)}
          />
          {size}
        </label>
      ))}
    </div>
  );
};

export default SizeSelector;
