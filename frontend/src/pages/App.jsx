import Header from '../components/Header';
import Checkbox from '../components/Checkbox';
import { useState } from 'react';

const data = [
  {
    id: 1,
    task: 'Learn react',
    completed: true,
  },
  {
    id: 2,
    task: 'Create login page',
    completed: false,
  },
];

function App() {
  const [todos, setTodos] = useState(data);
  return (
    <>
      <Header />
      <div className="ml-5 mr-3">
        <h2>
          <strong>User</strong>'s todo list
        </h2>
        <div className="flex justify-between">
          <input
            className="bg-gray-50 focus:bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="New todo..."
            style={{ width: '80%' }}
            type="text"
            name=""
          />
          <button className="bg-gray-100 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            + Add todo
          </button>
        </div>
      </div>

      <ul className="ml-5 mr-3 mt-5 min-w-5 flex-col">
        {todos.map((todo, i) => {
          return (
            <li
              key={todo.id}
              className="flex text-gray-700 mt-2 pl-8 pr-6 pt-2 pb-2 border"
            >
              <Checkbox
                isChecked={todo.completed}
                checkboxName={`complit-${todo.id}`}
                handleOnChange={() => {
                  const uTodo = [...todos];
                  uTodo[i].completed = !uTodo[i].completed;

                  setTodos(uTodo);
                }}
              >
                <span
                  className={todo.completed === true ? 'line-through' : null}
                >
                  {todo.task}
                </span>
              </Checkbox>
              <button
                className="bg-gray-100 hover:bg-gray-300 text-gray-800 font-semibold "
                style={{ marginLeft: 'auto' }}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;
