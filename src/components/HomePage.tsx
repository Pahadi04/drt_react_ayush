import React, { useState } from 'react';
import SatelliteTable from './SatelliteTable';
import { fetchSatellites } from '../services/satelliteService';
import { Satellite } from '../types/Satellite';
import TopFilterBar from './TopFilterBar';

const HomePage: React.FC = () => {
  const [satellites, setSatellites] = useState<Satellite[]>([]);
  const [selected, setSelected] = useState<Satellite[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (name: string) => {
    setLoading(true);
    setError('');
    try {
      const { data } = await fetchSatellites(
  ['PAYLOAD', 'DEBRIS', 'ROCKET BODY', 'UNKNOWN'], 
  ['noradCatId', 'name', 'orbitCode', 'objectType', 'countryCode', 'launchDate'] 
);


      const result = data.filter((sat: Satellite) =>
        (!name ||
          sat.name?.toLowerCase().includes(name.toLowerCase()) ||
          sat.noradCatId?.includes(name))
      );

      console.log("Search query:", name);
      console.log("Results found:", result.length);

      setSatellites(result);
    } catch (e) {
      setError('Failed to load satellites');
    } finally {
      setLoading(false);
    }
  };

  const proceed = () => {
    localStorage.setItem('selectedSatellites', JSON.stringify(selected));
    window.location.href = '/selected';
  };

  const removeItem = (id: string) => {
    setSelected(prev => prev.filter(item => item.noradCatId !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d1b2a] to-black text-white font-sans">
      <TopFilterBar onSearch={handleSearch} />
      <div className="max-w-7xl mx-auto grid grid-cols-3 gap-8 px-6 py-10">
        <div className="col-span-2 space-y-6">
          {loading && <p className="text-blue-400 animate-pulse">Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          <SatelliteTable satellites={satellites} selected={selected} setSelected={setSelected} />
        </div>

        <div className="bg-[#121c2c] p-6 rounded-lg border border-cyan-500 shadow-md h-fit">
          <h2 className="text-xl font-semibold text-cyan-300 border-b border-cyan-600 pb-2 mb-4">
            Selected Assets
          </h2>
          <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
            {selected.length === 0 ? (
              <p className="text-sm text-gray-400">No assets selected.</p>
            ) : (
              selected.map(sat => (
                <div
                  key={sat.noradCatId}
                  className="flex justify-between items-center bg-[#1c2b3e] px-3 py-1 rounded text-sm"
                >
                  <span className="truncate text-white">{sat.name}</span>
                  <button
                    onClick={() => removeItem(sat.noradCatId)}
                    className="text-red-400 hover:text-red-600"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
          <button
            onClick={proceed}
            className="mt-6 w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 rounded disabled:opacity-50 transition"
            disabled={selected.length === 0}
          >
            PROCEED
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

