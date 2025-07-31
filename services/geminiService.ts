
import { GoogleGenAI, Type } from "@google/genai";
import type { AppointmentDetails } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = 'gemini-2.5-flash';

const hospitalSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            id: { type: Type.STRING, description: "A unique identifier for the hospital" },
            name: { type: Type.STRING, description: "The full name of the hospital" },
            address: { type: Type.STRING, description: "The complete physical address of the hospital" },
            phone: { type: Type.STRING, description: "The main contact phone number" },
            website: { type: Type.STRING, description: "The official website URL" },
            rating: { type: Type.NUMBER, description: "A rating out of 5, e.g., 4.5" }
        },
        required: ["id", "name", "address", "phone", "website", "rating"]
    }
};

const doctorSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            id: { type: Type.STRING, description: "A unique identifier for the doctor" },
            name: { type: Type.STRING, description: "The full name of the doctor, e.g., Dr. Jane Doe" },
            specialty: { type: Type.STRING, description: "The doctor's medical specialty" },
            hospital: { type: Type.STRING, description: "The primary hospital affiliation" },
            experienceYears: { type: Type.INTEGER, description: "Number of years in practice" },
            availability: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of available days, e.g., ['Monday', 'Wednesday']" },
        },
        required: ["id", "name", "specialty", "hospital", "experienceYears", "availability"]
    }
};


export const findHospitals = async (city: string) => {
    try {
        const response = await ai.models.generateContent({
            model,
            contents: `Find and list 10 major hospitals in ${city}.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: hospitalSchema,
            },
        });
        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch (error) {
        console.error("Error fetching hospitals:", error);
        throw new Error("Failed to fetch hospital data. Please check your query or API key.");
    }
};

export const findDoctors = async (city: string, specialty: string) => {
    try {
        const response = await ai.models.generateContent({
            model,
            contents: `List 8 doctors specializing in ${specialty} in the city of ${city}.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: doctorSchema,
            },
        });
        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch (error) {
        console.error("Error fetching doctors:", error);
        throw new Error("Failed to fetch doctor data. Please check your query or API key.");
    }
};

export const confirmAppointment = async (details: AppointmentDetails) => {
    try {
        const response = await ai.models.generateContent({
            model,
            contents: `Generate a brief, friendly, and professional confirmation message for a medical appointment with the following details. Do not ask any questions, just provide the confirmation text. Details: Patient: ${details.patientName}, Doctor: ${details.doctorName}, Date: ${details.appointmentDate}, Time: ${details.appointmentTime}, Reason: ${details.reason}.`,
            config: {
                thinkingConfig: { thinkingBudget: 0 }
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error confirming appointment:", error);
        throw new Error("Failed to confirm the appointment.");
    }
};
