import { useState } from "react";
import Accordion from "./Accordion";
import ColorPickerComponent from "../ColorSwatches/ColorSwarch";
import { ModelSide } from "@/app/page";

interface CustomizeSectionProps {
  modelSide: ModelSide[];
  setModelSide: (model: ModelSide[])=> void;
}

const CustomizeSection: React.FC<CustomizeSectionProps> = ({modelSide,setModelSide}) => {
  const [numberValue, setNumberValue] = useState<number>(1);
  // const [modelSide, setModelSide] = useState([
  //   { key: "Front", name: "Front", value: "#628ec0", isOpen: false },
  //   { key: "Back", name: "Back", value: "#684c94", isOpen: false },
  //   { key: "Hand", name: "Hand", value: "#bc5997", isOpen: false },
  //   { key: "Collar", name: "Collar", value: "#3b5769", isOpen: false },
  //   { key: "Side", name: "Side", value: "#dfad07", isOpen: false },
  // ]);

  const handleOpenChange = (index: number) => {
    const updatedModelSide = [...modelSide];
    updatedModelSide[index].isOpen = !updatedModelSide[index].isOpen;
    setModelSide(updatedModelSide);
  };

  const handleValueChange = (index: number, newValue: string) => {
    const updatedModelSide = [...modelSide];
    updatedModelSide[index].value = newValue;
    setModelSide(updatedModelSide);
  };


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
            {modelSide.map((data,index) => (
              <div className="flex items-center relative" key={data.key}>
                <button
                  className={`m-2 rounded-full w-12 h-12`}
                  style={{ background: data.value }}
                  onClick={()=>handleOpenChange(index)}
                ></button>
                <div className="ml-2">{data.name}</div>
                <ColorPickerComponent
                  open={data.isOpen}
                  onClose={() => handleOpenChange(index)}
                  onChange={(color) => {
                    handleValueChange(index,color);
                    handleOpenChange(index);
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
