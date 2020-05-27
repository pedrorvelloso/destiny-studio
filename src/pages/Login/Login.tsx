import React from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import * as yup from 'yup';

import Input from 'components/Input';

import { Container } from './styles';

interface FormData {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>({
    validationSchema: schema,
  });
  const onSubmit = (data: FormData): void => console.log(data);

  return (
    <Container>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="email"
          type="text"
          innerRef={register}
          placeholder="E-mail"
          icon={AiOutlineMail}
          autoComplete="off"
        />
        <Input
          name="password"
          type="password"
          innerRef={register}
          placeholder="Password"
          icon={AiOutlineLock}
        />
        <button type="submit">Log In</button>
      </form>
    </Container>
  );
};

export default Login;
