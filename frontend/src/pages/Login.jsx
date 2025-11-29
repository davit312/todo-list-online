import FormLayout from '../components/FormLayout';
import Input from '../components/Input';
import Password from '../components/Password';
import Button from '../components/Button';

import Header from '../components/Header';
import Checkbox from '../components/Checkbox';

export default function Login() {
  return (
    <>
      <Header />
      <FormLayout>
        <Input />
        <Password />
        <Button>Մուտք</Button>
      </FormLayout>
    </>
  );
}
