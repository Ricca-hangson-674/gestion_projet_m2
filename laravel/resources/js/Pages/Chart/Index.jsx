import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Chart(props) {

    const {auth} = props

    return (
        <AdminLayout auth={auth}>
            Chart
        </AdminLayout>
    );
}
