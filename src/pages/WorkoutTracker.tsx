import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import axios from 'axios';

interface Exercise {
  id: number;
  name: string;
  sets: number;
  reps: number;
  weight: number;
}

interface Workout {
  _id: string;
  date: string;
  type: string;
  duration: number;
  exercises: Exercise[];
}

const WorkoutTracker: React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [newWorkout, setNewWorkout] = useState<Omit<Workout, '_id'>>({
    date: new Date().toISOString().split('T')[0],
    type: 'strength',
    duration: 0,
    exercises: []
  });

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const response = await axios.get('/api/workouts');
      setWorkouts(response.data);
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  };

  const addWorkout = async () => {
    try {
      await axios.post('/api/workouts', newWorkout);
      fetchWorkouts();
      setNewWorkout({
        date: new Date().toISOString().split('T')[0],
        type: 'strength',
        duration: 0,
        exercises: []
      });
    } catch (error) {
      console.error('Error adding workout:', error);
    }
  };

  const removeWorkout = async (id: string) => {
    try {
      await axios.delete(`/api/workouts/${id}`);
      fetchWorkouts();
    } catch (error) {
      console.error('Error removing workout:', error);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Workout Tracker</h1>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Add Workout</h2>
        <div className="flex flex-wrap gap-4">
          <input
            type="date"
            className="p-2 border rounded"
            value={newWorkout.date}
            onChange={(e) => setNewWorkout({ ...newWorkout, date: e.target.value })}
          />
          <select
            className="p-2 border rounded"
            value={newWorkout.type}
            onChange={(e) => setNewWorkout({ ...newWorkout, type: e.target.value })}
          >
            <option value="strength">Strength</option>
            <option value="cardio">Cardio</option>
            <option value="flexibility">Flexibility</option>
            <option value="other">Other</option>
          </select>
          <input
            type="number"
            placeholder="Duration (minutes)"
            className="p-2 border rounded"
            value={newWorkout.duration}
            onChange={(e) => setNewWorkout({ ...newWorkout, duration: parseInt(e.target.value) })}
          />
          <button
            className="bg-blue-500 text-white p-2 rounded flex items-center"
            onClick={addWorkout}
          >
            <Plus size={20} className="mr-1" /> Add Workout
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Workouts</h2>
        {workouts.length === 0 ? (
          <p className="text-gray-500">No workouts logged yet.</p>
        ) : (
          <ul className="space-y-2">
            {workouts.map((workout) => (
              <li key={workout._id} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                <span>{new Date(workout.date).toLocaleDateString()} - {workout.type} ({workout.duration} min)</span>
                <button
                  className="text-red-500"
                  onClick={() => removeWorkout(workout._id)}
                >
                  <Trash2 size={20} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default WorkoutTracker;