import { Todo, Category, Priority } from '../types/todo';

export const categories: Category[] = [
  { id: '1', name: 'Work', color: '#3B82F6' },
  { id: '2', name: 'Personal', color: '#10B981' },
  { id: '3', name: 'Shopping', color: '#F59E0B' },
  { id: '4', name: 'Health', color: '#EF4444' },
];

export const priorities: Priority[] = [
  { id: '1', name: 'Low', level: 1, color: '#6B7280' },
  { id: '2', name: 'Medium', level: 2, color: '#F59E0B' },
  { id: '3', name: 'High', level: 3, color: '#EF4444' },
  { id: '4', name: 'Urgent', level: 4, color: '#DC2626' },
];

export const generateMockTodos = (count: number): Todo[] => {
  const todos: Todo[] = [];
  
  for (let i = 1; i <= count; i++) {
    todos.push({
      id: `todo-${i}`,
      title: `Task ${i}`,
      description: `Description for task ${i}`,
      completed: Math.random() > 0.7,
      category: categories[Math.floor(Math.random() * categories.length)],
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
      dueDate: Math.random() > 0.5 ? new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000) : undefined,
    });
  }
  
  return todos;
};