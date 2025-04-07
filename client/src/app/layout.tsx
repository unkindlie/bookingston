import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { StoreProvider } from '../providers/store.provider';
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
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
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <StoreProvider>{children}</StoreProvider>
            </body>
        </html>
    );
}
