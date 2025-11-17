import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import Todo from '../Todos/Todo';

describe('Todo component', () => {
  it('shows the done state and triggers delete', () => {
    const deleteTodo = vi.fn();
    const todo = { text: 'Completed item', done: true };

    render(<Todo todo={todo} deleteTodo={deleteTodo} completeTodo={vi.fn()} />);

    expect(screen.getByText(/this todo is done/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /delete/i }));
    expect(deleteTodo).toHaveBeenCalledWith(todo);
  });

  it('shows the not-done state and triggers both actions', () => {
    const deleteTodo = vi.fn();
    const completeTodo = vi.fn();
    const todo = { text: 'Pending item', done: false };

    render(<Todo todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />);

    const todoRow = screen.getByText(/pending item/i).closest('[data-testid="todo-item"]');
    const rowQueries = within(todoRow);

    expect(rowQueries.getByText(/this todo is not done/i)).toBeInTheDocument();
    fireEvent.click(rowQueries.getByRole('button', { name: /delete/i }));
    fireEvent.click(rowQueries.getByRole('button', { name: /set as done/i }));

    expect(deleteTodo).toHaveBeenCalledWith(todo);
    expect(completeTodo).toHaveBeenCalledWith(todo);
  });
});