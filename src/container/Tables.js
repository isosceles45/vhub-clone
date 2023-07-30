import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import {HiOutlineRefresh} from "react-icons/hi";
import { FaInstagram } from 'react-icons/fa';

const API = process.env.REACT_APP_USER_API;

const Tables = () => {
  const [searchQuery, setSearchQuery] = useState("");
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
        console.error("Error while fetching users:", error);
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
    setSearchQuery("");
    fetchUsers();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-row items-center">
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search for influencers"
          className="flex-grow border rounded-lg shadow-lg px-5 py-3 mx-10"
        />
        <div className="flex">
          <button
            onClick={handleSearchClick}
            className="bg-white hover:bg-gray-100 text-black border rounded-lg shadow-lg font-semibold px-5 py-3"
          >
            Search
          </button>
          <button
            onClick={handleRefreshClick}
            className="bg-white mx-2 text-black font-semibold px-4 py-2 rounded-lg shadow-lg"
          >
            <HiOutlineRefresh/>
          </button>
        </div>
      </div>
      <div className="table-container">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Table View */}
        <table className="hidden md:table w-full">
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
              <tr key={user.id} className="bg-white">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">
                  <a
                    href={`https://www.instagram.com/${user.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-500"
                  >
                    <FaInstagram className="text-purple-500 mr-1" />
                    {user.username}
                  </a>
                </td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.website}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Card View (Mobile) */}
        {users.map((user) => (
          <div key={user.id} className="bg-white rounded-lg shadow-md p-4 md:hidden">
            <div className="flex items-center mb-2">
              <FaInstagram className="text-purple-500 mr-2" />
              <a
                href={`https://www.instagram.com/${user.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                {user.username}
              </a>
            </div>
            <div>
              <p className="font-bold">Name:</p>
              <p>{user.name}</p>
              <p className="font-bold">Email:</p>
              <p>{user.email}</p>
              <p className="font-bold">Website:</p>
              <p>{user.website}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
      {users.length === 0 && <p className="mt-4">No matching users found.</p>}
    </div>
  );
};

export default Tables;
