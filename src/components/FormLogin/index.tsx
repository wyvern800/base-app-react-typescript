import { ReactElement } from 'react';
import { useForm } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, Login } from './styles';

import FormField from '../FormField';

import auth from '../../services/auth';

import { useUserData } from '../../contexts/UserData';

const FormLogin = (): ReactElement => {
  const history = useHistory();

  const { userData } = useUserData();

  const validationSchema = yup.object().shape({
    email: yup.string().required('E-mail/login inválido'),
    password: yup
      .string()
      .max(32, 'Sua senha só pode ter no máximo 32 caracteres!')
      .required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ resolver: yupResolver(validationSchema) });

  /**
   * Executed when we hit submit on the login form
   * @param data Dados do login
   */
  const onSubmit = async (data: any) => {
    await auth
      .login(data?.email, data?.password)
      .then((response: any) => {
        history.push('/admin');
        localStorage.setItem('token', response?.data?.accessToken);

        toast.success('You successfully logged in!');
      })
      .catch(err => {
        toast.error('Invalid credentials');
      });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormField
        name="email"
        label="E-mail/Username"
        register={register}
        error={errors.email?.message}
        setValueFormState={setValue}
        width="100%"
      />
      <FormField
        name="password"
        type="password"
        label="Password"
        register={register}
        error={errors.password?.message}
        setValueFormState={setValue}
        width="100%"
      />
      <Link to="/register">Not registered yet? click to register</Link>
      <Login type="submit">Login</Login>
    </Form>
  );
};

export default FormLogin;
