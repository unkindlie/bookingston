import { TError } from '../../utils/types/default/error-response.type';
import { TResponse } from '../../utils/types/default/response.type';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetcher<T>(
    endpoint: string,
    options?: RequestInit,
): Promise<TResponse<T, null> | TResponse<null, TError>> {
    const res = await fetch(`${BASE_URL}${endpoint}`, options);
    if (!res.ok) {
        return await res.json() as TResponse<null, TError>;
    }

    return await res.json() as TResponse<T, null>;
}
