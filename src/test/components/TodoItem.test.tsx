import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from '../../components/TodoItem';
import { Todo } from '../../types/todo';

const mockTodo: Todo = {
  id: '1',
  title: 'Test Todo',
  description: 'Test Description',
  completed: false,
  category: { id: '1', name: 'Work', color: '#3B82F6' },
  priority: { id: '1', name: 'Low', level: 1, color: '#6B7280' },
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockHandlers = {
  onToggle: vi.fn(),
  onEdit: vi.fn(),
  onDelete: vi.fn(),
};

describe('TodoItem', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders todo item correctly', () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />);
    
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Work')).toBeInTheDocument();
    expect(screen.getByText('Low')).toBeInTheDocument();
  });

  test('calls onToggle when checkbox is clicked', () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />);
    
    const checkbox = screen.getByRole('button');
    fireEvent.click(checkbox);
    
    expect(mockHandlers.onToggle).toHaveBeenCalledWith('1');
  });

  test('calls onDelete when delete button is clicked', () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />);
    
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);
    
    expect(mockHandlers.onDelete).toHaveBeenCalledWith('1');
  });

  test('shows completed state correctly', () => {
    const completedTodo = { ...mockTodo, completed: true };
    render(<TodoItem todo={completedTodo} {...mockHandlers} />);
    
    const title = screen.getByText('Test Todo');
    expect(title).toHaveClass('line-through');
  });

  test('shows overdue state correctly', () => {
    const overdueTodo = { 
      ...mockTodo, 
      dueDate: new Date(Date.now() - 24 * 60 * 60 * 1000) // Yesterday
    };
    render(<TodoItem todo={overdueTodo} {...mockHandlers} />);
    
    expect(screen.getByText(/Due:/)).toBeInTheDocument();
  });
});