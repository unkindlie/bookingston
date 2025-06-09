"use client";

import { Layout } from "antd";
import { Header } from "./inner/Header";
import { ContentBox } from "./ContentBox";

const { Content, Footer } = Layout;

const Container = ({ children }: { children?: React.ReactNode }) => {
    return (
        <Layout
            style={{
                minHeight: "100vh",
            }}
        >
            <Header />
            <Content>
                <ContentBox>{children}</ContentBox>
            </Content>
            <Footer />
        </Layout>
    );
};

export { Container };
