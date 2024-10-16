import React, { useState, useEffect } from 'react';
import { Award, Lock } from 'lucide-react';
import axios from 'axios';

interface Achievement {
  _id: string;
  name: string;
  description: string;
  dateEarned: string;
}

const Achievements: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const response = await axios.get('/api/achievements');
      setAchievements(response.data);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    }
  };

  const unlockedAchievements = achievements.filter(a => a.dateEarned);
  const lockedAchievements = achievements.filter(a => !a.dateEarned);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Achievements</h1>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Your Badges</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {unlockedAchievements.map((achievement) => (
            <div key={achievement._id} className="p-4 rounded-lg bg-gray-100 flex items-center space-x-4">
              <div className="flex-shrink-0">
                <Award className="text-yellow-500" />
              </div>
              <div>
                <h3 className="font-semibold">{achievement.name}</h3>
                <p className="text-sm text-gray-600">{achievement.description}</p>
                <p className="text-xs text-gray-500 mt-1">Earned on: {new Date(achievement.dateEarned).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
          {lockedAchievements.map((achievement) => (
            <div key={achievement._id} className="p-4 rounded-lg bg-gray-200 flex items-center space-x-4">
              <div className="flex-shrink-0">
                <Lock className="text-gray-400" />
              </div>
              <div>
                <h3 className="font-semibold">{achievement.name}</h3>
                <p className="text-sm text-gray-600">{achievement.description}</p>
                <p className="text-xs text-gray-500 mt-1">Locked</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Progress Overview</h2>
        <div className="space-y-4">
          <div>
            <p className="font-medium">Total Achievements: {achievements.length}</p>
            <p className="font-medium">Unlocked: {unlockedAchievements.length}</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${(unlockedAchievements.length / achievements.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Upcoming Achievements</h2>
        <ul className="space-y-2">
          {lockedAchievements.map((achievement) => (
            <li key={achievement._id} className="flex items-center space-x-2">
              <Lock size={16} className="text-gray-400" />
              <span>{achievement.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Achievements;