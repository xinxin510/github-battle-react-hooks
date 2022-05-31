import React from 'react';
import { ThemeConsumer } from '../contexts/theme.js';

export default function PlayerInput ({label, onSubmit}) {

  const [username, setUsername] = React.useState('')


  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(username)
  }

  const handleChange = (event) => {
    setUsername(event.target.value)
  }

  return (
    <ThemeConsumer>
      {(theme) => (
        <form className='column player' onSubmit={handleSubmit}>
          <label htmlFor='username' className='player-label'>
            {label}
          </label>
          <div className='row player-inputs'>
            <input
              type='text'
              id='username'
              className={`input-${theme}`}
              placeholder='github username'
              autoComplete='off'
              value={username}
              onChange={handleChange}
            />
            <button
              className={`btn ${theme === 'dark' ? 'light-btn' : 'dark-btn'}`}
              type='submit'
              disabled={!username}
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </ThemeConsumer>
  )
}