import { useContext, useState } from 'react';

import { Link, Navigate } from 'react-router';

import FormLayout from '../components/FormLayout';
import Input from '../components/Input';
import Password from '../components/Password';
import Button from '../components/Button';

import Header from '../components/Header';
import { UserContext } from '../contexts/User';

export default function Login() {
  const { user, putCurrentUser } = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState(user.currentUser);
  const [errors, setErrors] = useState([]);
  const handleOnLogin = (e) => {
    const currentErrors = [];

    e.preventDefault();

    const email = document
      .querySelector('#id-email')
      .value?.trim()
      .toLowerCase()
      .match(/.+@.+\..+/)
      ?.at(0);

    const password = document.querySelector('#id-password').value;

    if (!email) {
      currentErrors.push('Incorrect email form, use "user@domain.com"');
    }
    if (!password?.length || password.lengh < 4) {
      currentErrors.push('Password must have at least 4 symbols');
    }

    fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        window.localStorage.setItem('userToken', data.user.token);
        putCurrentUser(data.user);
        setCurrentUser(data.user);
      })
      .catch(() => {
        currentErrors.push('Login failed');
        setErrors(currentErrors);
      })
      .finally(() => {
        currentErrors.length > 0 && setCurrentUser(currentErrors);
      });
  };

  return (
    <>
      {currentUser?.id ? <Navigate to="/" /> : ''}
      <Header />
      <FormLayout
        description="To Do gives you focus, from work to play. Enter your credentials to view you todo list"
        handleOnSubmit={handleOnLogin}
      >
        <Input placeholder="Email" inputName="email" />
        <Password placeholder="Password" passwordName="password" />
        {errors.length > 0 ? (
          <div className=" text-red-700">
            <ul>
              {errors.map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          </div>
        ) : (
          ''
        )}
        <Button onClick={handleOnLogin}>Login</Button>
        <p className="text-center">
          <Link
            className="text-gray-500 text font-semibold py-2 px-4 rounded border border-gray-500 hover:bg-gray-500 hover:text-white transition duration-300 "
            to="/register"
          >
            Register
          </Link>
        </p>
      </FormLayout>
    </>
  );
}
