'use client'
import { authClient } from '@/lib/auth-client';
import { Avatar, Input } from '@heroui/react';
import React from 'react';

const ProfilePage = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const handleUpdateProfile = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        const newUserData = Object.fromEntries(formData.entries());
        
        await authClient.updateUser({
            ...newUserData,
        })

    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
            <div className="max-w-md w-full bg-white dark:bg-zinc-900 shadow-lg rounded-2xl p-6 md:p-8 border border-gray-100 dark:border-zinc-800">
                
                {/* User Info Header */}
                <div className="flex flex-col items-center text-center pb-6 border-b border-gray-100 dark:border-zinc-800">
                    <Avatar 
                        src={user?.image || ''} 
                        name={user?.name || 'User'} 
                        className="w-20 h-20 text-large border-2 border-emerald-500 shadow-md mb-3" 
                    />
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{user?.name}</h2>
                    <h3 className="text-sm text-gray-500 dark:text-gray-400 mt-1">{user?.email}</h3>
                </div>

                {/* Form Section */}
                <form onSubmit={handleUpdateProfile} className="space-y-4 pt-6">
                    

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">নাম</label>
                        <Input 
                            aria-label="Name" 
                            name="name"
                            className="w-full" 
                            placeholder="Enter your name" 
                            variant="bordered"
                        />
                    </div>

                    <button 
                        type="submit" 
                        value="submit" 
                        className="w-full mt-4 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl shadow-sm transition-all cursor-pointer"
                    >
                        সাবমিট করুন
                    </button>
                </form>

            </div>
        </div>
    );
};

export default ProfilePage;