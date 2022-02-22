import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/auth';
import image from "../../images/convergen.png"; 
const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  if (!isAuthenticated) {
    return '';
  }

  return (
    <nav className='navbar'>
      <Link to='/dashboard'>Home</Link>


      <Link to='/dashboard'>Convergen</Link>
      <Link to='/' onClick={() => dispatch(logout())}>
        Logout
      </Link>
    </nav>
  );
};

export default Navbar;
