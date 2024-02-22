const PriceDisplay = () => {
  return (
    <div className="flex flex-col absolute p-6">
      <div>SKU: JERSEY 1-11</div>
      <div className="font-bold text-2xl">Total: 350 USD</div>
      <div>Qty 1-9: 350 USD QTY 10+:330 3 weeks lead time</div>
    </div>
  );
};

export default PriceDisplay;
