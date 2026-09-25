import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Navbar */}
      <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-md px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-brand-500 flex items-center justify-center font-bold text-gray-950">
            V
          </div>
          <span className="text-xl font-semibold tracking-wide">VulnX</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <button className="text-gray-400 hover:text-white transition-colors">Dashboard</button>
          <button className="text-gray-400 hover:text-white transition-colors">Assets</button>
          <button className="text-gray-400 hover:text-white transition-colors">Scans</button>
          <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 ml-4"></div>
        </div>
      </nav>

      {/* Main Dashboard Content */}
      <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Security Overview</h1>
          <p className="text-gray-400">Enterprise Vulnerability Management Platform</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Assets', value: '127', color: 'text-brand-400' },
            { label: 'Critical Risks', value: '8', color: 'text-red-500' },
            { label: 'High Risks', value: '23', color: 'text-orange-500' },
            { label: 'Open Scans', value: '3', color: 'text-blue-400' }
          ].map((stat, i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg shadow-black/20">
              <h3 className="text-gray-400 text-sm font-medium mb-2">{stat.label}</h3>
              <p className={`text-4xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Recent Scans Section */}
        <section className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="border-b border-gray-800 px-6 py-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Recent Scans</h2>
            <button className="bg-brand-500 hover:bg-brand-400 text-gray-950 px-4 py-2 rounded-md text-sm font-medium transition-colors">
              New Scan
            </button>
          </div>
          <div className="p-6">
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-800 rounded"></div>
                  <div className="h-4 bg-gray-800 rounded w-5/6"></div>
                </div>
              </div>
            </div>
            <p className="text-gray-500 text-sm text-center mt-4">Scan history will populate here...</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
