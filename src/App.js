import React, { useState } from 'react';
import './index.css';

function App() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleQuery = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('https://weather-agent-backend.onrender.com/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      setResponse(data.response || data.error || 'No response from agent');
    } catch (error) {
      setResponse('Error fetching data');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-100 to-blue-200 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-4 text-center text-blue-800">🌤️ Weather Agent</h1>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask about the weather (e.g., 'What's the weather in London today?')"
          className="w-full border border-gray-300 rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
        />
        <button
          onClick={handleQuery}
          disabled={loading}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-200"
        >
          {loading ? 'Loading...' : 'Get Weather'}
        </button>

        {response && (
          <div className="mt-6 bg-gray-100 border border-gray-300 rounded-xl p-4 whitespace-pre-wrap text-gray-700">
            {response}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
