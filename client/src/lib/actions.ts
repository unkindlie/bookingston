'use server'

import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

export async function revalidateBook(id: string) {
    revalidateTag(`book-${id}`)
    redirect(`/books/${id}`)
}