
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ActiveFiltersProps {
  activeFilters: string[];
  onClearFilter: (filter: string) => void;
  onClearAll: () => void;
}

const ActiveFilters = ({ activeFilters, onClearFilter, onClearAll }: ActiveFiltersProps) => {
  if (activeFilters.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <span className="text-sm text-gray-600">Active filters:</span>
      {activeFilters.map((filter, index) => (
        <Badge key={index} variant="secondary" className="flex items-center gap-1">
          {filter}
          <X
            className="h-3 w-3 cursor-pointer"
            onClick={() => onClearFilter(filter)}
          />
        </Badge>
      ))}
      <Button variant="ghost" size="sm" onClick={onClearAll}>
        Clear all
      </Button>
    </div>
  );
};

export default ActiveFilters;
