import Checkbox from '../components/Checkbox';
import './../css/App.css';

import Header from '../components/Header';
import Input from '../components/Input';

const data = [
  {
    id: 1,
    task: 'Learn react',
    completed: false,
  },
  {
    id: 2,
    task: 'Create login page',
    completed: false,
  },
];

function App() {
  return (
    <>
      <Header />
      <div className="ml-5">
        <h2>User's todo list</h2>
        <div>
          <input
            class="bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow add-todo"
            type="text"
            name=""
          />{' '}
        </div>
      </div>

      <ul className="ml-5 mr-3 mt-5 min-w-5 flex-col">
        {data.map((todo) => (
          <li
            key={todo.id}
            className="text-gray-700 mt-2 pl-8 pr-6 pt-2 pb-2 border"
          >
            {todo.task}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
