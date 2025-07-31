
import React, { useState } from 'react';
import type { AppointmentDetails } from '../types';
import { confirmAppointment } from '../services/geminiService';
import { Input } from './common/Input';
import { Button } from './common/Button';
import { Spinner } from './common/Spinner';
import { ICONS } from '../constants';

export const BookAppointmentView: React.FC = () => {
    const [details, setDetails] = useState<AppointmentDetails>({
        doctorName: '',
        patientName: '',
        appointmentDate: '',
        appointmentTime: '',
        reason: ''
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [confirmation, setConfirmation] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setConfirmation(null);
        try {
            const result = await confirmAppointment(details);
            setConfirmation(result);
            setDetails({
                doctorName: '',
                patientName: '',
                appointmentDate: '',
                appointmentTime: '',
                reason: ''
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="animate-fade-in max-w-2xl mx-auto">
            <header className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-slate-800">Book an Appointment</h2>
                <p className="text-slate-500 mt-1">Fill in the details below to schedule your visit.</p>
            </header>

            {confirmation ? (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-6 rounded-lg shadow-md" role="alert">
                    <p className="font-bold text-lg mb-2">Appointment Confirmed!</p>
                    <p className="whitespace-pre-wrap">{confirmation}</p>
                    <Button onClick={() => setConfirmation(null)} className="mt-4">
                        Book Another Appointment
                    </Button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Input
                            label="Patient Full Name"
                            name="patientName"
                            value={details.patientName}
                            onChange={handleChange}
                            placeholder="e.g., John Doe"
                            required
                        />
                         <Input
                            label="Doctor's Full Name"
                            name="doctorName"
                            value={details.doctorName}
                            onChange={handleChange}
                            placeholder="e.g., Dr. Jane Smith"
                            required
                        />
                    </div>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Input
                            label="Appointment Date"
                            name="appointmentDate"
                            type="date"
                            value={details.appointmentDate}
                            onChange={handleChange}
                            required
                        />
                         <Input
                            label="Appointment Time"
                            name="appointmentTime"
                            type="time"
                            value={details.appointmentTime}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                         <label htmlFor="reason" className="block text-sm font-medium text-slate-700 mb-1">Reason for Visit</label>
                         <textarea
                            id="reason"
                            name="reason"
                            rows={4}
                            value={details.reason}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                            placeholder="e.g., Annual check-up, consultation"
                            required
                        />
                    </div>

                    {error && <div className="text-red-500 text-sm text-center">{error}</div>}

                    <Button type="submit" disabled={isLoading} className="w-full flex justify-center py-3">
                        {isLoading ? <Spinner /> : <div className="flex items-center">{ICONS.appointment}<span className="ml-2">Confirm Appointment</span></div>}
                    </Button>
                </form>
            )}
        </div>
    );
};
