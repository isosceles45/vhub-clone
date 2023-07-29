import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_USER_API;

const Tables = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get(API)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error while fetching users:', error);
      });
  };

  const filterUsers = (searchQuery) => {
    const filteredUsers = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setUsers(filteredUsers);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    filterUsers(e.target.value);
  };

  const handleSearchClick = () => {
    filterUsers(searchQuery);
  };

  const handleRefreshClick = () => {
    setSearchQuery('');
    fetchUsers(); // Fetch all users again to show the full list
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-row items-center">
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search users..."
          className="flex-grow border rounded-l px-4 py-2"
        />
        <div className="flex">
          <button
            onClick={handleSearchClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-l"
          >
            Search
          </button>
          <button
            onClick={handleRefreshClick}
            className="bg-gray-500 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-r"
          >
            Refresh
          </button>
        </div>
      </div>
      <div className="block md:overflow-x-auto">
        <table className="table-auto w-full mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Website</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.username}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.website}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {users.length === 0 && <p className="mt-4">No matching users found.</p>}
    </div>
  );
};

export default Tables;
