import React, { useState, useEffect } from 'react';
import { Plus, Droplet } from 'lucide-react';
import axios from 'axios';

interface FoodEntry {
  _id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface HydrationEntry {
  _id: string;
  amount: number;
}

const FoodIntake: React.FC = () => {
  const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([]);
  const [newEntry, setNewEntry] = useState<Omit<FoodEntry, '_id'>>({
    name: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });
  const [waterIntake, setWaterIntake] = useState<HydrationEntry[]>([]);
  const [newWaterAmount, setNewWaterAmount] = useState(0);

  useEffect(() => {
    fetchFoodEntries();
    fetchWaterIntake();
  }, []);

  const fetchFoodEntries = async () => {
    try {
      const response = await axios.get('/api/food-log');
      setFoodEntries(response.data);
    } catch (error) {
      console.error('Error fetching food entries:', error);
    }
  };

  const fetchWaterIntake = async () => {
    try {
      const response = await axios.get('/api/hydration-log');
      setWaterIntake(response.data);
    } catch (error) {
      console.error('Error fetching water intake:', error);
    }
  };

  const addFoodEntry = async () => {
    if (newEntry.name && newEntry.calories > 0) {
      try {
        await axios.post('/api/food-log', newEntry);
        fetchFoodEntries();
        setNewEntry({ name: '', calories: 0, protein: 0, carbs: 0, fat: 0 });
      } catch (error) {
        console.error('Error adding food entry:', error);
      }
    }
  };

  const addWaterIntake = async () => {
    if (newWaterAmount > 0) {
      try {
        await axios.post('/api/hydration-log', { amount: newWaterAmount });
        fetchWaterIntake();
        setNewWaterAmount(0);
      } catch (error) {
        console.error('Error adding water intake:', error);
      }
    }
  };

  const totalNutrients = foodEntries.reduce(
    (acc, entry) => ({
      calories: acc.calories + entry.calories,
      protein: acc.protein + entry.protein,
      carbs: acc.carbs + entry.carbs,
      fat: acc.fat + entry.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const totalWaterIntake = waterIntake.reduce((acc, entry) => acc + entry.amount, 0);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Food & Hydration Tracker</h1>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Add Food Entry</h2>
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Food name"
            className="flex-grow p-2 border rounded"
            value={newEntry.name}
            onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Calories"
            className="w-24 p-2 border rounded"
            value={newEntry.calories || ''}
            onChange={(e) => setNewEntry({ ...newEntry, calories: parseInt(e.target.value) || 0 })}
          />
          <input
            type="number"
            placeholder="Protein (g)"
            className="w-24 p-2 border rounded"
            value={newEntry.protein || ''}
            onChange={(e) => setNewEntry({ ...newEntry, protein: parseInt(e.target.value) || 0 })}
          />
          <input
            type="number"
            placeholder="Carbs (g)"
            className="w-24 p-2 border rounded"
            value={newEntry.carbs || ''}
            onChange={(e) => setNewEntry({ ...newEntry, carbs: parseInt(e.target.value) || 0 })}
          />
          <input
            type="number"
            placeholder="Fat (g)"
            className="w-24 p-2 border rounded"
            value={newEntry.fat || ''}
            onChange={(e) => setNewEntry({ ...newEntry, fat: parseInt(e.target.value) || 0 })}
          />
          <button
            className="bg-blue-500 text-white p-2 rounded flex items-center"
            onClick={addFoodEntry}
          >
            <Plus size={20} className="mr-1" /> Add
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Water Intake</h2>
        <div className="flex items-center gap-4">
          <Droplet size={24} className="text-blue-500" />
          <input
            type="number"
            step="0.1"
            min="0"
            placeholder="Liters"
            className="w-24 p-2 border rounded"
            value={newWaterAmount || ''}
            onChange={(e) => setNewWaterAmount(parseFloat(e.target.value) || 0)}
          />
          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={addWaterIntake}
          >
            Add Water
          </button>
          <span>{totalWaterIntake.toFixed(1)}L / 2.5L goal</span>
        </div>
        <div className="mt-2 bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-500 h-2.5 rounded-full"
            style={{ width: `${Math.min((totalWaterIntake / 2.5) * 100, 100)}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Today's Food Log</h2>
        <ul className="space-y-2">
          {foodEntries.map((entry) => (
            <li key={entry._id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
              <span className="font-medium">{entry.name}</span>
              <span>{entry.calories} cal</span>
              <span>{entry.protein}g P</span>
              <span>{entry.carbs}g C</span>
              <span>{entry.fat}g F</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Nutrition Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-lg font-bold">{totalNutrients.calories}</p>
            <p className="text-sm text-gray-500">Calories</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold">{totalNutrients.protein}g</p>
            <p className="text-sm text-gray-500">Protein</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold">{totalNutrients.carbs}g</p>
            <p className="text-sm text-gray-500">Carbs</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold">{totalNutrients.fat}g</p>
            <p className="text-sm text-gray-500">Fat</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodIntake;