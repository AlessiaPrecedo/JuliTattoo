export default function QuantitySelector({ quantity, onIncrease, onDecrease }) {
  return (
    <div className="flex items-center gap-3">
      <button onClick={onDecrease} className="w-8 h-8 border rounded-lg">
        -
      </button>

      <span>{quantity}</span>

      <button onClick={onIncrease} className="w-8 h-8 border rounded-lg">
        +
      </button>
    </div>
  );
}
