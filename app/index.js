import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Popular from './components/Popular.js';
import Battle from './components/Battle.js';
import {ThemeProvider} from './contexts/theme.js';
import Nav from './components/Nav.js';
import {Routes, Route, BrowserRouter as Router} from 'react-router-dom';

function App () {
  const [theme, setTheme] = React.useState('light');
  const toggleTheme = () => {
    setTheme(theme => theme === 'light' ? 'dark' : 'light')
  }

  return (
    <Router>
      <ThemeProvider value={theme}>
        <div className={theme}>
          <div className='container'>
            <Nav toggleTheme={toggleTheme}/>
            <Routes>
              <Route exact path='/' element={<Popular />} />
              <Route path='/battle' element={<Battle />} />
            </Routes>
          </div>
        </div>
      </ThemeProvider>
    </Router>
  )

}

ReactDOM.render(<App />, document.getElementById('app'));