import React, { useState } from "react";
import { Button, Input, Form } from "antd";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { toast } from "@/lib/toast.lib";
import { useRouter } from "next/router";

const Login: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const {login} = useAuth();
    const router = useRouter();

    const handleLogin = async (values: any) => {
        setLoading(true);
        try {
            console.log("Login Data:", values);
            // Call your login API here
            const { error } = await login(values.email, values.password);
            if (error) {
                toast({ type: "error", message: error.message });
            } else {
                toast({ type: "success", message: "Login successful!" });
                // Redirect to home page
                router.push("/home");
            }
        } catch (error) {
            console.error("Login Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-sm bg-white shadow-md rounded-md p-6">
                <h2 className="text-xl font-bold text-center mb-4">Login</h2>
                <Form layout="vertical" onFinish={handleLogin}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your email!",
                            },
                            {
                                type: "email",
                                message: "Please enter a valid email!",
                            },
                        ]}
                    >
                        <Input placeholder="Enter your email" />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your password!",
                            },
                        ]}
                    >
                        <Input.Password placeholder="Enter your password" />
                    </Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        loading={loading}
                        className="mt-2"
                    >
                        Login
                    </Button>
                </Form>
                <div className="text-center mt-4">
                    <span>Don't have an account? </span>
                    <Link href="/signup" className="text-blue-500 hover:underline">
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
