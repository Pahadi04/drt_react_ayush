import React from 'react';
import { FixedSizeList as List } from 'react-window';
import { Satellite } from '../types/Satellite';
import { useNavigate } from 'react-router-dom';

interface Props {
  satellites: Satellite[];
  selected: Satellite[];
  setSelected: React.Dispatch<React.SetStateAction<Satellite[]>>;
}

const SatelliteTable: React.FC<Props> = ({ satellites, selected, setSelected }) => {
  const navigate = useNavigate();

  const toggleSelection = (sat: Satellite) => {
    setSelected(prev => {
      if (prev.find(s => s.noradCatId === sat.noradCatId)) {
        return prev.filter(s => s.noradCatId !== sat.noradCatId);
      } else {
        return prev.length < 10 ? [...prev, sat] : prev;
      }
    });
  };

  const handleProceed = () => {
    const selectedSatellites = selected;
    localStorage.setItem('selectedSatellites', JSON.stringify(selectedSatellites));
    navigate('/selected');
  };

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const sat = satellites[index];
    const isSelected = selected.some(s => s.noradCatId === sat.noradCatId);

    return (
      <div
        style={style}
        className={`grid grid-cols-7 gap-2 px-4 py-2 items-center border-b border-gray-700 text-sm transition ${isSelected ? 'bg-gray-800' : 'bg-black'} hover:bg-gray-900`}
      >
        <input
          type="checkbox"
          className="form-checkbox h-4 w-4 text-white border-white bg-transparent rounded"
          checked={isSelected}
          onChange={() => toggleSelection(sat)}
        />
        <span className="text-white truncate">{sat.name}</span>
        <span className="text-white">{sat.noradCatId}</span>
        <span className="text-white">{sat.orbitCode}</span>
        <span className="text-white">{sat.objectType}</span>
        <span className="text-white">{sat.countryCode}</span>
        <span className="text-white">{sat.launchDate ?? '—'}</span>
      </div>
    );
  };

  return (
    <div className="mt-6">
      <div className="grid grid-cols-7 gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-semibold border-b border-gray-600">
        <span></span>
        <span>Name</span>
        <span>NORAD ID</span>
        <span>Orbit Code</span>
        <span>Object Type</span>
        <span>Country</span>
        <span>Launch Date</span>
      </div>
      <List
        height={400}
        itemCount={satellites.length}
        itemSize={45}
        width="100%"
      >
        {Row}
      </List>
      <div className="flex justify-between items-center mt-4 px-4">
        <span className="text-sm text-gray-400">
          Selected: {selected.length} / 10
        </span>
        <button
          className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition font-semibold"
          disabled={selected.length === 0}
          onClick={handleProceed}
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default SatelliteTable;
