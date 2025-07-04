
import { useState } from "react";
import SearchBar from "./SearchBar";
import ActiveFilters from "./ActiveFilters";
import FilterPanel from "./FilterPanel";
import { useFilterState } from "@/hooks/useFilterState";

interface SearchAndFilterProps {
  onSearch: (query: string) => void;
  onFilter: (filters: FilterOptions) => void;
  categories: string[];
  locations: string[];
  initialCategory?: string;
}

interface FilterOptions {
  category: string;
  location: string;
  priceRange: [number, number];
  sortBy: string;
}

const SearchAndFilter = ({ onSearch, onFilter, categories, locations, initialCategory }: SearchAndFilterProps) => {
  const [showFilters, setShowFilters] = useState(false);
  
  const {
    filters,
    activeFilters,
    handleFilterChange,
    clearFilter,
    clearAllFilters
  } = useFilterState({ initialCategory, onFilter });

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <SearchBar
        onSearch={onSearch}
        onToggleFilters={() => setShowFilters(!showFilters)}
      />

      {/* Active Filters */}
      <ActiveFilters
        activeFilters={activeFilters}
        onClearFilter={clearFilter}
        onClearAll={clearAllFilters}
      />

      {/* Filter Panel */}
      {showFilters && (
        <FilterPanel
          filters={filters}
          categories={categories}
          locations={locations}
          onFilterChange={handleFilterChange}
        />
      )}
    </div>
  );
};

export default SearchAndFilter;
