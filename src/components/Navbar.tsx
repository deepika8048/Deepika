import React from 'react';
import { Stethoscope, LayoutDashboard, UserCircle } from 'lucide-react';

interface NavbarProps {
  view: 'user' | 'admin';
  setView: (view: 'user' | 'admin') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ view, setView }) => {
  return (
    <nav className="bg-white border-b border-black/5 sticky top-0 z-40 backdrop-blur-md bg-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-600 text-white p-2 rounded-xl">
              <Stethoscope className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-zinc-900 tracking-tight">OroGlee</span>
          </div>

          <div className="flex items-center gap-2 bg-zinc-100 p-1 rounded-2xl">
            <button 
              onClick={() => setView('user')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                view === 'user' 
                ? 'bg-white text-emerald-600 shadow-sm' 
                : 'text-zinc-500 hover:text-zinc-700'
              }`}
            >
              <UserCircle className="w-4 h-4" />
              User View
            </button>
            <button 
              onClick={() => setView('admin')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                view === 'admin' 
                ? 'bg-white text-emerald-600 shadow-sm' 
                : 'text-zinc-500 hover:text-zinc-700'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Admin Panel
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
