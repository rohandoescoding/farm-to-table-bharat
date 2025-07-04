
import { useState, useEffect } from "react";

interface FilterOptions {
  category: string;
  location: string;
  priceRange: [number, number];
  sortBy: string;
}

interface UseFilterStateProps {
  initialCategory?: string;
  onFilter: (filters: FilterOptions) => void;
}

export const useFilterState = ({ initialCategory, onFilter }: UseFilterStateProps) => {
  const [filters, setFilters] = useState<FilterOptions>({
    category: initialCategory || "",
    location: "",
    priceRange: [0, 1000],
    sortBy: "newest"
  });
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Update filters when initialCategory changes and trigger the filter callback
  useEffect(() => {
    if (initialCategory) {
      const newFilters = { ...filters, category: initialCategory };
      setFilters(newFilters);
      onFilter(newFilters);
      updateActiveFilters(newFilters);
    }
  }, [initialCategory]);

  // Initial filter call on mount to ensure proper filtering
  useEffect(() => {
    onFilter(filters);
    updateActiveFilters(filters);
  }, []);

  const updateActiveFilters = (currentFilters: FilterOptions) => {
    const active: string[] = [];
    if (currentFilters.category) active.push(`Category: ${currentFilters.category}`);
    if (currentFilters.location) active.push(`Location: ${currentFilters.location}`);
    if (currentFilters.priceRange[0] > 0 || currentFilters.priceRange[1] < 1000) {
      active.push(`Price: ₹${currentFilters.priceRange[0]} - ₹${currentFilters.priceRange[1]}`);
    }
    if (currentFilters.sortBy !== "newest") active.push(`Sort: ${currentFilters.sortBy}`);
    setActiveFilters(active);
  };

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
    updateActiveFilters(newFilters);
  };

  const clearFilter = (filterText: string) => {
    const newFilters = { ...filters };
    if (filterText.startsWith("Category:")) newFilters.category = "";
    if (filterText.startsWith("Location:")) newFilters.location = "";
    if (filterText.startsWith("Price:")) newFilters.priceRange = [0, 1000];
    if (filterText.startsWith("Sort:")) newFilters.sortBy = "newest";
    
    setFilters(newFilters);
    onFilter(newFilters);
    updateActiveFilters(newFilters);
  };

  const clearAllFilters = () => {
    const defaultFilters = {
      category: "",
      location: "",
      priceRange: [0, 1000] as [number, number],
      sortBy: "newest"
    };
    setFilters(defaultFilters);
    onFilter(defaultFilters);
    setActiveFilters([]);
  };

  return {
    filters,
    activeFilters,
    handleFilterChange,
    clearFilter,
    clearAllFilters
  };
};
