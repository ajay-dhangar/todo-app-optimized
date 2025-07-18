import { memo, useCallback } from 'react';
import { format } from 'date-fns';
import { Check, Clock, Edit2, Trash2, AlertTriangle } from 'lucide-react';
import { Todo } from '../types/todo';
import { clsx } from 'clsx';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem = memo<TodoItemProps>(({ todo, onToggle, onEdit, onDelete }) => {
  const handleToggle = useCallback(() => {
    onToggle(todo.id);
  }, [onToggle, todo.id]);

  const handleEdit = useCallback(() => {
    onEdit(todo.id);
  }, [onEdit, todo.id]);

  const handleDelete = useCallback(() => {
    onDelete(todo.id);
  }, [onDelete, todo.id]);

  const isOverdue = todo.dueDate && !todo.completed && todo.dueDate < new Date();

  return (
    <div className={clsx(
      'bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200',
      todo.completed && 'opacity-60',
      isOverdue && 'border-red-200 bg-red-50'
    )}>
      <div className="flex items-start gap-3">
        <button
          onClick={handleToggle}
          className={clsx(
            'flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200',
            todo.completed
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 hover:border-green-400'
          )}
        >
          {todo.completed && <Check className="w-4 h-4" />}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={clsx(
              'font-medium text-gray-900',
              todo.completed && 'line-through text-gray-500'
            )}>
              {todo.title}
            </h3>
            <span
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
              style={{ backgroundColor: `${todo.priority.color}20`, color: todo.priority.color }}
            >
              {todo.priority.name}
            </span>
          </div>

          <p className={clsx(
            'text-sm text-gray-600 mb-2',
            todo.completed && 'line-through'
          )}>
            {todo.description}
          </p>

          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span
              className="inline-flex items-center gap-1 px-2 py-1 rounded-full"
              style={{ backgroundColor: `${todo.category.color}20`, color: todo.category.color }}
            >
              {todo.category.name}
            </span>
            
            {todo.dueDate && (
              <span className={clsx(
                'flex items-center gap-1',
                isOverdue && 'text-red-600'
              )}>
                {isOverdue ? <AlertTriangle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                Due: {format(todo.dueDate, 'MMM d, yyyy')}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleEdit}
            className="p-1 text-gray-400 hover:text-blue-600 transition-colors duration-200"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleDelete}
            className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-200"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
});

TodoItem.displayName = 'TodoItem';

export default TodoItem;