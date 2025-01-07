import React from "react";
import UserAvatar from "../UserAvatar";
import useAuth from "@/hooks/useAuth";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

interface CardPostProps {
    id: string;
    user_id: string;
    title: string;
    content: string;
    created_at?: string;
}

dayjs.extend(relativeTime);

const CardPost: React.FC<CardPostProps> = (props) => {
    const { user } = useAuth();
    return (
        <div className="flex items-center gap-2 border-2 border-blue-300 rounded-md p-4 hover:border-blue-500 transition duration-300">
            <div className="flex flex-col w-full">
                <div className="inline-flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <UserAvatar username={`user-${props.user_id}`} size={35} />
                        <span className="font-semibold text-blue-500 text-xl -mt-1 capitalize">
                            {user?.user_metadata.username}
                        </span>
                    </div>
                    <span className="text-sm text-gray-500">
                        {dayjs(props.created_at).fromNow()}
                    </span>
                </div>

                <div className="bg-gray-200 h-0.5 mt-2 w-full" />

                <div className="mt-2">
                    <h1 className="text-lg capitalize font-medium text-blue-500">
                        {props.title}
                    </h1>
                    <p className="text-base text-gray-500 line-clamp-1">
                        {props.content}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CardPost;
