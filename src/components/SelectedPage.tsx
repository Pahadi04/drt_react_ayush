import React, { useEffect, useState } from 'react';
import { Satellite } from '../types/Satellite';
import { Link } from 'react-router-dom';

const SelectedPage: React.FC = () => {
  const [selectedSatellites, setSelectedSatellites] = useState<Satellite[]>([]);

  useEffect(() => {
    const data = localStorage.getItem('selectedSatellites');
    if (data) {
      setSelectedSatellites(JSON.parse(data));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d1b2a] to-black text-white px-6 py-10 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-cyan-400 mb-6 text-center">
          🛰️ Selected Satellites
        </h1>

        {selectedSatellites.length === 0 ? (
          <p className="text-center text-gray-400">No satellites selected.</p>
        ) : (
          <ul className="space-y-3">
            {selectedSatellites.map(sat => (
              <li
                key={sat.noradCatId}
                className="bg-[#1c2b3e] border border-cyan-700 rounded p-4 shadow flex justify-between items-center"
              >
                <div>
                  <p className="text-lg font-semibold text-white">{sat.name}</p>
                  <p className="text-sm text-gray-400">NORAD ID: {sat.noradCatId}</p>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-block bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-6 py-2 rounded transition"
          >
            ← Go Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SelectedPage;
