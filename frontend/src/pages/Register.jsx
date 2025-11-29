import FormLayout from '../components/FormLayout';
import Input from '../components/Input';
import Password from '../components/Password';
import Button from '../components/Button';

import Header from '../components/Header';
import Checkbox from '../components/Checkbox';
export default function Register() {
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
        handleOnSubmit={(e) => {
          console.log('submit trigerred');
          e.preventDefault();
        }}
      >
        <Input placeholder="Fullname" inputName="fullname" />
        <Input placeholder="Email" inputName="email" />
        <Password placeholder="Password" inputName="password" />
        <Password placeholder="Repeat password" inputName="repeat-password" />
        <div className="flex">
          <Checkbox checkboxName="auto-login" isChecked={true} />
          <p>
            <label htmlFor="id-auto-login">Auto login after registration</label>
          </p>
        </div>

        <Button>Register</Button>
        <link rel="stylesheet" href="" />
      </FormLayout>
    </>
  );
}
