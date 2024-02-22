import React, { useState } from "react";
interface ColorPickerComponentProps {
  open: boolean;
  onClose: () => void;
  onChange: (color: string) => void;
}

const ColorPickerComponent: React.FC<ColorPickerComponentProps> = ({
  open,
  onClose,
  onChange,
}) => {
  return <div></div>;
};

export default ColorPickerComponent;
