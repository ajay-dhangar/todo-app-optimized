import { memo, useCallback, useMemo } from 'react';
import { Todo } from '../types/todo';
import TodoItem from './TodoItem';
import { ListTodo } from 'lucide-react';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoList = memo<TodoListProps>(({ todos, onToggle, onEdit, onDelete }) => {
  const sortedTodos = useMemo(() => {
    return [...todos].sort((a, b) => {
      // Sort by priority level (higher first), then by creation date
      if (a.priority.level !== b.priority.level) {
        return b.priority.level - a.priority.level;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [todos]);

  const handleToggle = useCallback((id: string) => {
    onToggle(id);
  }, [onToggle]);

  const handleEdit = useCallback((id: string) => {
    onEdit(id);
  }, [onEdit]);

  const handleDelete = useCallback((id: string) => {
    onDelete(id);
  }, [onDelete]);

  if (todos.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <ListTodo className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No todos found</h3>
        <p className="text-gray-600">Try adjusting your filters or add a new todo.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {sortedTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
});

TodoList.displayName = 'TodoList';

export default TodoList;