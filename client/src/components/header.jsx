import React from 'react';
import logo from '../assets/logo.jpg';
import { useAuth0 } from '@auth0/auth0-react';

const Header = () => {
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();

  return (
    <header className="flex justify-between gap-0">
      <nav className="border border-gray-300 flex justify-between gap-5 text-lg p-2 m-2 w-full">
        <div className="flex justify-between gap-2 text-black font-semibold whitespace-nowrap leading-7">
          <img className="w-12" src={logo} alt="logo" />
          <div className="font-inter self-start mt-3">Customer Support</div>
        </div>
        <div className="rounded border border-gray-400 flex gap-4 text-gray-600 font-semibold leading-9 p-1">
          <div className="font-inter">Search</div>
          <i className="fas fa-search w-5"></i>
        </div>
      </nav>
      {!isAuthenticated && (
        <button
          className="bg-blue-500 text-white px-4 py-2 text-lg font-bold rounded self-start mt-2 w-24 h-35"
          onClick={() => loginWithRedirect()}
        >
          Log In
        </button>
      )}
      {isAuthenticated && (
        <button
          className="bg-blue-500 text-white px-4 py-2 text-lg rounded self-start mt-2 w-28 h-5"
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          Log Out
        </button>
      )}
      {isAuthenticated && (
        <div>
          {/* Display user information or roles if needed */}
          Welcome, {user.name}!
          {/* You can access roles like user['https://your-auth0-namespace/roles'] */}
        </div>
      )}
    </header>
  );
};

export default Header;
