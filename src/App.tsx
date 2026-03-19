import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { DentistCard } from './components/DentistCard';
import { BookingForm } from './components/BookingForm';
import { AdminPanel } from './components/AdminPanel';
import { Dentist, Appointment } from './types';
import { INITIAL_DENTISTS } from './constants';
import { motion, AnimatePresence } from 'motion/react';
import { Stethoscope, Search, AlertCircle } from 'lucide-react';

export default function App() {
  const [view, setView] = useState<'user' | 'admin'>('user');
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDentist, setSelectedDentist] = useState<Dentist | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDentists();
  }, []);

  useEffect(() => {
    if (view === 'admin') {
      fetchAppointments();
    }
  }, [view]);

  const fetchDentists = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/dentists');
      const data = await response.json();
      
      if (data.length === 0) {
        // Seed initial data if empty
        for (const dentist of INITIAL_DENTISTS) {
          await fetch('/api/dentists', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dentist)
          });
        }
        const refreshedResponse = await fetch('/api/dentists');
        const refreshedData = await refreshedResponse.json();
        setDentists(refreshedData);
      } else {
        setDentists(data);
      }
    } catch (err) {
      console.error('Error fetching dentists:', err);
      setError('Failed to load dentists. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAppointments = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/appointments');
      const data = await response.json();
      setAppointments(data);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError('Failed to load appointments.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookAppointment = async (appointment: Appointment) => {
    const response = await fetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appointment)
    });
    if (!response.ok) throw new Error('Failed to book');
  };

  const filteredDentists = dentists.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.clinicName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
      <Navbar view={view} setView={setView} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {view === 'user' ? (
            <motion.div 
              key="user-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Find Your Dentist</h1>
                  <p className="text-zinc-500 mt-1">Book an appointment with top-rated dentists in your area.</p>
                </div>
                
                <div className="relative max-w-md w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <input 
                    type="text"
                    placeholder="Search by name, clinic or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-black/5 rounded-2xl shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl flex items-center gap-3">
                  <AlertCircle className="w-5 h-5" />
                  <p className="text-sm font-medium">{error}</p>
                </div>
              )}

              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="bg-white rounded-2xl h-96 animate-pulse border border-black/5"></div>
                  ))}
                </div>
              ) : filteredDentists.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-zinc-200">
                  <div className="bg-zinc-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-zinc-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-900">No dentists found</h3>
                  <p className="text-zinc-500">Try adjusting your search criteria.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredDentists.map(dentist => (
                    <DentistCard 
                      key={dentist.id} 
                      dentist={dentist} 
                      onBook={setSelectedDentist} 
                    />
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="admin-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <AdminPanel appointments={appointments} isLoading={isLoading} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {selectedDentist && (
          <BookingForm 
            dentist={selectedDentist} 
            onClose={() => setSelectedDentist(null)} 
            onSubmit={handleBookAppointment}
          />
        )}
      </AnimatePresence>

      <footer className="mt-20 border-t border-black/5 py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-emerald-600 text-white p-1.5 rounded-lg">
              <Stethoscope className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold text-zinc-900">OroGlee</span>
          </div>
          <p className="text-zinc-500 text-sm">© 2026 OroGlee Dentist Appointment Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

