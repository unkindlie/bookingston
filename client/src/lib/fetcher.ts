const BASE_URL = process.env.API_URL;

export async function fetcher<T>(
    endpoint: string,
    options?: RequestInit,
): Promise<T> {
    const res = await fetch(`${BASE_URL}${endpoint}`, options);
    if (!res.ok) {
        throw new Error(`Error fetching data: ${BASE_URL}${endpoint}`);
    }

    return await res.json();
}
