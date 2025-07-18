import { memo } from 'react';
import { ListTodo } from 'lucide-react';

const Header = memo(() => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        <ListTodo className="w-8 h-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-900">TodoApp</h1>
        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          Optimized
        </span>
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;