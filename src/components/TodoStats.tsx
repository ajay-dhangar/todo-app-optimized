import { memo } from 'react';
import { TodoStats as TodoStatsType } from '../types/todo';
import { BarChart3, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

interface TodoStatsProps {
  stats: TodoStatsType;
}

const TodoStats = memo<TodoStatsProps>(({ stats }) => {
  const statItems = [
    {
      label: 'Total',
      value: stats.total,
      icon: BarChart3,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Completed',
      value: stats.completed,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Active',
      value: stats.active,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      label: 'Overdue',
      value: stats.overdue,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {statItems.map(({ label, value, icon: Icon, color, bgColor }) => (
        <div
          key={label}
          className={`${bgColor} rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow duration-200`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{label}</p>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
            <Icon className={`w-6 h-6 ${color}`} />
          </div>
        </div>
      ))}
    </div>
  );
});

TodoStats.displayName = 'TodoStats';

export default TodoStats;