import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import api from '../api';
import { DispatchContext, StateContext } from './App';
// import { Button } from './atoms';
import { LOAD_CHARACTERS } from '../constants/actionTypes';


const CharacterList = () => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const id = state.currentUser.id;

  useEffect(() => {
    api.get(`characters?user=${id}`).then((json) => {
      dispatch({
        type: LOAD_CHARACTERS,
        characters: json.characters,
      });
    })
  }, [dispatch, id]);

  const characters = Object.keys(state.characters).filter(charId => {
    return state.characters[charId].userId === id;
  }).map(charId => state.characters[charId]);

  return (
  <main className="CharacterList">
    <h1>Characters</h1>

    {characters.map(character => (
      <article key={character.id} className="CharacterCard">
        <header>
          <h2><Link to={`/characters/${character.id}`}>{character.name}</Link></h2>

          <p>{character.race} {character.class} {character.level}</p>
        </header>
      </article>
    ))}
  </main>
)};

export default CharacterList;
