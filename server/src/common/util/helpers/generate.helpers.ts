function randonSymbolString(length: number = 10): string {
    const symbols =
        'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789';
    let id = '';

    for (let i = 0; i < length; i++) {
        id += symbols[Math.floor(Math.random() * symbols.length)];
    }

    return id;
}

export { randonSymbolString };
