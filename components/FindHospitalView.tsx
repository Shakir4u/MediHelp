
import React, { useState } from 'react';
import { findHospitals } from '../services/geminiService';
import type { Hospital } from '../types';
import { Card } from './common/Card';
import { Input } from './common/Input';
import { Button } from './common/Button';
import { Spinner } from './common/Spinner';
import { ICONS } from '../constants';

const HospitalCard: React.FC<{ hospital: Hospital }> = ({ hospital }) => (
    <Card>
        <h3 className="text-lg font-bold text-blue-700">{hospital.name}</h3>
        <p className="text-sm text-slate-600 mt-1">{hospital.address}</p>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-700">
            <p><strong>Phone:</strong> {hospital.phone}</p>
            <a href={hospital.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Website
            </a>
        </div>
        <div className="mt-2 flex items-center">
            <span className="font-semibold">{hospital.rating.toFixed(1)}</span>
            <div className="ml-1 flex">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className={i < Math.round(hospital.rating) ? 'text-amber-400' : 'text-slate-300'}>
                        {ICONS.star}
                    </div>
                ))}
            </div>
        </div>
    </Card>
);

export const FindHospitalView: React.FC = () => {
    const [city, setCity] = useState<string>('New York');
    const [hospitals, setHospitals] = useState<Hospital[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async () => {
        if (!city) {
            setError('Please enter a city name.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setHospitals([]);
        try {
            const result = await findHospitals(city);
            setHospitals(result);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="animate-fade-in">
            <header className="mb-8">
                <h2 className="text-3xl font-bold text-slate-800">Find a Hospital</h2>
                <p className="text-slate-500 mt-1">Search for top-rated hospitals in your desired city.</p>
            </header>

            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <div className="flex flex-col sm:flex-row gap-4">
                    <Input
                        type="text"
                        placeholder="Enter city name, e.g., 'San Francisco'"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="flex-grow"
                    />
                    <Button onClick={handleSearch} disabled={isLoading} className="sm:w-auto">
                        {isLoading ? <Spinner /> : <div className="flex items-center">{ICONS.search}<span className="ml-2">Search</span></div>}
                    </Button>
                </div>
            </div>

            {error && <div className="text-red-500 bg-red-100 p-4 rounded-lg text-center">{error}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hospitals.map((hospital) => (
                    <HospitalCard key={hospital.id} hospital={hospital} />
                ))}
            </div>
             {isLoading && !error && (
                <div className="text-center p-8">
                    <div className="flex justify-center items-center">
                        <Spinner />
                        <p className="ml-4 text-slate-600">Searching for hospitals...</p>
                    </div>
                </div>
            )}

            {!isLoading && !error && hospitals.length === 0 && (
                <div className="text-center p-8 bg-white rounded-lg shadow-md">
                    <p className="text-slate-500">Enter a city and click Search to see results.</p>
                </div>
            )}
        </div>
    );
};
