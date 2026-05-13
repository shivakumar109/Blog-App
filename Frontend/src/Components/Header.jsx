import React from 'react';
import { NavLink, useNavigate } from 'react-router';
import { useAuth } from '../Store/AuthStore';

function Header() {
const navigate = useNavigate();

const user = useAuth((state) => state.currentUser);
const logout = useAuth((state) => state.logout);

const dashboardPath =
  user?.role === "AUTHOR"
    ? "/authordashbord"
    : user?.role === "USER"
    ? "/userdashbord"
    : "/";
const handleLogout = () => {
logout();
navigate('/login');
};

return ( <div className='flex flex-col sm:flex-row items-center justify-between bg-gray-500 p-4 sm:p-0'>


  {/* Logo */}
  <img
    width="80px"
    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQXjKCEQw9pb4LaNJzpBhDZzZi1KI5LIcMGA&s"
    alt="logo"
    className="mb-4 sm:mb-0"
  />

  {/* Navbar */}
  <nav>
    <ul className='flex flex-wrap justify-center items-center gap-4 sm:gap-10 sm:p-5 font-bold text-black'>

      {/* Home */}
      <li>
        <NavLink to='/' className={({ isActive }) =>
          isActive ? "text-blue-100 bg-blue-500 p-1" : ""
        }>
          Home
        </NavLink>
      </li>

      {/* Not Logged In */}
      {!user && (
        <>
          <li>
            <NavLink to='/register' className={({ isActive }) =>
              isActive ? "text-blue-100 bg-blue-500 p-1" : ""
            }>
              Register
            </NavLink>
          </li>

          <li>
            <NavLink to='/login' className={({ isActive }) =>
              isActive ? "text-blue-100 bg-blue-500 p-1" : ""
            }>
              Login
            </NavLink>
          </li>
        </>
      )}

      {/*  Logged In */}
      {user && (
        <>
          <li>
  <NavLink
    to={dashboardPath}
    className={({ isActive }) =>
      isActive ? "text-blue-100 bg-blue-500 p-1" : ""
    }
  >
    Dashboard
  </NavLink>
</li>
          <li>
            <button
              onClick={handleLogout}
              className="text-black px-3 py-1 rounded"
            >
              Logout
            </button>
          </li>
        </>
      )}

    </ul>
  </nav>
</div>


);
}

export default Header;
