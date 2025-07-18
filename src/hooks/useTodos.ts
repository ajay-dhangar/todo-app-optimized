import { useState, useCallback, useMemo } from 'react';
import { Todo, TodoFilters, TodoStats } from '../types/todo';
import { generateMockTodos } from '../data/mockData';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>(() => generateMockTodos(100));
  const [filters, setFilters] = useState<TodoFilters>({
    search: '',
    category: '',
    priority: '',
    filter: 'all',
  });

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      const matchesSearch = todo.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                           todo.description.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCategory = !filters.category || todo.category.id === filters.category;
      const matchesPriority = !filters.priority || todo.priority.id === filters.priority;
      const matchesFilter = filters.filter === 'all' || 
                           (filters.filter === 'completed' && todo.completed) ||
                           (filters.filter === 'active' && !todo.completed);
      
      return matchesSearch && matchesCategory && matchesPriority && matchesFilter;
    });
  }, [todos, filters]);

  const stats = useMemo((): TodoStats => {
    const now = new Date();
    return {
      total: todos.length,
      completed: todos.filter(todo => todo.completed).length,
      active: todos.filter(todo => !todo.completed).length,
      overdue: todos.filter(todo => 
        !todo.completed && todo.dueDate && todo.dueDate < now
      ).length,
    };
  }, [todos]);

  const addTodo = useCallback((todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTodo: Todo = {
      ...todo,
      id: `todo-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTodos(prev => [newTodo, ...prev]);
  }, []);

  const updateTodo = useCallback((id: string, updates: Partial<Todo>) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id 
        ? { ...todo, ...updates, updatedAt: new Date() }
        : todo
    ));
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const toggleTodo = useCallback((id: string) => {
    updateTodo(id, { completed: !todos.find(todo => todo.id === id)?.completed });
  }, [updateTodo, todos]);

  const updateFilters = useCallback((newFilters: Partial<TodoFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  return {
    todos: filteredTodos,
    allTodos: todos,
    filters,
    stats,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    updateFilters,
  };
};