import PostForm from '@/components/PostForm';
import ProtectedRoute from '@/components/ProtectedRoute';
import React from 'react';

const index = () => {
    return (
        <ProtectedRoute>
            <PostForm />
        </ProtectedRoute>
    );
};

export default index;