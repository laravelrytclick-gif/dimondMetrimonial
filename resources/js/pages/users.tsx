import React from 'react';
import DashboardLayout from '@/components/dashboard-layout';
import UsersList from '@/components/users-list';

const UsersPage: React.FC = () => {
  return (
    <DashboardLayout title="Users Management">
      <UsersList />
    </DashboardLayout>
  );
};

export default UsersPage;
