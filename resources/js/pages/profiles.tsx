import React from 'react';
import DashboardLayout from '@/components/dashboard-layout';
import ProfileList from '@/components/profile-list';

const ProfilesPage = () => {
    return (
        <DashboardLayout title="All Profiles">
            <ProfileList />
        </DashboardLayout>
    );
};

export default ProfilesPage;
