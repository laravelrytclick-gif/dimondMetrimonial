import React from 'react';
import DashboardLayout from '@/components/dashboard-layout';
import { dummyFollowUps } from '@/data/dummy-data';
import { dummyMeetings, getProfileById } from '@/data/dummy-data';

const RMDashboard = () => {
  return (
    <DashboardLayout title="RM Dashboard">
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">RM Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your candidate management overview.</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">My Candidates</p>
                <p className="text-2xl font-bold text-gray-900">48</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Today's Calls</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-full">
                <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Meetings</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">156</p>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Follow-ups */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Today's Follow-ups</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {dummyFollowUps.slice(0, 2).map((followUp) => (
                  <div key={followUp.id} className={`flex items-center justify-between p-3 rounded-lg ${
                    followUp.priority === 'Urgent' ? 'bg-yellow-50' :
                    followUp.priority === 'Completed' ? 'bg-green-50' :
                    followUp.priority === 'Scheduled' ? 'bg-purple-50' :
                    'bg-blue-50'
                  }`}>
                    <div className="flex items-center">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        followUp.priority === 'Urgent' ? 'bg-yellow-100' :
                        followUp.priority === 'Completed' ? 'bg-green-100' :
                        followUp.priority === 'Scheduled' ? 'bg-purple-100' :
                        'bg-blue-100'
                      }`}>
                        <span className={`text-sm font-medium ${
                          followUp.priority === 'Urgent' ? 'text-yellow-600' :
                          followUp.priority === 'Completed' ? 'text-green-600' :
                          followUp.priority === 'Scheduled' ? 'text-purple-600' :
                          'text-blue-600'
                        }`}>
                          {followUp.initials}
                        </span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{followUp.profile_name}</p>
                        <p className="text-xs text-gray-500">{followUp.time} - {followUp.task}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      followUp.priority === 'Urgent' ? 'bg-yellow-100 text-yellow-800' :
                      followUp.priority === 'Completed' ? 'bg-green-100 text-green-800' :
                      followUp.priority === 'Scheduled' ? 'bg-purple-100 text-purple-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {followUp.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Meetings</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {dummyFollowUps.slice(2, 4).map((followUp) => {
                  const profile = getProfileById(followUp.profile_id);
                  return (
                    <div key={followUp.id} className={`flex items-center justify-between p-3 rounded-lg ${
                      followUp.priority === 'Urgent' ? 'bg-yellow-50' :
                      followUp.priority === 'Completed' ? 'bg-green-50' :
                      followUp.priority === 'Scheduled' ? 'bg-purple-50' :
                      'bg-blue-50'
                    }`}>
                      <div className="flex items-center">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                          followUp.priority === 'Urgent' ? 'bg-yellow-100' :
                          followUp.priority === 'Completed' ? 'bg-green-100' :
                          followUp.priority === 'Scheduled' ? 'bg-purple-100' :
                          'bg-blue-100'
                        }`}>
                          <span className={`text-sm font-medium ${
                            followUp.priority === 'Urgent' ? 'text-yellow-600' :
                            followUp.priority === 'Completed' ? 'text-green-600' :
                            followUp.priority === 'Scheduled' ? 'text-purple-600' :
                            'text-blue-600'
                          }`}>
                            {followUp.initials}
                          </span>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{followUp.profile_name}</p>
                          <p className="text-xs text-gray-500">{followUp.time} - {followUp.task}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        followUp.priority === 'Urgent' ? 'bg-yellow-100 text-yellow-800' :
                        followUp.priority === 'Completed' ? 'bg-green-100 text-green-800' :
                        followUp.priority === 'Scheduled' ? 'bg-purple-100 text-purple-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {followUp.priority}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RMDashboard;
