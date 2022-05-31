import React from 'react';
import LanguagesNav from './LanguagesNav.js';
import {fetchPopularRepos} from '../utils/api.js';
import ReposGrid from './ReposGrid.js';
import Loading from './Loading.js';

export default class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: {},
      error: null
    }
    this.updateLanguage = this.updateLanguage.bind(this);
    this.isLoading = this.isLoading.bind(this);
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage)
  }

  updateLanguage(selectedLanguage) {
    this.setState({
      selectedLanguage,
      error: null
    })
    if (!this.state.repos[selectedLanguage]) {
      fetchPopularRepos(selectedLanguage)
      .then(data => this.setState(({repos}) =>({
          repos: {
            ...repos,
            [selectedLanguage]: data
          }
        })
      ))
      .catch(err => this.setState({
        error: 'There was an error fetching the repositories'
      }))
    }
  }

  isLoading() {
    const {selectedLanguage, repos, error} = this.state;
    return repos[selectedLanguage] === undefined && error === null
  }

  render() {
    const {selectedLanguage, repos, error} = this.state;
    return(
      <>
        <LanguagesNav
          selectedLanguage={selectedLanguage}
          updateLanguage={this.updateLanguage}
        />
        {this.isLoading() && <Loading text='Featching Repos'/>}
        {error && <p className='center-text error'>{error}</p>}
        {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]}/>}
      </>
    )
  }
}