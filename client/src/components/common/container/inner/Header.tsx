import { Flex, Layout } from "antd";

import { AppLogo } from '../../ui/app-logo/AppLogo';
import { HeaderAuthDropdown } from './HeaderAuthButton';

const headerStyle: React.CSSProperties = {
    color: "#0087cf",
    backgroundColor: "#f5f5f5",
    padding: "0 30px",
};

const { Header: AntHeader } = Layout;

const Header = () => {
    return (
        <AntHeader style={headerStyle}>
            <Flex justify="space-between">
                <AppLogo />
                <HeaderAuthDropdown />
            </Flex>
        </AntHeader>
    );
};

export { Header };
