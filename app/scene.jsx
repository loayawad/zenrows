'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../src/utils/supabaseClient';
import Card from '../src/components/Card';
import Combinations from '../src/components/Combinations';

export default function Scene({ origins = [], destinations = [] }) {
  const [user, setUser] = useState(null);
  const [selectedOrigin, setSelectedOrigin] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [message, setMessage] = useState('');
  const [combKey, setCombKey] = useState(0);
  const [combinations, setCombinations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener?.subscription.unsubscribe();
  }, []);

  const fetchCombinations = async () => {
    if (!user) return;
    setLoading(true);
    const { data } = await supabase
      .from('combinations')
      .select('id, origin:origins(*), destination:destinations(*)')
      .eq('user_id', user.id);
    setCombinations(data || []);
    setLoading(false);
  };

  useEffect(() => {
    if (user) fetchCombinations();
  }, [user, combKey]);

  const handleOrigin = (id) => setSelectedOrigin(id === selectedOrigin ? null : id);
  const handleDestination = (id) => setSelectedDestination(id === selectedDestination ? null : id);

  const handleSave = async () => {
    if (!user || !selectedOrigin || !selectedDestination) return;
    if(combinations.find((c) => c.destination.id === selectedDestination && c.origin.id === selectedOrigin)) {
      setMessage('Combination already exists.');
      return;
    }
    await supabase.from('combinations').insert({
      user_id: user.id,
      origin_id: selectedOrigin,
      destination_id: selectedDestination,
    });
    const originName = origins.find((o) => o.id === selectedOrigin)?.name;
    const destName = destinations.find((d) => d.id === selectedDestination)?.name;
    setMessage(`You saved ${originName} and ${destName}.`);
    setSelectedOrigin(null);
    setSelectedDestination(null);
    setCombKey((k) => k + 1);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleDelete = async (combinationId) => {
    await supabase.from('combinations').delete().eq('id', combinationId);
    setCombinations(combinations.filter((c) => c.id !== combinationId));
  };

  if (!user) {
    return (
      <div className="bg-white p-10 rounded-lg shadow-sm text-center mt-10 text-gray-600 border border-gray-200">
        Please sign in to start pairing origins and destinations.
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h2 className="text-gray-900 font-semibold text-sm mb-3">Origins</h2>
          <div className="space-y-2.5">
            {origins.map((origin) => (
              <Card
                key={origin.id}
                {...origin}
                selected={origin.id === selectedOrigin}
                onClick={handleOrigin}
              />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-gray-900 font-semibold text-sm mb-3">Destinations</h2>
          <div className="space-y-2.5">
            {destinations.map((dest) => (
              <Card
                key={dest.id}
                {...dest}
                selected={dest.id === selectedDestination}
                onClick={handleDestination}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center my-6">
        <button
          className={`px-8 py-2.5 rounded text-white text-sm font-normal transition-all cursor-pointer ${
            selectedOrigin && selectedDestination
              ? 'bg-indigo-600 hover:bg-indigo-700'
              : 'bg-indigo-300 cursor-not-allowed opacity-60'
          }`}
          disabled={!selectedOrigin || !selectedDestination}
          onClick={handleSave}
        >
          Save combination
        </button>
      </div>

      {message && (
        <div className="text-center text-green-700 text-sm bg-green-50 p-3 rounded border border-green-200 mb-6">
          {message}
        </div>
      )}

      <Combinations combinations={combinations} loading={loading} onDelete={handleDelete} />
    </>
  );
}
