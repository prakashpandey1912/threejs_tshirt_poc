import React, { useState } from "react";

interface AccordionProps {
  title: string;
  children?: React.ReactNode;
  description: string;
}
const Accordion: React.FC<AccordionProps> = ({ title, children,description }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="mb-4 mt-2 p-4 border-t border-b">
        <button
          className="w-full flex flex-col"
          onClick={toggleAccordion}
        >
          <p >Customize {title}</p>
          <p className="text-sm">{description}</p>
        </button>
        {isOpen && <div className="p-4 bg-white rounded-lg">{children}</div>}
      </div>
    </>
  );
};

export default Accordion;
