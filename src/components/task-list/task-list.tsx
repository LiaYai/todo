import React from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { SortType, TaskListProps, TTask } from '../../types';
import { Task } from '../task/task';
import { nanoid } from 'nanoid';
import './task-list.css';

export const TaskList = ({ initialTasks }: TaskListProps) => {
  const [tasks, setTasks] = useLocalStorage<TTask[]>('tasks', initialTasks); // кастомный хук, который сохраняет данные в localStorage и возвращает их в виде состояния
  const [sortedTasks, setSortedTasks] = React.useState<TTask[]>(tasks);
  const [sortType, setSortType] = React.useState<SortType>('all');
  const [value, setValue] = React.useState<string>('');

  React.useEffect(() => {
    switch (sortType) {
      case 'active':
        setSortedTasks(tasks.filter((task) => !task.completed));
        break;
      case 'completed':
        setSortedTasks(tasks.filter((task) => task.completed));
        break;
      default:
        setSortedTasks(tasks);
    }
  }, [tasks, sortType]);

  React.useEffect(() => {
    const handleBlurInput = () => {
      setTimeout(() => {
        document.documentElement.style.transform = 'scale(1)';
      }, 300);
    };
      const input = document.querySelector('.add-task-input');
      if (!input) return;
      input.addEventListener('blur', handleBlurInput);
      return () => {
        input.removeEventListener('blur', handleBlurInput);
      };
  }, []);

  const handleCheck = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const handleClear = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
  };

  const handleAddTask = (title: string) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: nanoid(),
        title,
        completed: false,
      },
    ]);
    setValue('');
  };

  return (
    <main className="main">
      <h2 className="main-header">Задачи на сегодня</h2>

      <ul className="todo-list wrapper">
        {sortedTasks.length === 0 && <p className="empty-list">Список задач пуст</p>}
        {sortedTasks.map((task) => (
          <Task key={task.id} task={task} onCheck={handleCheck} />
        ))}
      </ul>
      <div className="add-task wrapper">
        <input
          type="text"
          className="add-task-input"
          placeholder="Введите задачу"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && value.trim()) handleAddTask(value.trim());
          }}
        />
        <button
          type="button"
          className="button button-add"
          aria-label="Добавить задачу"
          disabled={!value.trim()}
          onClick={() => handleAddTask(value.trim())}>
          ок
        </button>
      </div>

      <div className="main-footer">
        <p className="footer-text">
          Осталось задач - <strong>{tasks.filter((task) => !task.completed).length}</strong>
        </p>
        <div className="navigation">
          <button
            type="button"
            className={`button button-sort ${sortType === 'all' ? 'active' : ''}`}
            onClick={() => setSortType('all')}>
            Все
          </button>
          <button
            type="button"
            className={`button button-sort ${sortType === 'active' ? 'active' : ''}`}
            onClick={() => setSortType('active')}>
            Активные
          </button>
          <button
            type="button"
            className={`button button-sort ${sortType === 'completed' ? 'active' : ''}`}
            onClick={() => setSortType('completed')}>
            Завершенные
          </button>
        </div>
        <button
          type="button"
          aria-label="Очистить"
          className="button button-clear"
          disabled={tasks.filter((task) => task.completed).length === 0}
          onClick={handleClear}>
          Очистить
        </button>
      </div>
    </main>
  );
};
