import useAuth from "@/hooks/useAuth";
import { useCommentStore } from "@/store/useCommentStore";
import { deleteComment } from "@/supabase/SupabaseHelpers";
import { Button, message, Popconfirm } from "antd";
import dayjs from "dayjs";
import React from "react";
import UserAvatar from "./UserAvatar";

interface CommentSectionProps {
    id: string;
    content: string;
    created_at: string;
    user_id: string;
    post_id: string;
}

const CommentSection: React.FC<CommentSectionProps> = (props) => {
    const { id, content, created_at, user_id, post_id } = props;
    const { user } = useAuth();
    const { fetchComments } = useCommentStore();

    const handleDelete = async () => {
        try {
            const result = await deleteComment(id); // Panggil fungsi delete
            if (result.error) {
                message.error("Gagal menghapus komentar.");
            } else {
                message.success("Komentar berhasil dihapus.");
                fetchComments(post_id); // Refresh komentar setelah menghapus
            }
        } catch (err) {
            console.error("Error deleting comment:", err);
            message.error("Terjadi kesalahan saat menghapus komentar.");
        }
    };
    return (
        // Comments Section
        <div className="w-full border border-blue-500 rounded-md p-4">
            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <UserAvatar username={user_id} size={35} />
                    <span className="font-semibold text-blue-500 text-base -mt-1 capitalize">
                        {user_id}
                    </span>
                </div>
                <span className="text-sm text-gray-500">
                    {dayjs(created_at).fromNow()}
                </span>
            </div>
            <div className="bg-gray-300 h-0.5 mt-2 w-full" />
            <div className="mt-5 flex justify-between items-center">
                <p className="text-base text-gray-500">{content}</p>
                {/* Tampilkan tombol hapus hanya jika user adalah pemilik komentar */}
                {user?.id === user_id && (
                    <Popconfirm
                        title="Yakin ingin menghapus komentar ini?"
                        onConfirm={handleDelete}
                        okText="Ya"
                        cancelText="Tidak"
                    >
                        <Button type="link" danger>
                            Hapus
                        </Button>
                    </Popconfirm>
                )}
            </div>
        </div>
    );
};

export default CommentSection;
