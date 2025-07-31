
import React, { useState } from 'react';
import { findDoctors } from '../services/geminiService';
import type { Doctor } from '../types';
import { Card } from './common/Card';
import { Input } from './common/Input';
import { Button } from './common/Button';
import { Spinner } from './common/Spinner';
import { ICONS } from '../constants';

const DoctorCard: React.FC<{ doctor: Doctor }> = ({ doctor }) => (
    <Card>
        <h3 className="text-lg font-bold text-blue-700">{doctor.name}</h3>
        <p className="text-md font-semibold text-slate-600">{doctor.specialty}</p>
        <p className="text-sm text-slate-500 mt-1">{doctor.hospital}</p>
        <div className="mt-4 text-sm text-slate-700 space-y-1">
            <p><strong>Experience:</strong> {doctor.experienceYears} years</p>
            <p><strong>Availability:</strong> {doctor.availability.join(', ')}</p>
        </div>
    </Card>
);

export const FindDoctorView: React.FC = () => {
    const [city, setCity] = useState<string>('Chicago');
    const [specialty, setSpecialty] = useState<string>('Cardiology');
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async () => {
        if (!city || !specialty) {
            setError('Please enter both a city and a specialty.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setDoctors([]);
        try {
            const result = await findDoctors(city, specialty);
            setDoctors(result);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="animate-fade-in">
            <header className="mb-8">
                <h2 className="text-3xl font-bold text-slate-800">Find a Doctor</h2>
                <p className="text-slate-500 mt-1">Search for specialized doctors in your area.</p>
            </header>

            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                        type="text"
                        placeholder="Enter city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <Input
                        type="text"
                        placeholder="Enter specialty, e.g., 'Dermatology'"
                        value={specialty}
                        onChange={(e) => setSpecialty(e.target.value)}
                    />
                    <Button onClick={handleSearch} disabled={isLoading}>
                        {isLoading ? <Spinner /> : <div className="flex items-center justify-center">{ICONS.search}<span className="ml-2">Search</span></div>}
                    </Button>
                </div>
            </div>

            {error && <div className="text-red-500 bg-red-100 p-4 rounded-lg text-center">{error}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
            </div>

            {isLoading && !error && (
                <div className="text-center p-8">
                    <div className="flex justify-center items-center">
                        <Spinner />
                        <p className="ml-4 text-slate-600">Searching for doctors...</p>
                    </div>
                </div>
            )}

            {!isLoading && !error && doctors.length === 0 && (
                <div className="text-center p-8 bg-white rounded-lg shadow-md">
                    <p className="text-slate-500">Enter a city and specialty to find doctors.</p>
                </div>
            )}
        </div>
    );
};
