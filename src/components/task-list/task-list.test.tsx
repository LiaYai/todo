import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { TaskList } from './task-list';
import { TTask } from '../../types';

jest.mock('nanoid', () => ({
  nanoid: () => 'mock-id-123',
}));

describe('TaskList component', () => {
  const mockTasks: TTask[] = [
    { id: '1', title: 'Task 1', completed: false },
    { id: '2', title: 'Task 2', completed: true },
    { id: '3', title: 'Task 3', completed: false },
  ];

  beforeEach(() => {
    Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockTasks));
    Storage.prototype.setItem = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders initial tasks', () => {
    render(<TaskList initialTasks={mockTasks} />);
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
    expect(screen.getByText('Task 3')).toBeInTheDocument();
  });

  test('adds a new task', () => {
    render(<TaskList initialTasks={mockTasks} />);
    const input = screen.getByPlaceholderText('Введите задачу');
    const addButton = screen.getByText('ок');

    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(addButton);

    expect(screen.getByText('New Task')).toBeInTheDocument();
  });

  test('toggles task completion status', () => {
    render(<TaskList initialTasks={mockTasks} />);
    const task1Checkbox = screen.getByLabelText('Task 1');

    fireEvent.click(task1Checkbox);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'tasks',
      JSON.stringify([
        { id: '1', title: 'Task 1', completed: true },
        { id: '2', title: 'Task 2', completed: true },
        { id: '3', title: 'Task 3', completed: false },
      ]),
    );
  });

  test('filters tasks by "active" status', () => {
    render(<TaskList initialTasks={mockTasks} />);
    const activeButton = screen.getByText('Активные');

    fireEvent.click(activeButton);

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 3')).toBeInTheDocument();
    expect(screen.queryByText('Task 2')).not.toBeInTheDocument();
  });

  test('filters tasks by "completed" status', () => {
    render(<TaskList initialTasks={mockTasks} />);
    const completedButton = screen.getByText('Завершенные');

    fireEvent.click(completedButton);

    expect(screen.getByText('Task 2')).toBeInTheDocument();
    expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Task 3')).not.toBeInTheDocument();
  });

  test('clears completed tasks', () => {
    render(<TaskList initialTasks={mockTasks} />);
    const clearButton = screen.getByText('Очистить');

    fireEvent.click(clearButton);

    expect(screen.queryByText('Task 2')).not.toBeInTheDocument();
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 3')).toBeInTheDocument();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'tasks',
      JSON.stringify([
        { id: '1', title: 'Task 1', completed: false },
        { id: '3', title: 'Task 3', completed: false },
      ]),
    );
  });

  test('shows remaining tasks count', () => {
    render(<TaskList initialTasks={mockTasks} />);
    const counterElement = screen.getByTestId('tasks-counter');
    expect(counterElement).toHaveTextContent('2');
  });
});
