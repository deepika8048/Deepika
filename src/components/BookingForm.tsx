import React, { useState } from 'react';
import { Dentist, Appointment } from '../types';
import { X, Calendar, User, UserCircle, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookingFormProps {
  dentist: Dentist;
  onClose: () => void;
  onSubmit: (appointment: Appointment) => Promise<void>;
}

export const BookingForm: React.FC<BookingFormProps> = ({ dentist, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    patientName: '',
    age: '',
    gender: 'Male' as Appointment['gender'],
    appointmentDate: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit({
        patientName: formData.patientName,
        age: parseInt(formData.age),
        gender: formData.gender,
        appointmentDate: formData.appointmentDate,
        dentistId: dentist.id,
        dentistName: dentist.name,
        clinicName: dentist.clinicName
      });
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Booking error:', error);
      alert('Failed to book appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        <div className="relative p-6 border-b border-black/5">
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 p-2 rounded-full hover:bg-zinc-100 transition-colors"
          >
            <X className="w-5 h-5 text-zinc-400" />
          </button>
          <h2 className="text-2xl font-bold text-zinc-900">Book Appointment</h2>
          <p className="text-zinc-500 text-sm mt-1">With {dentist.name} at {dentist.clinicName}</p>
        </div>

        <div className="p-6">
          {isSuccess ? (
            <div className="py-12 text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-zinc-900">Appointment Booked!</h3>
              <p className="text-zinc-500 mt-2">Your appointment has been successfully scheduled.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-700 flex items-center gap-2">
                  <User className="w-4 h-4" /> Patient Name
                </label>
                <input 
                  required
                  type="text"
                  value={formData.patientName}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                  placeholder="Enter full name"
                  className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-zinc-700 flex items-center gap-2">
                    <UserCircle className="w-4 h-4" /> Age
                  </label>
                  <input 
                    required
                    type="number"
                    min="0"
                    max="120"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    placeholder="Age"
                    className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-zinc-700 flex items-center gap-2">
                    <Users className="w-4 h-4" /> Gender
                  </label>
                  <select 
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as Appointment['gender'] })}
                    className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-700 flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Appointment Date
                </label>
                <input 
                  required
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.appointmentDate}
                  onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                  className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                />
              </div>

              <button 
                disabled={isSubmitting}
                type="submit"
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-600/20 active:scale-[0.98] mt-2"
              >
                {isSubmitting ? 'Booking...' : 'Confirm Appointment'}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};
