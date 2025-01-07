import dynamic from "next/dynamic";

const SignUp = dynamic(() => import("@/components/auth/SignUp"), { ssr: false });

const index = () => {
    return <SignUp />;
};

export default index;
