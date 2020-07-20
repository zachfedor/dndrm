import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'

import api from '../api';
import { DispatchContext, StateContext } from './App';
import { Loading } from './atoms';
import { LOAD_CAMPAIGN } from '../constants/actionTypes';
import CharacterCard from './CharacterCard';
import Error from './Error';
import './Campaign.css';


const Campaign = () => {
  // Component context and UI state
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const [loading, setLoading] = useState(false);

  // Get campaign from state using URL query parameters
  const { id } = useParams();
  const campaign = state.campaigns[id];

  // Fetch campaign data from API on mount or when id changes
  useEffect(() => {
    setLoading(true);
    api.get(`campaigns/${id}`).then((json) => {
      if (json.campaign) {
        dispatch({
          type: LOAD_CAMPAIGN,
          campaign: json.campaign,
          characters: json.characters,
        });
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [dispatch, id]);

  // Exit early with Loading or Error components
  if (loading) {
    return (
      <Loading />
    );
  } else if (!campaign) {
    return (
      <Error
        error="Not Found"
        message="That campaign doesn't exist."
      />
    );
  }

  // If done loading and no error, then inspect state for associated data that
  // relies on the campaign object
  const isOwner = campaign.userId === state.currentUser.id;
  const characters = Object.keys(state.characters)
    .map(characterId => state.characters[characterId])
    .filter(character => character.campaignId === Number(id));

  return (
    <main className="Campaign">
      <header className="Campaign-header">
        <h1>{campaign.name}</h1>

        {isOwner && (
          <Link className="Button" to={`/campaigns/${id}/edit`}>Edit</Link>
        )}
      </header>

      {characters.map(character => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </main>
  );
};

export default Campaign;
