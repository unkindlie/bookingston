"use server";

import { TAuthResponse } from "../../../utils/types/auth/auth-response.type";
import { TLoginInput } from "../../../utils/types/auth/login-input.type";
import { TError } from "../../../utils/types/default/error-response.type";
import { TResponse } from "../../../utils/types/default/response.type";

const userLogin = async (
    input: TLoginInput,
): Promise<TAuthResponse | TError> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
    });
    const json = (await res.json()) as TResponse<TAuthResponse>;

    return json.data || json.error;
};

export { userLogin };
