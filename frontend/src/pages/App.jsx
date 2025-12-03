import Header from "../components/Header";
import Checkbox from "../components/Checkbox";
import { useState, useContext, useEffect } from "react";

import { UserContext } from "../contexts/User";

function App() {
  const { user, logout, token } = useContext(UserContext);
  const [todos, setTodos] = useState([]);

  useEffect(
    function () {
      fetch("http://localhost:3000/api/todo/get-all", {
        method: "GET",
        headers: {
          "x-auth": token,
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => setTodos(data.todos));
    },
    [user, token]
  );

  const handleAddOnclick = function () {
    const taskEL = document.querySelector("#new-task");
    const task = taskEL.value;
    if (!task?.length) return;

    fetch("http://localhost:3000/api/todo/add", {
      method: "POST",
      body: JSON.stringify({
        task,
      }),
      headers: {
        "x-auth": token,
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          return null;
        }

        if (!data?.todo) {
          return "Error on getting todo";
        }

        const updatedTodo = [data.todo, ...todos.slice()];
        setTodos(updatedTodo);
        taskEL.value = "";
      });
  };

  const handleDeleteClick = function (todo) {
    fetch(`http://localhost:3000/api/todo/delete/${todo.id}`, {
      method: "DELETE",
      headers: {
        "x-auth": token,
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          return "error";
        }
        const id = data.deletedID;

        const arr = todos.filter((todo) => {
          return todo.id !== Number(id);
        });

        setTodos(arr);
      })
      .catch(() => {});
  };

  const handleAddInputOnKeyDown = function (e) {
    if (e.key === "Enter") {
      if (!e.target.value) {
        return;
      }
      handleAddOnclick();
    }
  };

  const handleOnConleteChange = function (todo, i) {
    const uTodo = { ...todo };
    uTodo.complete = Number(!uTodo.complete);

    fetch(`http://localhost:3000/api/todo/update/${todo.id}`, {
      method: "POST",
      headers: {
        "x-auth": token,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        todo: uTodo,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          return;
        }
        const uToddoList = todos.slice();
        uToddoList[i] = uTodo;
        setTodos(uToddoList);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Header />
      <div className="ml-5 mr-3">
        <h2>
          <strong>{user?.fullname}</strong>'s todo list
          <button
            onClick={logout}
            className="bg-gray-100 hover:bg-gray-300 text-gray-800 ml-2 mb-1 px-1 border border-gray-400 rounded shadow"
          >
            Logout
          </button>
        </h2>
        <div className="flex justify-between">
          <input
            className="bg-gray-50 focus:bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            onKeyDown={handleAddInputOnKeyDown}
            id="new-task"
            placeholder="New todo..."
            style={{ width: "80%" }}
            type="text"
            name="-"
          />
          <button
            onClick={handleAddOnclick}
            className="bg-gray-100 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          >
            + Add todo
          </button>
        </div>
      </div>

      <ul className="ml-5 mr-3 mt-5 min-w-5 flex-col">
        {todos.map((todo, i) => {
          return (
            <li
              key={todo.id}
              className="flex text-gray-700 
              mt-2 pl-8 pr-6 pt-2 pb-2 border hover:bg-gray-100"
            >
              <Checkbox
                isChecked={todo.complete === 1}
                checkboxName={`complete-${todo.id}`}
                handleOnChange={() => handleOnConleteChange(todo, i)}
              >
                <span
                  className={
                    "hover:cursor-pointer  " +
                    (todo.complete === 1 ? "line-through" : null)
                  }
                >
                  {todo.task}
                </span>
              </Checkbox>
              <button
                className="bg-gray-100 hover:bg-gray-300 text-gray-800 font-semibold "
                style={{ marginLeft: "auto" }}
                onClick={() => handleDeleteClick(todo)}
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
