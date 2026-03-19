import React from 'react';
import { Dentist } from '../types';
import { MapPin, Briefcase, GraduationCap, Building2 } from 'lucide-react';

interface DentistCardProps {
  dentist: Dentist;
  onBook: (dentist: Dentist) => void;
}

export const DentistCard: React.FC<DentistCardProps> = ({ dentist, onBook }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden transition-all hover:shadow-md hover:border-black/10 flex flex-col h-full">
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={dentist.photoUrl} 
          alt={dentist.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-xl font-semibold text-zinc-900 mb-1">{dentist.name}</h3>
        
        <div className="space-y-2 mt-3 text-sm text-zinc-600">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-emerald-600" />
            <span>{dentist.qualification}</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-emerald-600" />
            <span>{dentist.experience} Years Experience</span>
          </div>
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-emerald-600" />
            <span className="font-medium">{dentist.clinicName}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>{dentist.address}, {dentist.location}</span>
          </div>
        </div>

        <button 
          onClick={() => onBook(dentist)}
          className="mt-6 w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl transition-colors shadow-sm active:scale-[0.98]"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};
