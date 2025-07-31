
export type View = 'find_hospital' | 'find_doctor' | 'book_appointment';

export interface Hospital {
  id: string;
  name: string;
  address: string;
  phone: string;
  website: string;
  rating: number;
}

export interface Doctor {
  id:string;
  name: string;
  specialty: string;
  hospital: string;
  experienceYears: number;
  availability: string[];
}

export interface AppointmentDetails {
  doctorName: string;
  patientName: string;
  appointmentDate: string;
  appointmentTime: string;
  reason: string;
}
