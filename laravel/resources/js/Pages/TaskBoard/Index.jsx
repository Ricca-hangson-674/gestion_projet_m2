import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function TaskBoard(props) {

    const { auth } = props

    return (
        <AdminLayout auth={auth}>
            TaskBoard
        </AdminLayout>
    );
}
