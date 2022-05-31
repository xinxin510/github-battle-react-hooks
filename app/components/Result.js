import React from 'react';
import {battle} from '../utils/api.js';
import Card from './Card.js';
import ProfileList from './ProfileList.js';
import Loading from './Loading.js';

export default function Result ({playerOne, playerTwo, onReset}) {
  const [winner, setWinner] = React.useState(null);
  const [loser, setLoser] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    battle([playerOne, playerTwo])
    .then(players => {
      setWinner(players[0]),
      setLoser(players[1]),
      setError(null),
      setLoading(false)
    })
    .catch(({message}) => {
      setError(message),
      setLoading(false)
    })
  }, [])


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
        onClick={onReset}
        className='btn dark-btn btn-space'>
          Reset
      </button>
    </>
  )
}