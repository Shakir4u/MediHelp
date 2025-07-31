
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, className, disabled, ...props }) => {
    return (
        <button
            {...props}
            disabled={disabled}
            className={`
                px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-md 
                hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                transition-all duration-200 ease-in-out
                flex items-center justify-center
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                ${className}
            `}
        >
            {children}
        </button>
    );
};
