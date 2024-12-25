import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen gap-4">
            <h1 className="text-3xl">Bookingston</h1>
            <Link className="font-bold" href={"/books"}>
                Go to books
            </Link>
        </div>
    );
}
