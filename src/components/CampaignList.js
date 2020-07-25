import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import api from '../api';
import { DispatchContext, StateContext } from './App';
import CampaignCard from './CampaignCard';
import { LOAD_CAMPAIGNS } from '../constants/actionTypes';
import './CampaignList.css';

const CampaignList = () => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const sortedCampaignIds = Object.keys(state.campaigns)
    .sort((a, b) => state.campaigns[a].createdAt - state.campaigns[b].createdAt);

  useEffect(() => {
    api.get('/campaigns?embed=characters').then(data => {
      dispatch({
        type: LOAD_CAMPAIGNS,
        campaigns: data.campaigns,
        characters: data.characters,
      });
    });
  }, [dispatch]);

  return (
    <main className="CampaignList">
      <header>
        <h1>Campaigns</h1>

        <Link className="Button" to="/campaigns/create">Create</Link>
      </header>

      {sortedCampaignIds.map(id => (
        <CampaignCard key={id} id={id} />
      ))}
    </main>
  );
};

export default CampaignList;
