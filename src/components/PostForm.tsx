import { toast } from "@/lib/toast.lib";
import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

const PostForm = () => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<any[]>([]);
    const { user, createPost } = useAuth();
    const router = useRouter();

    const onFinish = async (values: any) => {
        try {
            // Simpan data postingan
            const payload = {
                title: values.title,
                content: values.description,
                user_id: user?.id || "", // Pastikan user.id tersedia dari autentikasi
            };

            const res = await createPost(payload);

            if (res.status === 201) {
                toast({
                    type: "success",
                    message: "Postingan berhasil dibuat!",
                });
                form.resetFields();
                setFileList([]);
                router.push("/home");
            } else {
                toast({
                    type: "error",
                    message: "Terjadi kesalahan saat membuat postingan.",
                });
            }
        } catch (error: any) {
            message.error(
                error.message || "Terjadi kesalahan saat membuat postingan."
            );
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        message.error("Gagal mengirim form. Periksa isian Anda.");
        toast({
            type: "error",
            message: "Gagal mengirim form. Periksa isian Anda.",
        });
    };

    const handleUploadChange = (info: any) => {
        setFileList(info.fileList);
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4">Buat Postingan</h2>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                {/* Input Judul */}
                <Form.Item
                    label="Judul"
                    name="title"
                    rules={[{ required: true, message: "Judul wajib diisi" }]}
                >
                    <Input placeholder="Masukkan judul postingan" />
                </Form.Item>

                {/* Input Deskripsi */}
                <Form.Item
                    label="Deskripsi"
                    name="description"
                    rules={[
                        { required: true, message: "Deskripsi wajib diisi" },
                    ]}
                >
                    <Input.TextArea
                        placeholder="Tulis deskripsi postingan"
                        rows={4}
                    />
                </Form.Item>

                {/* Upload Gambar
                <Form.Item label="Unggah Gambar" name="image">
                    <Upload
                        accept="image/*"
                        listType="picture"
                        onChange={handleUploadChange}
                        beforeUpload={() => false} // Mencegah unggahan langsung
                        fileList={fileList}
                    >
                        <Button icon={<UploadOutlined />}>
                            Klik untuk Unggah
                        </Button>
                    </Upload>
                </Form.Item> */}

                {/* Tombol Submit */}
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                    >
                        Buat Postingan
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default PostForm;
