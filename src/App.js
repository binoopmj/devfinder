import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        setUserData(null);
        alert('User not found!');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">devfinder</h1>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search GitHub username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-l-md focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none"
        >
          Search
        </button>
      </div>
      {userData && (
        <div className="mt-8">
          <img src={userData.avatar_url} alt="User Avatar" className="w-20 h-20 rounded-full" />
          <h2 className="text-xl font-bold mt-4">{userData.name}</h2>
          <p className="text-gray-700">{userData.bio}</p>
          <p className="text-gray-700">Followers: {userData.followers}</p>
          <p className="text-gray-700">Following: {userData.following}</p>
          <p className="text-gray-700">Repos: {userData.public_repos}</p>
        </div>
      )}
    </div>
  );
}

export default App;
