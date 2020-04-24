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
          <LabeledInput type="text" id="race" value={character.race} readOnly />

          <LabeledInput type="text" id="class" label="Class & Level" value={`${character.class} ${character.level}`} readOnly />

          <LabeledInput type="text" id="background" value={character.background} readOnly />

          <LabeledInput type="text" id="alignment" value={character.alignment} readOnly />
        </div>
      </form>
    </header>
  );
};

export default CharacterHeader;
