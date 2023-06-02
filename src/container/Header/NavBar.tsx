import { Menu } from "antd"
import type { MenuProps } from "antd";


const NavBar = () => {
    const items: MenuProps['items'] = [
        {
            label: 'Navigation One',
            key: 'mail',

        },
        {
            label: 'Navigation Two',
            key: 'app',

            disabled: true,
        },
        {
            label: (
                <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                    Navigation Four - Link
                </a>
            ),
            key: 'alipay',
        },
    ];
    return (
        <Menu mode="horizontal" items={items}
        />
    )
}

export default NavBar