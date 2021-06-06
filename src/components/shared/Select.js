import React from 'react';

import ReactSelect from 'react-select';

const colourStyles = {
  control: (styles) => ({
    ...styles,
    border: 0,
    background: 'transparent',
    boxShadow: 'none',

    marginLeft: '-8px',
  }),
  option: (styles, state) =>
    state.isSelected ? { ...styles, background: 'lightblue' } : styles,
  indicatorSeparator: (styles) => ({
    ...styles,
    marginLeft: '11px',
  }),
};

export default function Select({ value, options, onChange, className }) {
  return (
    <ReactSelect
      value={options.filter((option) => option.value === value)}
      options={options}
      onChange={onChange}
      styles={colourStyles}
      isSearchable={false}
      className={className}
    />
  );
}
