import { useState, useEffect } from "react";

interface QuantityProps {
  setQuantity: (count: number) => void; // Expect a function to set quantity
}

const Quantity: React.FC<QuantityProps> = ({ setQuantity }) => {
  const [count, setCount] = useState(1);

  useEffect(() => {
    setQuantity(count); // Update parent state on change
  }, [count, setQuantity]);

  return (
    <div className="wg-quantity">
      <span
        className="btn-quantity minus-btn"
        onClick={() => setCount((prev) => (prev === 1 ? 1 : prev - 1))}
      >
        -
      </span>
      <input
        min={1}
        type="text"
        onChange={(e) => setCount(Number(e.target.value))}
        name="number"
        value={count}
      />
      <span
        className="btn-quantity plus-btn"
        onClick={() => setCount((prev) => prev + 1)}
      >
        +
      </span>
    </div>
  );
};

export default Quantity;
