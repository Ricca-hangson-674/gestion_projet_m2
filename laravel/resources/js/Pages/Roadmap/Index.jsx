import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Roadmap(props) {
    const { auth } = props

    return (
        <AdminLayout auth={auth}>
            Roadmap
        </AdminLayout>
    );
}
