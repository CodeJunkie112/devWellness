import React, { useEffect, useState } from 'react';
import { Activity, Droplet, Brain, Dumbbell, CheckSquare, Moon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

interface DashboardData {
  recentWorkouts: any[];
  habits: any[];
  recentSleep: any;
  recentMood: any;
  todayFood: any[];
  todayHydration: any[];
  achievements: any[];
}

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('/api/dashboard');
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard icon={<Dumbbell />} title="Recent Workouts" value={dashboardData.recentWorkouts.length.toString()} />
        <StatCard icon={<Droplet />} title="Water Intake" value={`${dashboardData.todayHydration.reduce((acc, curr) => acc + curr.amount, 0)}L`} target="2L" />
        <StatCard icon={<Brain />} title="Mood" value={dashboardData.recentMood?.mood || 'N/A'} />
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Sleep Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dashboardData.recentSleep ? [dashboardData.recentSleep] : []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="duration" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Today's Habits</h2>
        <ul className="space-y-2">
          {dashboardData.habits.map((habit) => (
            <li key={habit._id} className="flex items-center">
              <CheckSquare className={`mr-2 ${habit.completedDates.includes(new Date().toISOString().split('T')[0]) ? 'text-green-500' : 'text-gray-300'}`} />
              <span>{habit.name}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Achievements</h2>
        <ul className="space-y-2">
          {dashboardData.achievements.map((achievement) => (
            <li key={achievement._id} className="flex items-center">
              <Activity className="mr-2 text-yellow-500" />
              <span>{achievement.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string; target?: string }> = ({ icon, title, value, target }) => (
  <div className="bg-white p-4 rounded-lg shadow flex items-center">
    <div className="mr-4 text-blue-500">{icon}</div>
    <div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
      {target && <p className="text-sm text-gray-500">Target: {target}</p>}
    </div>
  </div>
);

export default Dashboard;