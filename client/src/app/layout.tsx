import type { Metadata } from "next";
import { Raleway } from "next/font/google";

import { StoreProvider } from '../providers/store.provider';
import { Container } from '../components/common/container/Container';
import "./globals.css";

const geologica = Raleway({
    subsets: ['latin', 'cyrillic']
})

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
            <body
                className={`${geologica.className} antialiased`}
            >
                <StoreProvider>
                    <Container>
                        {children}
                    </Container>
                </StoreProvider>
            </body>
        </html>
    );
}
