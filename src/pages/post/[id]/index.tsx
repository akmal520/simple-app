import PostDetail from "@/components/UserPost/PostDetail";
import { supabase } from "@/supabase/supabase.client";
import { Post, PostDetailProps } from "@/types/type";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";



const PostPage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const [post, setPost] = useState<Post>();
    const [loading, setLoading] = useState<boolean>(true);

    const fetchPost = async () => {
        if (!id) return;

        try {
            const { data, error } = await supabase
                .from("posts")
                .select("*")
                .eq("id", id)
                .single();

            if (error) {
                console.error("Error fetching post:", error.message);
                router.push("/");
            } else {
                setPost(data);
            }
        } catch (err) {
            console.error("Unexpected error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchPost();
    }, [id]);

    // useEffect(() => {
    //     console.log("Post:", post);
    // }, [post]);

    if (loading) {
        return <p>Memuat...</p>;
    }

    if (!post) {
        return <p>Post tidak ditemukan.</p>;
    }

    return <PostDetail id={post.id} user_id={post.user_id} title={post.title} content={post.content} created_at={post.created_at} />;
};

export default PostPage;
