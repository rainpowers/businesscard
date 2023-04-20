import React, { useState, useEffect, useCallback } from "react";
import TextBox from "../TextBox";
import FontSelector from "../FontSelector";
import ImageUploader from "../ImageUploader";
import "../styles/BusinessCard.css";
import logo from "../assets/Logo.png";
import Shape from "../Shape";
import { Stage, Layer, Group, Rect } from "react-konva";

function BusinessCard() {
  const [text, setText] = useState(""); // state to hold the text entered in the text box
  const [font, setFont] = useState("Arial"); // state to hold the selected font
  const [imageDataUrl, setImageDataUrl] = useState(logo); // state to hold the data URL of the uploaded image
  const [loadedImage, setLoadedImage] = useState(null);
  const [, selectShape] = React.useState(null);
  const [selectedShapeRef, setSelectedShapeRef] = useState(null);
  const transformerRef = React.useRef();

  const onShapeRefUpdate = useCallback((shapeRef) => {
    if (shapeRef.current) {
      shapeRef.current.on("transformend", () => {
        console.log("Shape transform ended.");
      });
    }
  }, []);

  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  // function to handle text changes in the text box
  function handleTextChange(event) {
    setText(event.target.textContent);
  }

  // function to handle font changes in the font selector
  function handleFontChange(event) {
    setFont(event.target.value);
  }

  // function to handle image uploads in the image uploader
  function handleImageUpload(file) {
    if (file) {
      setImageDataUrl(URL.createObjectURL(file));
    } else {
      setImageDataUrl(logo);
    }
  }

  function handleClearImage() {
    setImageDataUrl(null);
    selectShape(null); // Deselect the shape when the image is cleared
  }

  console.log("Image Data URL:", imageDataUrl);

  useEffect(() => {
    if (imageDataUrl) {
      const img = new Image();
      img.onload = () => {
        setLoadedImage(img); // Use the img object itself
      };
      img.src = imageDataUrl;
    } else {
      setLoadedImage(null);
    }
  }, [imageDataUrl]);

  useEffect(() => {
    if (selectedShapeRef && transformerRef.current) {
      transformerRef.current.nodes([selectedShapeRef.current]);
    }
  }, [selectedShapeRef]);

  return (
    <div className="business-card-Background">
      <div className="button-container">
        <FontSelector font={font} onFontChange={handleFontChange} />
        <ImageUploader onImageUpload={handleImageUpload} />
        {imageDataUrl ? (
          <button onClick={handleClearImage}>Clear Image</button>
        ) : null}
      </div>
      <div className="business-card">
        <div className="card-preview" style={{ fontFamily: font }}>
          <div className="card-text">{text}</div>
          <TextBox text={text} onTextChange={handleTextChange} />
          <Stage
            width={500}
            height={300}
            onMouseDown={checkDeselect}
            onTouchStart={checkDeselect}
          >
            <Layer>
              <Group>
                <Rect
                  x={0}
                  y={0}
                  width={500}
                  height={300}
                  clipEnabled
                  clipFunc={(ctx) => {
                    ctx.rect(0, 0, 500, 300);
                  }}
                />
                {loadedImage && (
                  <Shape
                    imageSrc={imageDataUrl} // Add this prop
                    shapeProps={{
                      image: loadedImage,
                      x: 10,
                      y: 10,
                      width: 100,
                      height: 100,
                      id: "image1",
                    }}
                    isSelected={(currentShapeRef) =>
                      selectedShapeRef &&
                      selectedShapeRef.current === currentShapeRef.current
                    }
                    onSelect={(currentShapeRef) => {
                      setSelectedShapeRef(currentShapeRef);
                    }}
                    onChange={(newAttrs) => {
                      // setLoadedImage(newAttrs.image);
                    }}
                    onShapeRefUpdate={onShapeRefUpdate}
                  />
                )}
              </Group>
              {/* Add the Transform component here */}
            </Layer>
          </Stage>
        </div>
      </div>
    </div>
  );
}

export default BusinessCard;
