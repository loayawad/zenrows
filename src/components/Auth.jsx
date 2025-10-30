'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';

export default function Auth() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const signIn = async () => {
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setLoading(false);
  };

  const signUp = async () => {
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    setLoading(false);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  if (!user) {
    return (
      <div className="flex items-center space-x-4">
        <div className="hidden md:flex items-center space-x-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            className="px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            className="px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        {error && <span className="hidden md:inline text-red-600 text-xs">{error}</span>}
        {mode === 'signin' ? (
          <>
            <button
              className="text-gray-700 hover:text-gray-900 text-sm font-normal cursor-pointer"
              onClick={signIn}
              disabled={loading}
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded text-sm font-normal transition"
              onClick={() => setMode('signup')}
              disabled={loading}
            >
              Create Account
            </button>
          </>
        ) : (
          <>
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded text-sm font-normal transition cursor-pointer"
              onClick={signUp}
              disabled={loading}
            >
              {loading ? 'Creating…' : 'Sign Up'}
            </button>
            <button
              className="text-gray-700 hover:text-gray-900 text-sm font-normal cursor-pointer"
              onClick={() => setMode('signin')}
              disabled={loading}
            >
              Back to Sign In
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <span className="text-gray-600 text-sm">{user.email}</span>
      <button
        className="text-indigo-600 hover:text-indigo-700 text-sm font-normal cursor-pointer"
        onClick={signOut}
      >
        Sign Out
      </button>
    </div>
  );
}

