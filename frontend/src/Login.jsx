import FormLayout from './components/FormLayout';
import Input from './components/Input';
import Password from './components/Password';
import Submit from './components/Submit';

import Header from './Header';

export default function () {
  return (
    <>
      <Header />
      <FormLayout>
        <Input />
        <Password />
        <Submit />
      </FormLayout>
    </>
  );
}
