import React from 'react';
import { ThemeConsumer } from '../contexts/theme.js';
import { NavLink } from 'react-router-dom';

const activeStyle = {
  color: 'rgb(187, 46, 31)'
}

export default function Nav({toggleTheme}) {
  return (
    <ThemeConsumer>
      {(theme) => (
        <nav className='row space-between'>
          <ul className='row nav'>
            <li>
              <NavLink
                to='/'
                style={({isActive}) => isActive ? activeStyle : undefined}
                className='nav-link'>
                  Popular
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/battle'
                exact
                style={({isActive}) => isActive ? activeStyle : undefined}
                className='nav-link'>
                  Battle
              </NavLink>
            </li>
          </ul>
          <button
            style={{fontSize: 30}}
            className='btn-clear'
            onClick={toggleTheme}
          >
            {theme === 'light' ? '🔦' : '💡'}
          </button>
      </nav>
      )}
    </ThemeConsumer>
  )
}