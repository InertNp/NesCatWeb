import { HomeFilled, NotificationFilled, PlusOutlined } from '@ant-design/icons'
import { Badge, Menu, MenuProps } from 'antd'

import { Link } from 'react-router-dom';


export const SiderMenu = () => {


    const items: MenuProps['items'] = [

        {
            label: (<Link to={'/home'}>Home</Link>),
            key: "home",
            icon: (
                <HomeFilled style={{ fontSize: '20px' }} />
            )
        },
        {
            label: (<Link to={'/notification'}>Notification</Link>),
            key: "noti",
            icon: (
                <Badge size='default' dot offset={[10, 10]} color='cyan' >
                    <NotificationFilled color='black' style={{ fontSize: '20px' }} />
                </Badge>)
        },
        {
            label: (<Link to={'/AddPost'}>Add Post</Link>),
            key: "addPost",
            icon: (
                <PlusOutlined color='black' style={{ fontSize: '25px' }} />
            )
        },
    ]
    return (


        <Menu
            mode='inline'
            theme={'light'}
            items={items}
            defaultSelectedKeys={['home']}
            className='w-full max-w-[100%] flex flex-col justify-center items-center'
        />

    )
}

