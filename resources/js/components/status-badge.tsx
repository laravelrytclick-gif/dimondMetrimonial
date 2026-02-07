import React from 'react';

interface StatusBadgeProps {
    status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'active':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'hold':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'closed':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'lead':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'blocked':
                return 'bg-gray-100 text-gray-800 border-gray-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <span className={`
            inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
            ${getStatusColor(status)}
        `}>
            {status}
        </span>
    );
};

export default StatusBadge;
