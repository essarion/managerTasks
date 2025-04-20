import React from "react";
import { useForm } from "react-hook-form";

function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const onSubmit = (data) => {
        dispatch()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Логин</label>
            <input
                {...register('login', {
                    require: 'Введите логин',
                    minLength: {
                        value: 5,
                        message: 'Имя пользователся не может быть менее 5 знаков'
                    }
                })}
                type="text" />
            {errors.name && <p style={{ color: 'red' }}>{errors.message}</p>}

            <labe>Пароль</labe>
            <input
                {...register('password', {
                    require: 'Введите пароль',

                })}
                type="password" />

            x
            <button type="onSubmit">Войти</button>
        </form>
    )
}


export default LoginForm