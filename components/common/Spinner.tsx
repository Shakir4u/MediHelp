
import React from 'react';

export const Spinner: React.FC = () => {
    return (
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
    );
};

export const PageSpinner: React.FC = () => {
     return (
        <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
    );
};
