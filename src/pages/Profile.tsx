import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, Save } from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  birthdate: string;
  height: number;
  weight: number;
  goal: string;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    birthdate: '1990-01-01',
    height: 175,
    weight: 70,
    goal: 'Improve overall health and fitness',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    // Here you would typically send the updated profile to a backend API
    console.log('Updated profile:', profile);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">User Profile</h1>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <ProfileField
              icon={<User />}
              label="Name"
              name="name"
              value={profile.name}
              isEditing={isEditing}
              onChange={handleInputChange}
            />
            <ProfileField
              icon={<Mail />}
              label="Email"
              name="email"
              value={profile.email}
              isEditing={isEditing}
              onChange={handleInputChange}
              type="email"
            />
            <ProfileField
              icon={<Phone />}
              label="Phone"
              name="phone"
              value={profile.phone}
              isEditing={isEditing}
              onChange={handleInputChange}
              type="tel"
            />
            <ProfileField
              icon={<Calendar />}
              label="Birthdate"
              name="birthdate"
              value={profile.birthdate}
              isEditing={isEditing}
              onChange={handleInputChange}
              type="date"
            />
            <ProfileField
              label="Height (cm)"
              name="height"
              value={profile.height.toString()}
              isEditing={isEditing}
              onChange={handleInputChange}
              type="number"
            />
            <ProfileField
              label="Weight (kg)"
              name="weight"
              value={profile.weight.toString()}
              isEditing={isEditing}
              onChange={handleInputChange}
              type="number"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700">Fitness Goal</label>
              {isEditing ? (
                <textarea
                  name="goal"
                  value={profile.goal}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  rows={3}
                />
              ) : (
                <p className="mt-1 text-sm text-gray-900">{profile.goal}</p>
              )}
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            {isEditing ? (
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Save className="mr-2 -ml-1 h-5 w-5" aria-hidden="true" />
                Save Changes
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

interface ProfileFieldProps {
  icon?: React.ReactNode;
  label: string;
  name: string;
  value: string;
  isEditing: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const ProfileField: React.FC<ProfileFieldProps> = ({
  icon,
  label,
  name,
  value,
  isEditing,
  onChange,
  type = 'text',
}) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="mt-1 relative rounded-md shadow-sm">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
      )}
      {isEditing ? (
        <input
          type={type}
          name={name}
          id={name}
          className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${
            icon ? 'pl-10' : ''
          }`}
          value={value}
          onChange={onChange}
        />
      ) : (
        <p className={`block w-full text-sm text-gray-900 ${icon ? 'pl-10' : ''}`}>{value}</p>
      )}
    </div>
  </div>
);

export default Profile;