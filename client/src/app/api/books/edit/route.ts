import { fetcher } from "../../../../lib/fetcher";

export async function PUT(request: Request) {
    const body = await request.json();

    try {
        await fetcher("/books/edit", {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        return Response.json({ message: "Success" });
    } catch (e) {
        console.log(e);
        return new Response(JSON.stringify({ message: "Error" }), {
            status: 500,
        });
    }
}
