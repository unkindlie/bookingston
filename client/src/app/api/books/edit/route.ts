import { TBookDetailed } from "../../../../../utils/types/book/book-detailed.type";

export async function GET() {
    return new Response(JSON.stringify({ message: "hello" }), {
        status: 200,
    });
}

export async function PUT(request: Request) {
    const body = Object.assign({}, (await request.json()) as TBookDetailed);

    try {
        await fetch("http://localhost:3000/books/edit", {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        return new Response(JSON.stringify({ message: "success" }), {
            status: 200,
        });
    } catch (e) {
        console.log(e);
        return new Response(JSON.stringify({ message: "error" }), {
            status: 500,
        });
    }
}
