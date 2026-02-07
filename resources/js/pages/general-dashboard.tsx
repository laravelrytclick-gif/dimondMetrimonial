import React from 'react';
import DashboardLayout from '@/components/dashboard-layout';

const GeneralDashboard = () => {
  return (
    <DashboardLayout title="General Dashboard">
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">General Dashboard</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome!</h2>
          <p className="text-gray-600">
            This page is accessible to all authenticated users (Admin and RM).
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GeneralDashboard;