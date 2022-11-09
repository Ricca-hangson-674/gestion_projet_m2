import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Backlog(props) {

    const {auth, errors} = props

    console.log(errors)

    return (
        <AdminLayout auth={auth}>
            Backlog
        </AdminLayout>
    );
}
