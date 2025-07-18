import { renderHook, act } from '@testing-library/react';
import { useTodos } from '../../hooks/useTodos';

describe('useTodos', () => {
  test('should initialize with mock data', () => {
    const { result } = renderHook(() => useTodos());
    
    expect(result.current.allTodos).toHaveLength(100);
    expect(result.current.stats.total).toBe(100);
  });

  test('should add a new todo', () => {
    const { result } = renderHook(() => useTodos());
    
    act(() => {
      result.current.addTodo({
        title: 'Test Todo',
        description: 'Test Description',
        completed: false,
        category: { id: '1', name: 'Work', color: '#3B82F6' },
        priority: { id: '1', name: 'Low', level: 1, color: '#6B7280' },
      });
    });

    expect(result.current.allTodos).toHaveLength(101);
    expect(result.current.allTodos[0].title).toBe('Test Todo');
  });

  test('should toggle todo completion', () => {
    const { result } = renderHook(() => useTodos());
    
    const firstTodo = result.current.allTodos[0];
    const initialCompleted = firstTodo.completed;
    
    act(() => {
      result.current.toggleTodo(firstTodo.id);
    });

    const updatedTodo = result.current.allTodos.find(todo => todo.id === firstTodo.id);
    expect(updatedTodo?.completed).toBe(!initialCompleted);
  });

  test('should delete todo', () => {
    const { result } = renderHook(() => useTodos());
    
    const firstTodo = result.current.allTodos[0];
    
    act(() => {
      result.current.deleteTodo(firstTodo.id);
    });

    expect(result.current.allTodos).toHaveLength(99);
    expect(result.current.allTodos.find(todo => todo.id === firstTodo.id)).toBeUndefined();
  });

  test('should filter todos by search', () => {
    const { result } = renderHook(() => useTodos());
    
    act(() => {
      result.current.updateFilters({ search: 'Task 1' });
    });

    expect(result.current.todos.length).toBeGreaterThan(0);
    expect(result.current.todos.every(todo => 
      todo.title.includes('Task 1') || todo.description.includes('Task 1')
    )).toBe(true);
  });

  test('should filter todos by completion status', () => {
    const { result } = renderHook(() => useTodos());
    
    act(() => {
      result.current.updateFilters({ filter: 'completed' });
    });

    expect(result.current.todos.every(todo => todo.completed)).toBe(true);
  });
});