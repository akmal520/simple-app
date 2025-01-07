import useAuth from "@/hooks/useAuth";
import { useCommentStore } from "@/store/useCommentStore";
import { addComment } from "@/supabase/SupabaseHelpers";
import { Post } from "@/types/type";
import { Button, Form, Input, message } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from "next/router";
import { useEffect } from "react";
import CommentSection from "../CommentSection";
import UserAvatar from "../UserAvatar";

dayjs.extend(relativeTime);

const PostDetail: React.FC<Post> = (props) => {
    const { id, user_id, title, content, created_at } = props;
    const { user } = useAuth();
    const { comments, fetchComments } = useCommentStore();
    const [form] = Form.useForm();
    const router = useRouter();

    useEffect(() => {
        if (!id) return;
        fetchComments(id);
    }, [id]);

    useEffect(() => {
        console.log(comments);
    }, [comments]);

    const handleCommentSubmit = async (values: any) => {
        if (!user) {
            message.error("Anda harus login untuk memberikan komentar.");
            return;
        }

        try {
            await addComment(id, user.id, values.content);
            form.resetFields();
            message.success("Komentar berhasil ditambahkan.");
            fetchComments(id);
        } catch (error: any) {
            message.error(
                error.message || "Terjadi kesalahan saat menambahkan komentar."
            );
        }
    };

    return (
        <div className="max-w-3xl mx-auto my-6 p-4 bg-white shadow-md rounded-md">
            {/* tombol kembali */}
            <div className="mb-4">
                <Button
                    type="primary"
                    onClick={() => {
                        router.back();
                    }}
                >
                    Kembali
                </Button>
            </div>
            {/* Post Detail */}
            <div className="border border-blue-500 rounded-md p-4 mb-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <UserAvatar
                            username={user?.user_metadata.username}
                            size={35}
                        />
                        <h1 className="font-bold text-xl capitalize">
                            {user?.user_metadata.username}
                        </h1>
                    </div>
                    <span className="text-sm text-gray-500">
                        {dayjs(created_at).fromNow()}
                    </span>
                </div>
                <div className="bg-gray-200 h-0.5 mt-2 w-full" />
                <div className="mt-2 flex flex-col gap-1">
                    <h2 className="text-xl font-semibold capitalize">
                        {title}
                    </h2>
                    <p className="text-gray-700 text-lg">{content}</p>
                </div>
            </div>

            <div className="mt-6">
                <h3 className="text-xl font-bold mb-4">Komentar</h3>
                <div className="flex flex-col gap-4">
                    {comments.length > 0 ? (
                        comments.map((comment, index) => (
                            <CommentSection
                                id={comment.id}
                                user_id={comment.user_id}
                                content={comment.content}
                                created_at={comment.created_at}
                                key={index}
                                post_id={id}
                            />
                        ))
                    ) : (
                        <div className="text-center text-gray-500">
                            Belum ada komentar
                        </div>
                    )}
                </div>
            </div>

            {/* Add Comment Form */}
            <div className="mt-6">
                <Form form={form} onFinish={handleCommentSubmit}>
                    <Form.Item
                        name="content"
                        rules={[
                            {
                                required: true,
                                message: "Komentar tidak boleh kosong",
                            },
                        ]}
                    >
                        <Input.TextArea
                            rows={3}
                            placeholder="Tulis komentar Anda..."
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Kirim Komentar
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default PostDetail;

// import { useEffect, useState } from "react";
// import { supabase } from "@/supabase/supabase.client";
// import { Form, Input, Button, List, message } from "antd";
// import useAuth from "@/hooks/useAuth";
// import { addComment, getComments } from "@/supabase/SupabaseHelpers";
// import CommentSection from "../CommentSection";
// import { DetailProps, PostDetailProps } from "@/types/type";
// import UserAvatar from "../UserAvatar";
// import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";
// import { useCommentStore } from "@/store/useCommentStore";

// dayjs.extend(relativeTime);

// const PostDetail: React.FC<Partial<PostDetailProps>> = (props) => {
//     const { post } = props;
//     const { user } = useAuth();
//     const { comments, fetchComments } = useCommentStore();
//     const [postId, setPostId] = useState<string>("");

//     useEffect(() => {
//         if (!post?.id) return;
//         fetchComments(post.id);
//         setPostId(post.id);
//     }, [post?.id]);

//     return (
//         <div className="max-w-3xl mx-auto my-6 p-4 bg-white shadow-md rounded-md">
//             {/* Post Detail */}
//             <div className="border border-blue-500 rounded-md p-4 mb-6">
//                 <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-2">
//                         <UserAvatar
//                             username={user?.user_metadata.username}
//                             size={35}
//                         />
//                         <h1 className="font-bold text-xl capitalize">
//                             {user?.user_metadata.username}
//                         </h1>
//                     </div>
//                     <span className="text-sm text-gray-500">
//                         {dayjs(post?.created_at).fromNow()}
//                     </span>
//                 </div>
//                 <div className="bg-gray-200 h-0.5 mt-2 w-full" />
//                 <div className="mt-2 flex flex-col gap-1">
//                     <h2 className="text-xl font-semibold capitalize">
//                         {post?.title}
//                     </h2>
//                     <p className="text-gray-700 text-lg">{post.content}</p>
//                 </div>
//             </div>

//             {comments.length > 0 ? (
//                 comments.map((comment, index) => (
//                     <CommentSection id={comment.id} user_id={comment.user_id} content={comment.content} created_at={comment.created_at} key={index} post={ props } />
//                 ))
//             ) : (
//                 <div className="text-center text-gray-500">
//                     Belum ada komentar
//                 </div>
//             )
//             }
//         </div>
//     );
// };

// export default PostDetail;
