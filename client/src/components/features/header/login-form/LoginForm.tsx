"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { TLoginInput } from "../../../../../utils/types/auth/login-input.type";
import { Input } from "../../../common/ui/input/Input";
import { userLogin } from "../../../../lib/actions/auth";
import { Button } from "../../../common/ui/button/Button";

import "./LoginForm.styles.css";

const schema = yup
    .object({
        emailOrNick: yup.string().required(),
        password: yup
            .string()
            .required()
            .min(8)
            .matches(/((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})/),
    })
    .required();

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { isValid },
    } = useForm<TLoginInput>({
        resolver: yupResolver(schema),
    });
    const onSubmit: SubmitHandler<TLoginInput> = async (data) =>
        console.log(data, await userLogin(data));

    return (
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <Input
                required
                id="email-or-nick"
                labelText="Введіть ваші пошту або нікнейм:"
                placeholder="Ел. пошта або нікнейм"
                {...register("emailOrNick")}
            />
            <Input
                required
                id="password"
                type="password"
                labelText="Введіть ваш пароль:"
                placeholder="Пароль"
                {...register("password")}
            />
            <Button disabled={!isValid} className="login-button">
                Увійти
            </Button>
        </form>
    );
};

export { LoginForm };
