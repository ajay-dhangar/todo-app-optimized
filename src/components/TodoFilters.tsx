import { memo, useCallback } from 'react';
import { Search, Filter } from 'lucide-react';
import { TodoFilters as TodoFiltersType, Category, Priority } from '../types/todo';
import { categories, priorities } from '../data/mockData';

interface TodoFiltersProps {
  filters: TodoFiltersType;
  onFiltersChange: (filters: Partial<TodoFiltersType>) => void;
}

const TodoFilters = memo<TodoFiltersProps>(({ filters, onFiltersChange }) => {
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ search: e.target.value });
  }, [onFiltersChange]);

  const handleCategoryChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({ category: e.target.value });
  }, [onFiltersChange]);

  const handlePriorityChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({ priority: e.target.value });
  }, [onFiltersChange]);

  const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({ filter: e.target.value as TodoFiltersType['filter'] });
  }, [onFiltersChange]);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search todos..."
            value={filters.search}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          />
        </div>

        <select
          value={filters.category}
          onChange={handleCategoryChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          value={filters.priority}
          onChange={handlePriorityChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
        >
          <option value="">All Priorities</option>
          {priorities.map(priority => (
            <option key={priority.id} value={priority.id}>
              {priority.name}
            </option>
          ))}
        </select>

        <select
          value={filters.filter}
          onChange={handleFilterChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
        >
          <option value="all">All Todos</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  );
});

TodoFilters.displayName = 'TodoFilters';

export default TodoFilters;