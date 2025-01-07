export interface Post {
    id: string;
    user_id: string;
    title: string;
    content: string;
    created_at: string;
}

export interface PostDetailProps {
    post: {
        id: string;
        user_id: string;
        title: string;
        content: string;
        created_at: string;
    };
}

export interface DetailProps extends PostDetailProps {
    id: string;
    user_id: string;
    title: string;
    content: string;
    created_at: string;
}
