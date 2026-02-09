import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { useAuthStore } from '@/stores/auth';
import { 
    LayoutDashboard, 
    Users, 
    FileText, 
    UserCheck, 
    Calendar, 
    Phone, 
    DollarSign,
    Menu,
    X,
    LogOut,
    Settings,
    Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';

interface DashboardLayoutProps {
    children: React.ReactNode;
    title?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
    children, 
    title = 'Dashboard' 
}) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user } = useAuthStore();

    // Admin menu items
    const adminMenuItems = [
        {
            title: 'Dashboard',
            icon: LayoutDashboard,
            href: '/admin-dashboard',
            current: window.location.pathname === '/admin-dashboard'
        },
        
        {
            title: 'Reports',
            icon: FileText,
            href: '/admin/reports',
            current: window.location.pathname === '/admin/reports'
        },
        {
            title: 'All Profiles',
            icon: UserCheck,
            href: '/profiles',
            current: window.location.pathname === '/profiles'
        },
        {
            title: 'Finance',
            icon: DollarSign,
            href: '/admin/finance',
            current: window.location.pathname === '/admin/finance'
        },
        {
            title: 'Users Management',
            icon: Users,
            href: '/admin/users',
            current: window.location.pathname === '/admin/users'
        }
    ];

    // RM menu items
    const rmMenuItems = [
        {
            title: 'Dashboard',
            icon: LayoutDashboard,
            href: '/rm-dashboard',
            current: window.location.pathname === '/rm-dashboard'
        },
        {
            title: 'My Candidates',
            icon: Users,
            href: '/rm/candidates',
            current: window.location.pathname === '/rm/candidates'
        },
        {
            title: 'Follow-ups',
            icon: Phone,
            href: '/rm/followups',
            current: window.location.pathname === '/rm/followups'
        },
        {
            title: 'Meetings',
            icon: Calendar,
            href: '/rm/meetings',
            current: window.location.pathname === '/rm/meetings'
        }
    ];

    // Determine menu items based on current path or default to admin
    const isAdminPath = window.location.pathname.includes('admin') || window.location.pathname === '/admin-dashboard';
    const menuItems = isAdminPath ? adminMenuItems : rmMenuItems;
    const isUserAdmin = isAdminPath;

    const handleLogout = async () => {
        try {
            const { logout } = useAuthStore.getState();
            await logout();
            router.visit('/login');
        } catch (error) {
            console.error('Logout error:', error);
            router.visit('/login');
        }
    };

    return (
        <>
            <Head title={title} />
            
            <div className="min-h-screen flex bg-gray-50">
                {/* Mobile sidebar overlay */}
                {sidebarOpen && (
                    <div 
                        className="fixed inset-0 z-40 lg:hidden bg-gray-600 bg-opacity-75"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Sidebar */}
                <div className={`
                    fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                `}>
                    <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
                        <h1 className="text-xl font-bold text-gray-900">
                            {isUserAdmin ? 'Admin Panel' : 'RM Portal'}
                        </h1>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="lg:hidden"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    <nav className="mt-6 px-3">
                        <div className="space-y-1">
                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <a
                                        key={item.title}
                                        href={item.href}
                                        className={`
                                            group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150
                                            ${item.current 
                                                ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                                                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                            }
                                        `}
                                    >
                                        <Icon className="mr-3 h-5 w-5 shrink-0" />
                                        {item.title}
                                    </a>
                                );
                            })}
                        </div>
                    </nav>

                    {/* User info in sidebar */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
                        <div className="flex items-center">
                            <div className="shrink-0">
                                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                                    <span className="text-white text-sm font-medium">
                                        {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                                    </span>
                                </div>
                            </div>
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-gray-900">{user?.name || 'Admin User'}</p>
                                <p className="text-xs text-gray-500">{user?.role || (isUserAdmin ? 'Admin' : 'RM')}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <div className="flex-1 bg-white">
                    {/* Top Navbar */}
                    <header className="bg-white shadow-sm border-b border-gray-200">
                        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="lg:hidden"
                                    onClick={() => setSidebarOpen(true)}
                                >
                                    <Menu className="h-5 w-5" />
                                </Button>
                                
                                <div className="ml-4 lg:ml-0">
                                    <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                {/* Notifications */}
                                <Button variant="ghost" size="sm" className="relative">
                                    <Bell className="h-5 w-5 text-gray-500" />
                                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                                        3
                                    </span>
                                </Button>

                                {/* Settings */}
                                <Button variant="ghost" size="sm">
                                    <Settings className="h-5 w-5 text-gray-500" />
                                </Button>

                                {/* Logout */}
                                <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={handleLogout}
                                    className="text-gray-500 hover:text-red-600"
                                >
                                    <LogOut className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                    </header>

                    {/* Page content */}
                    <main className="flex-1">
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
};

export default DashboardLayout;
