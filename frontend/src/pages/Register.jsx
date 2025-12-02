import FormLayout from "../components/FormLayout";
import Input from "../components/Input";
import Password from "../components/Password";
import Button from "../components/Button";

import Header from "../components/Header";
import Checkbox from "../components/Checkbox";
export default function Register() {
  const handleOnSubmit = function (e) {
    e.preventDefault();

    const fullname = document.querySelector("input[name=fullname]");
    const email = document.querySelector("input[name=email]");
    const password = document.querySelector("input[name=password]");
    const repeatPassword = document.querySelector(
      "input[name=repeat-password]"
    );
    const autoLogin = document.querySelector("input[name=auto-login]");

    console.log(
      fullname.value,
      email.value,
      password.value,
      repeatPassword.value,
      autoLogin.value
    );
  };

  return (
    <>
      <Header />
      <FormLayout
        description={
          <span>
            A to-do list is a simple organizational tool that helps individuals
            keep track of tasks or activities they need to complete.
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
            <label htmlFor="id-auto-login">Auto login after registration</label>
          </p>
        </div>

        <Button>Register</Button>
      </FormLayout>
    </>
  );
}
