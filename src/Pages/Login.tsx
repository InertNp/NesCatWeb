import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { Alert, Button, Checkbox, Form, Input, Space } from 'antd';
import { setGlobalState } from '../hooks/GlobalHooks';
import { auth } from '../data/firebase';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'antd/es/form/Form';
import { useState } from 'react';

const Login = () => {
    const [form] = useForm();
    const navigate = useNavigate();
    const [error, setError] = useState(false)
    const onFinish = async (values: any) => {
        const e = { ...values }
        setGlobalState('loading', true)
        try {
            await signInWithEmailAndPassword(auth, e.email, e.password)

            setTimeout(() => {
                setGlobalState('loading', false)
            }, 1000)
        }
        catch (error) {
            console.log(error)
            setGlobalState('loading', false)
            form.resetFields();
            setError(true)
        }

        ///authentecation sate change hooks
        onAuthStateChanged(auth, (currUser => {
            const userData = { ...currUser }
            setGlobalState('loading', true)
            if (currUser) {
                setGlobalState('isLoggedIn', true);
                setGlobalState('currentUser', userData);
                localStorage.setItem('data', JSON.stringify(userData));
                localStorage.setItem('isLoggedIn', 'true');
                navigate("/home")
                setTimeout(() => {
                    setGlobalState('loading', false)
                }, 1000)
            }
            else {

                setGlobalState('loading', false)
                setGlobalState('isLoggedIn', false);
                navigate("/login")
            }
        }))

    };



    return (
        <div className='w-full flex justify-center mt-20'>
            <div className='flex w-[90%] h-full justify-center items-center '>
                <Form
                    form={form}
                    name="basic"
                    layout='vertical'
                    onFinish={onFinish}
                    autoComplete="off"
                    requiredMark={false}
                    className='flex flex-col rounded-lg justify-center items-center shadow-lg w-[90%] sm:w-{80%} md:w-[70%] lg:w-[50%] '
                >

                    <h1 className='text-2xl'>Login Form</h1>

                    <Form.Item
                        label="Email"
                        name="email"
                        className='w-[90%]'
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input className='w-full' type='email' placeholder='abc123@abc.com' minLength={5} />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        className='w-[90%]'
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password className='w-full' placeholder='Password' minLength={6} />
                    </Form.Item>

                    {(error) ? <Space direction="vertical" style={{ width: '90%' }} className='my-2'>
                        <Alert
                            message="Incorrect Email or Password"
                            type="error"
                            closable
                            onClose={() => setError(false)}
                        />
                    </Space> : null}

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
        </div >
    )
}

export default Login