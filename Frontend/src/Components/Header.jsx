import React from 'react'
import { NavLink } from 'react-router'
function Header() {
  return (
    <div className='flex justify-between bg-gray-500'>
      <img
        width="80px"   
        src=" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQXjKCEQw9pb4LaNJzpBhDZzZi1KI5LIcMGA&s"
        alt="logo"
      ></img>
      {/* navbar */}
      <nav>
        <ul className='flex gap-10 p-5 font-bold text-black '>
          <li>
            <NavLink to='/' className={({isActive})=>(isActive?"text-blue-100 bg-blue-500 p-1":"")}>Home</NavLink>
          </li>
          <li>
            <NavLink to='register' className={({isActive})=>(isActive?"text-blue-100 bg-blue-500 p-1":"")}>Register</NavLink>
          </li>
          <li>
            <NavLink to='login' className={({isActive})=>(isActive?"text-blue-100 bg-blue-500 p-1":"")}>Login</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Header