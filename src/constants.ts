import { Dentist } from './types';

export const INITIAL_DENTISTS: Dentist[] = [
  {
    id: '1',
    name: 'Dr. Sarah Smith',
    qualification: 'BDS, MDS (Orthodontics)',
    experience: 12,
    clinicName: 'Smile Care Clinic',
    address: '123 Main St, Suite 101',
    location: 'Downtown',
    photoUrl: 'https://picsum.photos/seed/dentist1/300/300'
  },
  {
    id: '2',
    name: 'Dr. James Wilson',
    qualification: 'BDS, MDS (Endodontics)',
    experience: 8,
    clinicName: 'White Teeth Dental',
    address: '456 Oak Rd, Building B',
    location: 'Westside',
    photoUrl: 'https://picsum.photos/seed/dentist2/300/300'
  },
  {
    id: '3',
    name: 'Dr. Emily Brown',
    qualification: 'BDS',
    experience: 5,
    clinicName: 'City Dental Hub',
    address: '789 Pine Ave, Floor 2',
    location: 'Eastside',
    photoUrl: 'https://picsum.photos/seed/dentist3/300/300'
  },
  {
    id: '4',
    name: 'Dr. Michael Chen',
    qualification: 'BDS, MDS (Periodontics)',
    experience: 15,
    clinicName: 'Advanced Oral Care',
    address: '321 Maple Blvd, Unit 4',
    location: 'Northside',
    photoUrl: 'https://picsum.photos/seed/dentist4/300/300'
  }
];
