import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button'; // Example button from ShadCN
import { Icons } from '../ui/Icons';

const AdminSidebar: React.FC = () => {
    const location = useLocation();  // Get the current URL
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    // Check if the path is active
    const isActive = (path: string) => location.pathname === path;

    return (
        <>
            {!isOpen &&
                <div className="lg:hidden p-4">
                    <Button variant="ghost" onClick={toggleSidebar}>
                        <Icons.menu className="w-6 h-6 text-white" />
                    </Button>
                </div>
            }
            {/* Sidebar for large screens or when toggled on small screens */}
            <div
                className={`${isOpen ? 'block' : 'hidden'
                    } lg:block lg:relative top-0 left-0 z-50 lg:z-auto min-h-screen w-64 bg-gray-800 text-white shadow-lg transition-all duration-100 ease-in-out`}
            >
                <div className="p-4">
                    <nav className="space-y-4">
                        <Link
                            to={'/admin'}
                            className={`block py-2 px-4 rounded-lg hover:bg-gray-700 hover:text-gray-300 transition-colors duration-100 ease-in-out
                            ${isActive('/admin')|| isActive('/admin/') ? 'bg-gray-700 text-gray-300' : ''}`}
                            onClick={toggleSidebar}
                        >
                            <div className='flex items-center'>
                                <Icons.dashboard className='mr-2' />
                                Dashboard
                            </div>
                        </Link>
                        <Link
                            to={'/admin/customers'}
                            className={`block py-2 px-4 rounded-lg hover:bg-gray-700 hover:text-gray-300 transition-colors duration-100 ease-in-out
                            ${isActive('/admin/customers') ? 'bg-gray-700 text-gray-300' : ''}`}
                            onClick={toggleSidebar}
                        >
                            <div className='flex items-center'>
                                <Icons.users className='mr-2' />
                                Customers
                            </div>
                        </Link>
                        <Link
                            to={'/admin/requests'}
                            className={`block py-2 px-4 rounded-lg hover:bg-gray-700 hover:text-gray-300 transition-colors duration-100 ease-in-out
                            ${isActive('/admin/requests') ? 'bg-gray-700 text-gray-300' : ''}`}
                            onClick={toggleSidebar}
                        >
                            <div className='flex items-center'>
                                <Icons.request className='mr-2' />
                                Requests
                            </div>
                        </Link>
                        <Link
                            to={'/admin/plans'}
                            className={`block py-2 px-4 rounded-lg hover:bg-gray-700 hover:text-gray-300 transition-colors duration-100 ease-in-out
                            ${isActive('/admin/plans') ? 'bg-gray-700 text-gray-300' : ''}`}
                            onClick={toggleSidebar}
                        >
                            <div className='flex items-center'>
                                <Icons.plan className='mr-2' />
                                Plans
                            </div>
                        </Link>
                    </nav>
                </div>
            </div>

            {/* Backdrop when sidebar is open in mobile view */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 lg:hidden transition-opacity duration-700 ease-in-out"
                    onClick={toggleSidebar}
                ></div>
            )}
        </>
    );
};

export default AdminSidebar;
