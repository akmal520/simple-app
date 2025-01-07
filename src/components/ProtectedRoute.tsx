import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { ReactNode, useEffect } from "react";
import useAuth from "@/hooks/useAuth";

interface Props {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
        const token = Cookies.get("supabase_jwt");
        if (!token && !user) {
            router.replace("/login"); // Redirect ke halaman login jika tidak ada token
        }
    }, [router.pathname, user]);

    return <>{children}</>;
};

export default ProtectedRoute;
