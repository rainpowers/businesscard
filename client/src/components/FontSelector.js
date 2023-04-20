import React from 'react';
import './styles/BusinessCard.css';

export default function FontSelector(props) {
  const fonts = ['Arial', 'Helvetica', 'Times New Roman', 'Courier New'];

  function handleChange(event) {
    props.onFontChange(event.target.value);
  }

  return (
    <div className="font-selector">
      <label htmlFor="font-selector">Font:</label>
      <select
        id="font-selector"
        value={props.font}
        onChange={handleChange}
      >
        {fonts.map((font) => (
          <option key={font} value={font}>
            {font}
          </option>
        ))}
      </select>
    </div>
  );
}