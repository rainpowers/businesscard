import React from "react";
import { Transformer } from "react-konva";

const Transform = ({ shapeRef, isSelected }) => {
  const trRef = React.useRef();

  React.useEffect(() => {
    if (!trRef.current || !shapeRef.current) {
      return;
    }

    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    } else {
      // Detach the transformer if no shape is selected
      trRef.current.nodes([]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected, shapeRef]);

  // Add this useEffect to reset the transformer when the shapeRef changes
  React.useEffect(() => {
    if (!trRef.current) {
      return;
    }
    trRef.current.nodes([]);
    trRef.current.getLayer().batchDraw();
  }, [shapeRef]);

  return (
    isSelected && (
      <Transformer
        ref={trRef}
        boundBoxFunc={(oldBox, newBox) => {
          // limit resize
          if (newBox.width < 5 || newBox.height < 5) {
            return oldBox;
          }
          return newBox;
        }}
      />
    )
  );
};

export default Transform;
