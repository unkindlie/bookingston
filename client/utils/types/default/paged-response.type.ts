export type TPagedData<T = unknown> = {
    items: T[];
    page: number;
    take: number;
}