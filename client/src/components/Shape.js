import React from "react";
import { Image as KonvaImage } from "react-konva";
import { useImage } from "react-konva-utils";
import Transform from "./Transform";

const Shape = ({
  imageSrc,
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  onShapeRefUpdate,
}) => {
  const shapeRef = React.useRef();
  const [image] = useImage(imageSrc); // Use the image src instead of the image object

  React.useEffect(() => {
    if (onShapeRefUpdate) {
      onShapeRefUpdate(shapeRef);
    }
  }, [onShapeRefUpdate]); // Add onShapeRefUpdate to the dependency array

  return (
    <React.Fragment>
      {image && (
        <KonvaImage
          onClick={() => onSelect(shapeRef)}
          onTap={() => onSelect(shapeRef)}
          ref={shapeRef}
          image={image}
          {...shapeProps}
          draggable
          dragBoundFunc={(pos) => {
            const newX = Math.max(0, Math.min(pos.x, 400)); // Assuming a card width of 500, change these values based on your card dimensions
            const newY = Math.max(0, Math.min(pos.y, 200)); // Assuming a card height of 300, change these values based on your card dimensions
            return { x: newX, y: newY };
          }}
          // Handle drag end and other events here
        />
      )}
      {isSelected && <Transform shapeRef={shapeRef} isSelected={isSelected} />}
    </React.Fragment>
  );
};

export default Shape;
