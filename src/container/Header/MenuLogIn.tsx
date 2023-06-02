import { AppstoreOutlined, MenuFoldOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, MenuProps } from 'antd';

import { useGlobalState } from '../../hooks/GlobalHooks';
import { Link } from 'react-router-dom';

const MenuLogIn = () => {
    const [name] = useGlobalState('name')
    const itemLogin: MenuProps['items'] = [
        {
            label: (<Link className='text-black text-md cursor-pointer flex justify-center items-center gap-2' to={'./profile/:id'}>
                <Avatar icon={<UserOutlined />} />
                {name}
            </Link>),
            key: 'Nam',


        },
        {
            key: "Sth",
            label: (<div><AppstoreOutlined style={{ fontSize: '25px' }} /></div>),
            children: [
                {
                    label: (<div className='w-full  flex justify-start items-center'

                        onClick={() => {
                            localStorage.clear()
                            window.location.href = "./";
                        }}>
                        Sign Out
                    </div>),
                    key: 'setting1',
                },
                {
                    label: (<Link to={'./'}>
                        Help
                    </Link>),
                    key: 'setting3',
                },
                {
                    label: (<Link to={'./'}>
                        FAQ
                    </Link>),
                    key: 'setting4',
                },
            ]

        },

    ];
    return (
        < Menu
            mode="horizontal"
            items={itemLogin}
            className="max-h-[80%] text-md flex justify-end items-center w-1/2 "
            theme="light"
            overflowedIndicator={<MenuFoldOutlined />}
            forceSubMenuRender={true}
        />
    )
}

export default MenuLogIn