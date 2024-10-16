import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Dumbbell, CheckSquare, Moon, Apple, Award, User } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Healthy Dev Life</Link>
        <div className="flex space-x-4">
          <NavLink to="/" icon={<Home size={20} />} text="Dashboard" />
          <NavLink to="/workout" icon={<Dumbbell size={20} />} text="Workout" />
          <NavLink to="/habits" icon={<CheckSquare size={20} />} text="Habits" />
          <NavLink to="/sleep" icon={<Moon size={20} />} text="Sleep" />
          <NavLink to="/food" icon={<Apple size={20} />} text="Food" />
          <NavLink to="/achievements" icon={<Award size={20} />} text="Achievements" />
          <NavLink to="/profile" icon={<User size={20} />} text="Profile" />
        </div>
      </div>
    </nav>
  );
};

const NavLink: React.FC<{ to: string; icon: React.ReactNode; text: string }> = ({ to, icon, text }) => (
  <Link to={to} className="flex items-center hover:text-blue-200">
    {icon}
    <span className="ml-1">{text}</span>
  </Link>
);

export default Navbar;