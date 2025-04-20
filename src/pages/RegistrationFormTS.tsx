import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { sendNewUser } from '../redux/actions/createUserTS';
import { RootState, AppDispatch } from '../redux/store';

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

function RegistrationForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { newUser, loading, error } = useSelector((state: RootState) => state.createUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const { name, email, password } = data;
    dispatch(sendNewUser({ name, email, password }));
  };


  const password = watch('password');

  useEffect(() => {
    if (newUser) {
      console.log('User registered:', newUser);
    }
  }, [newUser]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Введите логин</label>
      <input
        {...register('name', {
          required: 'Введите имя пользователя',
          minLength: {
            value: 5,
            message: 'Имя пользователя не может быть короче 5 символов',
          },
        })}
        type="text"
      />
      {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}

      <label>Введите e-mail</label>
      <input
        {...register('email', {
          required: 'Введите e-mail',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Некорректный формат e-mail',
          },
        })}
        type="email"
      />
      {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}

      <label>Введите пароль</label>
      <input
        {...register('password', {
          required: 'Введите пароль',
          minLength: {
            value: 6,
            message: 'Пароль должен содержать минимум 6 символов',
          },
        })}
        type="password"
      />
      {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}

      <label>Повторите пароль</label>
      <input
        {...register('confirmPassword', {
          required: 'Повторите пароль',
          validate: (value) => value === password || 'Пароли не совпадают',
        })}
        type="password"
      />
      {errors.confirmPassword && (
        <p style={{ color: 'red' }}>{errors.confirmPassword.message}</p>
      )}

      {loading && <p>Регистрация...</p>}
      {error && <p style={{ color: 'red' }}>Ошибка: {error}</p>}
      {newUser && <p style={{ color: 'green' }}>Успешно зарегистрирован: {newUser.name}</p>}

      <button type="submit" disabled={loading}>
        Зарегистрироваться
      </button>
    </form>
  );
}

export default RegistrationForm;