
import { Slider } from "@/components/ui/slider";

interface PriceRangeFilterProps {
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

const PriceRangeFilter = ({ value, onChange }: PriceRangeFilterProps) => {
  return (
    <div>
      <label className="text-sm font-medium mb-2 block">
        Price Range: ₹{value[0]} - ₹{value[1]}
      </label>
      <Slider
        value={value}
        onValueChange={(newValue) => onChange(newValue as [number, number])}
        max={1000}
        min={0}
        step={10}
        className="mt-2"
      />
    </div>
  );
};

export default PriceRangeFilter;
