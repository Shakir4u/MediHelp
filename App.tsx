
import React, { useState } from 'react';
import { SideMenu } from './components/SideMenu';
import { FindHospitalView } from './components/FindHospitalView';
import { FindDoctorView } from './components/FindDoctorView';
import { BookAppointmentView } from './components/BookAppointmentView';
import type { View } from './types';

const App: React.FC = () => {
    const [activeView, setActiveView] = useState<View>('find_hospital');

    const renderView = () => {
        switch (activeView) {
            case 'find_hospital':
                return <FindHospitalView />;
            case 'find_doctor':
                return <FindDoctorView />;
            case 'book_appointment':
                return <BookAppointmentView />;
            default:
                return <FindHospitalView />;
        }
    };

    return (
        <div className="flex h-screen bg-slate-100 font-sans">
            <SideMenu activeView={activeView} setActiveView={setActiveView} />
            <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                <div className="max-w-7xl mx-auto">
                    {renderView()}
                </div>
            </main>
        </div>
    );
};

export default App;
