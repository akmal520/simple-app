import { supabase } from "@/supabase/supabase.client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

interface User {
    id: string;
    email: string;
    user_metadata: {
        username: string;
    };
}

interface AuthResponse {
    data?: any;
    error?: Error;
}

const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = Cookies.get("supabase_jwt");
        if (token) {
            supabase.auth.getUser(token).then(({ data }) => {
                setUser((data?.user as any) || null);
            });
        }
    }, []);

    const signUp = async (
        username: string,
        email: string,
        password: string
    ): Promise<AuthResponse> => {
        const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { username: username } } });
        if (error) return { error };
        return { data };
    };

    const login = async (
        email: string,
        password: string
    ): Promise<AuthResponse> => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) return { error };

        Cookies.set("supabase_jwt", data.session.access_token, { expires: 7 });
        setUser(data.user as any);
        return { data };
    };

    const logout = async (): Promise<void> => {
        const { error } = await supabase.auth.signOut();
        if (error) throw new Error(error.message);
        Cookies.remove("supabase_jwt");
        setUser(null);
    };

    interface CreatePostPayload {
        title: string;
        content: string;
        user_id: string;
    }

    const createPost = async (payload: CreatePostPayload): Promise<any> => {
        const response = await supabase.from("posts").insert([payload]);

        // if (error) {
        //     console.error("Error creating post in useAuth");
        //     throw new Error(error.message);
        // }
        return response;
    };

    return { user, signUp, login, logout, createPost };
};

export default useAuth;
