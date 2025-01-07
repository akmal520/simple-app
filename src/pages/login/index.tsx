import dynamic from "next/dynamic";

const Login = dynamic(() => import("@/components/auth/Login"), { ssr: false });

const index = () => {
    return <Login />;
};

export default index;
