import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import FormLayout from "../components/FormLayout";
import Input from "../components/Input";
import Password from "../components/Password";
import Button from "../components/Button";

import Header from "../components/Header";
import Checkbox from "../components/Checkbox";

import { UserContext } from "../contexts/User";

export default function Register() {
  const [errors, setErrors] = useState([]);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const { putCurrentUser } = useContext(UserContext);

  const navigator = useNavigate();

  const handleOnSubmit = function (e) {
    e.preventDefault();

    const currentErrors = [];

    const fullname = document.querySelector("input[name=fullname]").value;
    let email = document
      .querySelector("input[name=email]")
      .value.trim()
      .toLowerCase()
      .match(/.+@.+\..+/)
      ?.at(0);
    const password = document.querySelector("input[name=password]").value;
    const repeatPassword = document.querySelector(
      "input[name=repeat-password]"
    ).value;
    const autoLogin = document.querySelector("input[name=auto-login]").value;

    if (!fullname) {
      currentErrors.push("Empty fullname not allowed");
    }
    if (!email) {
      currentErrors.push('Incorrect email form, use "user@domain.com"');
    }

    if (!password?.length || password.lengh < 6) {
      currentErrors.push("Password must have at least 6 symbols");
    }

    if (password !== repeatPassword) {
      currentErrors.push("Passwords don't match");
    }

    if (currentErrors.length > 0) {
      setErrors(currentErrors);
      return;
    }

    fetch("http://localhost:3000/api/register", {
      method: "POST",
      body: JSON.stringify({
        fullname,
        email,
        password,
        autoLogin,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          currentErrors.push(`Registragion failed: ${json.message}`);
        } else {
          if (json.user.id) {
            console.log("with id");
            window.localStorage.setItem("userToken", json.user.token);
            putCurrentUser(json.user);
            navigator("/", { replace: true });
          } else {
            console.log("no id");
            console.log("success");
            setRegistrationSuccess(true);
          }
        }
      })
      .catch((err) => {
        currentErrors.push(`Registragion failed: ${err.message}`);
      })
      .finally(() => {
        if (currentErrors.length > 0) {
          return setErrors(currentErrors);
        }
      });
  };

  return (
    <>
      <Header />
      {!registrationSuccess ? (
        <FormLayout
          description={
            <span>
              A to-do list is a simple organizational tool that helps
              individuals keep track of tasks or activities they need to
              complete.
              <br />
              <br />
              With our online ToDo list managment system, keep your list always
              available. Register to join our system
            </span>
          }
          handleOnSubmit={handleOnSubmit}
        >
          <Input placeholder="Fullname" inputName="fullname" />
          <Input placeholder="Email" inputName="email" />
          <Password placeholder="Password" passwordName="password" />
          <Password
            placeholder="Repeat password"
            passwordName="repeat-password"
          />
          <div className="flex">
            <Checkbox checkboxName="auto-login" isChecked={true} />
            <p>
              <label htmlFor="id-auto-login">
                Auto login after registration
              </label>
            </p>
          </div>
          {errors.length > 0 ? (
            <div className=" text-red-700">
              <ul>
                {errors.map((err) => (
                  <li key={err}>{err}</li>
                ))}
              </ul>
            </div>
          ) : (
            ""
          )}
          <Button>Register</Button>

          <div className="text-center text-gray-600">
            <Link to="/login">Go to login page</Link>
          </div>
        </FormLayout>
      ) : (
        <>
          <div className="text-center text-green-500">Registration success</div>
          <div className="text-center text-gray-600">
            <Link to="/login">Go to login page</Link>
          </div>
        </>
      )}
    </>
  );
}
