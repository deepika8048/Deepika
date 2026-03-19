import React from 'react';
import { Appointment } from '../types';
import { User, Calendar, Building2, UserCircle, Users, ClipboardList } from 'lucide-react';

interface AdminPanelProps {
  appointments: Appointment[];
  isLoading: boolean;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ appointments, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-black/5 overflow-hidden">
      <div className="p-6 border-b border-black/5 bg-zinc-50/50 flex items-center gap-3">
        <ClipboardList className="w-6 h-6 text-emerald-600" />
        <h2 className="text-xl font-bold text-zinc-900">All Appointments</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50/50 text-zinc-500 text-xs uppercase tracking-wider font-semibold">
              <th className="px-6 py-4 border-b border-black/5">Patient Details</th>
              <th className="px-6 py-4 border-b border-black/5">Gender</th>
              <th className="px-6 py-4 border-b border-black/5">Appointment Date</th>
              <th className="px-6 py-4 border-b border-black/5">Dentist & Clinic</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {appointments.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-zinc-400">
                  No appointments found.
                </td>
              </tr>
            ) : (
              appointments.map((appointment, idx) => (
                <tr key={appointment.id || idx} className="hover:bg-zinc-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                        {appointment.patientName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-zinc-900">{appointment.patientName}</div>
                        <div className="text-xs text-zinc-500 flex items-center gap-1">
                          <UserCircle className="w-3 h-3" /> {appointment.age} Years
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      appointment.gender === 'Male' ? 'bg-blue-100 text-blue-700' :
                      appointment.gender === 'Female' ? 'bg-pink-100 text-pink-700' :
                      'bg-zinc-100 text-zinc-700'
                    }`}>
                      {appointment.gender}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-zinc-600 text-sm">
                      <Calendar className="w-4 h-4 text-emerald-600" />
                      {new Date(appointment.appointmentDate).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-zinc-900 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-emerald-600" />
                        {appointment.dentistName}
                      </div>
                      <div className="text-xs text-zinc-500 flex items-center gap-1.5 mt-0.5">
                        <Building2 className="w-3.5 h-3.5" />
                        {appointment.clinicName}
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
