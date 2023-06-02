import { DeleteOutlined } from "@ant-design/icons";
import { Avatar, Button, List } from "antd";

const Notify = () => {

    const data = [
        {
            title: 'Ant Design Title 1',
            desc: "this is no desc"
        },
        {
            title: 'Ant Design Title 2',
            desc: "this is no desc"
        },
        {
            title: 'Ant Design Title 3',
            desc: "this is no desc"
        },
        {
            title: 'Ant Design Title 4',
            desc: "this is no desc"
        },
    ];

    return (
        <List
            itemLayout="horizontal"
            dataSource={data}
            className="w-full "
            renderItem={(item, index) => (
                <List.Item actions={[<Button type="default" className="bg-transparent"><DeleteOutlined /></Button>]}>
                    <List.Item.Meta
                        avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                        title={item.title}
                        description={item.desc}
                    />
                </List.Item>
            )}
        />
    )
}

export default Notify