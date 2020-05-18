import React from 'react';

import { LabeledInput } from '../molecules';
import './CharacterHeader.css';

const CharacterHeader = ({ character }) => {

  // const onChange = (event) => {
  //   console.log(event.target.id, event.target.value);
  // };
  const onSubmit = () => console.log('Updated character header');

  return (
    <header className="CharacterHeader">
      <h2>{character.name}</h2>

      <form onSubmit={onSubmit}>
        <div className="details">
          <LabeledInput id="race" value={character.race} readOnly />

          <LabeledInput id="class" value={character.class} readOnly />

          <LabeledInput id="level" value={character.level} readOnly />

          <LabeledInput id="experience" value={character.experience} readOnly />
        </div>
      </form>
    </header>
  );
};

export default CharacterHeader;
