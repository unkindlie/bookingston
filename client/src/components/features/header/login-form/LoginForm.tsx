"use client";

import { SubmitHandler, useForm } from "react-hook-form";

import { TLoginInput } from "../../../../../utils/types/auth/login-input.type";
import { Input } from "../../../common/ui/input/Input";
import { userLogin } from "../../../../lib/actions/auth";

import "./LoginForm.styles.css";

const LoginForm = () => {
    const { register, handleSubmit } = useForm<TLoginInput>();
    const onSubmit: SubmitHandler<TLoginInput> = async (data) =>
        console.log(data, await userLogin(data));

    return (
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <Input
                id="email-or-nick"
                labelText="Введіть ваші пошту або нікнейм:"
                placeholder="Ел. пошта або нікнейм"
                {...register("emailOrNick")}
            />
            <Input
                id="password"
                type="password"
                labelText="Введіть ваш пароль:"
                placeholder="Пароль"
                {...register("password")}
            />
            <button>Логін</button>
        </form>
    );
};

export { LoginForm };
