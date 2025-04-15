export function generateNickname(userName: string): string {
    return (
        userName.toLowerCase().replaceAll(' ', '') +
        Math.floor(Math.random() * 1000000)
    );
}
