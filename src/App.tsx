import classNames from 'classnames';
import React, { useState } from 'react';
import { TodoList } from './TodoList';

interface Todo {
  id?: number,
  title?: string,
  completed?: boolean,
}

let todos: Todo[] = [
  {
    id: 1,
    title: 'Buy a meat',
    completed: true,
  },
  {
    id: 2,
    title: 'Go to a doctor',
    completed: false,
  },
  {
    id: 3,
    title: 'Go to swiming',
    completed: false,
  },
];

interface Filter {
  filter: string | boolean;
}

const App: React.FC = () => {
  const [toDo, setToDo] = useState(todos);
  const [textDone, setTextDone] = useState('');
  const [edit, setEdit] = useState(0);
  const [filter, setFilter] = useState<string | boolean>('');
  const [editText, setEditText] = useState('');

  todos = toDo;

  return (
    <section
      className="todoapp"
      onClick={(anEvent) => {
        const isEdit = anEvent.currentTarget.classList.contains('edit');

        if (isEdit || !edit) {
          return;
        }

        todos.filter(el => el.id === edit)[0].title = editText;

        setEdit(0);
      }}
    >
      <header className="header">
        <h1>todo</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setToDo(oldDate => [...oldDate, {
              id: +new Date(),
              title: textDone,
              completed: false,
            }]);
            setTextDone('');
          }}
        >
          <input
            required
            value={textDone}
            onChange={(e) => {
              setTextDone(e.target.value);
            }}
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
          />
        </form>
      </header>

      {toDo.length > 0 && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              readOnly
              checked={toDo.every(todo => todo.completed)}
              onClick={() => {
                setToDo(toDo.map(items => ({
                  ...items,
                  completed: (!toDo.every(todo => todo.completed)),
                })));
              }}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList
              toDo={toDo}
              setToDo={setToDo}
              editText={editText}
              setEditText={setEditText}
              edit={edit}
              setEdit={setEdit}
              todos={todos}
              filter={filter}
            />
          </section>
          <footer className="footer">
            <span className="todo-count">
              {toDo.filter(todo => !todo.completed).length}
              {` items left`}
            </span>

            <ul className="filters">
              <button
                type="button"
                onClick={() => setFilter('')}
              >
                <a
                  href="#/"
                  className={classNames({ selected: filter === '' })}
                >
                  All
                </a>
              </button>

              <button
                type="button"
                onClick={() => setFilter(true)}
              >
                <a
                  href="#/active"
                  className={classNames({ selected: filter === true })}
                >
                  Active
                </a>
              </button>

              <button
                onClick={() => setFilter(false)}
                type="button"
              >
                <a
                  href="#/completed"
                  className={classNames({ selected: filter === false })}
                >
                  Completed
                </a>
              </button>
            </ul>

            <button
              type="button"
              className="clear-completed"
              onClick={() => {
                setToDo(toDo.filter(task => !task.completed));
                setFilter('');
              }}
            >
              Clear completed
            </button>
          </footer>
        </>
      )}
    </section>
  );
};

export default App;
