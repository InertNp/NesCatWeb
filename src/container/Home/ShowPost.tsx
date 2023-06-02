import { DislikeFilled, LikeFilled, MessageFilled } from "@ant-design/icons";
import { Avatar, Button, List } from "antd";


const ShowPost = () => {
    const data = Array.from({ length: 23 }).map((_, i) => ({
        href: 'https://ant.design',
        title: `ant design part ${i}`,
        like: `${i * 7 + 13}`,
        avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
        description:
            'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    }));


    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: (page) => {
                    console.log(page);
                },
                pageSize: 5,
            }}
            dataSource={data}
            renderItem={(item) => (
                <List.Item
                    key={item.title}
                    actions={[
                        <div className="flex gap-2 ">

                            <Button className="flex gap-2 justify-center items-center">{item.like}<LikeFilled /></Button>
                            <Button><DislikeFilled /></Button>
                            <Button type="default" className="bg-transparent " disabled><MessageFilled /></Button>
                        </div>
                    ]}
                    extra={
                        <img
                            width={250}
                            alt="logo"
                            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                        />
                    }
                >
                    <List.Item.Meta
                        avatar={<Avatar src={item.avatar} />}
                        title={item.title}
                        description={item.description}
                    />
                    {item.content}
                </List.Item>
            )}
        />
    )
}

export default ShowPost