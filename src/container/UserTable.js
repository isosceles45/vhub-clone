import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { useState, useEffect } from "react";
import axios from "axios";
import { HiOutlineRefresh } from "react-icons/hi";
import logo from "../static/logo_png.png.webp";
import { useGoogleLogin } from "@react-oauth/google";
import { MdExitToApp } from "react-icons/md";
import { AiFillGoogleCircle } from "react-icons/ai";
import { CgHashtag } from "react-icons/cg";
import { FaUserShield } from "react-icons/fa";

const API = process.env.REACT_APP_USER_API;

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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

  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const login = useGoogleLogin({
    onSuccess: async (respose) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${respose.access_token}`,
            },
          }
        );
        setLoggedIn(true);
        console.log(respose);
        const { name, picture } = res.data;
        setUser({ name, picture });
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    },
  });

  const handleLogout = () => {
    setUser(null);
    setLoggedIn(false);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-white border w-20 flex-shrink-0 p-4 md:block hidden fixed h-full">
        <div className="flex items-center justify-end">
          <img src={logo} alt="Logo" />
          
        </div>
        <button
                className="p-3 my-12 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 text-white"
              >
                <FaUserShield size={24}/>
              </button>
              <button
                className="p-3 flex items-center rounded-lg text-gray-600 hover:bg-gradient-to-r from-blue-500 to-cyan-400 hover:text-white"
              >
                <CgHashtag size={24}/>
              </button>
        <div className="absolute bottom-4 left-4">
          <FiSettings className="text-gray-500 m-2" size={30} />
        </div>
      </div>

      {/* Divs and Table Container */}
      <div className="flex flex-col flex-1">
        {/* Divs Stacked Below Sidebar */}
        <div className="bg-white border p-4 flex justify-end">
          {loggedIn ? (
            <div className="flex items-center">
              <button className="flex items-center bg-gray-50 hover:bg-gray-200 px-4 py-1 mx-6 rounded-full">
                {user && (
                  <>
                    <img
                      src={user.picture}
                      alt={user.name}
                      className="w-8 h-8 rounded-full my-2 mr-2"
                    />
                    <div>
                      <p className="font-bold text-gray-800 py-2">{user.name}</p>
                    </div>
                  </>
                )}
                <span
                  className="text-gray-700 text-2xl ml-2"
                  onClick={handleLogout}
                >
                  <MdExitToApp />
                </span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => login()}
              className="flex items-center text-xl bg-gradient-to-r from-blue-500 to-cyan-400 text-white py-2 px-2 mx-6 rounded-full"
            >
              <span className="font-Inter px-1 flex justify-center items-center">
                <AiFillGoogleCircle size={28} />
              </span>
              Sign in with Google
            </button>
          )}
        </div>
        <div className="bg-white p-4 mb-4">
          {/* Second div */}
          
          <div className="flex flex-row items-center px-28">
          <div className="my-4 flex space-x-2 mb-4 font-Inter">
          <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 text-white">
            User
          </button>
          <button className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gradient-to-r from-blue-500 to-cyan-400 hover:text-white">
            Campaign
          </button>
          <button className=" px-4 py-2  rounded-lg text-gray-600 hover:bg-gradient-to-r from-blue-500 to-cyan-400 hover:text-white">
            Tables
          </button>
          <button className=" px-5 py-3  rounded-lg text-gray-600 hover:bg-gradient-to-r from-blue-500 to-cyan-400 hover:text-white">
            List
          </button>
        </div>
            <div className="inline-flex bg-white font-Inter"></div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder="Search for influencers"
              className="flex-grow border rounded-lg shadow-lg px-5 py-3 mx-2"
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
                <HiOutlineRefresh />
              </button>
            </div>
          </div>
        </div>
        {/* User Table */}
        <div className="table-container flex-1 w-full">
          <div className="grid grid-cols-1 gap-4 px-32">
            {/* Table View */}
            <table className="hidden shadow-lg md:table w-full">
              <thead>
                <tr className="bg-white text-gray-600 font-Inter">
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Username</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Website</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id} 
                  className={`${
                    index % 2 === 1 ? 'bg-white' : 'bg-gray-100'
                  } hover:bg-gray-200`}
                  >
                    <td className="px-4 py-4">{user.name}</td>
                    <td className="px-4 py-4">
                      <a
                        href={`https://www.instagram.com/${user.username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-black"
                      >
                        <FaInstagram className="text-blue-500 mr-1" />
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
            {users.map((user, index) => (
              <div
                key={user.id}
                className={`${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                } rounded-xl font-Inter shadow-md w-full p-6 md:hidden`}
              >
                <div className="flex items-center mb-2">
                  <FaInstagram className="text-blue-500 mr-2" size={24}/>
                  <a
                    href={`https://www.instagram.com/${user.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 text-2xl font-bold"
                  >
                    {user.username}
                  </a>
                </div>
                <div>
                  <p className="font-bold">Name:</p>
                  <p className="text-xl">{user.name}</p>
                  <p className="font-bold">Email:</p>
                  <p className="text-xl">{user.email}</p>
                  <p className="font-bold">Website:</p>
                  <p className="text-xl">{user.website}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
