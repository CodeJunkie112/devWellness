import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

interface SleepEntry {
  _id: string;
  date: string;
  duration: number;
  quality: number;
}

const SleepMonitor: React.FC = () => {
  const [sleepEntries, setSleepEntries] = useState<SleepEntry[]>([]);
  const [newEntry, setNewEntry] = useState<Omit<SleepEntry, '_id'>>({
    date: new Date().toISOString().split('T')[0],
    duration: 0,
    quality: 3,
  });

  useEffect(() => {
    fetchSleepEntries();
  }, []);

  const fetchSleepEntries = async () => {
    try {
      const response = await axios.get('/api/sleep');
      setSleepEntries(response.data);
    } catch (error) {
      console.error('Error fetching sleep entries:', error);
    }
  };

  const addSleepEntry = async () => {
    if (newEntry.duration > 0) {
      try {
        await axios.post('/api/sleep', newEntry);
        fetchSleepEntries();
        setNewEntry({
          date: new Date().toISOString().split('T')[0],
          duration: 0,
          quality: 3,
        });
      } catch (error) {
        console.error('Error adding sleep entry:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Sleep Monitor</h1>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Log Sleep</h2>
        <div className="flex flex-wrap gap-4">
          <input
            type="date"
            className="p-2 border rounded"
            value={newEntry.date}
            onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
          />
          <div className="flex items-center">
            <Moon size={20} className="mr-2 text-blue-500" />
            <input
              type="number"
              step="0.5"
              min="0"
              max="24"
              placeholder="Hours slept"
              className="w-20 p-2 border rounded"
              value={newEntry.duration || ''}
              onChange={(e) => setNewEntry({ ...newEntry, duration: parseFloat(e.target.value) || 0 })}
            />
            <Sun size={20} className="ml-2 text-yellow-500" />
          </div>
          <div className="flex items-center">
            <span className="mr-2">Quality:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className={`text-2xl ${star <= newEntry.quality ? 'text-yellow-500' : 'text-gray-300'}`}
                onClick={() => setNewEntry({ ...newEntry, quality: star })}
              >
                ★
              </button>
            ))}
          </div>
          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={addSleepEntry}
          >
            Add Entry
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Sleep Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={sleepEntries}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Line yAxisId="left" type="monotone" dataKey="duration" stroke="#8884d8" name="Hours Slept" />
            <Line yAxisId="right" type="monotone" dataKey="quality" stroke="#82ca9d" name="Sleep Quality" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Sleep Logs</h2>
        <ul className="space-y-2">
          {sleepEntries.slice(-5).reverse().map((entry) => (
            <li key={entry._id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
              <span>{entry.date}</span>
              <span>{entry.duration} hours</span>
              <span className="text-yellow-500">{'★'.repeat(entry.quality)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SleepMonitor;