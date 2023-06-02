import { Menu, MenuProps } from "antd"
import { Link } from "react-router-dom";

import { MenuFoldOutlined } from "@ant-design/icons";

const MenuNoLogin = () => {

    const itemNoLogin: MenuProps['items'] = [
        {
            label: (<Link to='/Register' >
                Register
            </Link>),
            key: 'help',
            disabled: true,
        },
        {
            label: (
                <Link to='/login'  >
                    Log In
                </Link>
            ),
            key: 'login',

        },
    ];
    return (
        <Menu
            mode="horizontal"
            items={itemNoLogin}
            className="max-h-[80%] text-md flex justify-end items-center w-1/2 "
            theme="light"
            overflowedIndicator={<MenuFoldOutlined />}
            forceSubMenuRender={true}
        />
    )
}

export default MenuNoLogin