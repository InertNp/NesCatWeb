import { PlusOutlined } from "@ant-design/icons"
import { Button, Cascader, DatePicker, Form, Input, InputNumber, Select, Switch, TreeSelect, Upload } from "antd"

const AddPost = () => {

    return (
        <div className="w-full mt-10 flex justify-center items-center">
            <Form

                layout="vertical"
                initialValues={{ size: 'large' }}
                size={'large'}
                style={{ maxWidth: 600 }}
                className="w-full"
            >
                <Form.Item className="flex w-full justify-center items-center">
                    <Upload
                        action="/upload.do"
                        listType="picture-card"
                        maxCount={1}
                    >
                        <div>
                            <PlusOutlined />
                            <div>Upload</div>
                        </div>
                    </Upload>
                </Form.Item>
                <Form.Item label="Title">
                    <Input />
                </Form.Item>

                <Form.Item label="Desc">
                    <Input />
                </Form.Item>


                <Form.Item label="" className="w-full  flex justify-center items-center">
                    <Button type="default" className="w-40">Upload</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddPost