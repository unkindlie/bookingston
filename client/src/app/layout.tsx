import type { Metadata } from "next";
import { Playfair_Display, Rubik } from "next/font/google";
import { ConfigProvider } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";

import { StoreProvider } from "../providers/store.provider";
import { Container } from "../components/common/container/Container";
import "./globals.css";

const rubik = Rubik({
    subsets: ["latin", "cyrillic"],
});

const playfairD = Playfair_Display({
    subsets: ["latin", "cyrillic"],
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
                className={`${rubik.className} ${playfairD.className} antialiased`}
            >
                <StoreProvider>
                    <AntdRegistry>
                        <ConfigProvider
                            theme={{
                                token: {
                                    fontFamily: "Rubik",
                                },
                            }}
                        >
                            <Container>{children}</Container>
                        </ConfigProvider>
                    </AntdRegistry>
                </StoreProvider>
            </body>
        </html>
    );
}
