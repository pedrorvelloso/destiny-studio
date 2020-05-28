import React from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from 'modules/AuthManager';

import { Container } from './styles';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <Container>
      <div>
        <div>D</div>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          {!user ? (
            <li>
              <Link to="/login">Login</Link>
            </li>
          ) : (
            <li>
              <Link onClick={signOut} to="/">
                Logout
              </Link>
            </li>
          )}
        </ul>
      </div>
      {user && <span>Hello {user.name}!</span>}
    </Container>
  );
};

export default Header;
