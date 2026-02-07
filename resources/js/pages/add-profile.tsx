import React from 'react';
import DashboardLayout from '@/components/dashboard-layout';
import AddProfile from '@/components/add-profile';

const AddProfilePage = () => {
    return (
        <DashboardLayout title="Add Profile">
            <AddProfile />
        </DashboardLayout>
    );
};

export default AddProfilePage;
