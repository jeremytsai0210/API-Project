// frontend/src/components/Navigation/Navigation.jsx

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { FaHouse } from 'react-icons/fa6';
import ProfileButton from './ProfileButton';
import blutrekLogo from '../../images/blutrek-icon.png';
import './Navigation.css';


function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul>
      <li>
        <NavLink to="/">
          <img src={blutrekLogo} alt="BluTrek Logo" className="home-logo" />
          {/* <FaHouse /> */}
        </NavLink>
      </li>
      {isLoaded && (
        <div className="right-side">
          {sessionUser && (
            <li className="create-spot">
              <NavLink to="/spots/new" className="create-spot-link">
                Create Spot
              </NavLink>
            </li>
          )}
          <li>
            <ProfileButton user={sessionUser} />
          </li>
        </div>
      )}
    </ul>
  );
}

export default Navigation;