import { supabase } from "./supabase.client";


// Ambil komentar berdasarkan post_id
export const getComments = async (postId: string) => {
    const { data, error } = await supabase
        .from("comments")
        .select("id, content, created_at, user_id")
        .eq("post_id", postId)
        .order("created_at", { ascending: false });

    if (error) {
        throw new Error(error.message);
    }
    return data;
};

// Tambahkan komentar baru
export const addComment = async (
    postId: string,
    userId: string,
    content: string
) => {
    const { data, error } = await supabase
        .from("comments")
        .insert([{ post_id: postId, user_id: userId, content }]);

    if (error) {
        throw new Error(error.message);
    }
    return data;
};

export const getPosts = async () => {
    const { data, error } = await supabase.from("posts").select("*");
    if (error) {
        throw new Error(error.message);
    }
    return data;    
}

export const deleteComment = async (commentId: string) => {
    return await supabase
        .from("comments")
        .delete()
        .eq("id", commentId);
};