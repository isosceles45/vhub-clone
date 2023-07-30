import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { MdExitToApp } from "react-icons/md";
import axios from 'axios';
import { AiFillGoogleCircle } from "react-icons/ai";
import logo from "../static/logo_png.png.webp";
import Tables from "./Tables";

const Header = () => {

  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const responseGoogle = (response) => {
    let decodedHeader = jwt_decode(response.credential);
    console.log(decodedHeader);
    setLoggedIn(true);
    

    const { name, picture} = decodedHeader;
    setUser({name, picture});
  };

  const login = useGoogleLogin({
    onSuccess: async respose => {
        try {
            const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    "Authorization": `Bearer ${respose.access_token}`
                }
            })
            setLoggedIn(true);
            console.log(respose);
            const { name, picture} = res.data;
            setUser({name, picture});
            console.log(res.data);
        } catch (err) {
            console.log(err)

        }

    }
});

  const handleLogout = () => {
    setUser(null);
    setLoggedIn(false);
  };

  return (
    <div className="flex items-center w-full p-4 bg-white">
      {loggedIn ? (
        <div className="flex items-center">
          <button
            className=" flex items-center bg-gray-100 hover:bg-gray-200 px-2 rounded-full"
          >
            {user && (
              <>
                <img
                  src={user.picture}
                  alt={user.name}
                  className="w-8 h-8 rounded-full mr-2"
                />
                
                <div>
                <p className='font-bold text-lg py-2'>{user.name}</p>
                  </div>
                
              </>
            )}
            
            <span className="text-black text-2xl ml-2" onClick={handleLogout}><MdExitToApp/></span>
            
          </button>
          
        </div>
      ) : (
        <button onClick={() => login()} className='flex items-center font-bold text-xl bg-gray-100 hover:bg-gray-200 px-3 py-1 mx-2 my-1 rounded-full'>
        <span className='text-2xl px-1'><AiFillGoogleCircle/></span>
        Login
        </button>
      )}
    </div>
    
  );
};

export default Header;
