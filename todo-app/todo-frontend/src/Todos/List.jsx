import React from 'react';
import Todo from './Todo';

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  const todoItems = todos.map((todo, index) => (
    <Todo
      key={todo.id ?? todo._id ?? `${todo.text}-${index}`}
      todo={todo}
      deleteTodo={deleteTodo}
      completeTodo={completeTodo}
    />
  ));

  if (todoItems.length === 0) return null;

  return (
    <>
      {todoItems.reduce((acc, cur, idx) => (
        idx === 0 ? [cur] : [...acc, <hr key={`sep-${idx}`} />, cur]
      ), [])}
    </>
  );
};

export default TodoList;