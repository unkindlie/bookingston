import { TError } from "./error-response.type";

type TStatusCode = { statusCode: number };

export type TResponse<T = unknown> = TStatusCode &
    ({ data: T; error: null } | { data: null; error: TError });
