'use server'

import { revalidateTag } from 'next/cache'

export async function revalidateBook(id: string) {
    revalidateTag(`book-${id}`)
}