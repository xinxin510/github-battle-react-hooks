import React from 'react';
import {battle} from '../utils/api.js';
import Card from './Card.js';
import ProfileList from './ProfileList.js';
import Loading from './Loading.js';

export default class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }
  componentDidMount() {
    const {playerOne, playerTwo, onReset} = this.props;
    battle([playerOne, playerTwo])
    .then(players => {
      this.setState({
        winner: players[0],
        loser: players[1],
        error: null,
        loading: false
      })
    })
    .catch(({message}) => {
      this.setState({
        error: message,
        loading: false
      })
    })
  }
  render() {
    const { winner, loser, error, loading } = this.state

    if (loading === true) {
      return <Loading text='Battling' />
    }

    if (error) {
      return (
        <p className='center-text error'>{error}</p>
      )
    }

    return (
      <>
        <div className='grid space-around container-sm'>
          <Card
            header={winner.score === loser.score ? 'Tie' : 'Winner'}
            subheader={`Score: ${winner.score.toLocaleString()}`}
            avatar={winner.profile.avatar_url}
            href={winner.profile.html_url}
            name={winner.profile.login}
          >
            <ProfileList profile={winner.profile} />
          </Card>
          <Card
            header={winner.score === loser.score ? 'Tie' : 'Loser'}
            subheader={`Score: ${loser.score.toLocaleString()}`}
            avatar={loser.profile.avatar_url}
            name={loser.profile.login}
            href={loser.profile.html_url}
          >
            <ProfileList profile={loser.profile}/>
          </Card>
        </div>
        <button
          onClick={this.props.onReset}
          className='btn dark-btn btn-space'>
            Reset
        </button>
      </>
    )
  }
}