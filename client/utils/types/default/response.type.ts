export type TResponse<T = unknown, E = unknown> = {
    statusCode: number;
    data: T | null;
    error: E | null;
}