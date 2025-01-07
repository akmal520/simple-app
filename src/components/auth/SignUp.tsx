import React, { useState } from "react";
import { Button, Input, Form } from "antd";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { toast } from "@/lib/toast.lib";
import { useRouter } from "next/router";

const SignUp: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const {signUp} = useAuth();
    const router = useRouter();

    const handleSignUp = async (values: any) => {
        setLoading(true);
        try {
            console.log("Sign Up Data:", values);
            // Call your sign-up API here
            const { error } = await signUp(username, email, password);
            if (error) {
                toast({
                    type: "error",
                    message: error.message
                })
            } else {
                toast({
                    type: "success",
                    message: "Sign up successful!"
                })
                router.push("/login");
            }
        } catch (error) {
            console.error("Sign Up Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-sm bg-white shadow-md rounded-md p-6">
                <h2 className="text-xl font-bold text-center mb-4">Sign Up</h2>
                <Form layout="vertical" onFinish={handleSignUp}>
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your username!",
                            },
                        ]}
                    >
                        <Input onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" />
                    </Form.Item>
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
                        <Input onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your password!",
                            },
                            {
                                min: 6,
                                message:
                                    "Password must be at least 6 characters!",
                            },
                        ]}
                    >
                        <Input.Password onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
                    </Form.Item>
                    <Form.Item
                        label="Confirm Password"
                        name="confirmPassword"
                        dependencies={["password"]}
                        rules={[
                            {
                                required: true,
                                message: "Please confirm your password!",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue("password") === value
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error(
                                            "The two passwords do not match!"
                                        )
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Confirm your password" />
                    </Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        loading={loading}
                        className="mt-2"
                    >
                        Sign Up
                    </Button>
                </Form>
                <div className="text-center mt-4">
                    <span>Already have an account? </span>
                    <Link href="/login" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
