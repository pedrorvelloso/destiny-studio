import React from 'react';
import { useForm } from 'react-hook-form';
import { Redirect, useHistory } from 'react-router-dom';

import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import * as yup from 'yup';

import { useAuth } from 'modules/AuthManager';

import Input from 'components/Input';
import Button from 'components/Button';

import { Container, AnimationContainer, Background } from './styles';

interface FormData {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email('Invalid e-mail').required('E-mail required'),
  password: yup.string().required('Password required'),
});

const Login: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<FormData>({
    validationSchema: schema,
  });
  const { signIn, user } = useAuth();
  const history = useHistory();

  const onSubmit = async ({ email, password }: FormData): Promise<void> => {
    await signIn({ email, password });
    history.push('/');
  };

  if (user) return <Redirect to="/" />;

  return (
    <Container>
      <AnimationContainer>
        <h1>Destiny Studio</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            name="email"
            type="text"
            innerRef={register}
            placeholder="E-mail"
            icon={AiOutlineMail}
            autoComplete="off"
            inputError={errors.email?.message as string}
          />
          <Input
            name="password"
            type="password"
            innerRef={register}
            placeholder="Password"
            icon={AiOutlineLock}
            inputError={errors.password?.message as string}
          />
          <Button type="submit">Log In</Button>
        </form>
      </AnimationContainer>
      <Background />
    </Container>
  );
};

export default Login;
