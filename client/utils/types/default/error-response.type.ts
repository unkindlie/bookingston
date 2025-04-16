export type TError = {
    message: string;
    cause: string | string[];
    timestamp: Date;
    path: string;
};
