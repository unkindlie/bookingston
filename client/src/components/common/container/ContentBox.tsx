import { Flex } from "antd";

const ContentBox = ({ children }: { children: React.ReactNode }) => {
    return <Flex style={{ padding: 30, paddingTop: 10, paddingBottom: 10 }}>{children}</Flex>;
};

export { ContentBox };
