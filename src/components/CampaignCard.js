import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import api from '../api';
import { DispatchContext, StateContext } from './App';
import { Button } from './atoms';
import { DELETE_CAMPAIGN } from '../constants/actionTypes';
import './CampaignCard.css';


const CampaignCard = ({ id }) => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const campaign = state.campaigns[id];
  const partyList = Object.keys(state.characters)
    .filter(char => state.characters[char].campaignId === Number(id))
    .map(char => state.characters[char].name);

  const deleteCampaign = () => {
    // TODO: convert to modal component
    if (window.confirm("Are you sure you want to delete this campaign?")) {
      api.delete(`/campaigns/${id}`).then(() => {
        dispatch({ type: DELETE_CAMPAIGN, id });
      }).catch((error) => {
        console.log('error deleting campaign', error)
      });
    }
  };

  return (
    <article className="CampaignCard">
      <header>
        <h2>
          <Link to={`/campaigns/${id}`}>{campaign.name}</Link>
        </h2>

        <nav>
          <Link className="Button" to={`/campaigns/${id}/edit`}>Edit</Link>
          <Button onClick={deleteCampaign}>Delete</Button>
        </nav>
      </header>

      <p><strong>Party:</strong> {partyList.join(', ')}</p>
    </article>
  );
};

export default CampaignCard;
