export const cnMerge = (...classNames: (string | undefined)[]): string => {
    return classNames.join(" ");
};
