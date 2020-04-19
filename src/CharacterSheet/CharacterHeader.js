import React from 'react';

import { LabeledInput } from '../atoms';
import './CharacterHeader.css';

const CharacterHeader = (props) => {

  // const onChange = (event) => {
  //   console.log(event.target.id, event.target.value);
  // };
  const onSubmit = () => console.log('Updated character header');

  return (
    <header className="CharacterHeader">
      <h2>{props.name}</h2>

      <form onSubmit={onSubmit}>
        <div className="details">
          <LabeledInput type="text" id="race" value={props.race} readOnly />

          <LabeledInput type="text" id="class" label="Class & Level" value={`${props.class} ${props.level}`} readOnly />

          <LabeledInput type="text" id="background" value={props.background} readOnly />

          <LabeledInput type="text" id="alignment" value={props.alignment} readOnly />
        </div>
      </form>
    </header>
  );
};

export default CharacterHeader;
