import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Popular from './components/Popular.js';
import Battle from './components/Battle.js';
import {ThemeProvider} from './contexts/theme.js';
import Nav from './components/Nav.js';
import {Routes, Route, BrowserRouter as Router} from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'light',
      toggleTheme: () => {
        this.setState(({theme}) => ({
          theme: theme === 'light' ? 'dark' : 'light'
        }))
      }
    }
  }
  render() {
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={this.state.theme}>
            <div className='container'>
              <Nav />
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
}

ReactDOM.render(<App />, document.getElementById('app'));