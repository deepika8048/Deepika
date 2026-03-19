export interface Dentist {
  id: string;
  name: string;
  qualification: string;
  experience: number;
  clinicName: string;
  address: string;
  location: string;
  photoUrl: string;
}

export interface Appointment {
  id?: string;
  patientName: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  appointmentDate: string;
  dentistId: string;
  dentistName: string;
  clinicName: string;
  createdAt?: any;
}
