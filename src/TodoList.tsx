import React from 'react';
import classNames from 'classnames';

interface Todo {
  id?: number,
  title?: string,
  completed?: boolean,
}

type Props = {
  toDo: Todo[],
  setToDo?: any,
  editText?: string,
  setEditText?: any,
  edit?: number,
  setEdit?: any,
  todos: Todo[],
  filter?: string | boolean,
}

export const TodoList: React.FC<Props> = ({
  toDo,
  setToDo,
  setEditText,
  edit,
  setEdit,
  todos,
  editText,
  filter 
}) => (
  <>
    <ul className="todo-list">
      {toDo.filter(task => ((typeof filter === 'boolean')
        ? task.completed === filter
        : true)).map((todo) => {
        const todosIndex = toDo.findIndex(el => el.id === todo.id);

        return (
          <li
            key={todo.id}
            className={classNames(
              { completed: todo.completed },
              { editing: (edit === todo.id) },
            )}
            onDoubleClick={() => {
              const rename = toDo
                .filter(el => el.id === todo.id)[0].title;

              setEdit(todo.id);
              setEditText(rename);
            }}
          >
            <div className="view">
              <input
                type="checkbox"
                className="toggle"
                checked={toDo[todosIndex].completed}
                readOnly
                onClick={() => {
                  setToDo(toDo.map((items) => {
                    if (items.id === todo.id) {
                      return {
                        ...items,
                        completed: !toDo[todosIndex].completed,
                      };
                    }

                    return { ...items };
                  }));
                }}
              />
              <label>{todo.title}</label>
              <button
                type="button"
                className="destroy"
                onClick={() => {
                  setToDo(toDo.filter(el => el.id !== todo.id));
                }}
              />
            </div>
            <input
              type="text"
              className="edit"
              ref={input => input && input.focus()}
              value={editText}
              onChange={theEvent => setEditText(theEvent.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  todos.filter(el => el.id === todo.id)[0]
                    .title = editText;

                  setEdit(0);
                }
              }}
            />
          </li>
        );
      })}
    </ul>
  </>
);
