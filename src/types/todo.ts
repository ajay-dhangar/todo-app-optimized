export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  category: Category;
  priority: Priority;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface Priority {
  id: string;
  name: string;
  level: number;
  color: string;
}

export type FilterType = 'all' | 'active' | 'completed';

export interface TodoFilters {
  search: string;
  category: string;
  priority: string;
  filter: FilterType;
}

export interface TodoStats {
  total: number;
  completed: number;
  active: number;
  overdue: number;
}