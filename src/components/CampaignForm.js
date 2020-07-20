import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';

import api from '../api';
import { DispatchContext, StateContext } from './App';
import { Button, CheckCircle, Loading, Table } from './atoms';
import {
  LOAD_CAMPAIGN,
  LOAD_CHARACTERS,
  UPDATE_CHARACTER,
} from '../constants/actionTypes';
import Error from './Error';
import { LabeledInput } from './molecules';
import './CampaignForm.css';


const CampaignForm = () => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const id = Number(useParams().id);
  const [formState, setFormState] = useState();
  const [error, setError] = useState();
  const [campaign, setCampaign] = useState(state.campaigns[id] || { name: '' });
  const characters = Object.keys(state.characters)
    .map(charId => state.characters[charId]);

  useEffect(() => {
    // TODO: I should probably fetch all campaigns here regardless because
    // they're showing in the character selection table. If a campaign isn't
    // in state, but a character is a member, that will be blank.
    if (id && !campaign.id) {
      setFormState('loading');
      api.get(`campaigns/${id}`).then((json) => {
        // Update app and local state with campaign data
        dispatch({
          type: LOAD_CAMPAIGN,
          campaign: json.campaign,
        });
        setCampaign(json.campaign);
        setFormState('done');
      });
    }
  }, [campaign, dispatch, id]);

  useEffect(() => {
    api.get('characters').then((json) => {
      // Update app state with all character data
      dispatch({ type:
        LOAD_CHARACTERS,
        characters: json.characters
      });
    });
  }, [dispatch]);


  if (formState === 'loading') {
    return (
      <Loading />
    );
  } else if (id && !campaign.id) {
    return (
      <Error error="Not Found" message="That campaign doesn't exist" />
    );
  } else if (formState === 'done' && !error && !id) {
    // If form submitted without error, but there is no id from query parameter, it means
    // the user successfully created a new campaign and can be redirected to finish the
    // process at the new campaign's route
    return (
      <Redirect to={`/campaigns/${campaign.id}/edit`} />
    );
  }


  const handleNameSubmit = (event) => {
    event.preventDefault();
    setFormState('loading');

    const request = id ? api.put(`campaigns/${id}`, campaign)
      : api.post('campaigns', campaign);
    request.then((json) => {
      if (json.campaign) {
        // On successful POST/PUT, add campaign data to app state...
        dispatch({
          type: LOAD_CAMPAIGN,
          campaign: json.campaign,
        });
        // update local state to handle redirect...
        setCampaign(json.campaign);
        // and remove any previous form errors
        if (error) setError(null);
      } else {
        setError(json.error);
      }
      // Regardless of outcome, end 'loading' state
      setFormState('done');
    });
  };

  const handleNameChange = (event) => {
    setCampaign({ ...campaign, name: event.target.value });
  };

  const togglePartyMember = (charId) => () => {
    const campaignId = state.characters[charId].campaignId === id
      ? null : id;
    dispatch({
      type: UPDATE_CHARACTER,
      id: charId,
      character: { campaignId },
    });
  };

  return (
    <main className="CampaignForm">
      <h1>{campaign.id ? 'Update' : 'Create'} Campaign</h1>      

      <h2>Details</h2>

      <form onSubmit={handleNameSubmit}>
        <LabeledInput
          autoFocus={true}
          id="name"
          label="Campaign Name"
          onChange={handleNameChange}
          type="text"
          value={campaign.name}
        />

        <Button
          disabled={formState === 'loading'}
          type="submit"
        >
          {campaign.id ? 'Update' : 'Create'}
        </Button>

        {(error && formState !== 'loading') && (
          <p className="Form_error">{error}</p>
        )}
      </form>

      {campaign.id && (
        <section>
          <h2>Select The Party</h2>

          <Table>
            <thead>
              <tr>
                <th></th>
                <th>Character</th>
                <th>Campaign</th>
              </tr>
            </thead>
            <tbody>
            {characters.map(char => (
              <tr key={char.id}>
                <td>
                  <CheckCircle
                    checked={char.campaignId === id}
                    handleClick={togglePartyMember(char.id)}
                  />
                </td>
                <td>
                  {char.name}
                </td>
                <td>
                  {state.campaigns[char.campaignId] &&
                    state.campaigns[char.campaignId].name}
                </td>
              </tr>
            ))}
            </tbody>
          </Table>
        </section>
      )}
    </main>
  );
};

export default CampaignForm;
