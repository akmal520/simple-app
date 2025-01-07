import { getComments } from "@/supabase/SupabaseHelpers";
import { create } from "zustand";

interface IGetComments {
    id: string;
    content: string;
    created_at: string;
    user_id: string;
}

interface CommentState {
    comments: IGetComments[];
    fetchComments: (id: string) => Promise<void>;
    addComment: (comment: IGetComments) => void;
    deleteComment: (id: string) => void;
    updateComment: (id: string, comment: IGetComments) => void;
}

export const useCommentStore = create<CommentState>((set) => ({
    comments: [],
    fetchComments: async (id: string) => {
        try {
            const response = await getComments(id);;    
            set({ comments: response });
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    },
    addComment: (comment: IGetComments) => {
        set((state) => ({ comments: [comment, ...state.comments] }));    
    },
    deleteComment: (id: string) => {
        set((state) => ({ comments: state.comments.filter((comment) => comment.id !== id) }));
    },    
    updateComment: async (id: string) => {
        try {
            const response = await getComments(id);
            set((state) => ({ comments: [ ...response.filter((comment) => comment.id !== id), ...state.comments] }));
        } catch (error) {    
            console.error("Error fetching comments:", error);
        }
    },
}));