import React, { useState, useEffect } from 'react';
import { Plus, Check, X } from 'lucide-react';
import { format, eachDayOfInterval, startOfWeek, endOfWeek } from 'date-fns';
import axios from 'axios';

interface Habit {
  _id: string;
  name: string;
  frequency: string;
  completedDates: string[];
}

const HabitsTracker: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabit, setNewHabit] = useState('');

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const response = await axios.get('/api/habits');
      setHabits(response.data);
    } catch (error) {
      console.error('Error fetching habits:', error);
    }
  };

  const addHabit = async () => {
    if (newHabit) {
      try {
        await axios.post('/api/habits', { name: newHabit, frequency: 'daily' });
        fetchHabits();
        setNewHabit('');
      } catch (error) {
        console.error('Error adding habit:', error);
      }
    }
  };

  const toggleHabitCompletion = async (habitId: string, date: string) => {
    try {
      await axios.post(`/api/habits/${habitId}/complete`, { date });fetchHabits();
    } catch (error) {
      console.error('Error toggling habit completion:', error);
    }
  };

  const weekDates = eachDayOfInterval({
    start: startOfWeek(new Date()),
    end: endOfWeek(new Date())
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Habits Tracker</h1>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Add New Habit</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="New habit name"
            className="flex-grow p-2 border rounded"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white p-2 rounded flex items-center"
            onClick={addHabit}
          >
            <Plus size={20} className="mr-1" /> Add
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">This Week's Habits</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="p-2 border-b">Habit</th>
                {weekDates.map(date => (
                  <th key={date.toISOString()} className="p-2 border-b">
                    {format(date, 'EEE')}
                    <br />
                    {format(date, 'd')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {habits.map(habit => (
                <tr key={habit._id}>
                  <td className="p-2 border-b">{habit.name}</td>
                  {weekDates.map(date => {
                    const dateStr = format(date, 'yyyy-MM-dd');
                    const isCompleted = habit.completedDates.includes(dateStr);
                    return (
                      <td key={dateStr} className="p-2 border-b text-center">
                        <button
                          className={`p-1 rounded ${isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                          onClick={() => toggleHabitCompletion(habit._id, dateStr)}
                        >
                          {isCompleted ? <Check size={16} /> : <X size={16} />}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HabitsTracker;