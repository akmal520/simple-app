import ProtectedRoute from "@/components/ProtectedRoute";
import UserAvatar from "@/components/UserAvatar";
import CardPost from "@/components/UserPost/CardPost";
import useAuth from "@/hooks/useAuth";
import { toast } from "@/lib/toast.lib";
import { getPosts } from "@/supabase/SupabaseHelpers";
import { Post } from "@/types/type";
import { Button, Spin } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";

const index = () => {
    const { logout, user } = useAuth();
    const router = useRouter();
    const [posts, setPosts] = React.useState<Post[]>([]);
    const [loading, setLoading] = React.useState(false);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const res = await getPosts();
            setPosts(res);
        } catch (error) {
            console.error("Error fetching posts:", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // if (user) {
        fetchPosts();
        // }
    }, [router.pathname]);

    useEffect(() => {
        console.log("Posts:", posts);
    }, [posts]);

    const handleLogout = async () => {
        try {
            await logout();
            toast({ type: "success", message: "Logout successful!" });
            router.push("/login");
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    return (
        <ProtectedRoute>
            <div className="flex flex-col items-center w-full h-full mt-20 gap-4">
                <h1 className="text-3xl font-bold">Welcome Home</h1>

                <div className="flex gap-4 items-center">
                    <button
                        className="text-red-500 font-bold border border-red-500 px-4 py-1 rounded hover:bg-red-500 hover:text-white transition duration-300"
                        onClick={() => handleLogout()}
                    >
                        Logout
                    </button>
                    <Link
                        className="text-green-500 font-bold border border-green-500 px-4 py-1 rounded hover:bg-green-500 hover:text-white transition duration-300"
                        href="/create/post"
                    >
                        Post
                    </Link>
                </div>

                <div className="flex flex-col items-center gap-4 mt-16">
                    <h1 className="relative text-2xl italic font-bold text-blue-500 before:absolute before:content-[''] before:w-full before:h-0.5 before:bg-blue-500 before:bottom-0">
                        New Posts
                    </h1>
                    <div className="border-2 border-dashed border-blue-300 w-[500px] h-[300px] rounded-md p-4 overflow-hidden overflow-y-scroll">
                        <div className="flex flex-col gap-4">
                            {posts.length > 0 ? (
                                posts.map((post) => (
                                    <Link
                                        key={post.id}
                                        href={`/post/${post.id}`}>
                                            <CardPost key={post.id} {...post} />
                                        </Link>
                                ))
                            ) : loading ? (
                                <div className="flex justify-center items-center h-full">
                                    <Spin indicator={<LoadingOutlined />} size="large" />
                                </div>
                            ) : (
                                <div className="flex justify-center items-center h-full">
                                    <p className="text-gray-500">No posts found.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default index;
