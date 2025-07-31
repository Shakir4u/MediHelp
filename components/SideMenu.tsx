
import React from 'react';
import type { View } from '../types';
import { ICONS } from '../constants';

interface SideMenuProps {
    activeView: View;
    setActiveView: (view: View) => void;
}

interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    view: View;
    isActive: boolean;
    onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-200 hover:text-slate-800'
            }`}
        >
            <div className="mr-3">{icon}</div>
            <span className="truncate">{label}</span>
        </button>
    );
};

export const SideMenu: React.FC<SideMenuProps> = ({ activeView, setActiveView }) => {
    const navItems: { view: View; label: string; icon: React.ReactNode }[] = [
        { view: 'find_hospital', label: 'Find Hospital', icon: ICONS.hospital },
        { view: 'find_doctor', label: 'Find Doctor', icon: ICONS.doctor },
        { view: 'book_appointment', label: 'Book Appointment', icon: ICONS.appointment },
    ];

    return (
        <aside className="w-64 flex-shrink-0 bg-white shadow-lg p-4 flex flex-col">
            <div className="flex items-center mb-8 px-2">
                <div className="p-2 bg-blue-600 text-white rounded-lg">{ICONS.logo}</div>
                <h1 className="text-xl font-bold text-slate-800 ml-3">MediConnect AI</h1>
            </div>
            <nav className="flex flex-col space-y-2">
                {navItems.map((item) => (
                    <NavItem
                        key={item.view}
                        icon={item.icon}
                        label={item.label}
                        view={item.view}
                        isActive={activeView === item.view}
                        onClick={() => setActiveView(item.view)}
                    />
                ))}
            </nav>
            <div className="mt-auto text-center text-xs text-slate-400">
                <p>&copy; {new Date().getFullYear()} MediConnect AI</p>
                <p>Powered by Gemini</p>
            </div>
        </aside>
    );
};
