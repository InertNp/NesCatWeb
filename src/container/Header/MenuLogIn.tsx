import { AppstoreOutlined, MenuFoldOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, MenuProps } from 'antd';
import { signOut } from 'firebase/auth';
import { setGlobalState, useGlobalState } from '../../hooks/GlobalHooks';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../data/firebase';


const MenuLogIn = () => {

    const [currentUser] = useGlobalState('currentUser')
    const navigate = useNavigate();
    const itemLogin: MenuProps['items'] = [
        {
            label: (<Link className='text-black text-md cursor-pointer flex justify-center items-center gap-2' to={'./profile/:id'}>
                <Avatar icon={<UserOutlined />} />
                {currentUser?.email}
            </Link>),
            key: 'Nam',
        },
        {
            key: "Sth",
            label: (<div className='flex justify-center items-center'><AppstoreOutlined style={{ fontSize: '25px' }} /></div>),
            children: [
                {
                    label: (<div className='w-full  flex justify-start items-center'
                        onClick={async () => {
                            signOut(auth);
                            setGlobalState('isLoggedIn', false)
                            localStorage.clear();
                            navigate('/login')
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