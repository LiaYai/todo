export type TTask = {
  id: string;
  title: string;
  completed: boolean;
};

export type TaskListProps = {
  initialTasks: TTask[];
};

export type SortType = 'all' | 'active' | 'completed';

export type TaskProps = {
  task: TTask;
  onCheck: (taskId: string) => void;
};