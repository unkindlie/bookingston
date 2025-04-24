import type { Metadata } from "next";
import { Raleway } from "next/font/google";

import { StoreProvider } from "../providers/store.provider";
import { Container } from "../components/common/container/Container";
import "./globals.css";

const raleway = Raleway({
    subsets: ["latin", "cyrillic"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Bookingston: Get books",
    description: "Some info about the main page",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${raleway.className} antialiased`}>
                <StoreProvider>
                    <Container>{children}</Container>
                </StoreProvider>
            </body>
        </html>
    );
}
