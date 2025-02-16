export type PagedResponse<T> = {
    data: T[];
    page: number;
    take: number;
}