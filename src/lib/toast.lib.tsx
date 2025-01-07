import '@ant-design/v5-patch-for-react-19';
import { notification } from "antd";

// Define a reusable Toast utility
export const toast = ({
    type = "info",
    message = "",
    description = "",
    duration = 3, // Duration in seconds
}: {
    type?: "success" | "info" | "warning" | "error";
    message: string;
    description?: string;
    duration?: number;
}) => {
    notification[type]({
        message,
        description,
        duration,
        placement: "topRight", // Position of the toast
        style: {
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        },
    });
};
