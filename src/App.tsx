import { lazy, Suspense } from 'react';
import { useTodos } from './hooks/useTodos';
import Header from './components/Header';
import TodoStats from './components/TodoStats';
import TodoFilters from './components/TodoFilters';
import AddTodoForm from './components/AddTodoForm';

// Lazy load TodoList for code splitting
const TodoList = lazy(() => import('./components/TodoList'));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

function App() {
  const {
    todos,
    filters,
    stats,
    addTodo,
    deleteTodo,
    toggleTodo,
    updateFilters,
  } = useTodos();

  const handleEdit = (id: string) => {
    console.log('Edit todo:', id);
    // TODO: Implement edit functionality
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-6">
          <TodoStats stats={stats} />
          
          <AddTodoForm onAdd={addTodo} />
          
          <TodoFilters
            filters={filters}
            onFiltersChange={updateFilters}
          />
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Your Todos ({todos.length})
            </h2>
            
            <Suspense fallback={<LoadingSpinner />}>
              <TodoList
                todos={todos}
                onToggle={toggleTodo}
                onEdit={handleEdit}
                onDelete={deleteTodo}
              />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;