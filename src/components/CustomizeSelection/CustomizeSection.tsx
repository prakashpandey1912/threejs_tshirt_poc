import { useState } from "react";
import Accordion from "./Accordion";
import ColorPickerComponent from "../ColorSwatches/ColorSwarch";

interface CustomizeSectionProps {
  price?: number;
  quantityDiscount?: number;
}

const CustomizeSection: React.FC<CustomizeSectionProps> = () => {
  const [numberValue, setNumberValue] = useState<number>(1);

  const ModelSide = [
    { key: "Front", name: "Front", value: "", isOpen: false },
    { key: "Back", name: "Back", value: "", isOpen: false },
    { key: "Hand", name: "Hand", value: "", isOpen: false },
    { key: "Collar", name: "Collar", value: "", isOpen: false },
    { key: "Side", name: "Side", value: "", isOpen: false },
  ];

  const handleChangeValue = () => {
    console.log("hello");
  };

  const handleChangeIsOpen = (data: boolean) => {};

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <p className="text-sm">Sport Jersey : Men</p>
      </div>
      <div className="flex items-center">
        <button
          onClick={() => setNumberValue((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-1 m-2 bg-gray-200 rounded-md"
        >
          -
        </button>
        <p className="px-3 border">{numberValue}</p>
        <button
          onClick={() => setNumberValue((prev) => prev + 1)}
          className="px-4 py-1 m-2 bg-gray-200 rounded-md"
        >
          +
        </button>
        <div className="flex items-center">
          <button
            onClick={() => setNumberValue((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-1 m-2 bg-gray-200 rounded-md"
          >
            FINISH EDITING {">"}
          </button>
        </div>
      </div>
      <Accordion title="Colors" description="Make your color combination">
        <div>
          <div className="flex flex-col">
            {ModelSide.map((data) => (
              <div className="flex items-center" key={data.key}>
                <button
                  className={`m-2 rounded-full w-12 h-12 bg-yellow-500`}
                  style={{ background: data.value }}
                  onClick={handleChangeValue}
                ></button>
                <div className="ml-2">{data.name}</div>
                <ColorPickerComponent
                  open={data.isOpen}
                  onClose={() => handleChangeIsOpen(false)}
                  onChange={() => {
                    handleChangeValue();
                    handleChangeIsOpen(false);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </Accordion>
      <Accordion
        title="Texts"
        description="Add names, lettering, numbers, etc."
      >
        <div>hello</div>
      </Accordion>
      <Accordion title="Images" description="Add logos, graphics, etc.">
        <div>hello</div>
      </Accordion>
    </div>
  );
};

export default CustomizeSection;
