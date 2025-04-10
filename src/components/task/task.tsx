import { TaskProps } from '../../types';
import './task.css';

export const Task = ({ task, onCheck }: TaskProps) => {
  return (
    <li key={task.id} className={`task ${task.completed ? 'completed' : ''}`}>
      <label className="checkbox-label">
        <input
          type="checkbox"
          className="checkbox"
          checked={task.completed}
          onChange={() => onCheck(task.id)}
          aria-label={'Отметить задачу ' + task.title}
        />
        <span className="checkmark"></span>
        {task.title}
      </label>
    </li>
  );
};
