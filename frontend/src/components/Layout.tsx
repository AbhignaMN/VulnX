import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Server, Shield, User } from 'lucide-react';

const Layout = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={18} /> },
    { name: 'Assets', path: '/assets', icon: <Server size={18} /> },
    { name: 'Scans', path: '/scans', icon: <Shield size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Navbar */}
      <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-brand-500 flex items-center justify-center font-bold text-gray-950">
            V
          </div>
          <span className="text-xl font-semibold tracking-wide">VulnX</span>
        </div>
        <div className="flex items-center gap-6 text-sm">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-2 transition-colors ${
                  isActive ? 'text-brand-400 font-medium' : 'text-gray-400 hover:text-white'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
          <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 ml-4 flex items-center justify-center">
            <User size={16} className="text-gray-400" />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
