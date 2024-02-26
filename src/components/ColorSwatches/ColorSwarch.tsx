import Circle from "@uiw/react-color-circle";

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
  const [hex, setHex] = useState("");
  const handleChange = (color: any) => {
    onChange(color.hex);
    setHex(color.hex);
  };


  const hexColors = [
    "#FFFA84", "#FEE837", "#FCD60F", "#FFC80B", "#DFAD07",
    "#FFCD55", "#FFB637", "#FF8326", "#FC622B", "#CC4A2B",
    "#FFB99C", "#FF7C65", "#F84434", "#B73025", "#7B2725",
    "#F7A493", "#F95552", "#E81233", "#B92B32", "#6D2A31",
    "#FFA6A9", "#FF5E75", "#E91C56", "#A5154A", "#7D1845",
    "#FF9DC9", "#FA72A9", "#DA3772", "#BC3266", "#7E2A56",
    "#DAB5D6", "#CE89BB", "#BC5997", "#833F6E", "#6E375C",
    "#C0AFD0", "#A081BA", "#684C94", "#5C3975", "#4C2C5A",
    "#BFCACC", "#9BB3BD", "#5B7F96", "#3B5769", "#262C39",
    "#A7C3D4", "#628EC0", "#345188", "#2D3F6D", "#2A3148"
];
  return (
    open && (
      <div className="w-64 absolute left-[-300px] top-0 bg-white p-4 border border-gray-300 shadow-md  ">
        <Circle
          colors={hexColors}
          color={hex}
          onChange={handleChange}
        />
      </div>
    )
  );
};

export default ColorPickerComponent;
