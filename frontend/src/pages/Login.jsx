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
        handleOnSubmit={(e) => {
          console.log('submit trigerred');
          e.preventDefault();
        }}
      >
        <Input placeholder="Email" />
        <Password placeholder="Password" />
        <Button>Մուտք</Button>
      </FormLayout>
    </>
  );
}
