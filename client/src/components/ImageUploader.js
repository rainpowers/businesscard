import React from 'react';
import './styles/BusinessCard.css';

export default function ImageUploader(props) {
  function handleImageUpload(event) {
    props.onImageUpload(event.target.files[0]);
  }

  return (
    <div className="image-uploader">
      <label htmlFor="image-uploader-Label">Upload Image:</label>
      <input id="image-uploader-Input" type="file" accept="image/*" onChange={handleImageUpload} />
    </div>
  );
}