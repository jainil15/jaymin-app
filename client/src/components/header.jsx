import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg';

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('Guest');

  useEffect(() => {
    fetch('http://localhost:4004/api/user', { 
      credentials: 'include',
    })
    .then(response => response.json())
    .then(data => {
      if (data.user) {
        setIsLoggedIn(true);
        setUsername(data.user.name);
      }
    });
  }, []);

  const handleLogin = () => {
    if (isLoggedIn) {
      fetch('http://localhost:4004/logout', {
        credentials: 'include',
      })
      .then(() => {
        setIsLoggedIn(false);
        setUsername('Guest');
      });
    } else {
      navigate('/UserLogin');
    }
  };

  return (
    <header className="flex justify-between gap-0">
      <nav className="border border-gray-300 flex justify-between gap-5 text-lg p-2 m-2 w-full h-12">
        <div className="flex justify-between gap-2 text-black font-semibold whitespace-nowrap leading-7 mb-2">
          <img className="w-12 h-9" src={logo} alt="logo" />
          <div className="font-inter self-start mt-3">Customer Support</div>
        </div>
        <div className="rounded border border-gray-400 flex gap-4 text-gray-600 font-semibold leading-9 p-1 w-1/2">
          <input type="text" className="font-inter w-full" placeholder="Search" />
          <i className="fas fa-search w-5"></i>
        </div>
      </nav>
      <button
        className="bg-blue-500 text-white px-4 py-2 text-lg font-bold rounded self-start mt-2 w-28 h-35"
        onClick={handleLogin}
      >
        {isLoggedIn ? 'Logout' : 'Log In'}
      </button>
      <div className="flex flex-col items-center gap-2">
        <img className="w-10 h-10 rounded-full" src="https://style.monday.com/static/media/person1.de30c8ee.png" alt="User avatar" />
        <div className="font-bold text-lg">{username}</div>
      </div>
    </header>
  );
};

export default Header;
