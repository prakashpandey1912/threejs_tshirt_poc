{/* <header className="flex justify-between py-4 text-lg text-center">
        <div>
          <h1 className="font-bold">Your T-Shirt Color</h1>
          <div className="flex justify-center mt-4">
            {swatches.map((swatch) => (
              <button
                key={swatch.color}
                className={`m-1 rounded-full w-8 h-8 bg-${swatch.color}-500`}
                style={{
                  opacity: selectedSwatch === swatch.color ? 1 : 0.5,
                  border:
                    selectedSwatch === swatch.color
                      ? "2px solid black"
                      : "none",
                }}
                onClick={() => {
                  setSelectedSwatch(swatch.color);
                  setTotalAmount(swatch.price);
                }}
              ></button>
            ))}
          </div>
          <p className="text-center m-2 text-sm">
            Click on the swatches to change the T-shirt color.
          </p>
        </div>
        <div>Total Amount :- $ {totalAmount}</div>
        <div>
          <h1 className="font-bold">Your T-Shirt Texture</h1>
          <div className="flex justify-center mt-4">
            {texture.map((swatch, index) => (
              <button
                key={swatch.texture}
                className={`m-1 rounded-full w-8 h-8 bg-neutral-300`}
                style={{
                  border:
                    selectedTexture === swatch.texture
                      ? "2px solid black"
                      : "none",
                }}
                onClick={() => {
                  setSelectedTexture(swatch.texture);
                  setTotalAmount(swatch.price);
                }}
              >
                T{++index}
              </button>
            ))}
          </div>
          <p className="text-center m-2 text-sm">
            Click on the swatches to change the T-shirt Texture.
          </p>
        </div>
      </header> */}