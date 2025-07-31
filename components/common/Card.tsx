
import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
    return (
        <div className={`bg-white rounded-lg shadow-md p-6 border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${className}`}>
            {children}
        </div>
    );
};
