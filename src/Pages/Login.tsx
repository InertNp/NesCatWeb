
import { Button, Checkbox, Form, Input } from 'antd';

const Login = () => {
    const onFinish = (values: any) => {
        const e = { ...values }

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", e.username);
        window.location.href = "./";
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='w-full flex justify-center min-h-full '>
            <div className='flex w-[90%] h-full justify-center items-center'>

                <Form
                    name="basic"
                    layout='vertical'
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className='flex flex-col rounded-lg justify-center items-center shadow-lg w-[90%] sm:w-{80%} md:w-[70%] lg:w-[50%] '
                >
                    <h1 className='text-2xl'>Login Form</h1>
                    <Form.Item
                        label="Username"
                        name="username"
                        className='w-[90%]'
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input className='w-full' />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        className='w-[90%]'
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password className='w-full' />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked" className='w-[90%]'>
                        <Checkbox className='w-full flex justify-center items-center' defaultChecked>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item className='w-[90%] flex justify-center items-center'>
                        <Button type="primary" htmlType="submit" className='px-20' >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>

            </div>
        </div>
    )
}

export default Login