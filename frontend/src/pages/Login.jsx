import { Link } from 'react-router';

import FormLayout from '../components/FormLayout';
import Input from '../components/Input';
import Password from '../components/Password';
import Button from '../components/Button';

import Header from '../components/Header';

export default function Login() {
  return (
    <>
      <Header />
      <FormLayout
        description="To Do gives you focus, from work to play. Enter your credentials to view you todo list"
        handleOnSubmit={(e) => {
          console.log('submit trigerred');
          e.preventDefault();
        }}
      >
        <Input placeholder="Email" inputName="email" />
        <Password placeholder="Password" />
        <Button isdisabled={true}>Login</Button>
        <p className="text-center">
          <Link
            class="text-gray-500 text hover:text-gray-700 font-semibold py-2 px-4 rounded border border-gray-500 hover:bg-gray-500 hover:text-white transition duration-300 "
            to="/register"
          >
            Register
          </Link>
        </p>
      </FormLayout>
    </>
  );
}
